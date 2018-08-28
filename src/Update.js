import * as R from "ramda";
import cuid from "cuid";

const MSGS = {
    SHOW_FORM: "SHOW_FORM",
    CHANGED_QUESTION_INPUT: "CHANGED_QUESTION_INPUT",
    CHANGED_ANSWER_INPUT: "CHANGED_ANSWER_INPUT",
    SAVE_CARD: "SAVE_CARD"
};

export function showFormMsg(showForm, editId) {
    if (showForm) {
        editId = editId || cuid();
    } else {
        editId = null;
    }
    return {
        type: MSGS.SHOW_FORM,
        showForm,
        editId
    };
}

export function changedQuestionInputMsg(value) {
    return {
        type: MSGS.CHANGED_QUESTION_INPUT,
        questionInput: value
    };
}

export function changedAnswerInputMsg(value) {
    return {
        type: MSGS.CHANGED_ANSWER_INPUT,
        answerInput: value
    };
}

export function saveCardMsg() {
    return {
        type: MSGS.SAVE_CARD
    };
}

function update(msg, model) {
    console.log("update msg:", msg);
    switch (msg.type) {
        case MSGS.SHOW_FORM: {
            return {
                ...model,
                showForm: msg.showForm,
                editId: msg.editId
            };
        }
        case MSGS.CHANGED_QUESTION_INPUT: {
            return {
                ...model,
                questionInput: msg.questionInput
            };
        }
        case MSGS.CHANGED_ANSWER_INPUT: {
            return {
                ...model,
                answerInput: msg.answerInput
            };
        }
        case MSGS.SAVE_CARD: {
            const card = {
                question: model.questionInput,
                answer: model.answerInput,
                id: model.editId
            };

            const cards = [...model.cards, card];

            return {
                ...model,
                cards,
                questionInput: "",
                answerInput: "",
                editId: null,
                showForm: false
            };
        }
        default:
            console.log("bad message");
            return model;
    }
}

export default update;
