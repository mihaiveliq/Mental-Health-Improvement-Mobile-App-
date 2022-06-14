import { StyleSheet, View, Text, FlatList, Button, Modal, Image } from 'react-native';

import { globalStyles, no_profile_picture } from '../styles/global';

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

export default function Posts({ navigation }) {

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

    const handleAddPost = () => setModalOpen(true);
    const handleUploadPost = () => setModalOpen(false);

    const isAdmin = userInfo => userInfo ? userInfo.isAdmin : false;

    useEffect(
        () => navigation.getParent().addListener('tabPress', (e) => navigation.pop()),
        []
    );
    
    return (
        <View style={globalStyles.container}>

            <Divider style={styles.divider} />

            <AddPostBtnShown isAdmin={isAdmin(userInfo)} handleAddPost={handleAddPost} />

            <Modal visible={modalOpen} animationType='fade'>
                <View style={styles.modalContent}>

                    <MaterialIcons 
                        name='close'
                        size={24}
                        style={styles.modalClose}
                        onPress={() => setModalOpen(false)}
                    />

                    <View style={{marginTop: 20, marginHorizontal: 5}}>
                        <AddPostForm userInfo={userInfo} handleUploadPost={handleUploadPost} />
                    </View>

                </View>
            </Modal>

            <PostsList />

        </View>
    );
}

function AddPostBtnShown({isAdmin, handleAddPost}) {
    if (isAdmin) {
        return (
            <View style={styles.addPostBtn}>
                <Button title='Add Post' onPress={handleAddPost} />
            </View>
        );
    } else {
        return (
            <></>
        );
    }
}

function AddPostForm({userInfo, handleUploadPost}) {

    const addPostSchema = Yup.object().shape({
        imageUrl: Yup.string(),
        caption: Yup.string(),
    });

    const uploadPost = (imageUrl, caption, image) => {
        const postsRef = collection(db, 'posts');
        
        if (imageUrl) {

            const storageRef = ref(storage, imageUrl);

            fetch(image.uri)
            .then(
                (img) => img.blob()
            )
            .then(
                (bytes) => uploadBytes(storageRef, bytes)
            )
            .then(
                () => addDoc(postsRef, {
                    userName: userInfo.name,
                    profilePicture: userInfo.profilePictureUrl,
                    userTitle: userInfo.title,
                    imageUrl: imageUrl,
                    caption: caption,
                    likes: 0,
                    createdAt: serverTimestamp(),
                })
            )
            .then(
                () => handleUploadPost()
            )
            .catch(
                (err) => console.log(err)
            )
        } else {
            addDoc(postsRef, {
                    userName: userInfo.name,
                    profilePicture: userInfo.profilePictureUrl,
                    userTitle: userInfo.title,
                    imageUrl: imageUrl,
                    caption: caption,
                    likes: 0,
                    createdAt: serverTimestamp(),
                }
            )
            .then(
                () => handleUploadPost()
            )
            .catch(
                (err) => console.log(err)
            )
        }
        
    }

    const [image, setImage] = useState(null);

    const pickImage = async (setFieldValue, imageUrlField, imageAspect) => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: imageAspect,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result);           
            setFieldValue(imageUrlField, 'postImages/' + result.uri);
        }
    };
    const [aspectValue, setAspectValue] = useState([3, 3]);

    return (
        <Formik
            initialValues={{ imageUrl: '', caption: '' }}
            onSubmit={values => {
                uploadPost(values.imageUrl, values.caption, image);
            }}
            validationSchema={addPostSchema}
            validateOnMount={true}
        >
            {
            ({ handleBlur, handleChange, handleSubmit, values, setFieldValue }) => (
                <>
                    <View style={styles.addPostContainer}>
                        <View style={styles.addPostPickAspect}>
                            <Text style={{fontSize: 16}}>Pick Aspect: </Text>
                            <Picker
                                selectedValue={aspectValue}
                                style={styles.addPostPicker}
                                onValueChange={(itemValue, itemIndex) => {
                                        let x = parseInt(itemValue[0]);
                                        let y = parseInt(itemValue[1]);

                                        return setAspectValue([x, y]);
                                    }
                                }
                            >
                                <Picker.Item label="3-3" value="33" />
                                <Picker.Item label="3-4" value="34" />
                                <Picker.Item label="4-3" value="43" />
                            </Picker>
                        </View>

                        <View style={styles.addPostUploadImage}>
                            <Text style={{fontSize: 16}}>Upload Image: </Text>
                            <ImageToUpload image={image} pickImage={pickImage} aspectValue={aspectValue} setFieldValue={setFieldValue} imageUrlField='imageUrl' />
                        </View>

                        <View style={styles.addPostCaption}>
                            <TextInput
                                style={{fontSize: 20}}
                                placeholder='Write a caption ...'
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />

                        </View>

                        <View style={styles.addPostSubmitBtn}>
                            <Button title='Add Post' onPress={handleSubmit} />
                        </View>

                    </View>
                </>
            )
            
            }
        </Formik>
    );
}

function ImageToUpload({ image, pickImage, setFieldValue, imageUrlField, aspectValue }) {

    const uploadImageHanndler = () => pickImage(setFieldValue, imageUrlField, aspectValue)

    if (image) {
        return (
            <Text>{image.uri}</Text>
        );
    } else {
        return (
            <Button title='Upload Image' onPress={uploadImageHanndler}/>
        );
    }
}

function PostsList() {

    const [posts, setPosts] = useState([]);

    const postsRef = collection(db, 'posts');
    const descQuery = query(postsRef, orderBy("createdAt", "desc"));

    useEffect(() => {
            const unsubscribe = onSnapshot(descQuery, snapshot => setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
            return unsubscribe;
        },
        []
    );


    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => (
                <PostCard>
                    <Post post={item} />
                </PostCard>
            )}
        />
    );
}

function Post({post}) {

    const [urlStorage, setUrlStorage] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    if (post.imageUrl != "") {

        const urlStorageRef = ref(storage, post.imageUrl);

        useEffect(() => {
            const unsubscribeUrl = getDownloadURL(urlStorageRef)
                .then((imgUrl) => {
                    setUrlStorage(imgUrl);
                    if (post.profilePicture != no_profile_picture['name']) {
                        const profilePictureStorageRef = ref(storage, post.profilePicture);

                        const unsubscribeProfilePicture = getDownloadURL(profilePictureStorageRef)
                            .then((profilePicture) => setUrlStorage({uri: profilePicture}))
                            .catch((err) => console.log(err));
                        
                            return unsubscribeProfilePicture;
                    } else {
                        setProfilePicture(no_profile_picture['picture']);
                    }
                })
                .catch((err) => console.log(err));
            
            return unsubscribeUrl;
        },
        []
        );
    }

    if (urlStorage) {
        return (
            <View style={{flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between', width: "100%"}}>
                <UserIcon profilePicture={profilePicture} />
                <PostContainer image={urlStorage} caption={post.caption} title={post.userTitle} name={post.userName} />
            </View>
        );
    } else {
        return(<></>);
    }
}

function PostCard(props) {
    return (
        <View style={{width: "100%", right: 0}}>
                {props.children}
        </View>
    );
}

function UserIcon({profilePicture}) {

    return (
        <View style={{margin: 5}}>
            <Image source={profilePicture} style={{resizeMode: 'cover', overflow: 'visible', height: 70, width: 70, borderRadius: 50}}/>
        </View>
    );
}

function PostContainer({image, title, name, caption}) {
    return (
        <View style={{width: "100%"}}>       
            <PostHeader title={title} name={name} />
            <PostBody image={image} caption={caption}/>
        </View>
    );
}

function PostHeader({title, name}) {
    return (
        <View style={{marginTop: 5}}>
            <Text style={styles.headerText}>{title} {name}</Text>
        </View>
    );
}

function PostBody({image, caption}) {
    return (
        <View style={{width: "100%", marginTop: -5}}>
            <PostCaption caption={caption}/>
            <PostImage image={image} />
        </View>
    );
}

function PostCaption({caption}) {
    if (caption != "") {
        return(
            <View style={{marginBottom: 5}}>
                <Text style={{fontSize: 14, textAlign: 'justify', marginTop: 10 }}>{caption}</Text>
            </View>
        );
    } else {
        return (<></>);
    }
}

function PostImage({image}) {
    if (image != "") {
        return(
            <View style={{width: "100%"}}>
                <Image source={{uri: image}} style={{resizeMode: 'stretch', overflow: 'visible', height: 380, width: 270, borderRadius: 5, right: 0}}/>
            </View>
        );
    } else {
        return (<></>);
    }
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
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
    }
});
