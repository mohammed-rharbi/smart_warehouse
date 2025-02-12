import apiClient from "@/lib/apiClient";




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
