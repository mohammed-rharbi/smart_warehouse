import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity , ActivityIndicator } from 'react-native';
import { useAPP } from '@/context/appContext';
import { Product } from '@/lib/types';
import { Feather , MaterialIcons} from '@expo/vector-icons';
import Header from '@/components/ui/header';
import { UpdateQuantity } from '@/services/products';
import ExportPDFButton from '@/components/pdf';

const ProductDetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { getOneProducts } = useAPP();

  const fetchProduct = async () => {
    try {
      const res = await getOneProducts(id as string);

      setProduct(res);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    fetchProduct();
  }, [id]);

  const handleQuantity = async (type: 'add'|'remove' , productId: string , stockId:string )=>{

    try{

      await UpdateQuantity(type , productId , stockId);


    }catch(error){
      console.log(error);
      
    }finally{
      fetchProduct()
    }
    
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const getQuantityColor = (quantity:any) => {
    if (quantity < 5) {
      return 'red'; 
    } else if (quantity < 10) {
      return 'yellow'; 
    } else {
      return 'green';
    }
  };

  return (
    <ScrollView style={styles.container}>

        <View style={styles.headerContainer}>
            <Header title={product.name} route={`/updateProduct?id=${product.id}`}></Header>
        </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
      </View>

      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>Price : ${product.price}</Text>
          <Text style={styles.productPrice}>_</Text>
          <Text style={styles.productSolde}>Sale Price : ${product.solde}</Text>

        </View>

        <View style={styles.infoRow}>
          <Feather name="package" size={18} color="#A0A0A0" />
          <Text style={styles.productSupplier}>{product.supplier}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Stock Information</Text>
          <Feather name="box" size={20} color="#A0A0A0" />
        </View>

            {product.stocks?.length === 0 ? (

            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={styles.stockText}>No stock available</Text>
            </View>
            ) : (
            product.stocks.map((stock) => (
                
                
                <View key={stock.id} style={styles.stockItem}>
                <View style={styles.sectionHeader}>
                <Text style={styles.stockName}>{stock.name}</Text>
                <Feather name="disc" size={20} color={getQuantityColor(stock.quantity)} />
                </View>
                <View style={styles.stockInfoRow}>
                    <Feather name="database" size={14} color="#4CAF50" />
                    <Text style={styles.stockText}>Quantity: {stock.quantity}</Text>
                    <View style={styles.buttonContainer}>

                      <TouchableOpacity onPress={()=> handleQuantity('add' , product.id , stock.id)}  >
                        <MaterialIcons name="add-shopping-cart" size={22} color="#4CAF50" />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=> handleQuantity('remove' , product.id , stock.id)}  >
                        <MaterialIcons name="remove-shopping-cart" size={22} color="#F44336" />
                      </TouchableOpacity>

                  </View>
                </View>
                <View style={styles.stockInfoRow}>
                    <Feather name="map-pin" size={14} color="#4CAF50" />
                    <Text style={styles.stockText}>{stock.localisation.city}</Text>
                </View>

                </View>
            ))
            )}

                <View style={{ marginTop: 20, alignItems: 'center' }}>
                <TouchableOpacity style={styles.addButton} onPress={()=> router.push(`/addStock?id=${product.id}`)} >
                <Text style={styles.addButtonText}>Add Stock</Text>
                </TouchableOpacity>     
          
                <ExportPDFButton product={product} buttonStyle='icon' />              
                </View>


                

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 18,
  },

  quantity: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '800',
    marginLeft:5,
    paddingBlock:5

  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 22,
    marginLeft: 130,

  },
  iconContainer: {
    gap: 16,
  },
  
  headerContainer: {
    paddingTop:35,
  },

  imageContainer: {
    backgroundColor: '#1E1E1E',
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: '800',
  },
  productSolde: {

    color: '#757575',
    fontSize: 20,
    fontWeight: '800',
},
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  productSupplier: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stockItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  stockName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  stockInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  stockText: {
    color: '#A0A0A0',
    fontSize: 14,
  },

  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ProductDetailsPage;