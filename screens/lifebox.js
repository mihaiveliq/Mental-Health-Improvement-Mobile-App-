import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { globalStyles } from '../styles/global';
import { stylesEmergencyBtn } from '../styles/emergencyBtn';

import { Divider } from 'react-native-paper';

import React from 'react';

const lifeboxInfo = {
    images: {
        'understanding': require('../assets/images/depression.jpg'),
        'make': require('../assets/images/present2.jpg'),
        'volunteering': require('../assets/images/volunteering.jpg'),
        'magic': require('../assets/images/mymagiclist.jpg'),
    },
    titles: {
        'understanding': 'Understanding Bad Moods',
        'make': 'My Life Box',
        'volunteering': 'Volunteering... Why Not?',
        'magic': 'My Magic List',
    }
};

export default function LifeBox({ navigation }) {

    return (
        <View style={globalStyles.container}>
            <Divider style={styles.divider} />

            <View style={globalStyles.containerIn}>

                <TouchableOpacity onPress={() => navigation.navigate('Understanding Bad Moods')} style={styles.touchable}>
                    <Image source={lifeboxInfo.images['understanding']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{lifeboxInfo.titles['understanding']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Make Someone Smile')} style={styles.touchable}>
                    <Image source={lifeboxInfo.images['make']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{lifeboxInfo.titles['make']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Volunteering')} style={styles.touchable}>
                    <Image source={lifeboxInfo.images['volunteering']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{lifeboxInfo.titles['volunteering']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('My Magic List')} style={styles.touchable}>
                    <Image source={lifeboxInfo.images['magic']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{lifeboxInfo.titles['magic']}</Text>
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
