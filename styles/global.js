import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    containerIn : {
        flex: 1,
        padding: 20,
        paddingHorizontal: 15,
        paddingTop: 30,
        backgroundColor: "#FFFFFF",
    },
    regularText: {
        fontFamily: 'regular',
        fontSize: 20,
        color: '#000000',
        paddingLeft: 15,
        paddingRight: 70,
        
    },
    titleText1: {
        fontFamily: 'title1',
        fontSize: 24,
        color: '#000000'
    },
    titleText2: {
        fontFamily: 'title2',
        fontSize: 36,
        color: '#000000'
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
    },
    blockText: {
        margin: 10,
    },
});

export const images = {
    ratings: {
        '1': require('../assets/rating-1.png'),
        '2': require('../assets/rating-2.png'),
        '3': require('../assets/rating-3.png'),
        '4': require('../assets/rating-4.png'),
        '5': require('../assets/rating-5.png'),
    }
}

export const no_profile_picture = {
    'name': "../assets/images/no_profile.jpg",
    'picture': require("../assets/images/no_profile.jpg"),
}
