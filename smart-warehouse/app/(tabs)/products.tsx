import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAPP } from '@/context/appContext';

const ProductsPage = () => {

  const { products, isLoading } = useAPP();
  
  const [searchQuery, setSearchQuery] = useState('');
  

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading inventory...</Text>
      </View>
    );
  }

  const ProductCard = ({ item }: any) => (
    
    <View style={styles.card}>
    <TouchableOpacity
      style={styles.touchableArea}
      onPress={() => router.push(`/ProductDetails?id=${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.solde}>${item.solde}</Text>
        </View>
        <InfoRow icon="tag" text={item.type} />
        <InfoRow icon="truck" text={item.supplier} />
      </View>
    </TouchableOpacity>
    <View style={styles.buttonContainer}>
      <TouchableOpacity     
        style={styles.restockButton}
        onPress={(e) => {
          e.stopPropagation();
          console.log('Restock', item.id);
        }}
      >
        <Text style={styles.buttonText}>Restock</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.unloadButton}
        onPress={(e) => {
          e.stopPropagation();
          console.log('Unload', item.id);
        }}
      >
        <Text style={styles.buttonText}>Unload</Text>
      </TouchableOpacity>
    </View>
  </View>
  );

  return (

    <View style={styles.container}>
      <View style={styles.searchContainer}>

        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>


      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}/>
    </View>
  );
};

const InfoRow = ({ icon, text }:any) => (
  <View style={styles.infoRow}>
    <Feather name={icon} size={14} color="#A0A0A0" />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    marginTop:33,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    height: 40,
  },
  filterContainer: {
    paddingHorizontal: 16,

},
  filterChip: {
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  selectedFilterChip: {
    backgroundColor: '#4A4A4A',
  },
  filterText: {
    color: '#A0A0A0',
    textTransform: 'capitalize',
  },
  selectedFilterText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
//   card: {
//     backgroundColor: '#1E1E1E',
//     borderRadius: 10,
//     marginBottom: 16,
//     padding: 12,
//     flexDirection: 'row',
//     elevation: 2,
//   },
  image: {
    width: 100,
    height: 100,
    marginRight: 12,
    borderRadius: 8,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#FFFFFF',
  },
  priceRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '800',
  },
  solde: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '800',
  },
  oldPrice: {
    fontSize: 14,
    color: '#757575',
    textDecorationLine: 'line-through',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 2,
  },
  infoText: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchableArea: {
    flexDirection: 'row',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 8,
    marginLeft: 8,
  },
  restockButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  unloadButton: {
    backgroundColor: '#F44336',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProductsPage;