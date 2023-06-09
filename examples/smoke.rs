use anyhow::Result;

use wasmtime::component::{Component, Linker};
use wasmtime::{Config, Engine, Store};
use wasmtime_wasi::preview2::{self, Table, WasiCtx, WasiCtxBuilder, WasiView};

wasmtime::component::bindgen!({
    path: "wit",
    world: "smoke",
    async: true,
    with: {
       "wasi:io/streams": preview2::wasi::io::streams,
       "wasi:filesystem/filesystem": preview2::wasi::filesystem::filesystem,
       "wasi:cli-base/environment": preview2::wasi::cli_base::environment,
       "wasi:cli-base/preopens": preview2::wasi::cli_base::preopens,
       "wasi:cli-base/exit": preview2::wasi::cli_base::exit,
       "wasi:cli-base/stdin": preview2::wasi::cli_base::stdin,
       "wasi:cli-base/stdout": preview2::wasi::cli_base::stdout,
       "wasi:cli-base/stderr": preview2::wasi::cli_base::stderr,
    },
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

pub struct MyImports {
    hit: bool,
    table: Table,
    wasi: WasiCtx,
}

impl WasiView for MyImports {
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

#[async_trait::async_trait]
impl mypackage::smoke::imports::Host for MyImports {
    async fn thunk(&mut self, msg: String) -> Result<String> {
        self.hit = true;
        println!("in the host");
        let new_msg = format!("{} ({})", msg, "from the host");
        Ok(new_msg)
    }
}

async fn instantiate(
    component: Component,
    wasi_ctx: MyImports,
) -> Result<(Store<MyImports>, Smoke)> {
    let mut linker = Linker::new(&ENGINE);

    // All of the imports available to the world are provided by the wasi-common crate:
    preview2::wasi::filesystem::filesystem::add_to_linker(&mut linker, |x| x)?;
    preview2::wasi::io::streams::add_to_linker(&mut linker, |x| x)?;
    preview2::wasi::cli_base::environment::add_to_linker(&mut linker, |x| x)?;
    preview2::wasi::cli_base::preopens::add_to_linker(&mut linker, |x| x)?;
    preview2::wasi::cli_base::exit::add_to_linker(&mut linker, |x| x)?;
    preview2::wasi::cli_base::stdin::add_to_linker(&mut linker, |x| x)?;
    preview2::wasi::cli_base::stdout::add_to_linker(&mut linker, |x| x)?;
    preview2::wasi::cli_base::stderr::add_to_linker(&mut linker, |x| x)?;

    Smoke::add_to_linker(&mut linker, |x| x)?;

    let mut store = Store::new(&ENGINE, wasi_ctx);

    let (testreactor, _instance) =
        Smoke::instantiate_async(&mut store, &component, &linker).await?;
    Ok((store, testreactor))
}

#[tokio::main(flavor = "current_thread")]
async fn main() -> wasmtime::Result<()> {
    eprintln!("file_path");
    let component = Component::from_file(&ENGINE, "dist/wit_wasm.wasm")?;

    let mut table = Table::new();
    let wasi = WasiCtxBuilder::new()
        .set_args(&["gussie", "sparky", "willa"])
        .build(&mut table)?;

    let (mut store, command) = instantiate(
        component,
        MyImports {
            hit: false,
            table,
            wasi,
        },
    )
    .await?;

    let out = command.call_think(&mut store, "original message").await?;

    println!("{out}");

    assert!(store.data().hit);

    Ok(())
}
