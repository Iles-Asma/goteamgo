import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function GoMenuTroisTabs (props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.textWrapper}>
        <TouchableOpacity style={styles.segmentTextWrapper1}>
          <Text style={styles.text1}>Aller</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentTextWrapper2}>
          <Text style={styles.text2}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentTextWrapper3}>
          <Text style={styles.text3}>Aller-retour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  textWrapper: {
    height: 35,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row"
  },
  segmentTextWrapper1: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#79BFFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#79BFFF",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  text1: {
    fontSize: 15,
    color: "#FFFFFF"
  },
  segmentTextWrapper2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#79BFFF",
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
  text2: {
    fontSize: 15,
    color: "#79BFFF"
  },
  segmentTextWrapper3: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#79BFFF",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  text3: {
    fontSize: 15,
    color: "#79BFFF"
  }
});

export default GoMenuTroisTabs ;
