import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../constants/data';

interface MealData {
    id: string;
    image: string;
}


const Recipes = () => {
    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-600'>Recipes</Text>
            <View>
            <MasonryList
  data={mealData}
  keyExtractor={(item) => (item as MealData).id}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  renderItem={({
    item,
    i,
  }: {
    item: unknown; // MasonryList might give unknown
    i: number;
  }) => {
    const mealItem = item as MealData;
    return <RecipeCard item={mealItem} index={i} />;
  }}
  onEndReachedThreshold={0.1}
/>
            </View>
        </View>
    )
}

const RecipeCard = ({ item, index, }: { item: { image: string }; index: number; }): JSX.Element => {
    return (
        <View>
            <Pressable style={{ width: '100%' }} className="flex justify-center mb-4 space-y-1">
                <Image
                    source={{ uri: item.image }}
                    style={{ width: '100%' }}
                    className="bg-black/5"
                />
            </Pressable>
        </View>
    );
};


export default Recipes