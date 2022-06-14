import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { globalStyles } from '../styles/global';


export default function DrawerHeader({navigation}) {

  const _handleChatPress = () => {
    console.log('chat pressed');
  };
  const _handleSettingsPress = () => {
    navigation.openDrawer();
  };

  return (
      
    <Appbar.Header style={{backgroundColor: "#74AEE0", shadowColor: "#C4C4C4", marginLeft: -8, marginRight: -1 }}>
        <Appbar.Content title={
            <View style={styles.title}>
                <Image source={require('../assets/icons/ok-hand.png')} 
                                style={styles.logoIcon} />
                <View style={styles.titleText}>
                    <Text style={globalStyles.titleText1}>FightFor</Text>
                    <Text style={globalStyles.titleText2}>Life</Text>
                </View>
            </View>
        } />
        <Appbar.Action icon={() => 
                    <Image source={require('../assets/icons/communication.png')} 
                                style={styles.barIcon} />
                } onPress={_handleChatPress} animated={false} />
        <Appbar.Action icon={() => 
                    <Image source={require('../assets/icons/checklist.png')} 
                                style={styles.barIcon} />
                } onPress={_handleSettingsPress} animated={false} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 20,
        marginLeft: -5
    },
    titleText: {
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: 'row',
        paddingTop: 3,
    },
    logoIcon: {
        resizeMode: 'center',
        alignItems: "center",
        flex: 1,
        height: 52,
        width: 52,     
    },
    barIcon: {
        resizeMode: 'center',
        alignItems: "center",
        flex: 1,
        height: 25,
        width: 25,     
    },

});
