import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAPP } from '@/context/appContext';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/productCard';

type SortOption = 'name' | 'price' | 'stock' | 'default';
type SortOrder = 'asc' | 'desc';

const ProductsPage = () => {
  const { products, isLoading } = useAPP();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');



  if (!products) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No Project found</Text>
      </View>
    );
  }
  
  const getSortedProducts = () => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'default') return filtered;

    return filtered.sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'price':
          valueA = a.price;
          valueB = b.price;
          break;
        case 'stock':
          valueA = a.stocks.map((item: any)=> item.quantity);
          valueB = b.stocks.map((item: any)=> item.quantity);
          break;
        default:
          return 0;
      }

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSortPress = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('asc');
    }
  };


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading inventory...</Text>
      </View>
    );
  }

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

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'name' && styles.activeSort]}
          onPress={() => handleSortPress('name')}
        >
          <Text style={styles.sortText}>Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}</Text>
        </TouchableOpacity>
        <TouchableOpacity   
          style={[styles.sortButton, sortBy === 'price' && styles.activeSort]}
          onPress={() => handleSortPress('price')}
        >
          <Text style={styles.sortText}>Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'stock' && styles.activeSort]}
          onPress={() => handleSortPress('stock')}
        >
          <Text style={styles.sortText}>Stock {sortBy === 'stock' && (sortOrder === 'asc' ? '↑' : '↓')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getSortedProducts()}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

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
    
    sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 8,
  },
  sortLabel: {
    color: '#A0A0A0',
    marginRight: 4,
  },
  sortButton: {
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  activeSort: {
    backgroundColor: '#4CAF50',
  },
  sortText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default ProductsPage;