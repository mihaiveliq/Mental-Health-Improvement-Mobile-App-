import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { globalStyles } from '../styles/global';
import { stylesEmergencyBtn } from '../styles/emergencyBtn';

import { Divider } from 'react-native-paper';

import React from 'react';

const healthInfo = {
    images: {
        'exercises': require('../assets/images/exercicesss.jpg'),
        'tasks': require('../assets/images/Task.jpg'),
        'tips': require('../assets/images/stress.jpg'),
        'explore': require('../assets/images/discoverlife.jpg'),
    },
    titles: {
        'exercises': 'Important to Do Exercises',
        'tasks': 'Guided Personal Tasks',
        'tips': 'Tips for Overcoming Stress',
        'explore': 'Explore Life',
    }
};

export default function Health({ navigation }) {

    return (
        <View style={globalStyles.container}>
            <Divider style={styles.divider} />

            <View style={globalStyles.containerIn}>

                <TouchableOpacity onPress={() => navigation.navigate('Important Exercises')} style={styles.touchable}>
                    <Image source={healthInfo.images['exercises']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{healthInfo.titles['exercises']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Guided Tasks')} style={styles.touchable}>
                    <Image source={healthInfo.images['tasks']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{healthInfo.titles['tasks']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Tips for Overcoming Stress')} style={styles.touchable}>
                    <Image source={healthInfo.images['tips']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{healthInfo.titles['tips']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Explore Life')} style={styles.touchable}>
                    <Image source={healthInfo.images['explore']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{healthInfo.titles['explore']}</Text>
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
