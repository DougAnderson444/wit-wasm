Refs:
https://github.com/bytecodealliance/wit-bindgen/tree/main

https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md

## Build

#### Short way:

```bash
cargo xtask dist
```

The xtask will build the component, adpat it to preview2, and copy it to the `dist` folder.

#### Long way:

```bash
cargo build --target wasm32-wasi
# if no wasi functionality is needed, you can alternatively do:
cargo build --target wasm32-unknown-unknown

wasm-tools component new ./target/wasm32-wasi/debug/wit_wasm.wasm --adapt wasi_snapshot_preview1=./wasi_preview1_component_adapter.wasm -o dist/smoke.wasm

```

## Example Usage

To see the component used in action, run the example binary:

```bash
cargo run --example smoke
```
