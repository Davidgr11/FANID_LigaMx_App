// Profile.tsx
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { MyContext } from "./Context";
import { MaterialIcons } from '@expo/vector-icons'; // Icono de lápiz

export default function Profile() {
  const { loginData } = useContext(MyContext);

  // Estados para cada toggle
  const [togglePersonal, setTogglePersonal] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);
  const [toggleContact, setToggleContact] = useState(false);

  return (
    <LinearGradient colors={["#d2fcff", "#d5ffd2", "#f5ffd2"]} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Imagen de perfil con botón de edición */}
        <Text style={styles.title}>Mi Perfil</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: loginData.pfp_url }} style={styles.profileImage} />
          <Pressable style={styles.editIcon} onPress={() => router.push("/EditProfilePhoto")}>
            <MaterialIcons name="edit" size={24} color="#d2fcff" />
          </Pressable>
        </View>

        <Text style={styles.subtitle}>Por seguridad de todos, muestra tu perfil al ingresar al estadio.</Text>

        {/* Toggle Datos Personales */}
        <Pressable style={styles.toggleHeader} onPress={() => setTogglePersonal(!togglePersonal)}>
          <Text style={styles.labelSection}>Datos Personales</Text>
          <MaterialIcons name={togglePersonal ? "expand-less" : "expand-more"} size={24} color="white" />
        </Pressable>
        {togglePersonal && (
          <View style={styles.toggleContent}>
            <Text style={styles.label}>Nombre Completo:</Text>
            <Text style={styles.value}>{loginData.firstname} {loginData.lastname}</Text>
          </View>
        )}

        {/* Toggle Datos de Cuenta */}
        <Pressable style={styles.toggleHeader} onPress={() => setToggleAccount(!toggleAccount)}>
          <Text style={styles.labelSection}>Datos de Cuenta</Text>
          <MaterialIcons name={toggleAccount ? "expand-less" : "expand-more"} size={24} color="white" />
        </Pressable>
        {toggleAccount && (
          <View style={styles.toggleContent}>
            <Text style={styles.label}>Usuario:</Text>
            <Text style={styles.value}>{loginData.username}</Text>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{loginData.id}</Text>
          </View>
        )}

        {/* Toggle Datos de Contacto */}
        <Pressable style={styles.toggleHeader} onPress={() => setToggleContact(!toggleContact)}>
          <Text style={styles.labelSection}>Datos de Contacto</Text>
          <MaterialIcons name={toggleContact ? "expand-less" : "expand-more"} size={24} color="white" />
        </Pressable>
        {toggleContact && (
          <View style={styles.toggleContent}>
            <Text style={styles.label}>Correo Electrónico:</Text>
            <Text style={styles.value}>{loginData.email}</Text>
          </View>
        )}

        <Pressable style={styles.buttonC} onPress={() => router.replace("/Credits")}>
          <MaterialIcons name="person" size={24} color="#14761b" />
          <Text style={styles.buttonTextC}>Créditos</Text>
        </Pressable>

        {/* Botón para cerrar sesión */}
        <Pressable style={styles.button} onPress={() => router.replace("/")}>
          <MaterialIcons name="logout" size={24} color="#14761b" />
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

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
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#78b6e6",
    marginBottom: 30,
    textAlign: "justify",
    fontWeight: "600",
    width: "90%",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#14761b",
    marginBottom: 20,
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#65b220",
    color: "#fff",
    borderRadius: 15,
    padding: 5,
  },
  toggleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#14761b",
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  toggleContent: {
    backgroundColor: "#e9f5e9",
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  labelSection: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  value: {
    fontSize: 20,
    color: "#14761b",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#65b220",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 25,
    borderColor: '#14761b',
    borderWidth: 3,
    width: "65%",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    marginLeft: 10,
  },
  buttonC: {
    backgroundColor: "#e9f5e9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 25,
    borderColor: '#65b220',
    borderWidth: 3,
    width: "65%",
  },
  buttonTextC: {
    fontSize: 20,
    color: "#14761b",
    fontWeight: "600",
    marginLeft: 10,
  },
});
