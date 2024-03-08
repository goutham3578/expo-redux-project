import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Logo } from '../assets'
import { useSelector } from 'react-redux'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { QuerySnapshot, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { firestoreDB } from '../config/firebase.config'

const HomeScreen = () => {
    const user = useSelector((state) => state.user.user);
    const [isLoading, setisLoading] = useState(true)
    const [chats, setchats] = useState(null)
    const navigation = useNavigation();

    useLayoutEffect(() => {
        const chatQuery = query(
            collection(firestoreDB, "chats"),
            orderBy("_id", "desc")
        );
        const unsubscribe = onSnapshot(chatQuery, (QuerySnapshot) => {
            const chatRooms = QuerySnapshot.docs.map((doc) => (doc.data()))
            setchats(chatRooms)
            setisLoading(false)

        })
        return unsubscribe;
    }, []);

    return (
        <View className="flex-1">
            <SafeAreaView >
                <View className="w-full items-center justify-between px-4 py-2 flex-row">
                    <Image source={Logo} className="w-12 h-12" resizeMode='contain' />
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} className="w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                        <Image source={{ uri: user.profilePic }} className="w-full h-full" resizeMode='cover' />
                    </TouchableOpacity>
                </View>
                {/*scroling area*/}
                <ScrollView className="w-full px-4 pt-4">
                    <View className="w-full">
                        {/*messages title*/}
                        <View className="w-full flex-row items-center justify-between px-2">
                            <Text className="text-primaryText text-base font-extrabold pb-2">
                                Messages
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("AddToChatScreen")}>
                                <Ionicons name="chatbox" size={28} color={"#555"} />
                            </TouchableOpacity>
                        </View>
                        {isLoading ? (
                            <>
                                <View className="w-full flex items-center justify-center">
                                    <ActivityIndicator size={"large"} color={"#43C651"} />
                                </View>
                            </>
                        ) : (
                            <>
                                {chats && chats.length > 0 ?
                                    (
                                        <>
                                            {chats.map((room) => (
                                                <MessageCard key={room._id} room={room} />
                                            ))
                                            }

                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}



                            </>
                        )
                        }
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const MessageCard = ({ room }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen", { room: room })} className="w-full flex-row items-center justify-start py-2 ">
            {/*image*/}
            <View className="w-16 h-16 rounded-full flex items-center border-2 border-primary p-1 justify-center">
                <FontAwesome5 name="users" size={24} color="#555" />
            </View>

            {/*content*/}
            <View className="flex-1 flex items-start justify-center ml-4">
                <Text className="text-[#333] text-base font-semibold capitalize">
                    {room.chatName}
                </Text>
                <Text className="text-primaryText text-sm">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit...
                </Text>

            </View>

            {/*time text*/}
            <Text className="text-primary px-4 text-base font-semibold">
                27 min
            </Text>
        </TouchableOpacity>
    )
}
export default HomeScreen