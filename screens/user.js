import { StyleSheet, View, Text, TouchableOpacity, FlatList, Button, Modal, Image } from 'react-native';

import { globalStyles } from '../styles/global';

import { Divider, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';



import { Formik } from 'formik';
import * as Yup from 'yup';

import React, { useState, useEffect } from 'react';

import { db, storage, auth } from '../backend/firebaseConfig';
import { collection, onSnapshot, addDoc, serverTimestamp, doc, getDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

export default function User({ navigation }) {

    [userInfo, setUserInfo] = useState(null);

    const userHandler = user => {
        if (user) {
            const docRef = doc(db, 'users', user.email);

            getDoc(docRef)
                .then((doc) => {
                    const docData = doc.data();
                    setUserInfo({
                        email: docData.email,
                        isAdmin: docData.isAdmin,
                        name: docData.name,
                        title: docData.title,
                        profilePictureUrl: docData.profilePictureUrl,
                    });
                    }
                )
                .catch((err) => console.log(err));
        } else {
            setUserInfo(null)
        }
    };

    useEffect(
        () => onAuthStateChanged(auth, (user) => userHandler(user)),
        [auth.currentUser]
    );
    
    [modalOpen, setModalOpen] = useState(false);

    const handleMakeAdminBtn = () => setModalOpen(true);
    const handleMakeAdmin = () => setModalOpen(false);

    const isAdmin = userInfo => userInfo ? userInfo.isAdmin : false;
    
    return (
        <View style={globalStyles.container}>

            <Divider style={styles.divider} />

            <MakeAdminBtnShown isAdmin={isAdmin(userInfo)} handleMakeAdminBtn={handleMakeAdminBtn} />

            <Modal visible={modalOpen} animationType='fade'>
                <View style={styles.modalContent}>

                    <MaterialIcons 
                        name='close'
                        size={24}
                        style={styles.modalClose}
                        onPress={() => setModalOpen(false)}
                    />

                    <View style={{marginTop: 20, marginHorizontal: 5}}>
                        <MakeAdminForm handleMakeAdmin={handleMakeAdmin} />
                    </View>

                </View>
            </Modal>

            <UserPage userInfo={userInfo} />

        </View>
    );
}

function MakeAdminBtnShown({ isAdmin, handleMakeAdminBtn}) {
    return(
        <View>

        </View>
    );
}

function MakeAdminForm({handleMakeAdmin}) {
    return(
        <View>

        </View>
    );
}

function UserPage({userInfo}) {
    [modalOpen, setModalOpen] = useState(false);

    const handleUpdateProfileBtn = () => setModalOpen(true);
    const handleUpdateProfile = () => setModalOpen(false);

    return(
        <View>
            <UpdateProfileBtn handleUpdateProfileBtn={handleUpdateProfileBtn} />

            <Modal visible={modalOpen} animationType='fade'>
                <View style={styles.modalContent}>

                    <MaterialIcons 
                        name='close'
                        size={24}
                        style={styles.modalClose}
                        onPress={() => setModalOpen(false)}
                    />

                    <View style={{marginTop: 20, marginHorizontal: 5}}>
                        <UpdateProfileForm handleUpdateProfile={handleUpdateProfile} />
                    </View>

                </View>
            </Modal>

            <UserProfile userInfo={userInfo} />
        </View>
    );
}

function UpdateProfileBtn({handleUpdateProfileBtn}) {
    return(
        <View>

        </View>
    );
}

function UpdateProfileForm({handleUpdateProfile}) {
    return(
        <View>

        </View>
    );
}

function UserProfile({userInfo}) {
    return(
        <View>

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
    addPostBtn: {
        marginVertical: 15,
        marginHorizontal: 110,
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
    addPostContainer: {
        backgroundColor: "#FAFAFA",
        margin: 10,
    },
    addPostUploadImage: {
        flexDirection: "row",
        alignItems: "center",
    },
    addPostCaption: {
        backgroundColor: "#FAFAFA",
        marginTop: 10,
    },
    addPostSubmitBtn: {
        marginTop: 10,
        marginHorizontal: 50,
    },
    addPostPicker: {
        height: 30,
        width: 100,
    },
    addPostPickAspect: {
        flexDirection: "row",
        alignItems: "center",
    },
});
