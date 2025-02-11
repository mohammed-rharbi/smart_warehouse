import apiClient from "@/lib/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const login = async (code: string) => {
    try {
        const response = await apiClient.get(`warehousemans/?secretKey=${code}`);

        if (response.data.length > 0) {
            await AsyncStorage.setItem('user', JSON.stringify(response.data[0]));
            return response.data[0];
            
        } else {
            throw new Error('Invalid code');
        }
    } catch (error) { 
        throw new Error('Login failed');
    }
};

export const logout = async () => {
    await AsyncStorage.removeItem('user');
};

export const checkAuth = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
