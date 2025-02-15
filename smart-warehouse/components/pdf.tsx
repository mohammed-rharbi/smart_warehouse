import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Feather } from '@expo/vector-icons';
import { Product } from '@/lib/types';

interface ExportPDFButtonProps {
  product: Product;
  buttonStyle?: 'icon' | 'full';
}

const ExportPDFButton = ({ product, buttonStyle = 'full' }: ExportPDFButtonProps) => {
  const generatePDFContent = () => {
    const stocksHTML = product.stocks?.map(stock => `
      <div style="margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
        <h3 style="color: #333;">${stock.name}</h3>
        <p>Quantity: ${stock.quantity}</p>
        <p>Location: ${stock.localisation.city}</p>
      </div>
    `).join('') || '<p>No stock available</p>';

    return `
      <html>
        <body style="padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #4CAF50;">${product.name}</h1>
          <div style="margin: 20px 0;">
            <img src="${product.image}" style="max-width: 300px; height: auto;" />
          </div>
          <div style="margin: 20px 0;">
            <h2>Product Details</h2>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Sale Price:</strong> $${product.solde}</p>
            <p><strong>Supplier:</strong> ${product.supplier}</p>
          </div>
          <div style="margin: 20px 0;">
            <h2>Stock Information</h2>
            ${stocksHTML}
          </div>
        </body>
      </html>
    `;
  };

  const exportToPDF = async () => {
    try {
      const html = generatePDFContent();
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false
      });

      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `${product.name} Details`
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (buttonStyle === 'icon') {
    return (
      <TouchableOpacity onPress={exportToPDF} style={styles.iconButton}>
        <Feather name="download" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={exportToPDF} style={styles.button}>
      <Feather name="download" size={20} color="#FFFFFF" />
      <Text style={styles.buttonText}>Export PDF</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  iconButton: {
    padding: 12,
    marginTop:18,
  },
});

export default ExportPDFButton;