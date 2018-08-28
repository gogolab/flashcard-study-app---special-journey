import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import {
    showFormMsg,
    changedAnswerInputMsg,
    changedQuestionInputMsg,
    saveCardMsg,
    deleteCardMsg,
    editCardMsg
} from "./Update";

const { pre, div, h1, button, label, input, form, p, h6, i } = hh(h);

function cardForm(dispatch, model) {
    if (model.showForm) {
        return form({}, [
            fieldSet("Question", model.questionInput, e =>
                dispatch(changedQuestionInputMsg(e.target.value))
            ),
            fieldSet("Answer", model.answerInput, e =>
                dispatch(changedAnswerInputMsg(e.target.value))
            ),
            buttonSet(dispatch, model)
        ]);
    } else {
        return button(
            {
                className: "",
                onclick: () => dispatch(showFormMsg(true))
            },
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

function buttonSet(dispatch, model) {
    return div({}, [
        button({ onclick: () => dispatch(saveCardMsg()) }, "Save"),
        button({ onclick: () => dispatch(showFormMsg(false)) }, "Cancel")
    ]);
}

function renderCard(dispatch, card) {
    return div({ className: "bg-light-yellow mr2" }, [
        div(i({ onclick: () => dispatch(deleteCardMsg(card.id)) }, "x")),
        div({}, [
            h6("Question:"),
            p(
                {
                    onclick: () => dispatch(editCardMsg(card.id))
                },
                card.question
            )
        ]),
        div({}, [h6("Answer:"), p(card.answer)])
    ]);
}

function renderCards(dispatch, cards) {
    return div(
        { className: "flex" },
        [...cards].map(card => {
            return renderCard(dispatch, card);
        })
    );
}

function view(dispatch, model) {
    return div({ className: "mw8 center" }, [
        h1({ className: "f2 pv2 bb" }, "Flashcard Study"),
        cardForm(dispatch, model),
        renderCards(dispatch, model.cards),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;
