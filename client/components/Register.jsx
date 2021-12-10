import React, { useEffect, useState } from 'react'
import { View, Button, StyleSheet, Dimensions, TextInput } from 'react-native'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
import axios from 'axios';


function Register({ navigation }) {
    const [name, onChangeName] = useState('Enter username')
    const Register_Yourself = async () => {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status != 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            // finalStatus = status;
        }
        if (status !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await axios.post('http://192.168.0.101:3000/register', {
            user: name, token: token
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }).then((result) => {
            console.log('work')
            console.log(result)
        }).catch(err => console.log(err))
    }
    return (
        <View style={style.container}>
            <TextInput style={style.input} onChangeText={onChangeName} value={name} />
            <Button
                title="Register Yourself"
                onPress={Register_Yourself}
                style={style.button}
            />
            <Button
                style={style.button}
                title="Go to Send Notification Page"
                onPress={() => navigation.navigate('Sendnoti')}
            />
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: window.height,
        width: screen.width
    }, input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})

export default Register
