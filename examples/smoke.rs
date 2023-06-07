use anyhow::Result;
use wasmtime::component::{Component, Linker};
use wasmtime::{Config, Engine, Store};

wasmtime::component::bindgen!("smoke" in "wit");

#[derive(Default)]
pub struct MyImports {
    hit: bool,
}
//   test::smoke::imports::Host
impl test::smoke::imports::Host for MyImports {
    fn thunk(&mut self) -> Result<()> {
        self.hit = true;
        println!("in the host");
        Ok(())
    }
}

fn main() -> wasmtime::Result<()> {
    let mut config = Config::new();
    config.cache_config_load_default()?;
    config.wasm_backtrace_details(wasmtime::WasmBacktraceDetails::Enable);
    config.wasm_component_model(true);
    let engine = Engine::new(&config)?;

    let file_path = std::env::current_dir().unwrap().join("smoke.wasm");
    eprintln!("file_path: {:?}", file_path);
    let component = Component::from_file(&engine, "smoke.wasm")?;
    let mut linker = Linker::new(&engine);

    Smoke::add_to_linker(&mut linker, |x: &mut MyImports| x)?;

    let mut store = &mut Store::new(&engine, MyImports { hit: false });

    let (exports, _) = Smoke::instantiate(&mut store, &component, &linker)?;
    exports.call_think(&mut *store)?;

    assert!(store.data().hit);

    Ok(())
}
