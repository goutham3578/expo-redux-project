import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BGImage, Logo } from '../assets'
import { UserTextInput } from '../components'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth, firestoreDB } from '../config/firebase.config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../context/actions/userActions'

const LoginScreen = () => {
    const screenWidth = Math.round(Dimensions.get('window').width)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [getEmailValidationstatus, setgetEmailValidationstatus] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setalertMessage] = useState(null)
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLoginIn = async () => {
        if (getEmailValidationstatus && email != "") {
            await signInWithEmailAndPassword(firebaseAuth, email, password).then((userCred) => {
                if (userCred) {
                    console.log("user id:", userCred?.user.uid)
                    getDoc(doc(firestoreDB, 'users', userCred?.user.uid)).then(docSnap => {
                        if (docSnap.exists()) {
                            console.log("user Data:", docSnap.data());
                            dispatch(SET_USER(docSnap.data()));
                        }

                    })
                }
            }).catch((err) => {
                console.log("error:", err.message);
                if (err.message.includes("wrong-password")) {
                    setAlert(true)
                    setalertMessage("password mismatch")
                }
                else if (err.message.includes("User Not Found")) {
                    setAlert(true)
                    setalertMessage("user not found")
                    setInterval(() => {
                        setAlert(false)
                    }, 200000)
                }
                else {
                    setAlert(true)
                    setalertMessage("invalid email")
                }
                setInterval(() => {
                    setAlert(false)

                }, 20000);

            })
        }
    }


    return (
        <View className="flex-1 items-center justify-start">
            <Image source={BGImage} resizeMode='cover' className="h-96" style={{ width: screenWidth }} />
            {/*MainView*/}
            <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6">
                <Image source={Logo} className="w-16 h-16" resizeMode='contain' />
                <Text className="py-2 text-primaryText text-xl font-semibold">Welcome Back</Text>
                <View className="w-full flex items-center justify-center">
                    {/*alert*/}
                    {alert && (<Text className="text-base text-red-600">
                        {alertMessage}
                    </Text>)}



                    {/*email*/}
                    <UserTextInput placeholder="Email" isPass={false} setStateValue={setEmail} setgetEmailValidationstatus={setgetEmailValidationstatus} />
                    {/*password*/}
                    <UserTextInput placeholder="Password" isPass={true} setStateValue={setPassword} />

                    {/*login button*/}
                    <TouchableOpacity onPress={handleLoginIn} className="w-full px-4 py-2 rounded-xl bg-primary flex my-3 items-center justify-center">
                        <Text className="py-2 text-white text-xl font-semibold">
                            Sign In
                        </Text>
                    </TouchableOpacity>
                    <View className="py-12 flex-row justify-center items-center space-x-2">
                        <Text className="text-base text-primaryText"> Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
                            <Text className="text-base font-semibold text-primary">Create here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default LoginScreen