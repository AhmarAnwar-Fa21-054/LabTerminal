import { GET_DATA_FAILURE, GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_SELECTED_METHOD, GET_SELECTED_SCHOOL, GET_TIMING_CALCULATION_METHODS, GET_USER_LOCATION, SET_SELECTED_METHOD, SET_SELECTED_SCHOOL, SET_VISITED } from "./actionTypes";

let initialState = {
    location: null,
    loading: false,
    data: null,
    methods:null,
    selectedMethod:null,
    selectedSchool:0,
    error: null,
    visited:false
}

function reducer(currentState = initialState, action) {
    switch (action.type) {
        case GET_USER_LOCATION:
            return { ...currentState, location: action.payload.location }
        case GET_DATA_SUCCESS:
            return {...currentState,data:action.payload.response}
        case GET_TIMING_CALCULATION_METHODS:
            return {...currentState,methods:action.payload.methods}
        case GET_DATA_FAILURE:
            return {...currentState,error:action.payload.error}
        case SET_SELECTED_METHOD:
            return {...currentState,selectedMethod:action.payload.selectedMethod}
        case GET_SELECTED_METHOD:
            return {...currentState,selectedMethod:action.payload.selectedMethod}
        case SET_SELECTED_SCHOOL:
            return {...currentState,selectedSchool:action.payload.selectedSchool}
        case GET_SELECTED_SCHOOL:
            return {...currentState,selectedSchool:action.payload.selectedSchool || 0}
        case SET_VISITED:
            return {...currentState,visited:action.payload.state}
        
        default:
            return currentState
    }
}
export default reducer