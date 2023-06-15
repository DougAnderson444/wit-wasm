use super::{dist_dir, project_root, xtask_root};
use anyhow::Result;
use wasmtime::component::{Component, Linker};
use wasmtime::{Config, Engine, Store};
use wasmtime_wasi::preview2::wasi;
use wasmtime_wasi::preview2::{Table, WasiCtx, WasiCtxBuilder, WasiView};

// Use the js-component-bindgen wasm to generate more wasm... dogfood anyone?
wasmtime::component::bindgen!({
    path: "wit",
    world: "js-component-bindgen",
    async: true,
});

lazy_static::lazy_static! {
    static ref ENGINE: Engine = {
        let mut config = Config::new();
        config.wasm_backtrace_details(wasmtime::WasmBacktraceDetails::Enable);
        config.wasm_component_model(true);
        config.async_support(true);

        Engine::new(&config).unwrap()
    };
}

// There are no imports in the wit file, so no need to pass anything in

pub struct Wassup {
    table: Table,
    wasi: WasiCtx,
}

impl WasiView for Wassup {
    fn table(&self) -> &Table {
        &self.table
    }
    fn table_mut(&mut self) -> &mut Table {
        &mut self.table
    }
    fn ctx(&self) -> &WasiCtx {
        &self.wasi
    }
    fn ctx_mut(&mut self) -> &mut WasiCtx {
        &mut self.wasi
    }
}

pub async fn instantiate(
    component: Component,
    wasi_ctx: Wassup,
) -> Result<(Store<Wassup>, JsComponentBindgen)> {
    let mut linker = Linker::new(&ENGINE);

    // Add WASI to the linker
    wasi::command::add_to_linker(&mut linker)?;

    // JsComponentBindgen::add_to_linker(&mut linker, |x| x)?;

    let mut store = Store::new(&ENGINE, wasi_ctx);

    let (reactor, _instance) =
        JsComponentBindgen::instantiate_async(&mut store, &component, &linker).await?;
    Ok((store, reactor))
}

pub async fn transpile(wasm: &[u8], out_name: String, out_dir: String) -> Result<()> {
    eprintln!("Transpiling... ");

    let component = Component::from_file(
        &ENGINE,
        xtask_root().join("js_component_bindgen.component.wasm"),
    )?;

    eprintln!("Got component...");

    let mut table = Table::new();
    let wasi = WasiCtxBuilder::new().build(&mut table)?;

    let (mut store, reactor) = instantiate(component, Wassup { table, wasi }).await?;

    let options: GenerateOptions = GenerateOptions {
        name: &[&out_name, ".component"].concat(),
        instantiation: None,
        no_typescript: None,
        map: None,
        compat: None,
        no_nodejs_compat: None,
        base64_cutoff: None,
        tla_compat: None,
        valid_lifting_optimization: None,
    };

    eprintln!("Calling generate... ");

    match reactor.call_generate(&mut store, wasm, options).await? {
        Ok(Transpiled {
            files,
            imports: _,
            exports: _,
        }) => {
            for (name, file) in files {
                // make `out_dir/name` directory if it doesn't exist
                std::fs::create_dir_all(
                    dist_dir()
                        .join(out_dir.clone())
                        .join(name.clone())
                        .parent()
                        .unwrap(),
                )?;
                std::fs::write(dist_dir().join(out_dir.clone()).join(name), file)?;
            }
        }
        Err(err) => {
            println!("Error: {}", err);
        }
    }

    Ok(())
}
