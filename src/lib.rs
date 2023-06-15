wit_bindgen::generate!("smoke" in "wit");

struct Exports;

impl Smoke for Exports {
    fn think(msg: String) -> String {
        // make a random umber
        let mut rand_num = [0u8; 1];
        getrandom::getrandom(&mut rand_num).unwrap();

        let new_msg = format!("{} [{} {:?}]", msg, "in the guest", rand_num);
        mypackage::smoke::imports::thunk(&new_msg)
    }
}

// the trait bound `Exports: exports::mypackage::smoke::demo::Demo` is not satisfied
// the trait `exports::mypackage::smoke::demo::Demo` is not implemented for `Exports`
impl exports::mypackage::smoke::demo::Demo for Exports {
    fn thank(who: String) -> String {
        format!("thank {}", who)
    }
}

impl exports::direct::Direct for Exports {
    fn pank() {
        mypackage::smoke::imports::prnt("using prnt from rust in pank");
    }
}

export_smoke!(Exports);
