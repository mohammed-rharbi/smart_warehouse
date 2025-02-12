import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAPP } from '@/context/appContext';

const ProductsPage = () => {

  const { products, isLoading } = useAPP();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'electronics', 'clothing', 'furniture', 'on sale'];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading inventory...</Text>
      </View>
    );
  }

 
  const ProductCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/ProductDetails?id=${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          {/* {item.solde && <Text style={styles.oldPrice}>${item.solde}</Text>} */}
        </View>
        <InfoRow icon="tag" text={item.type} />
        <InfoRow icon="truck" text={item.supplier} />
      </View>
    </TouchableOpacity>
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
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedCategory === item && styles.selectedFilterChip
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[
              styles.filterText,
              selectedCategory === item && styles.selectedFilterText
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
      />

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
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
    paddingBottom: 8,
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
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
    flexDirection: 'row',
    elevation: 2,
  },
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
});

export default ProductsPage;