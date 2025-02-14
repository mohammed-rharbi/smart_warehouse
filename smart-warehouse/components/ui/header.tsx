import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';



  const Header = ({title , route}:any) => {

  return (

    
    <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={()=> router.back()}>
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <TouchableOpacity style={styles.editButton} onPress={()=> router.push(route)}>
      <MaterialCommunityIcons name="pencil" size={24} color="#4CAF50" />
    </TouchableOpacity>
  </View>
  
)
}


const styles = StyleSheet.create({

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    editButton: {
      padding: 8,
    },
  
  });

  
export default Header