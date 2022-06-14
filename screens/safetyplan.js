import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { globalStyles } from '../styles/global';
import { stylesEmergencyBtn } from '../styles/emergencyBtn';

import { Divider } from 'react-native-paper';

import React from 'react';

const safetyplanInfo = {
    images: {
        'kit': require('../assets/images/images.jpg'),
        'handling': require('../assets/images/download.jpg'),
        'preventing': require('../assets/images/prevention.jpg'),
        'signs': require('../assets/images/signsofdanger.jpg'),
    },
    titles: {
        'kit': 'My Emergency Kit',
        'handling': 'Handling a Crisis',
        'preventing': 'Preventing a Crisis',
        'signs': 'Signs that Someone Might be in Danger',
    }
};

export default function SafetyPlan({ navigation }) {

    return (
        <View style={globalStyles.container}>
            <Divider style={styles.divider} />

            <View style={globalStyles.containerIn}>

                <TouchableOpacity onPress={() => navigation.navigate('Emergency Kit')} style={styles.touchable}>
                    <Image source={safetyplanInfo.images['kit']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{safetyplanInfo.titles['kit']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Handle Crisis')} style={styles.touchable}>
                    <Image source={safetyplanInfo.images['handling']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{safetyplanInfo.titles['handling']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Prevent Crisis')} style={styles.touchable}>
                    <Image source={safetyplanInfo.images['preventing']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{safetyplanInfo.titles['preventing']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('DangerSigns')} style={styles.touchable}>
                    <Image source={safetyplanInfo.images['signs']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{safetyplanInfo.titles['signs']}</Text>
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
