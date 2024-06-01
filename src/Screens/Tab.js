import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PrayerTimes from "./PrayerTimes";
import { MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';
import Settings from "./SettingScreen";
export default function Tab() {
  const tab = createBottomTabNavigator()
  return (
    <tab.Navigator>
      <tab.Screen name="Prayer Times" component={PrayerTimes} options={{headerTitleAlign:"center",headerTitleStyle:{fontSize:30},tabBarIcon:({color})=><MaterialCommunityIcons name="timetable" size={24} color={color} />}}></tab.Screen>
      <tab.Screen name="Settings" component={Settings} options={{headerTitleAlign:"center",headerTitleStyle:{fontSize:30},tabBarIcon:({color})=><SimpleLineIcons name="settings" size={24} color={color} />}}></tab.Screen>
    </tab.Navigator>
  )
}