import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const toggleCameraType = () => {
    setType((currentType) =>
      currentType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleFacesDetected = ({ faces }) => {
    console.log('Fotze detected :D');
    setFaces(faces);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        <View style={styles.buttonContainer}>
          <Button
            title={
              type === CameraType.back
                ? 'Switch to Front Camera'
                : 'Switch to Back Camera'
            }
            onPress={toggleCameraType}
            color="#841584"
          />
        </View>
        {faces &&
          faces.map((face, index) => (
            <View key={index} style={styles.face}>
              <Text>Face Detected</Text>
            </View>
          ))}
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff9999',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 50,
  },
  face: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
    padding: 10,
  },
});
