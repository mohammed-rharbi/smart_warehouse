import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Button, TextInput,Card , useTheme , Title, HelperText } from 'react-native-paper';
import { useAPP } from '@/context/appContext';
import { useAuth } from '@/context/authContext';
import { router, useLocalSearchParams } from 'expo-router';


type FormErrors = {
    name?: string;
    type?: string;
    supplier?: string;
    price?: number;
    solde?: number;
    image?: string;
  };
  

const CreateProductPage = () => {


  const {id} = useLocalSearchParams()

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState(0);
  const [solde, setSolde] = useState(0);
  const [image, setImage] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});

  const { getOneProducts , updateProduct } = useAPP();
  const {user}= useAuth()

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!price) newErrors.price = 'Price is required';
    if (!solde) newErrors.solde = 'solde price is required';
    if (!supplier) newErrors.supplier = 'Supplier is required';
    if (!type) newErrors.type = 'Type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const fetchProduct = async ()=>{

    try {

        
        const product = await getOneProducts(id as string)
        setName(product.name);
        setPrice(product.price);
        setSolde(product.solde)
        setImage(product.image)
        setType(product.type);
        setSupplier(product.supplier);
        
    } catch(error) {
        console.log(error);
    }
  }


  useEffect(()=>{

    fetchProduct()
    

  },[id])

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const updatedProduct = {
      name: name,
      type: type,
      supplier: supplier,
      solde: solde,
      price: price,
      image: image,
      editedBy: [{ warehousemanId: user?.id, at: new Date().toISOString() }],
    };

    try {
      await updateProduct(updatedProduct , id);
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
                keyboardType="numeric"            
                left={<TextInput.Icon icon="currency-eur" />}
                theme={{ colors: { onSurface: 'white', text: 'white' } }}

              />
              <TextInput
                label="Sale Price (€)"
                value={solde}
                onChangeText={setSolde}
                style={[styles.input, styles.rowItem]}
                mode="outlined"
                keyboardType="numeric"
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

export default CreateProductPage;
