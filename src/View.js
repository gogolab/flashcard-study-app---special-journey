import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import {
    showFormMsg,
    changedAnswerInputMsg,
    changedQuestionInputMsg
} from "./Update";

const { pre, div, h1, button, label, input, form } = hh(h);

function cardForm(dispatch, model) {
    if (model.showForm) {
        return form({}, [
            fieldSet("Question", model.questionInput, e =>
                dispatch(changedQuestionInputMsg(e.target.value))
            ),
            fieldSet("Answer", model.answerInput, e =>
                dispatch(changedAnswerInputMsg(e.target.value))
            ),
            buttonSet(dispatch)
        ]);
    } else {
        return button(
            { className: "", onclick: () => dispatch(showFormMsg(true)) },
            "New card"
        );
    }
}

function fieldSet(labelText, inputValue, oninput) {
    return div({ className: "" }, [
        label({}, labelText),
        input({ type: "text", value: inputValue, oninput })
    ]);
}

function buttonSet(dispatch) {
    return div({}, [
        button({}, "Save"),
        button({ onclick: () => dispatch(showFormMsg(false)) }, "Cancel")
    ]);
}

function view(dispatch, model) {
    return div({ className: "mw8 center" }, [
        h1({ className: "f2 pv2 bb" }, "Flashcard Study"),
        cardForm(dispatch, model),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;
