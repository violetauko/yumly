import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View, Image, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading"


interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
}

const RecipeDetail = () => {
  const [isFavourite, setIsFavourite] = useState(false)
  const router = useRouter();
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const { idMeal } = useLocalSearchParams<{ idMeal: string }>();
  const { strMealThumb } = useLocalSearchParams<{ strMealThumb: string }>();
  

  useEffect(() => {
    if (idMeal) {
      getMealData(idMeal);
    }
  }, [idMeal]); 


  const getMealData = async (id:any) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      if (response && response.data) {
        setMeal(response.data.meals[0])
        setLoading(false)
      }
    } catch (err) {
      console.log('error')
    }
    
  }
  return (
    <ScrollView 
      className="bg-white flex-1" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 30 }}
    >
      <StatusBar style="dark" />

      <View className="flex-row justify-center">
      <Image source={{ uri: strMealThumb }} 
      style={{ width: wp(98), height: hp(50), borderRadius: 53 }} />

      </View>
      <View className="w-full absolute flex-row justify-between items-center pt-14"> 
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full ml-5 bg-white">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#fbbf24'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className="p-2 rounded-full bg-white">
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? 'red': "gray"}/>
        </TouchableOpacity>
      </View>

      {
        loading? (
          <Loading size='large' className="mt-16"/>
        ): (
          <View className="px-4 flex justify-between space-y-4 pt-8">
            <View className=" space-y-2">
              <Text style={{fontSize: hp(3)}} className=" font-bold text-neutral-700">
                {meal?.strMeal}
              </Text>
              <Text style={{fontSize: hp(3)}} className=" font-bold text-neutral-700">
                {meal?.strArea}
              </Text>
            </View>
          </View>
        )
      }
    </ScrollView>
  );
};

export default RecipeDetail;
