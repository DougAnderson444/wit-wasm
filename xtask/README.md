# xTask Build

Ref: [xtask](https://github.com/matklad/cargo-xtask/blob/master/examples/hello-world/xtask/src/main.rs) paradigm.

Run `cargo xtask dist` to build the binary and saves it in our output directory for us. Our xtask does 3 basic moves for us:

1. `cargo build --release --target wasm32-wasi` to build the wasm binary of our component written in Rust.

2. Next, uses `wit_component::ComponentEncoder` to generate a wasm _component_ from the wasm _module_ in Step 1:

```rs
let wasm = ComponentEncoder::default()
        .module(&module)?
        .validate(true)
        .adapter("wasi_snapshot_preview1", &wasi_adapter)?
        .encode()?;
```

3. Uses `transpile` to generate the JS bindings for the wasm _component_ in Step 2, see details below if you dare...

## Transpile Build of `js_component_bindgen.component.wasm`

There is a lot in Step #3 above. This xtask uses the WebAssembly Component `js_component_bindgen.component.wasm` to build JS WebAssembly Component bindings!

### Overview

To get this wasm _Component_ of `js_component_bindgen.component.wasm`, we take the Wasm _Module_ of `js_component_bindgen_component.wasm` from the [`jco`](https://github.com/bytecodealliance/jco) build and run it thrugh `wasm-tools component new` with the preview2 adapter, steps as follows:

### Steps

1. Clone the [`jco`](https://github.com/bytecodealliance/jco) repo. Run `yarn install` and run all the builds in the `package.json` script section. This gets you a wasm _Module_ `js_component_bindgen_component.wasm`, but we need a wasm _Component_, not a wasm module!

2. Take the _Module_ and create a component using the[ `adapter`](https://github.com/bytecodealliance/wasmtime/tree/main/crates/wasi-preview1-component-adapter) from `wastime`:

`wasm-tools component new ./target/wasm32-wasi/debug/my-project.wasm -o my-component.wasm --adapt wasi_snapshot_preview1=./wasi_preview1_component_adapter.command.wasm`

This gives us a Component!

3. In order to use the Component, we also need a copy of the [`wit` file](https://github.com/bytecodealliance/jco/blob/main/crates/js-component-bindgen-component/wit/js-component-bindgen.wit), which we can find from the [repo](https://github.com/bytecodealliance/jco/blob/main/crates/js-component-bindgen-component/wit/js-component-bindgen.wit), and copy it to the `xtask/wit` directory.

4. Now that we have both a copy of thw `wit` file and the wasm Component, we can use both in our `xtask/src/codegen.rs` module to generate the JS bindings for the wasm Component.

```rs
// use the wit file:
wasmtime::component::bindgen!({
    path: "wit",
    world: "js-component-bindgen",
    async: true,
});

// ...

pub async fn transpile(...) {
    // use the wasm Component:
    match reactor.call_generate(&mut store, wasm, options).await? {
        // ... save to disk
    }
}
```

(`Wit-bindgen` also prepends `call_` before the functions identified in the wit file.)

5. Now we can run `cargo xtask dist` to build the binary and generate the JS bindings for the wasm Component! Look in our output directory `dist/js_bindings` for the generated JS bindings.

### Versions

The versions used in the component model are important, and [occasionally change](https://github.com/bytecodealliance/wasm-tools/pull/1027). The following versions are used in this project:

-   `wasm component model binary format` version [`0xd`](https://github.com/bytecodealliance/wasm-tools/blob/a87a1393b76fd5c651052ea4674b5f5739e71736/crates/wasmparser/src/parser.rs#L26)
-   `jco` version `0.8.0` (compatible with `0xd`)
-   `wit-component` version `0.11.0` (compatible with `0xd`)
