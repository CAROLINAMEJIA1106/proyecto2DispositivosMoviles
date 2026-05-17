import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View
} from "react-native";

import { useCampeonatos } from "@/domain/presentation/hook/useCampeonatos";

export default function ListCampeonatos() {

  const {
    campeonatos,
    isLoading,
    error
  } = useCampeonatos();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Cargando campeonatos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={campeonatos}
      keyExtractor={(item) =>
        item.id.toString()
      }

      renderItem={({ item }) => (

        <View style={styles.card}>

          <Image
            source={{
              uri: item.imagen
            }}
            style={styles.image}
          />

          <Text style={styles.year}>
            Mundial {item.anio}
          </Text>

          <Text style={styles.text}>
            ⚽ Goleador:
            {" "}
            {item.goleador}
          </Text>

          <Text style={styles.text}>
            🌎 País:
            {" "}
            {item.golePais}
          </Text>

          <Text style={styles.text}>
            🥅 Goles:
            {" "}
            {item.numeroGoles}
          </Text>

        </View>
      )}

      contentContainerStyle={{
        padding: 16
      }}
    />
  );
}

const styles = StyleSheet.create({

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 4
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 12
  },

  year: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8
  },

  text: {
    fontSize: 16,
    marginBottom: 4
  }
});