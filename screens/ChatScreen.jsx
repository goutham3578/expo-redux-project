import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Image,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
    Entypo,
    FontAwesome,
    FontAwesome5,
    MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { firestoreDB } from "../config/firebase.config";

const ChatScreen = ({ route }) => {
    const { room } = route.params;
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const textInputRef = useRef(null);
    const user = useSelector((state) => state.user.user);

    const handleKeyboardOpen = () => {
        if (textInputRef.current) {
            textInputRef.current.focus()
        };

    };
    const sendMessage = async () => {
        const timeStamp = serverTimestamp();
        const id = `${Date.now()}`
        const _doc = {
            _id: id,
            roomId: room._id,
            message: message,
            timeStamp: timeStamp,
            user: user,

        };
        setMessage("");
        await addDoc(collection(firestoreDB, "chats", room._id, "messages"), _doc).then(() => {
            console.log("message sent")
        }).catch((err) => {
            console.log("error:", err);
        })
    }

    useLayoutEffect(() => {
        const messageQuery = query(collection(firestoreDB, "chats", room._id, "messages"), orderBy("timeStamp", "asc")
        );
        const unsunscribe = onSnapshot(messageQuery, (querySnapshot) => {
            const upMsg = querySnapshot.docs.map((doc) => doc.data())
            setMessages(upMsg)
            setIsLoading(false)
        })
        return unsunscribe;

    }, []);


    return (
        <View className="flex-1">
            <View className="w-full bg-primary px-4 py-6 flex-[0.2]">
                <View className="flex-row items-center justify-between w-full px-4 py-12">
                    {/* go back */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="chevron-left" size={32} color={"#fbfbfb"} />
                    </TouchableOpacity>
                    {/* middle */}

                    <View className="flex-row items-center justify-center space-x-3">
                        <View className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                            <FontAwesome5 name="users" size={24} color="#fbfbfb" />
                        </View>
                        <View>
                            <Text className="text-gray-50 text-base font-semibold capitalize ">
                                {room.chatName.length > 16
                                    ? `${room.chatName.slice(0, 16)}..`
                                    : room.chatName}{" "}
                            </Text>
                            <Text className="text-gray-100 text-sm font-semibold capitalize">
                                online
                            </Text>
                        </View>
                    </View>

                    {/* last section */}
                    <View className="flex-row items-center justify-center space-x-3">
                        <TouchableOpacity onPress={handleKeyboardOpen}>
                            <FontAwesome5 name="video" size={24} color="#fbfbfb" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <FontAwesome name="phone" size={24} color="#fbfbfb" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Entypo name="dots-three-vertical" size={24} color="#fbfbfb" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* bottom section */}
            <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={160}
                >
                    <>
                        <ScrollView>
                            {isLoading ? (
                                <>
                                    <View className="w-full flex items-center justify-center">
                                        <ActivityIndicator size={"large"} color={"#43C651"} />
                                    </View>
                                </>
                            ) : (
                                <>
                                    {messages?.map((msg, i) => msg.user.providerData.email === user.providerData.email ?
                                        (
                                            <View className="m-1" key={i}>
                                                <View style={{ alignSelf: "flex-end" }} className="px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-primary w-auto relative">
                                                    <Text className="text-base font-semibold text-white">
                                                        {msg.message}
                                                    </Text>
                                                </View>
                                                <View style={{ alignSelf: "flex-end" }}>
                                                    {msg.timeStamp?.seconds && (
                                                        <Text className="text-[12px] text-black font-semibold">{new Date(parseInt(msg?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-us", {
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true,
                                                        })}</Text>
                                                    )}
                                                </View>
                                            </View>

                                        ) : (

                                            <View className="m-1" key={i} style={{ alignSelf: "flex-start" }}>
                                                <View className="items-center justify-center flex-row space-x-2">
                                                    {/*image*/}
                                                    <Image className="w-12 h-12 rounded-full" source={{ uri: msg?.user?.profilePic }} resizeMode="cover" />
                                                    {/*content*/}
                                                    <View className="m-1">
                                                        <View className="px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-gray-200 w-auto relative">
                                                            <Text className="text-base font-semibold text-black">
                                                                {msg.message}
                                                            </Text>
                                                        </View>
                                                        <View style={{ alignSelf: "flex-start" }}>
                                                            {msg.timeStamp?.seconds && (
                                                                <Text className="text-[12px] text-black font-semibold">{new Date(parseInt(msg?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-us", {
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    hour12: true,
                                                                })}</Text>
                                                            )}
                                                        </View>
                                                    </View>

                                                </View>
                                            </View>

                                        ))}
                                </>
                            )}
                        </ScrollView>

                        <View className="w-full flex-row items-center justify-center px-8">
                            <View className="bg-gray-200 rounded-2xl px-4 space-x-4 py-2 flex-row items-center justify-center">
                                <TouchableOpacity >
                                    <Entypo name="emoji-happy" size={24} color="#555" />
                                </TouchableOpacity>

                                <TextInput
                                    className="flex-1 h-8 text-base text-primaryText font-semibold"
                                    placeholder="Type here..."
                                    placeholderTextColor={"#999"}
                                    value={message}
                                    onChangeText={(text) => setMessage(text)}
                                />

                                <TouchableOpacity>
                                    <Entypo name="mic" size={24} color="#43C651" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity className="pl-4" onPress={sendMessage} >
                                <FontAwesome name="send" size={24} color="#555" />
                            </TouchableOpacity>
                        </View>
                    </>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

export default ChatScreen;