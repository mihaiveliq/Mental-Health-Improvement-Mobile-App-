import React, { useState, useEffect } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput, Button, Modal, Alert } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Validatior from 'email-validator';

import {auth, db} from '../backend/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default function Login({navigation}) {
    [modalOpen, setModalOpen] = useState(false);
    [currentUser, setCurrentUser] = useState(null);

    const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)

    useEffect(
        () => onAuthStateChanged(auth, (user) => userHandler(user)),
        []
    );

    const addUser = () => setModalOpen(false);
    const handleLogOut = () => signOut(auth);
        
    if (currentUser) {
            
        return (
            <View style={styles.loginPageContainer}>
                <Divider style={styles.divider}/>
                <ImageBackground source={require("../assets/images/comunity.jpg")} resizeMode="cover" style={styles.backgroundImage}>
                    
                    <View styles={{flex: 1, backgroundColor: "#FFFFFF"}}>
                        <View style={{marginTop: 225, marginHorizontal: 90, borderRadius: 10, opacity: 0.9, justifyContent: 'center', alignContent: 'center',}}>
                            <Button title='Log Out' color='grey' onPress={handleLogOut}/>
                        </View>

                        <View style={{marginTop: 10, marginHorizontal: 80, borderRadius: 10, opacity: 0.9, height: '120%'}}>
                            <Button title='Main Menu' onPress={() => navigation.navigate('BottomTab')}/>
                        </View>
                    </View>
                    
                </ImageBackground>
                <Divider style={styles.divider}/>
            </View>
        );

    } else {

        return (
            <View style={styles.loginPageContainer}>

                <Modal visible={modalOpen} animationType='fade'>
                    <View style={styles.modalContent}>
                        <MaterialIcons 
                            name='close'
                            size={24}
                            style={styles.modalClose}
                            onPress={() => setModalOpen(false)}
                        />
                        <View style={{marginTop: 20, marginHorizontal: 5}}>
                            <SignUpForm addUser={addUser} navigation={navigation} />
                        </View>
                    </View>
                </Modal>

                <Divider style={styles.divider}/>

                <ImageBackground source={require("../assets/images/comunity.jpg")} resizeMode="cover" style={styles.backgroundImage}>
                    <View style={styles.containerContent}>

                        <View style={{marginTop: 50, opacity: 2, marginHorizontal: 5}}>
                            <LoginForm navigation={navigation}/>
                        </View>

                        <View style={styles.resgisterContainer}>
                            <Text>Not registered yet? </Text>
                            <TouchableOpacity style={{marginVertical: 3}} onPress={() => setModalOpen(true)}>
                                <Text style={{color: '#0096F6'}}>Create an account</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>

                <Divider style={styles.divider, {marginTop: 1, justifyContent: 'flex-end'}}/>

            </View>
        );
    }  
}

function LoginForm({navigation}) {
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string()
            .required()
            .min(8, 'Your password has to have at least 8 characters'),
    });

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, actions) => {
                signInWithEmailAndPassword(auth, values.email, values.password)    
                .then(userCredential => {
                    actions.resetForm();
                    Alert.alert('Congratulations!', 'Your have successfuly logged in!', [
                        {text: 'Go to Main Menu', onPress: () => navigation.navigate('BottomTab', userCredential.user.email)}
                    ]);
                })
                .catch((error) => Alert.alert('Oops!', error.message));
            }}
            validationSchema={LoginFormSchema}
            validateOnMount={true}
        >

            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
            <>
                    <TextInput style={[styles.inputField,
                            {borderColor: values.email.length < 1 || Validatior.validate(values.email) ? '#ccc' : 'red'}
                        ]}
                        placeholderTextColor='#444'
                        placeholder='Email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}

                    />
                    <TextInput style={[styles.inputField,
                            {borderColor: values.password.length < 1 || values.password.length >= 8 ? '#ccc' : 'red'}
                        ]}
                        placeholderTextColor='#444'
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />

                    <Button title='Log in' color={isValid ? "#0096F6" : "#9ACAF7"} onPress={handleSubmit}/>
            </>
            )}

        </Formik>
    );
}

function SignUpForm({addUser, navigation}) {
    const SignUpFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        fullName: Yup.string().required().min(2, 'Your username has to have at least 2 characters'),
        password: Yup.string()
            .required()
            .min(8, 'Your password has to have at least 8 characters'),
    })

    return (
        <Formik
            initialValues={{email: '', fullName: '', password: ''}}
            onSubmit={(values, actions) => {
                createUserWithEmailAndPassword(auth, values.email, values.password)
                .then(userCredential => {
                    const newUser = userCredential.user;
                    setDoc(doc(db, 'users', newUser.email), {
                        name: values.fullName,
                        email: newUser.email,
                        isAdmin: false,
                        title: '',
                        profilePictureUrl: '../assets/images/no_profile.jpg',
                    });       
                })
                .then(() => {
                    actions.resetForm();
                    Alert.alert('Congratulations!', 'Your account has successfuly been created. Now you are loged in. Enjoy our community!', [
                        {text: 'Alright', onPress: () => {
                            addUser();
                            return navigation.navigate('BottomTab');
                            }
                        }
                    ]);
                })
                .catch((error) => Alert.alert('Oops!', error.message));
            }}
            validationSchema={SignUpFormSchema}
            validateOnMount={true}
        >

            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
            <>
                    <TextInput style={[styles.inputField,
                            {borderColor: values.email.length < 1 || Validatior.validate(values.email) ? '#ccc' : 'red'}
                        ]}
                        placeholderTextColor='#444'
                        placeholder='Email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}

                    />
                    <TextInput style={[styles.inputField,
                            {borderColor: values.fullName.length < 1 || values.fullName.length >= 2 ? '#ccc' : 'red'}
                        ]}
                        placeholderTextColor='#444'
                        placeholder='Name'
                        autoCapitalize='none'
                        textContentType='familyName'
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        value={values.fullName}

                    />
                    <TextInput style={[styles.inputField,
                            {borderColor: values.password.length < 1 || values.password.length >= 8 ? '#ccc' : 'red'}
                        ]}
                        placeholderTextColor='#444'
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />

                    <Button title='Sign Up' color={isValid ? "#0096F6" : "#9ACAF7"} onPress={handleSubmit}/>
            </>
            )}

        </Formik>
    );
}

const styles = StyleSheet.create({

    loginPageContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        opacity: 1,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        marginLeft: 190,
        opacity: 2,
        borderColor: 'black',
        marginHorizontal: 15,
        marginTop: 3,
        marginBottom: 4,
    },
    divider: {
        marginTop: 1,
        shadowColor: 'black',
        color: 'black',
    },
    backgroundImage: {
        flex: 1,
        opacity: 0.9,     
    },
    containerContent: {
        marginTop: 98,
        opacity: 1,
    },
    resgisterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        opacity: 2,
        borderColor: 'black',
        marginTop: 20,
        marginHorizontal: 50,
    },
    inputField: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: "#FAFAFA",
        marginBottom: 10,
        borderWidth: 1,
    },
    modalClose: {
        margin: 20,
        marginLeft: 310,
        borderColor: '#f2f2f2',
        borderWidth: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 10,
    },
    modalContent: {
        flex: 1,
    },
});
