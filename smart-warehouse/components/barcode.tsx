// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { Camera } from 'expo-camera';

// const BarcodeScanner = ({ onScan , onClose  }) => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanning, setScanning] = useState(true);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (

//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         onBarCodeScanned={scanning ? (result) => {
//           setScanning(false);
//           onScan(result.data);
//         } : undefined}
//       />
//       <View style={styles.buttonContainer}>
//         <Button title="Cancel" onPress={onClose} />
//         <Button title="Scan Again" onPress={() => setScanning(true)} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   camera: { flex: 1 },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 20,
//   },
// });

// export default BarcodeScanner;
