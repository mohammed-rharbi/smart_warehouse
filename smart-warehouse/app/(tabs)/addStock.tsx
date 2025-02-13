import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Button, TextInput,Card , useTheme , Title, HelperText } from 'react-native-paper';
import { useAPP } from '@/context/appContext';
import { useAuth } from '@/context/authContext';
import { router, useLocalSearchParams } from 'expo-router';


type FormErrors = {
    name?: string;
    city?: string;
    quantity?: string;
    latitude?: string;
    longitude?: string;
  };
  

const AddProductStock = () => {

  const {id} = useLocalSearchParams(); 

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [quantity, setQuantity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});


  const { createProductStock } = useAPP();
  const { user } = useAuth();

  const validateForm = () => {

    const newErrors: FormErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!city) newErrors.city = 'Invalid barcode';
    if (!quantity) newErrors.quantity = 'Price is required';
    if (!latitude) newErrors.latitude = 'Supplier is required';
    if (!longitude) newErrors.longitude = 'Type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newProductStock = {

      id: Math.floor(Math.random() * 10000),
      name: name,
      quantity: quantity,
      localisation: {
        city: city ,
        latitude: latitude,
        longitude: longitude,
      },
    };
    

    try {   
      await createProductStock(newProductStock , id as string);
      router.push(`/ProductDetails?id=${id}`);
    } catch (error) {
      console.error('Error creating  product stock :', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>New Product Stock Entry</Title>

          
            <TextInput
              label="Stock Name *"
              value={name}
              onChangeText={setName}
              error={!!errors.name}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="tag" />}
              theme={{ colors: { onSurface: 'white', text: 'white' } }}

            />
            <HelperText type="error" visible={!!errors.name}>
              {errors.name}
            </HelperText>


                
            <TextInput
              label="Product quantity *"
              value={quantity}
              onChangeText={setQuantity}
              error={!!errors.quantity}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="tag" />}
              theme={{ colors: { onSurface: 'white', text: 'white' } }}

            />
            <HelperText type="error" visible={!!errors.quantity}>
              {errors.quantity}
            </HelperText>
    

            <TextInput
              label="city *"
              value={city}
              onChangeText={setCity}
              error={!!errors.city}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="tag" />}
              theme={{ colors: { onSurface: 'white', text: 'white' } }}

            />
            <HelperText type="error" visible={!!errors.city}>
              {errors.city}
            </HelperText>


            <TextInput
              label="latitude *"
              value={latitude}
              onChangeText={setLatitude}
              error={!!errors.latitude}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="tag" />}
              theme={{ colors: { onSurface: 'white', text: 'white' } }}

            />
            <HelperText type="error" visible={!!errors.latitude}>
              {errors.latitude}
            </HelperText>


            <TextInput
              label="longitude *"
              value={longitude}
              onChangeText={setLongitude}
              error={!!errors.longitude}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="tag" />}
              theme={{ colors: { onSurface: 'white', text: 'white' } }}

            />
            <HelperText type="error" visible={!!errors.longitude}>
              {errors.longitude}
            </HelperText>


            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              icon="check-circle">
              add Product Stock
            </Button>

          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

},
  scrollContent: {
    padding: 16,
    minHeight: '100%',
    color: 'white'
  },
  card: {
    borderRadius: 16,
    elevation: 4,
    marginTop:45,
    backgroundColor:'#1A1A1A',
  },
  title: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: '600',
    color:'white',
  },
  input: {
    marginBottom: 16,
    backgroundColor:'#1A1A1A',
    color: 'white',
    outlineColor:'white'

  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  rowItem: {
    flex: 1,
  },
  button: {
    marginTop: 24,
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 2,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  formError: {
    textAlign: 'center',
    marginTop: 16,
  },
});

export default AddProductStock;
