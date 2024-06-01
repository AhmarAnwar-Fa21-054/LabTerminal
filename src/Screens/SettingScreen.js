import { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../Redux/actions'
import store from "../Redux/store";
export default function Settings() {
    let [anArrayOfMethods, setAnArrayOfMethods] = useState([])
    let [selectMethodKey, setSelectMethodKey] = useState()
    let methods = useSelector(currentState => currentState.methods)
    let selectedMethod = useSelector(currentState => currentState.selectedMethod)
    let selectedSchool = useSelector(currentState => currentState.selectedSchool)
    let dispatch = useDispatch()
    useEffect(() => {
        let anArrayOfMethods = []
        for (key in methods) {
            if (methods[key]["id"] != 99) {
                anArrayOfMethods.push({ name: methods[key]["name"], place: key, key: methods[key]["id"], backgroundColor: "#fff" })
            }
        }
        dispatch(actions.setVisited(true))
        setAnArrayOfMethods(anArrayOfMethods)
        setSelectMethodKey(selectedMethod)  
    }, [])
    useEffect(() => {
        if (anArrayOfMethods.length != 0) {
            async function selectMethodHandler() {
                // console.log("selectMethodKey", selectMethodKey);
                setAnArrayOfMethods(anArrayOfMethods.map((item) => {
                    if (item.key == (selectMethodKey||store.getState().data.meta.method.id)) {

                        return { ...item, backgroundColor: "#6FDCE3" }
                    }
                    else {
                        return { ...item, backgroundColor: "#fff" }
                    }
                }))
                await dispatch(actions.setSelectedMethod(selectMethodKey))
               
            }
            selectMethodHandler()
        }

    }, [selectMethodKey])
    return (
        <View style={styles.container}>
            <SchoolsButton school={selectedSchool} />
            <FlatList showsVerticalScrollIndicator={false} data={anArrayOfMethods} renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={{ height: 50, width: 350, margin: 10, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}
                        onPress={() => {
                            setSelectMethodKey(item.key)
                        }}>
                        <View style={{ height: 40, width: 85, justifyContent: "center", alignItems: "center", backgroundColor: item.backgroundColor, borderRadius: 20, elevation: 5 }}><Text style={{ fontSize: 11, fontWeight: "700" }}>{item.place}</Text></View>
                        <View style={{ paddingStart: 10, height: 40, width: 250, justifyContent: "center", borderColor: "black", borderWidth: 0, backgroundColor: item.backgroundColor, borderRadius: 20, elevation: 5 }}><Text style={{ fontSize: 11, fontWeight: "600" }}>{item.name}</Text></View>
                    </TouchableOpacity>
                )
            }} />
        </View>

    )
}
function SchoolsButton({school}) {
    let dispatch = useDispatch()
    let [selectedSchool, setSelectedSchool] = useState(school)
    async function setSelectedSchoolHandler(school){
       await dispatch(actions.setSelectedSchool(school))
        setSelectedSchool(school)
    }
    if (selectedSchool == 0) {
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }} >
                <TouchableOpacity style={{ height: 60, width: 150, backgroundColor: "#6FDCE3", borderRadius: 20, elevation: 5, margin: 5, justifyContent: "center", alignItems: "center" }}
                    onPress={() => {
                      
                        setSelectedSchoolHandler(0)
                    }}
                >
                    <Text style={{ fontSize: 11, fontWeight: "700" }}>Shafi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 60, width: 150, justifyContent: "center", alignItems: "center", margin: 5 }}
                    onPress={() => {
                        setSelectedSchoolHandler(1)
                    }}>
                    <Text style={{ fontSize: 11, fontWeight: "700" }}>Hanafi</Text>
                </TouchableOpacity>
            </View>)
    }
    else {
        return (<View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >
            <TouchableOpacity style={{ height: 60, width: 150, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", margin: 5 }}
                onPress={() => {
                    setSelectedSchoolHandler(0)
                }}
            >
                <Text style={{ fontSize: 11, fontWeight: "700" }}>Shafi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 60, width: 150, backgroundColor: "#6FDCE3", borderRadius: 20, elevation: 5, margin: 5, justifyContent: "center", alignItems: "center" }}
                onPress={() => {
                    setSelectedSchoolHandler(1)
                }}>
                <Text style={{ fontSize: 11, fontWeight: "700" }}>Hanafi</Text>
            </TouchableOpacity>
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});