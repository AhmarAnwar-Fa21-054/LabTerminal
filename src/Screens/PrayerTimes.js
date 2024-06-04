import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../Redux/actions'
import store from '../Redux/store';
export default function PrayerTimes() {
    let prayerData = useSelector(currentState => currentState.data)
    let [data, setData] = useState()
    let selectedMethod = useSelector(currentState => currentState.selectedMethod)
    let selectedSchool = useSelector(currentState => currentState.selectedSchool)
    let dispatch = useDispatch()
    let [method, setMethod] = useState()
    let [school, setSchool] = useState()
    let [fiveNamaz, setFiveNamaz] = useState()
    let isFocused = useIsFocused()
    let [intervalId,setIntervalId] = useState()
    // let [startAndEndMarks, setStartAndEndMarks] = useState()
    let [nextNamaz, setNextNamaz] = useState({})
    let [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit",second:"2-digit", hour12: false }))
    useEffect(() => {
        if (data) {
            const fiveNamaz = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
            // const startAndEndMarks = ["Sunrise", "Sunset", "Midnight"]
            setFiveNamaz(fiveNamaz.map((item) => ({ name: item, timing: data.timings[item] })))
            // setStartAndEndMarks(startAndEndMarks.map((item) => ({ name: item, timing: data.timings[item] })))
            // console.log(startAndEndMarks.map((item) => ({ name: item, timing: data.timings[item] })));
        }
    }, [data])

    useEffect(() => {
        if (fiveNamaz) {
            const nextNamazIndex = fiveNamaz.findIndex((item, index) => {
                return currentTime >= item.timing && currentTime < (fiveNamaz[index + 1] != undefined ? fiveNamaz[index + 1].timing : "00:00")
            }) + 1
            setNextNamaz(fiveNamaz[nextNamazIndex])
        }
    }, [currentTime, fiveNamaz])
    useEffect(() => {
        if(isFocused){
         setIntervalId(setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit",second:"2-digit", hour12: false }))
        },1000))
    }
    else{
        return () => clearInterval(intervalId)
    }
    }, [isFocused])
    useEffect(() => {
        if (store.getState().visited) {
            // navigation.navigate("SplashScreen")
            console.log("selectedMethod,selectedSchoolio", selectedMethod, selectedSchool);
            async function fun() {
                await dispatch(actions.getPrayerTimes({ selectedMethod, selectedSchool }))
            }
            fun()
        }
       
    }, [method, school])
    useEffect(() => {
        // await dispatch(actions.getPrayerTimes({selectedMethod,selectedSchool}))
        setData(prayerData)
        // console.log("selectedMethod",selectedMethod);
        setMethod(selectedMethod)
        setSchool(selectedSchool)
    })
    return (
        <View style={styles.container}>
            <View style={{ height: 115, width: 115,borderColor:"black",borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor:"#fff",borderRadius:100,elevation:5,margin:5}}><Text style={{ fontSize: 30, fontWeight: "600" }}>{currentTime}</Text></View>
            <FlatList data={fiveNamaz} renderItem={({ item }) => {

                if (item.name === nextNamaz.name) {
                    if (item.name === "Asr") {
                        return (
                            <View style={{ height: 50, width: 300, backgroundColor: "#6FDCE3", borderRadius: 20, elevation: 5, margin: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingStart: 20 }}>
                                <View style={{ height: 40, width: 50}}><Text style={{ fontSize: 30, fontWeight: "600" }}>{item.name}</Text></View>
                                <View style={{ height: 40, width: 100}}><Text style={{ fontSize: 30, fontWeight: "600" }}>{selectedSchool === 0 ? "(Shafi)" : "(Hanafi)"}</Text></View>
                                <View style={{ height: 40, width: 95 }}><Text style={{ fontSize: 30, fontWeight: "600" }}>{item.timing}</Text></View></View>
                        )
                    }
                    return (<View style={{ height: 50, width: 300, backgroundColor: "#6FDCE3", borderRadius: 20, elevation: 5, margin: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingStart: 20 }}>
                        <View style={{ height: 40, width: 110 }}><Text style={{ fontSize: 30, fontWeight: "600" }}>{item.name}</Text></View>
                        <View style={{ height: 40, width: 95 }}><Text style={{ fontSize: 30, fontWeight: "600" }}>{item.timing}</Text></View></View>)
                }
                if (item.name === "Asr") {
                    return (
                        <View style={{ height: 50, width: 300, backgroundColor: "#fff", borderRadius: 20, elevation: 5, margin: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingStart: 20 }}>
                            <View style={{ height: 40, width: 50 }}><Text style={{ fontSize: 30, fontWeight: "600" }}>{item.name}</Text></View>
                            <View style={{ height: 40, width: 100 }}><Text style={{ fontSize: 30, fontWeight: "600" }}>{selectedSchool === 0 ? "(Shafi)" : "(Hanafi)"}</Text></View>
                            <View style={{ height: 40, width: 95 }}><Text style={{ fontSize: 30, fontWeight: "600" }}>{item.timing}</Text></View></View>
                    )
                }
                return (<View style={{ height: 50, width: 300, backgroundColor: "#fff", borderRadius: 20, elevation: 5, margin: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingStart: 20 }}>
                    <View style={{ height: 40, width: 110 }}><Text style={{ fontSize: 30, fontWeight: "600" }}>{item.name}</Text></View>
                    <View style={{ height: 40, width: 95 }}><Text style={{ fontSize: 30, fontWeight: "600" }}>{item.timing}</Text></View></View>)
            }} keyExtractor={(item, index) => item + "-" + index} />
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