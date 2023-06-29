import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Platform } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler'

const GoEvent = (props) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [open, setOpen] = useState(false);

    const handleChangeValue = (item) => {
        setSelectedValue(item.value);
        setOpen(false);
    };

    return (

        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Evenements
                </Text>
            </View>
            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={open}
                    value={selectedValue}
                    items={[
                        { label: 'M', value: 'ASSO_DES_ZUBY' },
                        { label: 'B', value: 'option2' },
                        { label: 'M', value: 'option3' },
                    ]}
                    placeholder='M1'
                    setOpen={setOpen}
                    setValue={setSelectedValue}
                    containerStyle={{ height: "auto", width: 100 }}

                    onChangeItem={handleChangeValue}
                    dropDownContainerStyle={{ width: 100 }}
                />
            </View>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                <TouchableOpacity onPress={() => Navigation.navigate}>
                    <View style={styles.boxContainer}>

                        <View style={styles.headerContainer}>
                            <Text style={props.headerSpacing}>Catégorie : {props.categoryName}</Text>
                        </View>
                        <View style={styles.subContainer}>
                            <Text>{props.eventCity}QUIMPER
                            </Text>
                            <Text>{props.eventName}EASIER TOUR</Text>
                            <Text>{props.eventAdress}9 Place de la mairie</Text>
                            <Text>{props.eventDate}23/06/2023</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Navigation.navigate}>
                    <View style={styles.boxContainer}>

                        <View style={styles.headerContainer}>
                            <Text style={props.headerSpacing}>Catégorie : {props.categoryName}</Text>
                        </View>
                        <View style={styles.subContainer}>
                            <Text>{props.eventCity}QUIMPER
                            </Text>
                            <Text>{props.eventName}EASIER TOUR</Text>
                            <Text>{props.eventAdress}9 Place de la mairie</Text>
                            <Text>{props.eventDate}23/06/2023</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Navigation.navigate}>
                    <View style={styles.boxContainer}>

                        <View style={styles.headerContainer}>
                            <Text style={props.headerSpacing}>Catégorie : {props.categoryName}</Text>
                        </View>
                        <View style={styles.subContainer}>
                            <Text>{props.eventCity}QUIMPER
                            </Text>
                            <Text>{props.eventName}EASIER TOUR</Text>
                            <Text>{props.eventAdress}9 Place de la mairie</Text>
                            <Text>{props.eventDate}23/06/2023</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Navigation.navigate}>
                    <View style={styles.boxContainer}>

                        <View style={styles.headerContainer}>
                            <Text style={props.headerSpacing}>Catégorie : {props.categoryName}</Text>
                        </View>
                        <View style={styles.subContainer}>
                            <Text>{props.eventCity}QUIMPER
                            </Text>
                            <Text>{props.eventName}EASIER TOUR</Text>
                            <Text>{props.eventAdress}9 Place de la mairie</Text>
                            <Text>{props.eventDate}23/06/2023</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Navigation.navigate}>
                    <View style={styles.boxContainer}>

                        <View style={styles.headerContainer}>
                            <Text style={props.headerSpacing}>Catégorie : {props.categoryName}</Text>
                        </View>
                        <View style={styles.subContainer}>
                            <Text>{props.eventCity}QUIMPER
                            </Text>
                            <Text>{props.eventName}EASIER TOUR</Text>
                            <Text>{props.eventAdress}9 Place de la mairie</Text>
                            <Text>{props.eventDate}23/06/2023</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </ScrollView>

        </SafeAreaView >


    )
}

export default GoEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
        flexDirection: "column",
        backgroundColor: "#ffffff",
        alignItems: "center",
        color: "#ffffff",

    },

    boxContainer: {
        width: 295,
        height: 153,
        borderRadius: 10,
        backgroundColor: "#79BFFF",
        marginBottom: 20

    },


    headerSpacing: {
        padding: 5
    },
    headerContainer: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: "#EEEEEE",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    subContainer: {
        padding: 20,
        gap: 2,

    },
    title: {
        color: "#121212",
        fontWeight: 'bold',
        height: 40,
        width: 330,
        fontSize: 30,
        marginTop: 60,
		marginBottom: 20
    },
    dropdownContainer: {
        paddingRight: 10,
        paddingBottom: 30,
        alignSelf: "flex-end",
        zIndex: 10
    }




})