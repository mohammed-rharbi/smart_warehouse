import apiClient from "@/lib/apiClient";
import { Product , Stock} from "@/lib/types";




export const fetchProduct = async () => {

    try {
        const response = await apiClient.get(`products`);

        if (response.data.length > 0) {

            return response.data;
            
        } else {
            throw new Error('no products ben found');
        }
    } catch (error) { 
        throw new Error(' error while fetching the products');
    }
};


export const fetchSinglProduct = async (id: string) => {

    try {
        const response = await apiClient.get(`products?id=${id}`);

        if (response.data.length > 0) {

            return response.data[0];
            
        } else {
            throw new Error('no products ben found');
        }
    } catch (error) { 
        throw new Error(' error while fetching the products');
    }
};  


export const create = async (data : Product)=>{


    try{

        const res = await apiClient.post('products', data);

        if(res.status === 200){

            return res.data

        }else {
            throw new Error('product cannot create ');
        }

    }catch(error){
        throw new Error(' error while creating the product');
    }
}


export const getProductByBarcode = async (code : string)=>{


    try{

        const res = await apiClient.get(`products/?barcode=${code}`);

        if(res.status === 200){

            return res.data[0]

        }else {
            throw new Error('not product ben found ');
        }

    }catch(error){
        throw new Error(' error while fetching the product');
    }
}



export const addStock = async (newStock: Stock, id: string) => {
    try {
        const pres = await apiClient.get(`products/${id}`);
        const product = pres.data;


        if (!product.stocks) product.stocks = [];


        product.stocks.push(newStock);


        const response = await apiClient.patch(`products/${id}`, product);
        return response.data;

    } catch (error) {
        throw new Error('Error while fetching the product');
    }
}


export const update = async (updatedStock: Product, id: string) => {
    try {

        const response = await apiClient.patch(`products/${id}`, updatedStock);
        return response.data;

    } catch (error) {
        throw new Error('Error while fetching the product');
    }
}


export const UpdateQuantity = async (type: string, productId: string | undefined, stockId: string) => {
    try {

      const response = await apiClient.get(`/products/${productId}`);
      const product = response.data;
  
      if (!product || !product.stocks) {
        throw new Error('Product or stocks not found');
      }
  

      const updatedStocks = product.stocks.map((stock: any) => {
        if (stock.id === stockId) {
          const newQuantity = type === 'add' 
            ? stock.quantity + 1 
            : Math.max(0, stock.quantity - 1); 
          
          return { ...stock, quantity: newQuantity };
        }
        return stock;
      });
  

      const updatedProduct = await apiClient.patch(`/products/${productId}`, {
        stocks: updatedStocks
      });
  
      return updatedProduct.data;
      
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error; 
    }
  };