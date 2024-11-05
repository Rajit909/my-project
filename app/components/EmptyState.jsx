import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../../constants'
import CustomButton from '../components/CustomButton'
import '../../global.css'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="flex justify-center items-center px-4">
        <Image
            source={images.empty}
            resizeMode='contain'
            style={{ width: 200, height: 200 }}
            
            />
            <Text className="text-xl font-psemibold text-center text-white mt-2">{title}</Text>
            <Text className="text-sm font-pmedium text-gray-100">{subtitle}</Text>
   
            <CustomButton
            title="Back to Explore"
            handlePress={() => router.push('/home')}
            containerStyles="w-full my-5"
            />
    </View>
  )
}

export default EmptyState