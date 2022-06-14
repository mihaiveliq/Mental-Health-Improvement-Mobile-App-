import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { globalStyles } from '../styles/global';
import { stylesEmergencyBtn } from '../styles/emergencyBtn';

import { Divider } from 'react-native-paper';

import React from 'react';

const resourcesInfo = {
    images: {
        'posts': require('../assets/images/Posts.jpg'),
        'newsletter': require('../assets/images/newsletter.jpg'),
        'weekly podcasts': require('../assets/images/podcast.jpg'),
        'stories': require('../assets/images/Stories.jpg'),
    },
    titles: {
        'posts': 'Posts',
        'newsletter': 'Newsletter',
        'weekly podcasts': 'Weekly Podcasts',
        'stories': 'Stories',
    }
};

export default function Resources({ navigation}) {

    return (
        <View style={globalStyles.container}>

            <Divider style={styles.divider} />

            <View style={globalStyles.containerIn}>
                <TouchableOpacity onPress={() => navigation.navigate('Posts')} style={styles.touchable}>
                    <Image source={resourcesInfo.images['posts']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{resourcesInfo.titles['posts']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Newsletter')} style={styles.touchable}>
                    <Image source={resourcesInfo.images['newsletter']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{resourcesInfo.titles['newsletter']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Weekly Podcasts')} style={styles.touchable}>
                    <Image source={resourcesInfo.images['weekly podcasts']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{resourcesInfo.titles['weekly podcasts']}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Stories')} style={styles.touchable}>
                    <Image source={resourcesInfo.images['stories']} style={styles.icon}/>
                    <Text style={globalStyles.regularText}>{resourcesInfo.titles['stories']}</Text>
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
