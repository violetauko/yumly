import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const index = () => {

    const ringPadding1 = useSharedValue(0);
    const ringPadding2 = useSharedValue(0);

    const router = useRouter();

    useEffect(() => {
        ringPadding1.value = 0
        ringPadding2.value = 0
        setTimeout(() => ringPadding1.value = withSpring(ringPadding1.value + hp(5)), 100);
        setTimeout(() => ringPadding2.value = withSpring(ringPadding2.value + hp(5.5)), 300);

        const timeout = setTimeout(() => {
            router.push("/(tabs)"); 
        }, 3000);

        return () => clearTimeout(timeout);
    }, [])



    return (
        <SafeAreaView className='flex-1 justify-center items-center space-y-10 bg-amber-600'>
            <StatusBar style='light' />

            <Animated.View className='bg-white/20 rounded-full' style={{ padding: ringPadding1 }}>
                <Animated.View className='bg-white/20 rounded-full' style={{ padding: ringPadding2 }}>
                    <Image source={require('../assets/images/img1.png')}
                        style={{ width: hp(20), height: hp(20) }}
                    />
                </Animated.View>
            </Animated.View>
            <View className='flex items-center space-y-2 mt-5'>
                <Text className='font-bold text-white/80 tracking-widest' style={{ fontSize: hp(6) }}>Yumly</Text>
                <Text className='font-medium text-white/45 tracking-widest' style={{ fontSize: hp(2) }}>Your next meal awaits</Text>

            </View>

        </SafeAreaView>
    )
}

export default index