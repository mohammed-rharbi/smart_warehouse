import axios from 'axios'


const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API,
});

apiClient.interceptors.request.use(
    
    async (config)=> {

        config.headers['Content-Type'] = 'application/json'
    
        return config;
      },

        (error)=>{

        return Promise.reject(error); 
      }

)

export default apiClient;