import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

export default function Credits() {
  return (
    <LinearGradient colors={["#d2fcff", "#d5ffd2", "#f5ffd2"]} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU2OUhgYVw3K7szYaJX5Y_ggu8lV8OZrnBIg&s" }}
          style={styles.icon}
        />
        
        {/* Título de la pantalla de inicio de sesión */}
        <Text style={styles.title}>Fan ID Liga Mx</Text>
        <Text style={styles.subtitle}>Aplicaciones Móviles</Text>
        <Text style={styles.subtitle}>901 Cibernética</Text>

        {/* Contenedores individuales para cada miembro del equipo */}
        {[
          { name: "David Alejandro González Robles" },
          { name: "Ricardo Absalon Gómez Jiménez" },
          { name: "José Vera Luna" },
        ].map((member, index) => (
          <View key={index} style={styles.memberContainer}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/7141/7141724.png" }}
              style={styles.avatar}
            />
            <Text style={styles.memberName}>{member.name}</Text>
          </View>
        ))}

        {/* Enlace de regreso */}
        <Link href="/Profile" style={styles.link}>
        <MaterialIcons name="logout" size={24} color="#14761b" />
          <Text style={styles.linkText}>   Regresar</Text>
        </Link>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Fondo degradado ocupa toda la pantalla
  gradientContainer: {
    flex: 1,
  },
  // Configuración de ScrollView
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  // Estilo de icono principal
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  // Estilo del título principal
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#555",
    marginBottom: 5,
    textAlign: "center",
  },
  // Contenedor de cada miembro del equipo
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "80%",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  // Estilo para la imagen de avatar
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  // Nombre de cada miembro
  memberName: {
    fontSize: 18,
    color: "#14761b",
  },
  // Estilo del enlace de regreso
  link: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#65b220",
    borderRadius: 25,
    borderColor: "#14761b",
    borderWidth: 3,
    width: "65%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  linkText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
