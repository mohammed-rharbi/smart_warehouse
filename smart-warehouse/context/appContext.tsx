import React, { useContext, useEffect, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@/services/auth";
import { useRouter } from "expo-router";
import { Product , Stock } from "@/lib/types";
import { fetchProduct , fetchSinglProduct , create , update , addStock } from "@/services/products";

type AppContextType = {

  isLoading: boolean;
  products: Product | null;
  getProducts: ()=> {};
  getOneProducts: (id:string)=> Promise<Product>;
  createProduct: (data:Product)=> Promise<Product>;
  createProductStock: (data:Stock , id: string)=> Promise<Stock>;
  updateProduct: (data:Product , id: string)=> Promise<Product>;


};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product | null>(null);

  const router = useRouter();


  const getProducts = async ()=> {
    setIsLoading(true);
    try {

      const res = await fetchProduct()
        setProducts(res);

    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };


  
  const getOneProducts = async (id: string)=> {
    setIsLoading(true);
    try {

      const res = await fetchSinglProduct(id);
        return res
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (data: Product)=>{

    try{

        const res = await create(data);
        return res

    }catch(error){
        console.error("create a product has ben failed:", error);
    }finally{
        getProducts()
    }

  }

  const createProductStock = async (data: Stock, id: string) => {
    try {
        const res = await addStock(data, id);
        console.log('Stock added successfully:', res);
        return res;
    } catch (error) {
        console.error('Error while adding a stock:', error);
    }finally{

        getProducts()

    }
}


const updateProduct = async (data: Product, id: string) => {
    try {
        const res = await update(data, id);
        console.log('Stock updated successfully:', res);
        return res;
    } catch (error) {
        console.error('Error while updating a product:', error);
    }finally{

        getProducts()

    }
}

  useEffect(()=>{

    getProducts()
    
  },[])


  return (
    <AppContext.Provider value={{ isLoading , products , getProducts , getOneProducts , createProduct , createProductStock, updateProduct }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAPP = () => useContext(AppContext)!;
