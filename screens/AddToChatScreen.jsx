import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firebaseAuth, firestoreDB } from '../config/firebase.config'

const AddToChatScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.user.user);
    const [addChat, setaddChat] = useState("")

    const createNewChat = async () => {
        let id = `${Date.now()}`
        const _doc = {
            _id: id,
            user: user,
            chatName: addChat,
        }
        if (addChat != "") {
            setDoc(doc(firestoreDB, "chats", id), _doc).then(() => {
                setaddChat("")
                navigation.replace("HomeScreen")
            }).catch((err) => {
                alert("Error:", err);
            })
        }
    }
    return (
        <View className="flex-1">
            <View className="w-full bg-primary px-4 py-6 flex-[0.25]">
                <View className="flex-row items-center justify-between w-full px-4 py-12">

                    {/* go back*/}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="chevron-left" size={32} color={"#fbfbfb"} />
                    </TouchableOpacity>

                    {/* middle*/}



                    {/* last section*/}
                    <View className="w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                        <Image source={{ uri: user?.profilePic }} className="w-12 h-12" resizeMode='contain' />
                    </View>

                </View>

            </View>
            {/*bottom section*/}
            <View className="w-full bg-white py-6 px-4 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
                <View className="w-full px-4 py-4">
                    <View className="w-full px-4 flex-row justify-between items-center py-3 rounded-xl border border-gray-200 space-x-3">
                        {/*icon*/}
                        <Ionicons name='chatbubbles' size={24} color={"#777"} />

                        {/*input*/}
                        <TextInput className="flex-1 text-lg text-primaryText  h-12 w-full"
                            placeholder='Create a chat'
                            placeholderTextColor={"#999"}
                            value={addChat}
                            onChangeText={(text) => setaddChat(text)} />

                        {/*icon*/}
                        <TouchableOpacity onPress={createNewChat}>
                            <FontAwesome name='send' size={24} color="#777" />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </View>
    )
}

export default AddToChatScreen