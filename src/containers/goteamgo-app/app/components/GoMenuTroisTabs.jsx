import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { GOTEAMGO } from "../themes/Gotheme"

function GoMenuTroisTabs({ style, selectedSection, onSectionChange }) {
  const handleSectionPress = (sectionName) => {
    onSectionChange(sectionName);
    console.log('Trajet : ', sectionName);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer2}>
        <Text style={styles.additionalText}>Quel type de trajet vous intéresse ?</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[
            styles.segmentTextWrapper1,
            selectedSection === 'Aller' && styles.selectedSegment,
          ]}
          onPress={() => handleSectionPress('Aller')}
        >
          <Text style={[styles.text1, selectedSection === 'Aller' && styles.selectedText]}>
            Aller
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentTextWrapper2,
            selectedSection === 'Retour' && styles.selectedSegment,
          ]}
          onPress={() => handleSectionPress('Retour')}
        >
          <Text style={[styles.text2, selectedSection === 'Retour' && styles.selectedText]}>
            Retour
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentTextWrapper3,
            selectedSection === 'Aller-retour' && styles.selectedSegment,
          ]}
          onPress={() => handleSectionPress('Aller-retour')}
        >
          <Text style={[styles.text3, selectedSection === 'Aller-retour' && styles.selectedText]}>
            Aller-retour
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.additionalText}>Quel est le nombre de sièges libres ?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    height: 30,
  },
  segmentTextWrapper1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderWidth: 1,
    borderColor: GOTEAMGO.primary,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  text1: {
    fontSize: 15,
    color: GOTEAMGO.primary,
  },
  segmentTextWrapper2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderWidth: 1,
    borderColor: GOTEAMGO.primary,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  text2: {
    fontSize: 15,
    color: GOTEAMGO.primary,
  },
  segmentTextWrapper3: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderWidth: 1,
    borderColor: GOTEAMGO.primary,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  text3: {
    fontSize: 15,
    color: GOTEAMGO.primary,
  },
  selectedSegment: {
    backgroundColor: GOTEAMGO.primary,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  textContainer: {
    paddingHorizontal: 30,
    marginTop: 35,
  },
  textContainer2: {
    paddingHorizontal: 30,
    marginBottom: 25
  },
  additionalText: {
    color: '#121212',
    fontSize: 20,
  },
});

export default GoMenuTroisTabs;
