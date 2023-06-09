use std::{
    env, fs,
    path::{Path, PathBuf},
    process::Command,
};
use wit_component::ComponentEncoder;

type DynError = Box<dyn std::error::Error>;

fn main() {
    if let Err(e) = try_main() {
        eprintln!("{}", e);
        std::process::exit(-1);
    }
}

fn try_main() -> Result<(), DynError> {
    let task = env::args().nth(1);
    // second arg is the name of the output file, defaults to "out" if none specified
    let out_name = env::args().nth(2).unwrap_or_else(|| "wit_wasm".to_string());
    match task.as_deref() {
        Some("dist") => dist(out_name)?,
        _ => print_help(),
    }
    Ok(())
}

fn print_help() {
    eprintln!(
        "Tasks:

dist            builds application and adapts wasm module to component model
"
    )
}

fn dist(out_name: String) -> Result<(), DynError> {
    let _ = fs::remove_dir_all(dist_dir());
    fs::create_dir_all(dist_dir())?;

    dist_binary(out_name)?;

    Ok(())
}

fn dist_binary(out_name: String) -> Result<(), DynError> {
    let cargo = env::var("CARGO").unwrap_or_else(|_| "cargo".to_string());
    let status = Command::new(cargo)
        .current_dir(project_root())
        .args(["build", "--target", "wasm32-wasi"]) // "--release",
        .status()?;

    if !status.success() {
        Err("cargo build failed")?;
    }

    let path: PathBuf = [
        r"target",
        "wasm32-wasi",
        "debug",
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

    let dst = dist_dir().join(format!("{}.wasm", out_name));

    std::fs::write(dst, wasm)?;

    Ok(())
}

fn xtask_root() -> PathBuf {
    project_root().join("xtask")
}

fn project_root() -> PathBuf {
    Path::new(&env!("CARGO_MANIFEST_DIR"))
        .ancestors()
        .nth(1)
        .unwrap()
        .to_path_buf()
}

fn dist_dir() -> PathBuf {
    project_root().join("dist")
}
