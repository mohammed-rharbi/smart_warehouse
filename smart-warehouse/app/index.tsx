import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function LandingPage() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <LinearGradient
      colors={['#1a237e', '#0d47a1']}
      style={styles.container}
    >
      <View style={styles.header}>
        <MaterialIcons name="warehouse" size={40} color="#fff" />
        <Text style={styles.logoText}>StockMaster</Text>
      </View>


      <View style={styles.content}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>Smart Warehouse Management</Text>
          <Text style={styles.subtitle}>
            Optimize your inventory with real-time tracking and AI-powered insights
          </Text>
        </Animated.View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/login')}
          >
            <AntDesign name="lock" size={20} color="white" />
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/register')}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
            <AntDesign name="arrowright" size={20} color="#fff" />
          </TouchableOpacity> */}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  animationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  content: {
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonGroup: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#00e676',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 15,
    gap: 10,
    elevation: 3,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});