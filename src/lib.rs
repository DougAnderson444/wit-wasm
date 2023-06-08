wit_bindgen::generate!("smoke" in "wit");
struct Exports;

impl Smoke for Exports {
    fn think(msg: String) -> String {
        let new_msg: &str = &format!("{} {}", msg, "from the guest")[..];
        mypackage::smoke::imports::thunk(new_msg)
    }
}

export_smoke!(Exports);
