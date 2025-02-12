import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/authContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const {isAuthenticated} = useAuth()

  const router = useRouter()

  useEffect(()=>{

    if(!isAuthenticated){
      router.push('/login');
    }

  },[isAuthenticated])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person" color={color} />,
        }}
      />
       <Tabs.Screen
        name="products"
        options={{
          href:null
        }}
      />
       <Tabs.Screen
        name="createProduct"
        options={{
          href:null
        }}
      />
       <Tabs.Screen
        name="ProductDetails"
        options={{
          href:null
        }}
      />

      <Tabs.Screen
        name="barcodeScanner"
        options={{
          href:null
        }}
      />
    </Tabs>
  );
}
