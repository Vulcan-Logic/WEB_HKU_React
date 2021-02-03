import { actionTypes } from "react-redux-form";

export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};

export const Feedback = (state={fback:null}, action) => {
    console.log(state);
    if (action.type === actionTypes.ADD_FEEDBACK) return {...state,fback:action.payload}
    else return {...state,fback:null}
}

