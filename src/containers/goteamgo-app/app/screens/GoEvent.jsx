import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import GoButtonEvent from '../components/GoButtonEvent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoEvent = (props) => {
  const IP = '10.49.34.144';

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState([])

  const navigation = useNavigation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://${IP}:5000/get_events`);
        const get_token = await AsyncStorage.getItem('userToken');
        setToken(get_token);
        const data = await response.json();
        setEvents(data);

        const uniqueCategories = [...new Set(data.map((event) => event.categorie))];
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
    ? events.filter((event) => event.categorie === selectedCategory)
    : events;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Événements</Text>
      </View>
      <View style={styles.filterContainer}>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={open}
            value={selectedCategory}
            items={[
              { label: 'Filtrer', value: null },
              ...categories.map((category) => ({ label: category, value: category })),
            ]}
            placeholder="Filtrer"
            setOpen={setOpen}
            setValue={setSelectedCategory}
            containerStyle={{ height: 'auto', width: '100%' }}
            onChangeItem={handleChangeValue}
            dropDownContainerStyle={{ width: '100%', zIndex: 2 }}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            onPress={() => navigation.navigate('GoChoixAction', { eventId: event.id, token: token})}
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
      <View style={styles.buttonContainer}>
        <GoButtonEvent
          style={styles.goButtonEvent}
          btnTxt="Créer un événement"
          onPress={() => navigation.navigate('GoCreateEvent')}
        />
      </View>
    </SafeAreaView>
  );
};

export default GoEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 40,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    color: '#ffffff',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#121212',
    fontWeight: 'bold',
    height: 40,
    width: 350,
    fontSize: 30,
    marginTop: 30,
    marginBottom: 20,
  },
  filterContainer: {
    width: 370,
    paddingLeft: 10,
    marginBottom: 15,
    position: 'relative',
    zIndex: 2,
  },
  dropdownContainer: {
    flex: 1,
    marginRight: 10,
    marginBottom: 60
  },
  scrollContainer: {
    flex: 1,
    width: 350,
  },
  boxContainer: {
    height: 153,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerSpacing: {
    padding: 5,
    color: '#ffffff',
  },
  headerContainer: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#79BFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  subContainer: {
    padding: 20,
    gap: 2,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },
  goButtonEvent: {
    width: 350,
    height: 52,
    borderWidth: 2,
    color: "#79BFFF",
    borderColor: '#79BFFF',
  },
});
