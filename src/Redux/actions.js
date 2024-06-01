import { GET_DATA_FAILURE, GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_SELECTED_METHOD, GET_SELECTED_SCHOOL, GET_TIMING_CALCULATION_METHODS, GET_USER_LOCATION, SET_SELECTED_METHOD, SET_SELECTED_SCHOOL, SET_VISITED } from "./actionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'
import axios from "axios";
export function getUserLocation() {
  return async (dispatch, getState) => {
    let location = JSON.parse(await AsyncStorage.getItem("location"))
    if (location) {
      dispatch({ type: GET_USER_LOCATION, payload: { location: location } })
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.log("Permission Denied...");
        return
      }
      location = await Location.getCurrentPositionAsync();
      await AsyncStorage.setItem("location", JSON.stringify(location.coords))
      dispatch({ type: GET_USER_LOCATION, payload: { location: location.coords } })
    }
  }

}
export function getPrayerTimes({selectedMethod,selectedSchool}) {
console.log("{method,school}",selectedMethod,selectedSchool);
  return async (dispatch, getState) => {
    try {
      if (getState().location) {
        const options = {
          method: 'GET',
          url: 'http://api.aladhan.com/v1/timings/:date',
          params: {
            latitude: getState().location.latitude,
            longitude: getState().location.longitude,
            method: selectedMethod,
            school: selectedSchool
          }
        };
        const response = await axios.request(options)
        dispatch({ type: GET_DATA_SUCCESS, payload: { response: response.data.data } })
        console.log("State Changed:", getState());
      }
    }
    catch (error) {
      dispatch({ type: GET_DATA_FAILURE, payload: { error: error } })
    }
  }
}

export function getTimingCalculationMethod(){
return async(dispatch, getState)=>{
  let methods = JSON.parse(await AsyncStorage.getItem("methods"))
  if (methods) {
    dispatch({ type: GET_TIMING_CALCULATION_METHODS, payload: { methods: methods } })
  }
  else{
    try{
      const options = {
        method: 'GET',
        url: 'http://api.aladhan.com/v1/methods',
      };
      const response = await axios.request(options)
      await AsyncStorage.setItem("methods", JSON.stringify(response.data.data))
      dispatch({ type: GET_TIMING_CALCULATION_METHODS, payload: { methods: response.data.data } })
    }
    catch (error) {
      dispatch({ type: GET_DATA_FAILURE, payload: { error: error } })
    }
  }
  }
}

export function setSelectedMethod(method){
  return async (dispatch,getState)=>{
    let selectedMethod = JSON.parse(await AsyncStorage.getItem("selectedMethod"))
    if (selectedMethod==method) {
      dispatch({ type: SET_SELECTED_METHOD, payload: { selectedMethod: selectedMethod } })
    } else {
      await AsyncStorage.setItem("selectedMethod", JSON.stringify(method))
      dispatch({ type: SET_SELECTED_METHOD, payload: { selectedMethod: method} })
    }
    // console.log("getState",getState().selectedMethod);
  }
  }
  export function setSelectedSchool(school){
    return async (dispatch,getState)=>{
      let selectedSchool= JSON.parse(await AsyncStorage.getItem("selectedSchool"))
      if (selectedSchool==school) {
        dispatch({ type: SET_SELECTED_SCHOOL, payload: { selectedSchool: selectedSchool } })
      } else {
        await AsyncStorage.setItem("selectedSchool", JSON.stringify(school))
        dispatch({ type: SET_SELECTED_SCHOOL, payload: { selectedSchool: school} })
      }
      // console.log("getState",getState().selectedMethod);
    }
    }

export function getSelectedMethod(){
  return async (dispatch,getState)=>{
    let selectedMethod = JSON.parse(await AsyncStorage.getItem("selectedMethod"))
      dispatch({ type: GET_SELECTED_METHOD, payload: { selectedMethod: selectedMethod } })
      // console.log("getState",getState().selectedMethod);
      // selectedSchool

    } 
  }

  export function getSelectedSchool(){
    return async (dispatch,getState)=>{
      let selectedSchool = JSON.parse(await AsyncStorage.getItem("selectedSchool"))
        dispatch({ type: GET_SELECTED_SCHOOL, payload: { selectedSchool: selectedSchool } })
        // console.log("getState",getState().selectedMethod);
      } 
    }
  

export function setVisited(state){
  return{
    type:SET_VISITED,
    payload:{
      state
    }
  }
}