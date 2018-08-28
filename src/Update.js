import * as R from "ramda";

const MSGS = {
    SHOW_FORM: "SHOW_FORM"
};

export function showFormMsg(bool) {
    return {
        type: MSGS.SHOW_FORM,
        showForm: bool
    };
}

function update(msg, model) {
    console.log("update msg:", msg);
    switch (msg.type) {
        case MSGS.SHOW_FORM: {
            return {
                ...model,
                showForm: msg.showForm
            };
        }
        default:
            console.log("bad message");
            return model;
    }
}

export default update;
