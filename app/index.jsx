import {ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
   <SafeAreaView>
      <ScrollView contentContainerStyle={{height: '100%'}}>
          <View style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: "0 4px"
          }}>
            <Text>
              This is index page
            </Text>
          </View>
      </ScrollView>
   </SafeAreaView>
      
    </View>
  );
}
