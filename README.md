## Build

```bash
$ cargo xtask dist

# For release mode (smaller binary):
$ cargo xtask dist release

# 1. runs `cargo build --target wasm32-wasi`
# 2. adapts wasm module to Component model using `wasi_snapshot_preview1`
# 3. copies Component to dist folder for use
```

The xtask will build the component, adapt it to preview2, and copy it to the `dist` folder for useby the host.

## Use in Rust

To see the component used in action, run the example binary:

```bash
$ cargo run --example smoke
```

## Use in Javascript

`npm install @bytecodealliance/jco`

Blocker: jco needs to be updated to version `0xd`, see [#85](https://github.com/bytecodealliance/jco/issues/85)

jco relies on older verisons, namely:

-   `wit-component` CURRENT_VERSION: u8 = 0x02;
-   `wasmparser` WASM_COMPONENT_VERSION: u16 = 0xc;

### Refs:

Main inspiration for this example:
[https://github.com/bytecodealliance/wasmtime/blob/afd9aced3b91ae4eab7c72e0ed4cc241ef93dc89/crates/test-programs/tests/reactor.rs](https://github.com/bytecodealliance/wasmtime/blob/afd9aced3b91ae4eab7c72e0ed4cc241ef93dc89/crates/test-programs/tests/reactor.rs)

[https://github.com/bytecodealliance/wit-bindgen/tree/main](https://github.com/bytecodealliance/wit-bindgen/tree/main)

Wit syntax:
[https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md)

Smoke Wit:
[https://github.com/bytecodealliance/wit-bindgen/blob/e69cf5db8754f829637e25491c560ec0d9728852/tests/runtime/smoke/world.wit](https://github.com/bytecodealliance/wit-bindgen/blob/e69cf5db8754f829637e25491c560ec0d9728852/tests/runtime/smoke/world.wit)

WIT and Component Model
[https://docs.rs/wasmtime/latest/wasmtime/component/macro.bindgen.html](https://docs.rs/wasmtime/latest/wasmtime/component/macro.bindgen.html)
