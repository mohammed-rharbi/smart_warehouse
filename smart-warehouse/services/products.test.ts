import apiClient from '@/lib/apiClient';
import { fetchProduct, fetchSinglProduct, UpdateQuantity } from './products';

jest.mock('@/lib/apiClient');

describe('Product API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchProduct', () => {
    it('should return products', async () => {
      const mockProducts = [{ id: '1', name: 'Test' }];
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockProducts });

      const result = await fetchProduct();
      expect(result).toEqual(mockProducts);
    });

    it('should handle API errors', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue(new Error('error while fetching the products'));

      await expect(fetchProduct()).rejects.toThrow('error while fetching the products');
    });

});

  describe('fetchSingleProduct', () => {
    it('should return a single product when found', async () => {
      const mockProduct = { id: '1', name: 'Single Product' };
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: [mockProduct] });

      const result = await fetchSinglProduct('1');
      expect(result).toEqual(mockProduct);
      expect(apiClient.get).toHaveBeenCalledWith('products?id=1');
    });

    it('should throw an error when product not found', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: [] });

      await expect(fetchSinglProduct('1')).rejects.toThrow('error while fetching the product');
    });

    it('should handle API errors', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue(new Error('error while fetching the product'));

      await expect(fetchSinglProduct('1')).rejects.toThrow('error while fetching the product');
    });
  });

  describe('UpdateQuantity', () => {
    const mockProduct = {
      id: 'prod1',
      stocks: [
        { id: 'stock1', quantity: 5 },
        { id: 'stock2', quantity: 3 },
      ],
    };

    beforeEach(() => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockProduct });
      (apiClient.patch as jest.Mock).mockResolvedValue({ data: {} });
    });

    it('should handle API errors', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue(new Error('Product or stocks not found'));

      await expect(UpdateQuantity('add', 'prod1', 'stock1')).rejects.toThrow('Error updating quantity');
    });

    it('should update quantity correctly', async () => {
      const updatedStock = { id: 'stock1', quantity: 6 };
      (apiClient.patch as jest.Mock).mockResolvedValueOnce({ data: updatedStock });

      const result = await UpdateQuantity('add', 'prod1', 'stock1');
      expect(result).toEqual(updatedStock);
      expect(apiClient.patch).toHaveBeenCalledWith('/products/prod1', {
        stocks: [
          { id: 'stock1', quantity: 6 },
          { id: 'stock2', quantity: 3 }
        ]
      });
          });
  });
});
