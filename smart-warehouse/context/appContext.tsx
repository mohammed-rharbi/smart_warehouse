import React, { useContext, useEffect, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@/services/auth";
import { useRouter } from "expo-router";
import { Product } from "@/lib/types";
import { fetchProduct , fetchSinglProduct } from "@/services/products";

type AppContextType = {

  isLoading: boolean;
  products: Product | null;
  getProducts: ()=> {};
  getOneProducts: (id:string)=> Promise<Product>;

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

  useEffect(()=>{

    getProducts()
    
  },[])


  return (
    <AppContext.Provider value={{ isLoading , products , getProducts , getOneProducts }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAPP = () => useContext(AppContext)!;
