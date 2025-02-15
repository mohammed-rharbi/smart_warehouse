import apiClient from "@/lib/apiClient";
import { Product , Stock } from "@/lib/types";




export const getStatistics = async () => {

    const response = await apiClient.get(`/statistics`);

    const statistics = await response.data
    return statistics;
}


export const updateMostAddedProducts = async (productId: string, productName: string) => {


    try {

      const statsResponse = await apiClient.get(`/statistics`);

      if (!statsResponse) {
        throw new Error(`Failed to fetch statistics`);
      }

      const statistics = await statsResponse.data;
  
      if (!statistics || typeof statistics !== 'object') {
        throw new Error("Invalid statistics data");
      }
  
      if (!Array.isArray(statistics.mostAddedProducts)) {
        statistics.mostAddedProducts = [];
      }
  
      const currentTime = new Date().toISOString();  

      const existingProductIndex = statistics.mostAddedProducts.findIndex(
        (item: any) => item.productId === productId
      );
  
      if (existingProductIndex !== -1) {
        statistics.mostAddedProducts[existingProductIndex].addedCount += 1;
        statistics.mostAddedProducts[existingProductIndex].lastAddedAt = currentTime;
      } else {
        statistics.mostAddedProducts.push({
          productId,
          productName,
          addedCount: 1,
          lastAddedAt: currentTime
        });
      }
  
      statistics.mostAddedProducts.sort((a: any, b: any) => b.addedCount - a.addedCount);
  
      statistics.mostAddedProducts = statistics.mostAddedProducts.slice(0, 10);
  
      const updateStatsResponse = await apiClient.put(`/statistics`, {statistics});
  
      return updateStatsResponse.data;
    } catch (error) {
      console.error("Error updating most added products:", error);
      throw error;
    }
  };


  export const updateMostRemovedProducts = async (productId: string, productName: string) => {

    try {

      const statsResponse = await apiClient.get(`/statistics`);
      if (!statsResponse) {
        throw new Error(`Failed to fetch statistics`);
      }
      const statistics = await statsResponse.data;
  
      if (!statistics || typeof statistics !== 'object') {
        throw new Error("Invalid statistics data");
      }
  
      if (!Array.isArray(statistics.mostRemovedProducts)) {
        statistics.mostRemovedProducts = [];
      }
  
      const existingProductIndex = statistics.mostRemovedProducts.findIndex(
        (item: any) => item.productId === productId
      );
  
      if (existingProductIndex !== -1) {
        statistics.mostRemovedProducts[existingProductIndex].removedCount += 1;
        statistics.mostRemovedProducts[existingProductIndex].lastRemovedAt = new Date().toLocaleString();
      } else {
        statistics.mostRemovedProducts.push({
          productId,
          productName,
          removedCount: 1,
          lastRemovedAt : new Date().toLocaleString()
        });
      }
      statistics.mostRemovedProducts.sort((a: any, b: any) => b.removedCount - a.removedCount);
  
      statistics.mostRemovedProducts = statistics.mostRemovedProducts.slice(0, 10);
  
      const updateStatsResponse = await apiClient.put(`/statistics`, {statistics} );
  
      return updateStatsResponse.data;
   
    } catch (error) {
      console.error("Error updating most removed products:", error);
      throw error;
    }
  };


  export const updateTotalProducts = async () =>{
    try {
        const response = await apiClient.get(`/products`);

        const products = await response.data;
      
        const statsResponse = await apiClient.get(`/statistics`);
        if (!statsResponse) {
          throw new Error(`Failed to fetch statistics`);
        }
        const statistics = await statsResponse.data
      
        if (!statistics || typeof statistics !== 'object') {
          throw new Error("Invalid statistics data");
        }

        const updateStatsResponse = await apiClient.put(`/statistics`, {...statistics,totalProducts:products.length} );
      
          if (!updateStatsResponse) {
            throw new Error(`Failed to update statistics`);
          }

    } catch (error) {
        console.error("Error updating most removed products:", error);
        throw error;
    }
   
  };


  export const updateOutOfStock = async ()=>{


    try {
        const response = await apiClient.get(`/products`);

        const products = await response.data
      
        const statsResponse = await apiClient.get(`/statistics`);
        if (!statsResponse) {
          throw new Error(`Failed to fetch statistics`);
        }
        const statistics = await statsResponse.data
      
        if (!statistics || typeof statistics !== 'object') {
          throw new Error("Invalid statistics data");
        }

        let totalOutOfStock = products.filter((product: Product) =>
            product.stocks.some((stock) => stock.quantity === 0)
        ).length;

       
        const updateStatsResponse = await apiClient.put(`/statistics`,{...statistics,outOfStock:totalOutOfStock});
      
          if (!updateStatsResponse) {
            throw new Error(`Failed to update statistics`);
          }

    } catch (error) {
        console.error("Error updating most removed products:", error);
        throw error;
    }
   

  };

  export const updateTotalStockValue =async ()=>{
    try {
        const response = await apiClient.get(`/products`);

        const products = await response.data
      
        const statsResponse = await apiClient.get(`/statistics`);
        if (!statsResponse) {
          throw new Error(`Failed to fetch statistics`);
        }
        const statistics = await statsResponse.data
      
        if (!statistics || typeof statistics !== 'object') {
          throw new Error("Invalid statistics data");
        }

       
         const totalValueStock =  products.flatMap((product: Product) => product.stocks)
        .reduce((sum:number, stock:Stock) => sum + stock.quantity, 0);

        const updateStatsResponse = await apiClient.put(`/statistics`, {
            ...statistics,
            totalStockValue: totalValueStock,
          });
          return updateStatsResponse.data;

    } catch (error) {
        console.error("Error updating total value stock:", error);
        throw error;
    }
  }