import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import {  images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import VideoCard  from "../components/VideoCard";
import { InfoBox } from "../components/InfoBox";
import { EmptyState } from "../components/EmptyState";
import { Text } from "react-native-animatable";
import SearchInput from "../components/SearchInput";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  // console.log("Posts in profile", posts);

  // console.log("User in profile", user);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full text-white">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
          />
        )}

        ListHeaderComponent={
          <View className="p-4">
            <InfoBox title="Profile" />
            <SearchInput />
          </View>
        }

        ListEmptyComponent={
          <EmptyState
            title="No videos found"
            description="You have not uploaded any videos yet."
          />
        }

        ListFooterComponent={
          <View className="p-4">
            <TouchableOpacity onPress={logout}>
              <Text className="text-center text-red-500">Logout</Text>
            </TouchableOpacity>
          </View>
        }
        
      />

   
      
    </SafeAreaView>
  );
};

export default Profile;
