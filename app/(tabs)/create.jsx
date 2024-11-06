import React, { useState } from "react";
import { router } from "expo-router"
import {ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";




const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thubnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 
        selectType === "image"
          ? ["image/jpg", "image/png"]
          : ["video/mp4", "video/gif"],
    });
   
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thubnail: result.assets[0]});
      }

      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0]});
      }
    }else{
      setTimeout(()=> {
        Alert.alert("Document Picked", JSON.stringify(result, null, 2));
      }, 100)
    }
  };

  const handleSubmit = async () => {
    
  
  
  }





  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold ">
          Upload Video
        </Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={()=> openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode="ResizeMode.COVER"
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-secondary-100 border-dashed flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center rounded-lg">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thunnail Image
          </Text>
          <TouchableOpacity onPress={()=> openPicker("image")}>
            {form.thubnail ? (
              <Image
                source={{ uri: form.thubnail }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border border-dashed border-secondary-100 flex justify-center items-center flex-row space-x-2 py-10">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Prompt"
          value={form.prompt}
          placeholder="What's this video about?"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-10"
        />

        <CustomButton
          title="Submit & Publish"
          containerStyle="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
