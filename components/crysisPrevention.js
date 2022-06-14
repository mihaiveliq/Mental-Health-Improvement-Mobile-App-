import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';

import { globalStyles } from '../styles/global';

import { Divider, TextInput } from 'react-native-paper';

import { Formik } from 'formik';

import React, { useState, useEffect } from 'react';

import { db, auth } from '../backend/firebaseConfig';
import { collection, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function PreventCrisis({navigation}) {

    const [userInfo, setUserInfo] = useState(null);

    const userHandler = user => {
        if (user) {
            const docRef = doc(db, 'users', user.email);

            getDoc(docRef)
                .then((doc) => {
                    const docData = doc.data();
                    setUserInfo({
                        email: docData.email,
                        isAdmin: docData.isAdmin,
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

    useEffect(
        () => navigation.getParent().addListener('tabPress', (e) => {navigation.pop();}),
        []
    );

    const [usefulKnowledgeText, setUsefulKnowledgeText] = useState('Wait a second...');
    const [textId, setTextId] = useState();

    const colRef = collection(db, 'preventCrisis')
    useEffect(
        () => {
            onSnapshot(colRef, (snapshot) => {
                let text = snapshot.docs[0].data().text;
                let id = snapshot.docs[0].id;
                setUsefulKnowledgeText(text);
                setTextId(id);
            });
        }, 
        []
    );

    return (
        <View style={globalStyles.container}>

            <Divider style={styles.divider} />

            <Content userInfo={userInfo} usefulKnowledgeText={usefulKnowledgeText} textId={textId} />
            
        </View>
    );
}

function Content({userInfo, usefulKnowledgeText, textId}) {
    if (userInfo && userInfo.isAdmin) {
        return(
            <AdminContent usefulKnowledgeText={usefulKnowledgeText} textId={textId} />
        );
    } else {
        return(
            <NoAdminContent usefulKnowledgeText={usefulKnowledgeText} />
        );
    }
}

function NoAdminContent({usefulKnowledgeText}) {
    return(
        <ScrollView>
            <View style={globalStyles.blockText}>
                <Text style={styles.text}>{usefulKnowledgeText}</Text>
            </View>
        </ScrollView>
    );
}

function AdminContent({usefulKnowledgeText, textId}) {
    const [edit, setEdit] = useState(false);

    const handleDoneEdit = () => setEdit(false);

    if (edit) {
        return(
            <ScrollView>
                <View style={styles.paragraphForm}>
                    <ParagraphForm textId={textId} initialText={usefulKnowledgeText} handleDoneEdit={handleDoneEdit}/>
                </View>
            </ScrollView>
        );
    } else {
        return(
            <ScrollView>
                <View style={globalStyles.blockText}>
                    <Text style={styles.text}>{usefulKnowledgeText}</Text>
                </View>

                <View style={styles.updateBtn}>
                    <Button title='Edit' onPress={() => setEdit(true)}/>
                </View>
            </ScrollView>
        );
    }
}

function ParagraphForm({initialText, textId, handleDoneEdit}) {
    const[text, setText] = useState(initialText);

    return (
        <Formik
            initialValues={{text: text}}
            onSubmit={(values) => {
                const paragraphRef = doc(db, 'preventCrisis', textId);
                setText(values);
                updateDoc(paragraphRef, {
                    text: values.text
                })
                .then(handleDoneEdit())
                .catch((err) => console.log(err));
            }}
        >

            {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.paragraphForm}>
                    <TextInput style={styles.inputField}
                        multiline={true}
                        minHeight={60}
                        textAlign={'center'}
                        onChangeText={handleChange('text')}
                        onBlur={handleBlur('text')}
                        value={values.text}
                    />
                    <View style={styles.updateBtn}>
                        <Button title='Update Paragraph' onPress={handleSubmit}/>
                    </View>

                    <View style={styles.closeBtn}>
                        <Button title='Close' color='grey' onPress={handleDoneEdit}/>
                    </View>
            </View>
            )}

        </Formik>
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
    inputField: {
        fontSize: 18,
        backgroundColor: "#FFFFFF",
    },
    paragraphForm: {
        backgroundColor: "#FFFFFF",
    },
    updateBtn: {
        marginHorizontal: 100,
        marginTop: 20,
    },
    closeBtn: {
        marginHorizontal: 120,
        marginTop: 20,
    },
});

