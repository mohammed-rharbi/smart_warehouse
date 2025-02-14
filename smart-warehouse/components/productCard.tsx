import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons , Feather } from '@expo/vector-icons';
import { Stock } from "@/lib/types";


export const ProductCard = ({ item }: any) => {

    return (

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
  </View>

    )
};

export const InfoRow = ({ icon, text }:any) => (
    <View style={styles.infoRow}>
      <Feather name={icon} size={14} color="#A0A0A0" />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
  

const styles = StyleSheet.create({

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
});
