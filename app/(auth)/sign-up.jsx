import { View, Text, ScrollView, Dimensions, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const {setUser, setIsLogged} = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // console.log(form);

  const submit = async () => {
    if (form.username || form.email === "" || form.password === "") {
      Alert.alert("Please fill all fields");
    }

    setIsSubmitting(true);

    try {
      const res = await createUser(form.email, form.password, form.username);
      setUser(res);
      setIsLogged(true);
      Alert.alert("Success", "Account created successfully");
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-blue-800 h-full" edges={['top']}>
        <ScrollView>
          <View
            className="w-full flex justify-center min-h-[85vh] items-center px-4 py-6"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            <Image
              source={images.logo}
              className="w-[130px] h-[34px]"
              resizeMode="contain"
            />

            <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
              Sign Up
            </Text>

            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-7"
              placeholder={"Create a username"}
              keyboardType="username"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              placeholder={"Enter your email"}
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              placeholder={"Create your password"}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyle="mt-7"
              isLoading={isSubmitting}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-gray-100 text-lg font-pregular">
                Already have an account?{" "}
              </Text>
              <Link
                href={"/sign-in"}
                className="text-yellow-500 text-lg font-pregular"
                style={{ color: "yellow" }}
              >
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
