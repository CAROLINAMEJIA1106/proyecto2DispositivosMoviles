<<<<<<< HEAD
/***************************************************************
 * Nombre: _layout.tsx
 *
 * Descripción:
 * Layout de navegación por pestañas (tabs).
 * Define las tres pantallas principales de
 * la aplicación: Países, Campeonatos e
 * Integrantes.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {

  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0D47A1",
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom || 6,
=======
import { Tabs } from "expo-router";

import {
    Ionicons
} from "@expo/vector-icons";

export default function TabsLayout() {

  return (

    <Tabs

      screenOptions={{

        headerShown: false,

        tabBarActiveTintColor: "#0D47A1",

        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
        },
      }}
    >

      {/* TAB PAISES */}
<<<<<<< HEAD
      <Tabs.Screen
        name="paisGanadorList"
        options={{
          title: "Países",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flag" size={size} color={color} />
=======

      <Tabs.Screen
        name="paisGanadorList"

        options={{
          title: "Países",

          tabBarIcon: ({
            color,
            size
          }) => (

            <Ionicons
              name="flag"
              size={size}
              color={color}
            />
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
          ),
        }}
      />

      {/* TAB CAMPEONATOS */}
<<<<<<< HEAD
      <Tabs.Screen
        name="listCampeonatos"
        options={{
          title: "Campeonatos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
=======

      <Tabs.Screen
        name="listCampeonatos"

        options={{
          title: "Campeonatos",

          tabBarIcon: ({
            color,
            size
          }) => (

            <Ionicons
              name="trophy"
              size={size}
              color={color}
            />
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
          ),
        }}
      />

      {/* TAB INTEGRANTES */}
<<<<<<< HEAD
      <Tabs.Screen
        name="listIntegrantes"
        options={{
          title: "Integrantes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
=======

      <Tabs.Screen
        name="listIntegrantes"

        options={{
          title: "Integrantes",

          tabBarIcon: ({
            color,
            size
          }) => (

            <Ionicons
              name="people"
              size={size}
              color={color}
            />
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
          ),
        }}
      />

    </Tabs>
  );
}