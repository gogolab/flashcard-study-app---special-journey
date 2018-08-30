import * as R from "ramda";
import cuid from "cuid";

const MSGS = {
    SHOW_FORM: "SHOW_FORM",
    CHANGE_QUESTION_INPUT: "CHANGE_QUESTION_INPUT",
    CHANGE_ANSWER_INPUT: "CHANGE_ANSWER_INPUT",
    SAVE_CARD: "SAVE_CARD",
    DELETE_CARD: "DELETE_CARD",
    EDIT_CARD: "EDIT_CARD",
    SHOW_ANSWER: "SHOW_ANSWER",
    EVALUATE_CARD: "EVALUATE_CARD"
};

export function evaluateCardMsg(value) {
    return {
        type: MSGS.EVALUATE_CARD,
        weight: value
    };
}

export function showAnswerMsg(id) {
    return {
        type: MSGS.SHOW_ANSWER,
        id
    };
}

export function showFormMsg(showForm) {
    return {
        type: MSGS.SHOW_FORM,
        showForm
    };
}

export function changedQuestionInputMsg(value) {
    return {
        type: MSGS.CHANGE_QUESTION_INPUT,
        questionInput: value
    };
}

export function changedAnswerInputMsg(value) {
    return {
        type: MSGS.CHANGE_ANSWER_INPUT,
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

function edit(model) {
    const cards = [...model.cards].map(card => {
        if (card.id === model.editId) {
            return {
                ...card,
                question: model.questionInput,
                answer: model.answerInput
            };
        } else {
            return card;
        }
    });

    return {
        ...model,
        cards,
        questionInput: "",
        answerInput: "",
        editId: null
    };
}

function add(model) {
    const card = {
        question: model.questionInput,
        answer: model.answerInput,
        id: model.editId || cuid(),
        weight: 0
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

function showForm(model, msg) {
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

function changeQuestionInput(model, msg) {
    return {
        ...model,
        questionInput: msg.questionInput
    };
}

function changeAnswerInput(model, msg) {
    return {
        ...model,
        answerInput: msg.answerInput
    };
}

function deleteCard(model, msg) {
    const cards = model.cards.filter(card => card.id !== msg.id);
    return {
        ...model,
        cards
    };
}

function editCard(model, msg) {
    const card = model.cards.find(card => card.id === msg.id);

    return {
        ...model,
        editId: card.id,
        showForm: false,
        questionInput: card.question,
        answerInput: card.answer
    };
}

function showAnswer(model, msg) {
    return {
        ...model,
        showAnswerId: msg.id
    };
}

function evaluateCard(model, msg) {
    const cards = [...model.cards].map(card => {
        if (card.id === model.showAnswerId) {
            const weight = msg.weight ? card.weight + msg.weight : 0;
            return {
                ...card,
                weight
            };
        } else {
            return card;
        }
    });
    return {
        ...model,
        cards,
        showAnswerId: null
    };
}

function update(msg, model) {
    // console.log("update msg:", msg);
    switch (msg.type) {
        case MSGS.SHOW_FORM:
            return showForm(model, msg);
        case MSGS.CHANGE_QUESTION_INPUT:
            return changeQuestionInput(model, msg);
        case MSGS.CHANGE_ANSWER_INPUT:
            return changeAnswerInput(model, msg);
        case MSGS.SAVE_CARD: {
            const updatedModel = model.editId ? edit(model) : add(model);
            return updatedModel;
        }
        case MSGS.DELETE_CARD:
            return deleteCard(model, msg);
        case MSGS.EDIT_CARD:
            return editCard(model, msg);
        case MSGS.SHOW_ANSWER:
            return showAnswer(model, msg);
        case MSGS.EVALUATE_CARD:
            return evaluateCard(model, msg);
        default:
            console.log("bad message");
            return model;
    }
}

export default update;
