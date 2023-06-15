use crate::utils::*;
use std::{env, fs, path::PathBuf, process::Command};
use types::{DistConfig, Profile};
use wit_component::ComponentEncoder;

type DynError = Box<dyn std::error::Error>;

mod codegen;
pub mod types;
pub mod utils;

/// Run the build n dist.
/// ## Arguments
/// - `task` - The task to run. (ie. `dist`)
/// - `config` - The [`DistConfig`] configuration for the task.
pub async fn try_main(task: &Option<String>, config: &DistConfig) -> Result<(), DynError> {
    match task.as_deref() {
        Some("dist") => dist(config).await?,
        _ => print_help(),
    }
    Ok(())
}

/// Print the help message.
fn print_help() {
    eprintln!(
        "Tasks:

dist [release]           builds application and adapts wasm module to component model
"
    )
}

/// Build the application and adapt the wasm module to the component model.
/// Distribute the wasm module to the `dist` directory.
pub async fn dist(config: &DistConfig) -> Result<(), DynError> {
    let dist_dir = || project_root().join(&config.dist_dir);

    let _ = fs::remove_dir_all(dist_dir());
    fs::create_dir_all(dist_dir())?;

    // get the CARGO_PKG_NAME of the workspace root project (not this xtask project)
    let out_name = kabob_to_snake_case(get_workspace_pkg_name());

    let profile_flag = match config.profile {
        Profile::Release => "--release",
        _ => "",
    };

    let cargo = env::var("CARGO").unwrap_or_else(|_| "cargo".to_string());
    let args = match profile_flag {
        "" => vec!["build", "--target", &config.target],
        _ => vec!["build", "--target", &config.target, profile_flag],
    };
    let status = Command::new(cargo)
        .current_dir(project_root())
        .args(args)
        .status()?;

    if !status.success() {
        Err("cargo build failed")?;
    }

    let path: PathBuf = [
        r"target",
        &config.target,
        &config.profile,
        &format!("{out_name}.wasm"),
    ]
    .iter()
    .collect();

    let src = project_root().join(path);
    eprintln!("Source Read: {:?}", src);
    let module = fs::read(src).unwrap();

    // read  ./wasi_preview1_component_adapter.wasm from same directory as this binary's Manifest file (Cargo.toml)
    let wasi_adapter = fs::read(xtask_root().join("wasi_preview1_component_adapter.wasm")).unwrap();

    // Inspired by: https://github.com/bytecodealliance/wit-bindgen/blob/e69cf5db8754f829637e25491c560ec0d9728852/tests/runtime/main.rs#L122
    let wasm = ComponentEncoder::default()
        .module(&module)?
        .validate(true)
        .adapter("wasi_snapshot_preview1", &wasi_adapter)?
        .encode()?;

    let dst = dist_dir().join(format!("{}.component.wasm", out_name));
    std::fs::write(dst.clone(), wasm)?;

    // codegen::transpile(&wasm, &out_name, &out).await?; // broken, doesn't prepend `@bytecodealliance/preview2-shim/...` to imports in generated files

    // This is faster than `codegen::transpile`: run Command: `jco transpile `dst` (as string) -o js`
    // windows needs to append `.cmd` to `jco` command
    // check if os is Windows, https://doc.rust-lang.org/reference/conditional-compilation.html
    let jco_cmd = if cfg!(windows) { "jco.cmd" } else { "jco" };
    let _status = Command::new(jco_cmd)
        .current_dir(project_root())
        .args(["transpile", dst.to_str().unwrap(), "-o", &config.js_out_dir])
        .status()?;

    Ok(())
}

fn xtask_root() -> PathBuf {
    project_root().join("xtask")
}
