import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Categories from './Categories';
import Loading from './Loading';
import { router, useRouter } from 'expo-router';


interface MealData {
    idMeal: string;
    strMealThumb: string;
    strMeal: string
    strArea:string
    
}

const Recipes = ({ meals, categories }: { 
    meals: { id: string; image: string }[]; 
    categories: string[];
  }) =>  {
    const router = useRouter();
    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-600 mt-6'>Recipes</Text>
            <View>
                {
                    categories.length == 0 || meals.length == 0 ? (
                        <Loading size='large' className="mt-20" />
                    ) : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => (
                                <RecipeCard item={item as MealData} index={i} />
                            )}
                            onEndReachedThreshold={0.1}
                        />
                    )
                }
            </View>
        </View>
    )
}

export const RecipeCard = ({ item, index }: {item: {strMeal: string; strMealThumb: string
 }; index: number;
}): JSX.Element => {
    const router = useRouter();
    
    let isEven = index % 2 === 0
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable style={{ width: '100%', paddingTop: '5%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
            className='flex justify-center mb-4 space-y-1'
            onPress={() => router.push({ pathname: "/recipeDetail", params: { strMealThumb: item.strMealThumb } })}

            >
                <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }}
                    className="bg-black/5"
                />
                <Text style={{ fontSize: hp(1.5) }} className='font-semibold ml-2 text-neutral-600'>
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                    }

                </Text>
            </Pressable>
        </Animated.View>
    );
};


export default Recipes