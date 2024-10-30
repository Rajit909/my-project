import {  Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
// import "../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  });

  useEffect(()=> {
      if(error) throw new Error(error)
      if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if(!fontsLoaded && !error) return null;

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: true
        }}/>
        <Stack.Screen name="tabs" options={{
          headerShown: true
        }}/>
      </Stack>
    </>
  )
}

export default RootLayout
