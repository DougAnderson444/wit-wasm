const smokeImports = {
    /**
     * @param {string} msg
     * @returns {string}
     */
    thunk: function thunk(msg) {
        console.log("in the host")
        const new_msg = `${msg} (from the host)`
        return new_msg
    },
    /**
     * @param {string} msg
     * @returns {void}
     */
    prnt: function prnt(msg) {
        console.log(`hanky panky in the host: ${msg}`)
    },
}

export { smokeImports }
