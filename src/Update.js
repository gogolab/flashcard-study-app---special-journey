import * as R from "ramda";
import cuid from "cuid";

const MSGS = {
    SHOW_FORM: "SHOW_FORM",
    CHANGED_QUESTION_INPUT: "CHANGED_QUESTION_INPUT",
    CHANGED_ANSWER_INPUT: "CHANGED_ANSWER_INPUT",
    SAVE_CARD: "SAVE_CARD",
    DELETE_CARD: "DELETE_CARD",
    EDIT_CARD: "EDIT_CARD"
};

export function showFormMsg(showForm) {
    return {
        type: MSGS.SHOW_FORM,
        showForm
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

export function deleteCardMsg(id) {
    return {
        type: MSGS.DELETE_CARD,
        id
    };
}

export function editCardMsg(id) {
    return {
        type: MSGS.EDIT_CARD,
        id
    };
}

function update(msg, model) {
    console.log("update msg:", msg);
    switch (msg.type) {
        case MSGS.SHOW_FORM: {
            if (msg.showForm) {
                return {
                    ...model,
                    showForm: msg.showForm
                };
            }
            return {
                ...model,
                showForm: msg.showForm,
                editId: null,
                questionInput: "",
                answerInput: ""
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
                id: model.editId || cuid()
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
        case MSGS.DELETE_CARD: {
            const cards = model.cards.filter(card => card.id !== msg.id);
            return {
                ...model,
                cards
            };
        }
        case MSGS.EDIT_CARD: {
            const card = model.cards.find(card => card.id === msg.id);

            return {
                ...model,
                editId: card.id,
                showForm: true,
                questionInput: card.question,
                answerInput: card.answer
            };
        }
        default:
            console.log("bad message");
            return model;
    }
}

export default update;
