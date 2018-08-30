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

const { pre, div, h1, button, label, input, form, p, h6, i, textarea } = hh(h);

function cardForm(dispatch, model) {
    let formBody;

    if (model.showForm) {
        formBody = form({}, [
            fieldSet("Question", model.questionInput, e =>
                dispatch(changedQuestionInputMsg(e.target.value))
            ),
            fieldSet("Answer", model.answerInput, e =>
                dispatch(changedAnswerInputMsg(e.target.value))
            ),
            buttonSet(dispatch, model)
        ]);
    } else {
        formBody = button(
            {
                className: "",
                onclick: () => dispatch(showFormMsg(true))
            },
            "New card"
        );
    }

    return div({ className: "mb3 mw6-m" }, formBody);
}

function fieldSet(labelText, inputValue, oninput) {
    return div({ className: "flex flex-column mb3" }, [
        label({}, labelText),
        // input({ type: "text", value: inputValue, oninput })
        textarea({ value: inputValue, onchange: oninput })
    ]);
}

function buttonSet(dispatch, model) {
    return div({ className: "ma3" }, [
        button(
            {
                className:
                    "f6 link dim br3 ph3 pv2 mb2 mr2 dib white bg-green bn",
                onclick: () => dispatch(saveCardMsg())
            },
            "Save"
        ),
        button(
            {
                className:
                    "f6 link dim br3 ph3 pv2 mb2 mr2 dib white bg-red bn",
                onclick: () => dispatch(showFormMsg(false))
            },
            "Cancel"
        )
    ]);
}

function renderCard(dispatch, model, card) {
    if (model.editId === card.id) {
        return div(
            { className: "bg-light-yellow mr2 pa3 flex flex-column br2" },
            [
                div(
                    { className: "self-end" },
                    i({
                        className: "fa fa-trash",
                        onclick: () => dispatch(deleteCardMsg(card.id))
                    })
                ),
                form({}, [
                    fieldSet("Question", model.questionInput, e =>
                        dispatch(changedQuestionInputMsg(e.target.value))
                    ),
                    fieldSet("Answer", model.answerInput, e =>
                        dispatch(changedAnswerInputMsg(e.target.value))
                    ),
                    buttonSet(dispatch, model)
                ])
            ]
        );
    }

    let answer = button(
        {
            className:
                "f6 link pointer br-pill ba ph3 pv2 mb2 dib bg-light-green near-black",
            onclick: () => dispatch(showAnswerMsg(card.id))
        },
        "Show answer"
    );
    if (model.showAnswerId === card.id) {
        answer = div({}, [
            h6({ className: "ma0" }, "Answer:"),
            p(
                {
                    className: "mt0 pointer dim",
                    onclick: () => dispatch(editCardMsg(card.id))
                },
                card.answer
            ),
            div({}, [
                button(
                    {
                        className:
                            "f6 link pointer br3 ba ph3 pv2 mb2 dib white bg-dark-red",
                        onclick: () => dispatch(evaluateCardMsg(0))
                    },
                    "Bad"
                ),
                button(
                    {
                        className:
                            "f6 link pointer br3 ba ph3 pv2 mb2 dib white bg-dark-blue",
                        onclick: () => dispatch(evaluateCardMsg(1))
                    },
                    "Good"
                ),
                button(
                    {
                        className:
                            "f6 link pointer br3 ba ph3 pv2 mb2 dib white bg-dark-green",
                        onclick: () => dispatch(evaluateCardMsg(2))
                    },
                    "Great"
                )
            ])
        ]);
    }

    return div(
        {
            className:
                "w-100 w-80-m w-40-l bg-light-yellow mr2 mb2 flex flex-column pa2 br2"
        },
        [
            div(
                { className: "self-end" },
                i({
                    className: "fa fa-trash pointer",
                    onclick: () => dispatch(deleteCardMsg(card.id))
                })
            ),
            div({}, [
                h6({ className: "ma0" }, "Question:"),
                p(
                    {
                        className: "mt1 pointer dim",
                        onclick: () => dispatch(editCardMsg(card.id))
                    },
                    card.question
                )
            ]),
            answer
        ]
    );
}

const sortByWeight = R.sortWith([R.ascend(R.prop("weight"))]);

function renderCards(dispatch, model) {
    const cards = sortByWeight(model.cards);
    console.log("sorted cards:", cards);
    return div(
        { className: "flex flex-wrap" },
        cards.map(card => {
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
