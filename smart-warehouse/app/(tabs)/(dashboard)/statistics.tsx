import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { MaterialIcons } from '@expo/vector-icons';
import { getStatistics, updateMostAddedProducts, updateMostRemovedProducts, updateTotalProducts, updateOutOfStock, updateTotalStockValue } from '@/services/statisticas';

const StatisticsScreen = () => {
  const [stats, setStats] = useState(null);
  const [refreshing, setRefreshing] = useState(false);


  const loadStatistics = async () => {
    try {
      const data = await getStatistics();
      setStats(data);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setRefreshing(false);
    }
  };

  
  useEffect(() => {
    loadStatistics();
  }, []);


  const handleRefresh = () => {
    setRefreshing(true);
    loadStatistics();
  };

  if (!stats) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading statistics...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.card}>
          <MaterialIcons name="widgets" size={24} color="#4CAF50" />
          <Text style={styles.cardTitle}>Total Products</Text>
          <Text style={styles.cardValue}>{stats.totalProducts}</Text>
        </View>

        <View style={styles.card}>
          <MaterialIcons name="warning" size={24} color="#FF5722" />
          <Text style={styles.cardTitle}>Low Stock</Text>
          <Text style={styles.cardValue}>{stats.outOfStock}</Text>
        </View>

        <View style={styles.card}>
          <MaterialIcons name="attach-money" size={24} color="#2196F3" />
          <Text style={styles.cardTitle}>Total Value</Text>
          <Text style={styles.cardValue}>${stats.totalStockValue.toLocaleString()}</Text>
        </View>
      </ScrollView>


      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Most Added Products</Text>
        <FlatList
          data={stats.mostAddedProducts}
          keyExtractor={item => item.productId}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.stockInfo}>
                Added {item.addedCount} times
              </Text>
              <Text style={styles.timestamp}>
                Last added: {item.lastAddedAt}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Most Removed Products</Text>
        <FlatList
          data={stats.mostRemovedProducts}
          keyExtractor={item => item.productId}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.stockWarning}>
                Removed {item.removedCount} times
              </Text>
              <Text style={styles.timestamp}>
                Last removed: {item.lastRemovedAt}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  chart: {
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  listContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productName: {
    fontSize: 16,
    color: '#333',
  },
  stockWarning: {
    color: '#FF5722',
    fontSize: 14,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockInfo: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 4,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
});

export default StatisticsScreen;