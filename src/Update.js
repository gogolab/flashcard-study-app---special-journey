import * as R from "ramda";

const MSGS = {
    SHOW_FORM: "SHOW_FORM",
    CHANGED_QUESTION_INPUT: "CHANGED_QUESTION_INPUT",
    CHANGED_ANSWER_INPUT: "CHANGED_ANSWER_INPUT"
};

export function showFormMsg(bool) {
    return {
        type: MSGS.SHOW_FORM,
        showForm: bool
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

function update(msg, model) {
    console.log("update msg:", msg);
    switch (msg.type) {
        case MSGS.SHOW_FORM: {
            return {
                ...model,
                showForm: msg.showForm
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
        default:
            console.log("bad message");
            return model;
    }
}

export default update;
