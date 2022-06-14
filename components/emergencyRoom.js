import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';

import { globalStyles } from '../styles/global';

import { Divider } from 'react-native-paper';

import React, { useEffect } from 'react';

export default function EmergencyRoom({ navigation }) {
    
    useEffect(
        () => navigation.getParent().addListener('tabPress', (e) => {navigation.pop();}),
        []
    );

    const callEmergency = () => Linking.openURL(`tel:${112}`);

    const callCounceling = () => Linking.openURL(`tel:${800801200}`);

    return (
        <View style={globalStyles.container}>

            <Divider style={styles.divider} />

            <ScrollView>

                <View style={styles.instructionsTop}>
                    <Text style={styles.instructionsText}>1. Just Breath! Continue to breath deeply. It's fine.</Text>
                </View>

                <View style={styles.instructionsTop}>
                    <Text style={styles.instructionsText}>2. Now call one of the numbers below.</Text>
                </View>

                <Divider style={{marginTop: 10, paddingTop: 1}} />

                <TouchableOpacity onPress={callEmergency}>
                    <View style={styles.callEmergencyBtn}>
                        <Text style={styles.callEmergencyBtnText}>Call Emergency 112</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={{marginTop: 20, paddingTop: 1}} />

                <View style={styles.adnotation}>
                    <Text style={styles.adnotationText}>*Available in Romania Fry-Sun, 19:00 - 07:00</Text>
                </View>

                <TouchableOpacity onPress={callCounceling}>
                    <View style={styles.callCounselingBtn}>
                        <Text style={styles.callCounselingBtnText}>Call Counseling</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={{marginTop: 20, paddingTop: 1}} />

            </ScrollView>
            

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
    },
    callEmergencyBtn: {
        backgroundColor: '#EA5167',
        marginTop: 20,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 75,
        opacity: 0.95,
    },
    callEmergencyBtnText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
    callCounselingBtn: {
        backgroundColor: '#D5EBF7',
        marginTop: 15,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 75,
        opacity: 0.95,
    },
    callCounselingBtnText: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
    },
    instructionsTop: {
        margin: 15,
        textAlign: "justify",
    },
    instructionsText: {
        fontSize: 21,
        color: 'black',
        fontWeight: "500",
        textAlign: "justify",
    },
    adnotation: {
        marginTop: 15,
        marginLeft: 5,
    },
    adnotationText: {
        fontSize: 14,
        color: 'black',
        fontWeight: "500",
    }
});
