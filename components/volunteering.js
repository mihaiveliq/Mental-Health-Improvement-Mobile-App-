import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { globalStyles } from '../styles/global';

import { Divider } from 'react-native-paper';

import React, { useState, useEffect } from 'react';

import { db } from '../backend/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Volunteering({ navigation }) {
    
    useEffect(
        () => navigation.getParent().addListener('tabPress', (e) => {navigation.pop();}),
        []
    );

    return (
        <View style={globalStyles.container}>

            <Divider style={styles.divider} />

        </View>
    );
}

const styles = StyleSheet.create({
    divider: {
        paddingBottom: 1,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'justify',
    }
});
