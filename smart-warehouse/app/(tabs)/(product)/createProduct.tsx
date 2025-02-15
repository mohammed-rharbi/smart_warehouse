import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity , Text } from 'react-native';
import { Button, TextInput,Card , useTheme , Title, HelperText } from 'react-native-paper';
import { useAPP } from '@/context/appContext';
import { useAuth } from '@/context/authContext';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';



type FormErrors = {
    name?: string;
    type?: string;
    barcode?: string;
    supplier?: string;
    price?: number;
    solde?: number;
    image?: string;
  };
  

const CreateProductPage = () => {


  const {Bcode} = useLocalSearchParams()

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [barcode, setBarcode] = useState(Bcode);
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState('');
  const [solde, setSolde] = useState('');
  const [image, setImage] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});

  const { createProduct } = useAPP();
  const { user } = useAuth();

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!barcode) newErrors.barcode = 'Invalid barcode';
    if (!price) newErrors.price = 'Price is required';
    if (!solde) newErrors.solde = 'Price is required';
    if (!supplier) newErrors.supplier = 'Supplier is required';
    if (!type) newErrors.type = 'Type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(()=>{

    setBarcode(Bcode || '')

  },[Bcode])

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newProduct = {
      name: name,
      type: type,
      supplier: supplier,
      solde: solde,
      price: price,
      image: image,
      barcode: barcode,
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>New Product Entry</Title>

            <View style={styles.barcodeContainer}>
            <TextInput
              label="Barcode *"
              value={barcode}
              onChangeText={setBarcode}
              error={!!errors.barcode}
              style={styles.barcodeInput}
              left={<TextInput.Icon icon="barcode" />}
              theme={{ colors: { onSurface: 'white', text: 'white' } }}
            />
            <TouchableOpacity style={styles.actionCard} onPress={()=> router.push('/barcodeScanner')}>
            <MaterialCommunityIcons name="barcode-scan" size={32} color="#9C27B0" />
            </TouchableOpacity>
           </View>
            <HelperText type="error" visible={!!errors.barcode}>
              {errors.barcode}
            </HelperText>

            <TextInput
              label="Product Name *"
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

            <View style={styles.row}>
              <TextInput
                label="Category *"
                value={type}
                onChangeText={setType}
                error={!!errors.type}
                style={[styles.input, styles.rowItem]}
                mode="outlined"
                left={<TextInput.Icon icon="format-list-bulleted" />}
                theme={{ colors: { onSurface: 'white', text: 'white' } }}

              />
              <TextInput
                label="Supplier *"
                value={supplier}
                onChangeText={setSupplier}
                error={!!errors.supplier}
                style={[styles.input, styles.rowItem]}
                mode="outlined"
                left={<TextInput.Icon icon="truck-delivery" />}
                theme={{ colors: { onSurface: 'white', text: 'white' } }}

              />
            </View>

            <View style={styles.row}>
              <TextInput
                label="Price (€) *"
                value={price}
                onChangeText={setPrice}
                error={!!errors.price}
                style={[styles.input, styles.rowItem]}
                mode="outlined"
                keyboardType="decimal-pad"
            
                left={<TextInput.Icon icon="currency-eur" />}
                theme={{ colors: { onSurface: 'white', text: 'white' } }}

              />
              <TextInput
                label="Sale Price (€)"
                value={solde}
                onChangeText={setSolde}
                style={[styles.input, styles.rowItem]}
                mode="outlined"
                keyboardType="decimal-pad"
                left={<TextInput.Icon icon="sale" />}
                theme={{ colors: { onSurface: 'white', text: 'white' } }}

              />
            </View>

            <TextInput
              label="Image URL"
              value={image}
              onChangeText={setImage}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="image" />}
              theme={{ colors: { onSurface: 'white', text: 'white' } }}
            />

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              icon="check-circle"
            >
              Create Product
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
  barcodeInput: {
    marginBottom: 3,
    width:'78%',
    backgroundColor:'#1A1A1A',
    color: 'white',
    outlineColor:'white'
  },

  barcodeContainer: {
    flexDirection: 'row',
    gap:12,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 8,
    marginLeft: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
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

  scan: {
    flex: 1,
    alignItems:'center',
    marginTop:20
  },

  actionCard: {

    backgroundColor: '#2D2D2D',
    padding: 10,
    borderRadius: 15,
    marginBlock:3,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    marginTop: 5,
    fontWeight: '600',
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

export default CreateProductPage;
