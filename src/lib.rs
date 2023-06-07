wit_bindgen::generate!("smoke" in "wit");
struct Exports;

export_smoke!(Exports);

impl Smoke for Exports {
    fn think() {
        // test::smoke is the package
        // calling imported fn thunk()
        // available because of the macro generate!
        test::smoke::imports::thunk();
    }
}
