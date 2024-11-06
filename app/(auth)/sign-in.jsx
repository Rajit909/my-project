import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // console.log(form);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Please fill all fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const res = await getCurrentUser();
      setUser(res);
      setIsLogged(true);
      router.replace("/home");
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
              Log in
            </Text>

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
              placeholder={"Enter your password"}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Sign in"
              handlePress={submit}
              containerStyle="mt-7"
              isLoading={isSubmitting}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-gray-100 text-lg font-pregular">
                Don't have an account?{" "}
              </Text>
              <Link
                href={"/sign-up"}
                className="text-yellow-500 text-lg font-pregular"
                style={{ color: "yellow" }}
              >
                Sign up
              </Link>

              <TouchableOpacity
        onPress={signOut}
        >
        <Text>Logout</Text>
    </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
