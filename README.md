Refs:
https://github.com/bytecodealliance/wit-bindgen/tree/main

https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md

## Build

```bash
cargo build --target wasm32-wasi

wasm-tools component new ./target/wasm32-wasi/debug/wit_wasm.wasm -o smoke.wasm --adapt ./wasi_snapshot_preview1.wasm
```

## Example Usage

To run the example binary, use:

```bash
cargo run --example smoke
```
