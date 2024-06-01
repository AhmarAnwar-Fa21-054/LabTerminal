import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Reload from "../Svgs/Reload";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export default function ReloadScreen({ navigation }) {
    let location = useSelector(currentState => currentState.location)
    let error = useSelector(currentState=>currentState.error)
    let [msg, setMsg] = useState()
    useEffect(() => {
        if (location == null) {
            setMsg("App Required Location Access to Work")
        }
        else if (error) {
            setMsg(error.message)
            console.log("Hello from ReloadScreen");
        }
    }, [])
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("SplashScreen")
            }}>
                <Reload height={200} width={200} />

            </TouchableOpacity>
            <View style={{ position: "absolute", opacity: 0.9, bottom: 30, height: 50, width: 210, justifyContent: "center", alignItems: "center", backgroundColor: "black", borderRadius: 20 }}>
                <Text style={{ fontSize: 11, color: "#fff" }}>{msg}</Text>
            </View>

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