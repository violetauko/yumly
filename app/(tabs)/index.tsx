import { View, ScrollView, Image, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "../../components/Categories";
import axios from 'axios'

const HomeScreen = () => {

  useEffect(() => {
    getCategories()
  },[])

  const [activeCategory, setActiveCategory] = useState('Beef')

  const [categories, setCategories] = useState([])

  const getCategories = async () =>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      if(response && response.data){
        setCategories(response.data.categories)
      }
    }catch(err){
  console.log('error')
  }

  }
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/profile.png")}
            style={{ height: hp(5), width: hp(5) }}
          />
          <BellIcon size={hp(4)} color="grey" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text className="text-neutral-600" style={{ fontSize: hp(1.7) }}>
            Hello there!
          </Text>
          <View>
            <Text
              className="text-neutral-600 font-semibold"
              style={{ fontSize: hp(3.8) }}
            >
              Make your own food,
            </Text>
          </View>
          <Text
            className="text-neutral-600 font-semibold"
            style={{ fontSize: hp(3.8) }}
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput 
          placeholder="Search recipes"
          placeholderTextColor={'gray'}
          style={{fontSize: hp(1.7)}}
          className="flex-1 text-base mb-1 pl-3 tracking-wider"
           />
           <View className=" bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'gray'}/>
           </View>
        </View>
        <View>
          { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>}
        </View>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;
