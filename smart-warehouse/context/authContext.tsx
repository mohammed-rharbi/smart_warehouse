import React, { useContext, useEffect, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@/services/auth";
import { useRouter } from "expo-router";
import { User } from "@/lib/types";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  loginUser: (code: string) => {};
  logout: () => {};
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);



  const loginUser = async (code: string)=> {
    setIsLoading(true);
    try {

      const res = await login(code);
        setUser(res);
        setIsAuthenticated(true);
        router.push('/home')

    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      router.push('/login')
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
