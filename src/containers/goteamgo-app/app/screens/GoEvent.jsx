import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import GoButtonEvent from '../components/GoButtonEvent'; // Importer GoButtonEvent

const GoEvent = (props) => {

    const IP = "localhost";

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`http://${IP}:5000/get_events`);
                const data = await response.json();
                setEvents(data);

                const uniqueCategories = [...new Set(data.map(event => event.categorie))];
                setCategories(uniqueCategories);

            } catch (error) {
                console.error('Erreur lors de la récupération des événements:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleChangeValue = (item) => {
        setSelectedCategory(item.value);
        setOpen(false);
    };

    const filteredEvents = selectedCategory
        ? events.filter(event => event.categorie === selectedCategory)
        : events;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Evenements
                </Text>
            </View>
            <View style={styles.filterButtonContainer}>
                <View style={styles.dropdownContainer}>
                    <DropDownPicker modal={true}
                        open={open}
                        value={selectedCategory}
                        items={[
                            { label: 'Filtrer', value: null },
                            ...categories.map(category => ({ label: category, value: category }))
                        ]}
                        placeholder='Filtrer'
                        setOpen={setOpen}
                        setValue={setSelectedCategory}
                        containerStyle={{ height: "auto", width: '100%' }}
                        onChangeItem={handleChangeValue}
                        dropDownContainerStyle={{ width: '100%' }}
                    />
                </View>

                <GoButtonEvent
                    style={styles.goButtonEvent}
                    btnTxt="Créer un événement"
                    onPress={() => navigation.navigate('GoCreateEvent')}
                />
            </View>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {filteredEvents.map((event) => (
                    <TouchableOpacity
                        key={event.id}
                        onPress={() => navigation.navigate('GoChoixAction', { eventId: event.id })}
                    >
                        <View style={styles.boxContainer}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerSpacing}>Catégorie : {event.categorie}</Text>
                            </View>
                            <View style={styles.subContainer}>
                                <Text>{event.nom}</Text>
                                <Text>{event.lieu}</Text>
                                <Text>{event.date}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};


export default GoEvent;

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
        marginBottom: 20,
        position: 'relative',
        zIndex: 2
    },
    headerSpacing: {
        padding: 5
    },
    filterButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 295,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    dropdownContainer: {
        flex: 1,
        marginRight: 10
    },
    scrollContainer: {
        flex: 1,
        zIndex: 1,
    },
    goButtonEvent: {
        flex: 2,
        width: '100%',
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
    }
});
