use std::env;
use wit_wasm_xtask::try_main;
use wit_wasm_xtask::types::{DistConfig, Profile, Target};

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let task = env::args().nth(1); // 'dist'

    // 2nd arg if available should be "release", if not release or not present, then set to "debug"
    let profile = match env::args().nth(2).unwrap_or_else(|| "debug".to_string()) {
        ref s if s == "release" => Profile::Release,
        _ => Profile::Debug,
    };

    let config = DistConfig {
        target: Target::Wasi,
        profile,
        dist_dir: "dist".to_string(),
    };

    if let Err(e) = try_main(&task, &config).await {
        eprintln!("{}", e);
        std::process::exit(-1);
    }
}
