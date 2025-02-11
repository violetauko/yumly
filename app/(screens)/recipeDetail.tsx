import { useLocalSearchParams } from "expo-router";
import { ScrollView, View, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useState } from "react";

const RecipeDetail = () => {
  const { strMealThumb } = useLocalSearchParams<{ strMealThumb: string }>();
  const [isFavourite, setIsFavourite] = useState(false)

  return (
    <ScrollView 
      className="bg-white flex-1" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 30 }}
    >
      <StatusBar style="dark" />

      <View className="flex-row justify-center">
        <Image 
          source={{ uri: strMealThumb }}
          style={{ width: wp(98), height: hp(50), borderRadius: 53 }}
        />
      </View>
      <View className="w-full absolute flex-row justify-between items-center pt-14"> 
        <TouchableOpacity className="p-2 rounded-full ml-5 bg-white">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#fbbf24'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className="p-2 rounded-full bg-white">
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? 'red': "gray"}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
