import { StyleSheet } from 'react-native';

export const stylesEmergencyBtn = StyleSheet.create({
    icon: {
        height: 75,
        width: 75,   
    },
    touchable: {
        alignItems: "center",
        flexDirection: 'row',
        paddingTop: 5,
        paddingLeft: 5,
        // start: 115,
        justifyContent: 'flex-end',
        bottom: 15,
        position: 'absolute',
        right: 15,

    },
    text: {
        fontFamily: 'regular',
        fontSize: 16,
        color: '#000000',
        paddingLeft: 15,
        
    },
});