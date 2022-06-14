import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import ResourcesStack from './resourcesStack';
import LifeBoxStack from './lifeboxStack';
import AssistanceStack from './assistanceStack';
import HealthStack from './healthStack';
import SafetyPlanStack from './safetyPlanStack';

import { StyleSheet, Image, View } from 'react-native';
import React from 'react';

const { Navigator, Screen } = createMaterialBottomTabNavigator();

export default function BottomTab() {

    return (
        <Navigator initialRouteName='Resources Tab' activeColor='#444'
            barStyle={{
                backgroundColor: '#FFFFFF',
                alignItems: "center",
                justifyContent: 'center',
                activeTintColor: '#D5EBF7',
                // height: 55,
            }}>
            <Screen name='Resources Tab' component={ResourcesStack} options={{
                title: 'Resources',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <View style={styles.tab}>
                    
                                <Image source={require('../assets/icons/energy-sport-drinkkk.png')} 
                                    style={styles.pressedIcon} />
                                <View style={styles.hover} />
                            </View>
                        );
                    } else {
                        return (  
                            <Image source={require('../assets/icons/energy-sport-drink.png')} 
                                style={styles.unpressedIcon} />
                        );
                    }
                },
                }
            }/>

            <Screen name='Life Box Tab' component={LifeBoxStack} options={{
                title: 'Life Box',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <View style={styles.tab}>
                    
                                <Image source={require('../assets/icons/gift-box--v2.png')} 
                                    style={styles.pressedBox} />
                                <View style={styles.hover} />
                            </View>
                        );
                    } else {
                        return (  
                            <Image source={require('../assets/icons/open-box.png')} 
                                style={styles.unpressedIcon} />
                        );
                    }
                },
                }
            }/>

            <Screen name='Assistance Tab' component={AssistanceStack} options={{
                title: 'Assistance',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <View style={styles.tab}>
                    
                                <Image source={require('../assets/icons/trust--v2.png')} 
                                    style={styles.pressedIcon} />
                                <View style={styles.hover} />
                            </View>
                        );
                    } else {
                        return (  
                            <Image source={require('../assets/icons/stethoscope.png')} 
                                style={styles.unpressedIcon} />
                        );
                    }
                },
                }
            }/>

            <Screen name='Health Tab' component={HealthStack} options={{
                title: 'Health',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <View style={styles.tab}>
                    
                                <Image source={require('../assets/icons/dumbbell--v2.png')} 
                                    style={styles.pressedIcon} />
                                <View style={styles.hover} />
                            </View>
                        );
                    } else {
                        return (  
                            <Image source={require('../assets/icons/golf-clubs.png')} 
                                style={styles.unpressedIcon} />
                        );
                    }
                },
                }
            }/>

            <Screen name='SafetyPlan Tab' component={SafetyPlanStack} options={{
                title: 'Safety Plan',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <View style={styles.tab}>
                    
                                <Image source={require('../assets/icons/lifebuoyyy.png')} 
                                    style={styles.pressedIcon} />
                                <View style={styles.hover} />
                            </View>
                        );
                    } else {
                        return (  
                            <Image source={require('../assets/icons/lifebuoyyyy.png')} 
                                style={styles.unpressedIcon} />
                        );
                    }
                },
                }
            }/>

        </Navigator>
    );
}

const styles = StyleSheet.create({

    pressedIcon: {
        position: 'absolute',
        resizeMode: 'center',
        justifyContent: "center",
        alignItems: "center",
        height: 28,
        width: 28,
    },

    pressedBox: {
        position: 'absolute',
        resizeMode: 'center',
        justifyContent: "center",
        alignItems: "center",
        height: 26,
        width: 26,
        marginTop: -2
    },

    unpressedIcon: {
        resizeMode: 'center',
        alignItems: "center",
        flex: 1,
        height: '200%',
        width: '100%',
        padding: 15,      
    },

    hover: {
        backgroundColor: '#D5EBF7',
        height: 100,
        width: 100,
        alignItems: "center",
        position: 'absolute',
        top: -10,
        opacity: 0.25,
    },

    tab: {
        alignItems: "center",
    },
});
