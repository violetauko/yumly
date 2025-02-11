import { useLocalSearchParams } from "expo-router";
import { ScrollView, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const RecipeDetail = () => {
  const { strMealThumb } = useLocalSearchParams<{ strMealThumb: string }>(); // ✅ Ensures it's a string

  return (
    <ScrollView 
      className="bg-white flex-1" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 30 }}
    >
      <StatusBar style="light" />

      <View className="flex-row justify-center">
        <Image 
          source={{ uri: strMealThumb }} // ✅ No more type error
          style={{ width: wp(98), height: hp(50), borderRadius: 53 }}
        />
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
