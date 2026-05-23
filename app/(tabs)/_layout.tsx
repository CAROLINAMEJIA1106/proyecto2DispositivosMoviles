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
        },
      }}
    >

      {/* TAB PAISES */}

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
          ),
        }}
      />

      {/* TAB CAMPEONATOS */}

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
          ),
        }}
      />

      {/* TAB INTEGRANTES */}

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
          ),
        }}
      />

    </Tabs>
  );
}