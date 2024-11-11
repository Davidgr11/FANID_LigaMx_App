import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Image, ScrollView, Animated } from "react-native";
import * as Crypto from "expo-crypto";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { MyContext } from "./Context";
import { FontAwesome } from "@expo/vector-icons";
import { Endpoints } from "../constants/Endpoints";

export default function Register() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoginData } = useContext(MyContext);
  const bounceAnim = new Animated.Value(1);

  // Función para validar los campos del formulario
  const validateForm = () => {
    // Validación de campos vacíos
    if (!firstname) return "Datos faltantes en Nombre";
    if (!lastname) return "Datos faltantes en Apellido";
    if (!id) return "Datos faltantes en ID";
    if (!email) return "Datos faltantes en Correo Electrónico";
    if (!username) return "Datos faltantes en Usuario";
    if (!password) return "Datos faltantes en Contraseña";

    // Validación de ID (numérico)
    if (!/^\d+$/.test(id)) return "El ID debe ser numérico";

    // Validación de correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return "El formato del correo electrónico es incorrecto";

    // Validación de longitud de la contraseña
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres";

    return ""; // Sin errores
  };

  const onButtonRegister = async () => {
    const error = validateForm();
    if (error) {
      setErrorMessage(error); // Muestra el mensaje de error específico
      return;
    }

    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
    const form = new FormData();
    form.append("token", "code37");
    form.append("id", id);
    form.append("username", username);
    form.append("pass", digest);
    form.append("email", email);
    form.append("firstname", firstname);
    form.append("lastname", lastname);

    fetch(Endpoints.REGISTER, {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error && data.id) {
          setRegisterSuccess(true);
          setLoginData(data);
          router.replace("/Profile");
        } else {
          setErrorMessage(data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const startBounce = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.spring(bounceAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  return (
    <LinearGradient colors={["#d2fcff", "#d5ffd2", "#f5ffd2"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Image
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU2OUhgYVw3K7szYaJX5Y_ggu8lV8OZrnBIg&s" }}
          style={styles.icon}
        />
        <Text style={styles.title}>Registro</Text>

        <Text style={styles.sectionTitle}>Datos personales</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} onChangeText={setFirstname} placeholder="Luis Angel" placeholderTextColor="#A9A9A9"/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput style={styles.input} onChangeText={setLastname} placeholder="Malagón Velázquez" placeholderTextColor="#A9A9A9"/>
        </View>

        <Text style={styles.sectionTitle}>Datos de cuenta</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID</Text>
          <TextInput style={styles.input} onChangeText={setId} placeholder="123456" placeholderTextColor="#A9A9A9"/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput style={styles.input} onChangeText={setEmail} keyboardType="email-address" placeholder="luismv@example.com" placeholderTextColor="#A9A9A9"/>
        </View>

        <Text style={styles.sectionTitle}>Datos de acceso</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput style={styles.input} onChangeText={setUsername} placeholder="luisangel01" placeholderTextColor="#A9A9A9"/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry placeholder="********" placeholderTextColor="#A9A9A9"/>
        </View>

        {registerSuccess && <Text style={styles.success}>Registro exitoso, redirigiendo...</Text>}
        {errorMessage && <Text style={styles.error}>Error: {errorMessage}</Text>}

        <Pressable style={styles.button} onPress={() => { onButtonRegister(); startBounce(); }}>
          <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
            <View style={styles.buttonContent}>
              <FontAwesome name="soccer-ball-o" size={24} color="#14761b" />
              <Text style={styles.buttonText}>Registrar</Text>
            </View>
          </Animated.View>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.replace("/")}>
          <View style={styles.buttonContent}>
            <FontAwesome name="soccer-ball-o" size={24} color="#14761b" />
            <Text style={styles.buttonText}>Cancelar</Text>
          </View>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}
// Estilos para la pantalla de registro
const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
  },
  // Contenedor de ScrollView
  scrollContainer: {
    alignItems: "center",
    padding: 20,
  },
  // Título principal
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
    textAlign: "center",
  },
  // Estilo del ícono de la app
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  // Títulos de cada sección de datos
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#444",
    marginBottom: 10,
    marginTop: 20,
  },
  // Contenedor para los campos de entrada
  inputContainer: {
    width: "80%",
    marginBottom: 15,
  },
  // Etiqueta de cada campo
  label: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  // Estilo de los campos de entrada de texto
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
  // Mensaje de éxito en el registro
  success: {
    color: "#14761b",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "600",
  },
  // Mensaje de error en el registro
  error: {
    color: "#e6a178",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "600",
    justifyContent: "center",
    textAlign: "center",
  },
  // Estilo de los botones
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
  // Contenedor de icono y texto dentro del botón
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // Texto de los botones
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});
