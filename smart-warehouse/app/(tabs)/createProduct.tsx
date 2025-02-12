import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { useAPP } from '@/context/appContext';
import { useAuth } from '@/context/authContext';
import { router, useLocalSearchParams } from 'expo-router';

const CreateProductPage = () => {


  const {Bcode} = useLocalSearchParams()


  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [barcode, setBarcode] = useState(Bcode);
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState('');
  const [solde, setSolde] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});


  const { createProduct } = useAPP();
  const { user } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!barcode) newErrors.barcode = 'Invalid barcode';
    if (!price) newErrors.price = 'Price is required';
    if (!supplier) newErrors.supplier = 'Supplier is required';
    if (!type) newErrors.type = 'Type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newProduct = {
      name,
      type,
      supplier,
      sold: solde,
      price,
      image,
      barcode,
      stocks: [],
      editedBy: [{ warehousemanId: user?.id, at: new Date().toISOString() }],
    };

    try {
      await createProduct(newProduct);
      router.back();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          label="Barcode (13 digits)"
          value={barcode}
          onChangeText={setBarcode}
          error={!!errors.barcode}
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.barcode}>
          {errors.barcode}
        </HelperText>


        <TextInput
          label="Product Name"
          value={name}
          onChangeText={setName}
          error={!!errors.name}
          style={styles.input}
          mode="outlined"
        />
        <HelperText type="error" visible={!!errors.name}>
          {errors.name}
        </HelperText>

        <TextInput
          label="Product Type"
          value={type}
          onChangeText={setType}
          error={!!errors.type}
          style={styles.input}
          mode="outlined"
        />
        <HelperText type="error" visible={!!errors.type}>
          {errors.type}
        </HelperText>

        <View style={styles.row}>
          <TextInput
            label="Price (€)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            error={!!errors.price}
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            mode="outlined"
          />
          <TextInput
            label="Solde Price (€)"
            value={solde}
            onChangeText={setSolde}
            keyboardType="numeric"
            style={[styles.input, { flex: 1, marginLeft: 8 }]}
            mode="outlined"
          />
        </View>
        <HelperText type="error" visible={!!errors.price}>
          {errors.price}
        </HelperText>

        <TextInput
          label="Supplier"
          value={supplier}
          onChangeText={setSupplier}
          error={!!errors.supplier}
          style={styles.input}
          mode="outlined"
        />
        <HelperText type="error" visible={!!errors.supplier}>
          {errors.supplier}
        </HelperText>

        <TextInput
          label="Product Image"
          value={image}
          onChangeText={setImage}
          error={!!errors.image}
          style={styles.input}
          mode="outlined"
        />
        <HelperText type="error" visible={!!errors.image}>
          {errors.image}
        </HelperText>

        {/* <Button mode="contained" onPress={() => }>
          Scan Barcode
        </Button> */}

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Create Product
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 38,
  },
  input: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: '#6200ee',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
});

export default CreateProductPage;
