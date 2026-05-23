/***************************************************************
 * Nombre: _layout.tsx
 *
 * Descripción:
 * Layout raíz de la aplicación. Inicializa
 * la base de datos local y configura el
 * navegador principal con SafeAreaProvider.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import { Stack } from "expo-router";

import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  View
} from "react-native";

import {
  SafeAreaProvider
} from "react-native-safe-area-context";

import {
  initDatabase
} from "../domain/data/local/connection";

export default function RootLayout() {

  const [dbReady, setDbReady]
    = useState(false);

  useEffect(() => {

    initDatabase()
      .then(() => setDbReady(true))
      .catch((error) =>
        console.error(
          "❌ Error DB:",
          error
        )
      );

  }, []);

  if (!dbReady) {

    return (
      <View
        style={{
          flex:1,
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
      </View>
    );
  }

  return (

    <SafeAreaProvider>

      <Stack
        screenOptions={{
          headerShown:false
        }}
      />

    </SafeAreaProvider>

  );
}