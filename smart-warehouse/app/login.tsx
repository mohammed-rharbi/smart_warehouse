import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useAuth } from '@/context/authContext';

export default function LoginPage() {

  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const { loginUser } = useAuth();

  const handleLogin = async () => {
    setError('');

    if (!code.trim()) {
      setError('Security code is required.');
      return;
    }

    if (code.length < 6) {
      setError('Security code must be at least 6 characters.');
      return;
    }

    try {
      
      await loginUser(code)

    } catch (err) {
      setError('Invalid code. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#1a237e', '#0d47a1']} style={styles.container}>
      <View style={styles.header}>
        <Link href="/" style={styles.backButton}>
          <Feather name="chevron-left" size={28} color="#fff" />
        </Link>
        <Text style={styles.title}>Secure Access</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.instruction}>Enter your security code sent to your registered email</Text>

        <View style={styles.codeInputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.codeInput}
            placeholder="••••••"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={6}
            selectionColor="#fff"
            onSubmitEditing={handleLogin}
          />
          <MaterialIcons name="vpn-key" size={24} color="rgba(255,255,255,0.5)" style={styles.inputIcon} />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.loginButton, code.length === 6 ? styles.activeButton : styles.inactiveButton]}
          onPress={handleLogin}
          disabled={code.length < 6}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Verify Code</Text>
          <Feather name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.helpLinks}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
  },
  instruction: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  codeInputContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  codeInput: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: 24,
    letterSpacing: 15,
    padding: 20,
    borderRadius: 15,
    textAlign: 'center',
    paddingRight: 50,
  },
  inputIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  errorText: {
    color: '#ff5252',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 15,
    gap: 10,
  },
  activeButton: {
    backgroundColor: '#00e676',
  },
  inactiveButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  helpLinks: {
    marginTop: 25,
    alignItems: 'center',
  },
  linkText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
});
