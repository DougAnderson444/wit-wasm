## Build

```bash
$ cargo xtask dist

# 1. runs `cargo build --target wasm32-wasi`
# 2. adapts wasm module to Component model using `wasi_snapshot_preview1`
# 3. copies Component to dist folder for use
```

The xtask will build the component, adapt it to preview2, and copy it to the `dist` folder for useby the host.

## Use

To see the component used in action, run the example binary:

```bash
$ cargo run --example smoke
```

### Refs:

[https://github.com/bytecodealliance/wit-bindgen/tree/main](https://github.com/bytecodealliance/wit-bindgen/tree/main)

[https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md)
