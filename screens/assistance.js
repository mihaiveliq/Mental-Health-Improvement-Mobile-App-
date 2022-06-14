import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { globalStyles } from '../styles/global';
import { stylesEmergencyBtn } from '../styles/emergencyBtn';

import { Divider } from 'react-native-paper';

import React from 'react';

const assistanceInfo = {
    images: {
        'useful': require('../assets/images/knowladge.jpg'),
        'collaborating': require('../assets/images/psychiatry.jpg'),
        'dedicated': require('../assets/images/association.jpg'),
        'therapy': require('../assets/images/offices.jpg'),
    },
    titles: {
        'useful': 'Useful Knowledge About Therapy',
        'collaborating': 'Collaborating Therapists',
        'dedicated': 'Friendly Associations',
        'therapy': 'Therapy Offices in My Town',
    }
};

export default function Assistance({ navigation }) {

    return (
        <View style={globalStyles.container}>
            <Divider style={styles.divider} />

            <View style={globalStyles.containerIn}>

                <TouchableOpacity onPress={() => navigation.navigate('Useful Knowladge')} style={styles.touchable}>
                    <Image source={assistanceInfo.images['useful']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{assistanceInfo.titles['useful']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Collaborating Therapists')} style={styles.touchable}>
                    <Image source={assistanceInfo.images['collaborating']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{assistanceInfo.titles['collaborating']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Firendly Associations')} style={styles.touchable}>
                    <Image source={assistanceInfo.images['dedicated']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{assistanceInfo.titles['dedicated']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Offices In Town')} style={styles.touchable}>
                    <Image source={assistanceInfo.images['therapy']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{assistanceInfo.titles['therapy']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Emergency Room')} style={stylesEmergencyBtn.touchable}>
                    <Text style={stylesEmergencyBtn.text}>Emergency Room</Text>
                    <Image source={require('../assets/icons/box-important.png')} style={stylesEmergencyBtn.icon}/>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        height: 70,
        width: 70,
        borderRadius: 50,    
    },
    touchable: {
        alignItems: "center",
        flexDirection: 'row',
        paddingBottom: 25
    },
    divider: {
        paddingBottom: 1,
        marginHorizontal: 10,
    },
    pad: {
        paddingBottom: 10
    },
});
