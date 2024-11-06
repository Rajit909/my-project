import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../components/SearchInput";
import Trending from "../components/Trending";
import EmptyState from "../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestposts } = useAppwrite(getLatestPosts);

  const [playingVideoId, setPlayingVideoId] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // recall and refresh data
    await refetch();
    setRefreshing(false);
  };

  // console.log("Latest post", latestposts);

  return (
    <>
      {/* <SafeAreaProvider> */}
      <SafeAreaView className=" h-full bg-primary">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
              <VideoCard
                title={item.title}
                thumbnail={item.thumbnail}
                video={item.video}
                creator={item.creator.username}
                avatar={item.creator.avatar}
                isPlaying={playingVideoId === item.$id}
                onPlay={() => setPlayingVideoId(item.$id)}
                onStop={() => setPlayingVideoId(null)}
              />
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-x-6">
              <View className="flex justify-between items-center flex-row mb-6 gap-5">
                <View>
                  <Text className="text-sm font-pmedium">Hello</Text>
                  <Text className="text-sm font-psemibold text-white">
                    Welcome Back
                  </Text>
                </View>
                <View>
                  <Image
                    source={images.logoSmall}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <SearchInput />

              <View
                className="w-full flex-1 pt-5
                "
              >
                <Text className="text-gray-100 text-lg font-pregule mb-3">
                  Latest Videos
                </Text>

                <Trending posts={latestposts ?? []} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex justify-center items-center h-full">
              <EmptyState
                title={"No Videos Found!"}
                subtitle={"Be the first one to upload a video"}
              />
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
      {/* </SafeAreaProvider> */}
    </>
  );
};

export default Home;
