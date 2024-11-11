import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Image, Animated, ScrollView, Modal } from "react-native";
import * as Crypto from "expo-crypto";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { MyContext } from "./Context";
import { FontAwesome } from '@expo/vector-icons';
import { Endpoints } from "../constants/Endpoints";

export default function Index() {
  // Estado para almacenar el valor de usuario y contraseña ingresados
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error en caso de campos vacíos o credenciales incorrectas
  const { setLoginData } = useContext(MyContext); // Contexto para almacenar datos de inicio de sesión
  const bounceAnim = new Animated.Value(1); // Animación de rebote para el botón de inicio de sesión

  // Estado y función para gestionar el modal de información
  const [infoVisible, setInfoVisible] = useState(false);
  const toggleInfoModal = () => setInfoVisible(!infoVisible);

  // Validación para campos vacíos
  const validateForm = () => {
    if (!userValue) return "Por favor, ingrese su usuario.";
    if (!passValue) return "Por favor, ingrese su contraseña.";
    return ""; // No hay errores
  };

  // Función para manejar el inicio de sesión
  const onButtonLogin = async () => {
    const error = validateForm(); // Validar campos
    if (error) {
      setErrorMessage(error); // Mostrar mensaje de error
      return;
    }

    // Encriptar la contraseña usando SHA256
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, passValue);
    const form = new FormData();
    form.append("token", "code37");
    form.append("user", userValue);
    form.append("pass", digest);

    // Enviar los datos de inicio de sesión al backend
    fetch(Endpoints.LOGIN, {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error && data.id) {
          setLoginData(data); // Guardar datos de sesión
          router.replace("/Profile"); // Redirigir a la pantalla de perfil
        } else {
          setErrorMessage("Usuario o contraseña incorrectos"); // Error si las credenciales no coinciden
        }
      })
      .catch((err) => console.log(err)); // Capturar errores de la solicitud
  };

  // Función para redirigir a la pantalla de registro
  const onButtonRegister = () => {
    router.replace("/Register");
  };

  // Animación de rebote al presionar el botón de inicio de sesión
  const startBounce = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.spring(bounceAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  return (
    <LinearGradient colors={["#d2fcff", "#d5ffd2", "#f5ffd2"]} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Botón de Información en la esquina superior derecha */}
        <Pressable style={styles.infoButton} onPress={toggleInfoModal}>
          <FontAwesome name="info-circle" size={30} color="#14761b" />
        </Pressable>
        
        {/* Imagen de icono de la aplicación */}
        <Image
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU2OUhgYVw3K7szYaJX5Y_ggu8lV8OZrnBIg&s" }}
          style={styles.icon}
        />
        
        {/* Título de la pantalla de inicio de sesión */}
        <Text style={styles.title}>Fan ID Liga Mx</Text>
        <Text style={styles.subtitle}>¡Bienvenido!</Text>

        {/* Campo de entrada para el usuario */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput style={styles.input} onChangeText={setUserValue} />
        </View>

        {/* Campo de entrada para la contraseña */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput style={styles.input} onChangeText={setPassValue} secureTextEntry />
        </View>

        {/* Mostrar mensaje de error, si existe */}
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

        {/* Botón de inicio de sesión con animación de rebote */}
        <Pressable style={styles.button} onPress={() => { onButtonLogin(); startBounce(); }}>
          <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
            <View style={styles.buttonContent}>
              <FontAwesome name="soccer-ball-o" size={24} color="#14761b" />
              <Text style={styles.buttonText}>Log in</Text>
            </View>
          </Animated.View>
        </Pressable>

        {/* Botón para redirigir a la pantalla de registro */}
        <Pressable style={styles.button} onPress={onButtonRegister}>
          <View style={styles.buttonContent}>
            <FontAwesome name="soccer-ball-o" size={24} color="#14761b" />
            <Text style={styles.buttonText}>Regístrate</Text>
          </View>
        </Pressable>
      </ScrollView>

      {/* Modal de información con un mensaje sobre la aplicación */}
      <Modal visible={infoVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Acerca del FAN ID</Text>
            <Text style={styles.modalText}>El Fan ID de la Liga Mx de fútbol te permitirá contar con un perfil digital de aficionado. Este perfil será requerido para tu acceso a los estadios de fútbol. La identificación de los aficionados aporta a la seguridad de todo el público, muchas gracias por tu participación.</Text>
            <Pressable style={styles.closeButton} onPress={toggleInfoModal}>
              <FontAwesome name="times" size={24} color="#fff" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
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
    fontSize: 25,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 20,
    color: "#14761b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  error: {
    color: "#e6a178",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#65b220",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: "65%",
    borderColor: '#14761b',
    borderWidth: 3,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  infoButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#ecffd8",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 20,
    textAlign: "justify",
    marginBottom: 15,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#14761b",
    padding: 8,
    borderRadius: 15,
  },
});
