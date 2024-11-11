import React, { useState, useRef, useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable, Platform, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { MyContext } from "./Context";
import { Endpoints } from "@/constants/Endpoints";
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function Index() {
  const { loginData } = useContext(MyContext);
  const userIDprueba = loginData.id;

  const [image, setImage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState("");
  const [imageUri, setImageUri] = useState({ uri: 'http://monsterballgo.com/media/usr/default.png' });
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<Camera | null>(null);

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const form = new FormData();
      form.append('token', 'code37');
      form.append('id', String(userIDprueba));
      form.append('image', {
        uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
        name: 'image0ne',
        type: 'image/jpeg',
      });

      fetch(Endpoints.SET_PROFILE_PIC, {
        method: 'POST',
        body: form,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(response => response.json())
        .then(data => {
          setImageUri({ uri: data.pfp_url });
          setDebugInfo(JSON.stringify(data));
        })
        .catch(err => { console.log(err); });
    }
  };

  const askPermissions = () => {
    requestPermission();
  };

  const takePhotoAndUpload = async () => {
    if (!permission?.granted) {
      askPermissions();
    } else {
      cameraRef.current.takePictureAsync({
        quality: 1,
      }).then((picture) => {
        setImage(picture.uri);
        const form = new FormData();
        form.append('token', 'code37');
        form.append('id', String(userIDprueba));
        form.append('image', {
          uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
          name: 'image0ne',
          type: 'image/jpeg',
        });

        fetch(Endpoints.SET_PROFILE_PIC, {
          method: 'POST',
          body: form
        })
          .then(response => response.json())
          .then(data => {
            setImageUri({ uri: data.pfp_url });
            setDebugInfo(JSON.stringify(data));
          })
          .catch(err => { console.log(err); });
      });
    }
  };

  return (
    <LinearGradient colors={["#d2fcff", "#d5ffd2", "#f5ffd2"]} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Editar Mi Foto</Text>
        <Text style={styles.subtitle}>ID de Usuario: {userIDprueba}</Text>

        {permission?.granted ? (
          <CameraView style={styles.cameraPreview} facing="back" ref={cameraRef} pictureSize="640x480" />
        ) : (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>Permiso de cámara no otorgado</Text>
            <Button title="Dar permiso" onPress={askPermissions} />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Pressable style={styles.actionButton} onPress={takePhotoAndUpload}>
            <Text style={styles.buttonText}>Tomar Foto</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={pick}>
            <Text style={styles.buttonText}>Galería</Text>
          </Pressable>
        </View>

        <Text style={styles.resultText}>Resultado:</Text>
        <Image style={styles.profileImage} source={imageUri} />

        <Pressable style={styles.actionButton} onPress={() => router.replace("/Profile")}>
            <Text style={styles.buttonText}>Regresar</Text>
          </Pressable>
      </View>
    </LinearGradient>
  );
}
//<Text style={styles.debugInfo}>{debugInfo}</Text>
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#78b6e6",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "600",
    width: "90%",
  },
  cameraPreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#65b220',
    marginBottom: 20,
  },
  permissionContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  permissionText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: "#e9f5e9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 25,
    borderColor: '#65b220',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 20,
    color: "#14761b",
    fontWeight: "600",
  },
  resultText: {
    padding: 5,
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#14761b",
    marginVertical: 20,
  },
  debugInfo: {
    fontSize: 10,
    color: "#888",
    fontFamily: "monospace",
    textAlign: "center",
    paddingHorizontal: 15,
  },
});
