import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';
import axios from 'axios';

function Sendnoti({ navigation }) {
    const [title, onChangeTitle] = useState('Title for Notification');
    const [content, onChangeContent] = useState('Content of notification');
    const [selectedValue, setSelectedValue] = useState("Select user");
    const [picker, setPicker] = useState([])
    useEffect(async () => {
        await axios.get('http://192.168.0.101:3000/getAllUser', {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }).then((result) => {
            setPicker(result)
        }).catch(err => console.log(err))
    }, [])

    const send = async () => {
        await axios.post('https://exp.host/--/api/v2/push/send', {
            "to": "ExponentPushToken[iHzd9FCFMnzA16rQw6T1hv]",
            "title": title,
            "body": content
        })
    }
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <TextInput style={styles.input} onChangeText={onChangeTitle} value={title} />
            <TextInput style={styles.input} onChangeText={onChangeContent} value={content} />
            <TouchableOpacity
                onPress={send}
                style={{ backgroundColor: 'blue' }}>
                <Text style={{ fontSize: 20, color: '#fff' }}>Send Notification</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, picker: {
        height: 100,
        width: 150
    }
});

export default Sendnoti
