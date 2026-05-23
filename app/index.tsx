/***************************************************************
 * Nombre: index.tsx
 *
 * Descripción:
 * Pantalla de inicio de la aplicación.
 * Muestra el logo, título y botones para
 * ingresar o salir de la aplicación.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import React from "react";

import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  LinearGradient
} from "expo-linear-gradient";

import {
  useRouter
} from "expo-router";

export default function HomeScreen() {

  const router = useRouter();

  const handleIngresar = () => {

    router.replace("/(tabs)/paisGanadorList" as any);
  };

  const handleSalir = () => {

    BackHandler.exitApp();
  };

  return (

    <LinearGradient

      colors={[
        "#F4C20D",
        "#0D47A1",
        "#D32F2F"
      ]}

      style={styles.container}
    >

      <View style={styles.content}>

        <Image

          source={require("../assets/icon_mundial.png")}

          style={styles.logo}

          resizeMode="contain"
        />

        <Text style={styles.title}>
          Historia del Mundial
        </Text>

        <Text style={styles.subtitle}>
          Países con más copas
        </Text>

      </View>

      <View style={styles.actions}>

        <TouchableOpacity

          style={styles.button}

          onPress={handleIngresar}
        >

          <Text style={styles.buttonText}>
            Ingresar
          </Text>

        </TouchableOpacity>

        <TouchableOpacity

          style={styles.exitButton}

          onPress={handleSalir}
        >

          <Text style={styles.exitText}>
            Salir
          </Text>

        </TouchableOpacity>

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 10,
  },

  actions: {
    padding: 24,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },

  buttonText: {
    color: "#0D47A1",
    fontWeight: "bold",
    fontSize: 18,
  },

  exitButton: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  exitText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});