use std::{
    env, fs,
    path::{Path, PathBuf},
};

pub fn project_root() -> PathBuf {
    Path::new(&env!("CARGO_MANIFEST_DIR"))
        .ancestors()
        .nth(1)
        .unwrap()
        .to_path_buf()
}

pub fn workspace_dir() -> PathBuf {
    let output = std::process::Command::new(env!("CARGO"))
        .arg("locate-project")
        .arg("--workspace")
        .arg("--message-format=plain")
        .output()
        .unwrap()
        .stdout;
    let cargo_path = Path::new(std::str::from_utf8(&output).unwrap().trim());
    cargo_path.parent().unwrap().to_path_buf()
}

// get Cargo.toml from workspace_dir and read the CARGO_PKG_NAME from it
pub fn get_workspace_pkg_name() -> String {
    let cargo_path = workspace_dir().join("Cargo.toml");
    let cargo_toml = fs::read_to_string(cargo_path).unwrap();
    let cargo_toml: toml::Value = toml::from_str(&cargo_toml).unwrap();
    let cargo_pkg_name = cargo_toml["package"]["name"].as_str().unwrap();
    cargo_pkg_name.to_string()
}

// convert from kabob case to snake case
pub fn kabob_to_snake_case(s: String) -> String {
    // convert from kabob case to lowercase snake case
    let mut s = s.replace('-', "_");
    s.make_ascii_lowercase();
    s
}
