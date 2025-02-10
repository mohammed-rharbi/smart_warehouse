import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LandingScreen = () => {



  const router = useRouter()

  return (
    
    <LinearGradient colors={['#6366f1', '#4338ca']} style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="cube" size={120} color="white" />
        <Text style={styles.title}>StockMaster</Text>
        <Text style={styles.subtitle}>Smart Inventory Management</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 100,
  },
  title: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e7ff',
    marginTop: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LandingScreen;