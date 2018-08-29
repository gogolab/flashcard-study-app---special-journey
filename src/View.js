import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import {
    showFormMsg,
    changedAnswerInputMsg,
    changedQuestionInputMsg,
    saveCardMsg,
    deleteCardMsg,
    editCardMsg,
    showAnswerMsg,
    evaluateCardMsg
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

function renderCard(dispatch, model, card) {
    if (model.editId === card.id) {
        return div({ className: "bg-light-yellow mr2" }, [
            div(i({ onclick: () => dispatch(deleteCardMsg(card.id)) }, "x")),
            form({}, [
                fieldSet("Question", model.questionInput, e =>
                    dispatch(changedQuestionInputMsg(e.target.value))
                ),
                fieldSet("Answer", model.answerInput, e =>
                    dispatch(changedAnswerInputMsg(e.target.value))
                ),
                buttonSet(dispatch, model)
            ])
        ]);
    }

    let answer = p(
        { onclick: () => dispatch(showAnswerMsg(card.id)) },
        "Show answer"
    );
    if (model.showAnswerId === card.id) {
        answer = div({}, [
            h6("Answer:"),
            p(card.answer),
            div({}, [
                button({ onclick: () => dispatch(evaluateCardMsg(0)) }, "Bad"),
                button({ onclick: () => dispatch(evaluateCardMsg(1)) }, "Good"),
                button({ onclick: () => dispatch(evaluateCardMsg(2)) }, "Great")
            ])
        ]);
    }

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
        answer
    ]);
}

function renderCards(dispatch, model) {
    return div(
        { className: "flex" },
        [...model.cards].map(card => {
            return renderCard(dispatch, model, card);
        })
    );
}

function view(dispatch, model) {
    return div({ className: "mw8 center" }, [
        h1({ className: "f2 pv2 bb" }, "Flashcard Study"),
        cardForm(dispatch, model),
        renderCards(dispatch, model),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;
