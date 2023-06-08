wit_bindgen::generate!("smoke" in "wit");
struct Exports;

impl Smoke for Exports {
    fn think() {
        mypackage::smoke::imports::thunk();
    }
}

export_smoke!(Exports);
