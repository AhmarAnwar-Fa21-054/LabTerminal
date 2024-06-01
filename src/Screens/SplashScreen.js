import { View, StyleSheet } from "react-native";
import Splash from "../Svgs/Splash";
import { useIsFocused } from "@react-navigation/native";
import { act, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../Redux/actions'
import store from "../Redux/store";

export default function SplashScreen({ navigation }) {
    let location = useSelector(currentState => currentState.location)
    let data= useSelector(currentState=>currentState.data)
//   let unSubscribe =   store.subscribe(()=>{
//         console.log("State Changed",store.getState());
//     })
    let dispatch = useDispatch()
    let [completed, setCompleted] = useState(false)
    let isFocused = useIsFocused()
    useEffect(() => {
        async function fun() {
            if (isFocused) {
                await dispatch(actions.getUserLocation())
                await dispatch(actions.getSelectedMethod())
                await dispatch(actions.getSelectedSchool())
                console.log({selectedMethod:store.getState().selectedMethod,selectedSchool:store.getState().selectedSchool});
                await dispatch(actions.getPrayerTimes({selectedMethod:store.getState().selectedMethod,selectedSchool:store.getState().selectedSchool})) 
                await dispatch(actions.getTimingCalculationMethod()) 
                await dispatch(actions.setVisited(false))
                setCompleted(true)        
            }
        }
        fun()
    }, [isFocused])
    useEffect(() => {
        if (completed) {
            if (location && data) {
                navigation.navigate("Tab")
            }
            else {
                setCompleted(false)
                navigation.navigate("ReloadScreen")

            }
        }
        // return unSubscribe
    })
    return (
        <View style={styles.container}>
            <Splash height={300} width={200} />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});