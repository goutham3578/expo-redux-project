import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../config/firebase.config';

const ProfileScreen = () => {

    const navigation = useNavigation();
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await firebaseAuth.signOut().then(() => {
            dispatch(SET_USER_NULL())
            navigation.replace("LoginScreen")

        }
        )
    }

    return (
        <SafeAreaView className="flex-1 items-center justify-start">
            {/*icons*/}
            <View className="w-full items-center justify-between px-4  flex-row">
                <TouchableOpacity onPress={() => navigation.goBack()} className="w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                    <MaterialIcons name="chevron-left" size={32} color={"#555"} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={24} color={"#555"} />
                </TouchableOpacity>

            </View>
            {/*profile pic*/}
            <View className=" items-center justify-center">
                <View className="relative border-2 border-primary p-1 rounded-full">
                    <Image source={{ uri: user?.profilePic }} className="w-24 h-24" resizeMode='contain' />
                </View>
                <Text className="text-xl font-semibold text-primary pt-3">
                    {user?.fullName}
                </Text>
                <Text className="text-base font-semibold text-primaryText">
                    {user?.providerData?.email}
                </Text>
            </View>
            {/*icons*/}
            <View className="w-full flex-row items-center justify-evenly py-6">
                <View className="items-center justify-center">
                    <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
                        <MaterialIcons name="messenger-outline" size={24} color={"#555"} />
                    </TouchableOpacity>
                    <Text className="text-sm text-primaryText py-2">Message</Text>

                </View>
                <View className="items-center justify-center">
                    <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
                        <Ionicons name="ios-videocam-outline" size={24} color={"#555"} />
                    </TouchableOpacity>
                    <Text className="text-sm text-primaryText py-2">Video Call</Text>

                </View>
                <View className="items-center justify-center">
                    <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
                        <Ionicons name="call-outline" size={24} color={"#555"} />
                    </TouchableOpacity>
                    <Text className="text-sm text-primaryText py-2">Call</Text>

                </View>
                <View className="items-center justify-center">
                    <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
                        <Entypo name="dots-three-vertical" size={24} color={"#555"} />
                    </TouchableOpacity>
                    <Text className="text-sm text-primaryText py-2">More</Text>
                </View>
            </View>
            {/*medias shared*/}
            <View className="w-full px-6 space-y-3">
                <View className="w-full flex-row justify-between items-center">
                    <Text className="text-primaryText text-base font-extrabold pb-2">
                        Media shared
                    </Text>
                    <TouchableOpacity>
                        <Text className="text-primary text-base font-semibold pb-2">
                            View All
                        </Text>
                    </TouchableOpacity>

                </View>
                <View className="w-full flex-row justify-between items-center">
                    <TouchableOpacity className="w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden">
                        <Image
                            source={{
                                uri: "https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png",
                            }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity className="w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden">
                        <Image
                            source={{
                                uri: "https://cdn.pixabay.com/photo/2023/07/02/18/49/cup-8102791_640.jpg",
                            }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity className="w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden relative">
                        <Image
                            source={{
                                uri: "https://cdn.pixabay.com/photo/2023/07/07/17/47/sushi-8113165_640.jpg",
                            }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                        <View className="absolute w-full h-full items-center justify-center bg-[#00000068]">
                            <Text className="text-base text-white font-semibold">250+</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            {/*settings*/}
            <View className="w-full px-6 py-2 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <MaterialIcons name="security" size={24} color={"#555"} />
                    <Text className="text-base font-semibold text-primaryText px-3">
                        Privacy
                    </Text>
                </View>
                <MaterialIcons name="chevron-right" size={32} color={"#555"} />
            </View>

            <View className="w-full px-6 py-2 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <MaterialIcons name="message" size={24} color={"#555"} />
                    <Text className="text-base font-semibold text-primaryText px-3">
                        Groups
                    </Text>
                </View>
                <MaterialIcons name="chevron-right" size={32} color={"#555"} />
            </View>

            <View className="w-full px-6 py-2  flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <MaterialIcons name="music-note" size={24} color={"#555"} />
                    <Text className="text-base font-semibold text-primaryText px-3">
                        Media's & Downloads
                    </Text>
                </View>
                <MaterialIcons name="chevron-right" size={32} color={"#555"} />
            </View>

            <View className="w-full px-6 py-2 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <MaterialIcons name="person" size={24} color={"#555"} />
                    <Text className="text-base font-semibold text-primaryText px-3">
                        Account
                    </Text>
                </View>
                <MaterialIcons name="chevron-right" size={32} color={"#555"} />
            </View>

            <TouchableOpacity onPress={handleLogout}
                className="w-full px-6 py-4 flex-row items-center justify-center">
                <Text className="text-lg font-semibold text-primaryBold px-3">
                    Logout
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default ProfileScreen