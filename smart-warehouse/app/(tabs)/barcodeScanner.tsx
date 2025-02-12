import useScanner from '@/hooks/barCamera';
import { CameraView } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductScanner() {
    const {
        facing,
        permission,
        scanned,
        scannedCode,
        requestPermission,
        handleBarCodeScanned,
        toggleCameraFacing,
        setScanned,
    } = useScanner();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
                <Button title="Scan Again" onPress={() => setScanned(false)} />
            </TouchableOpacity>
        </View>
      </CameraView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  resultContainer: {
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white',
  },
});
