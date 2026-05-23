/***************************************************************
 * Nombre: paisGanadorList.tsx
 *
 * Descripción:
 * Pantalla que lista todos los países ganadores
 * del mundial. Permite navegar a los campeonatos
 * de cada país, editar o crear nuevos países.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import { EmptyState } from "@/components/emptyState";
import { LoadingView } from "@/components/loadingView";
import { usePaisGanador } from "@/domain/presentation/hook/usePaisGanador";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
  SafeAreaView
} from "react-native-safe-area-context";

import {
  BackHandler,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {
  COLORS,
  FONTS,
  RADIUS,
  SPACING
} from "../../styles/globalStyles";

export default function PaisGanadorList() {

  const router = useRouter();

  const {
    paisGanador,
    isLoading,
    error
  } = usePaisGanador();

  if (isLoading) {
    return (
      <LoadingView
        message="Cargando países ganadores..."
      />
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

    <SafeAreaView style={styles.container}>

      <View style={styles.container}>

        <View style={styles.header}>

          <View style={styles.headerTop}>

            <Pressable
              style={styles.backButton}
              onPress={() => {

                console.log(
                  "BOTON HEADER PRESIONADO"
                );

                BackHandler.exitApp();

              }}
            >

              <Ionicons
                name="exit-outline"
                size={22}
                color="#fff"
              />

            </Pressable>

            <View>

              <Text style={styles.headerTitle}>
                Ganadores del Mundial
              </Text>

              <Text style={styles.headerSubtitle}>
                {paisGanador.length} países registrados
              </Text>

            </View>

          </View>

        </View>


        <FlatList
          data={paisGanador}
          keyExtractor={(item) =>
            item.pa_id.toString()
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}

          ListEmptyComponent={
            <EmptyState
              icon="football-outline"
              title="Sin países ganadores"
              subtitle="No existen países ganadores registrados"
            />
          }

          renderItem={({ item }) => (

            <Pressable
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/listCampeonatos" as any,
                  params: {
                    paisGanadorId: item.pa_id,
                    nombrePais: item.pa_nombre
                  }
                })
              }
            >

              <Image
                source={{
                  uri: item.pa_bandera
                }}
                style={styles.image}
                resizeMode="cover"
              />

              <View style={styles.cardBody}>

                <View style={styles.infoRow}>

                  <Ionicons
                    name="earth"
                    size={18}
                    color={COLORS.success}
                  />

                  <Text style={styles.text}>
                    {item.pa_nombre}
                  </Text>

                </View>

                <Text style={styles.year}>
                  Mundiales {item.pa_anios}
                </Text>

                <View style={styles.infoRow}>

                  <Ionicons
                    name="trophy"
                    size={18}
                    color={COLORS.accent}
                  />

                  <Text style={styles.text}>
                    {item.pa_num_campeon}
                    {" "}
                    Campeonatos
                  </Text>

                </View>

              </View>


              <View style={styles.actions}>

                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={(e) => {

                    e.stopPropagation();

                    router.push({
                      pathname: "/paisGanadorEdit",
                      params: {
                        id: item.pa_id,
                        nombre: item.pa_nombre,          
                        num_campeonatos: item.pa_num_campeon,
                        bandera: item.pa_bandera,
                        anios: item.pa_anios
                      }
                    });

                  }}
                >

                  <Ionicons
                    name="create-outline"
                    size={20}
                    color={COLORS.primary}
                  />

                </TouchableOpacity>

              </View>

            </Pressable>

          )}
        />


        <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            router.push(
              "/paisGanadorEdit"
            )
          }
        >

          <Ionicons
            name="add"
            size={28}
            color="#fff"
          />

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:COLORS.background
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  header:{
    backgroundColor:COLORS.primaryDark,
    paddingHorizontal:SPACING.md,
    paddingVertical:SPACING.md
  },

  headerTop:{
    flexDirection:"row",
    alignItems:"center",
    gap:12
  },

  backButton:{
    width:40,
    height:40,
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"rgba(255,255,255,0.15)"
  },

  headerTitle:{
    fontSize:22,
    fontWeight:FONTS.bold,
    color:"#fff",
    marginBottom:4
  },

  headerSubtitle:{
    fontSize:14,
    color:"#CBD5E1"
  },

  list:{
    padding:SPACING.md,
    paddingBottom:120
  },

  card:{
    backgroundColor:COLORS.surface,
    borderRadius:RADIUS.lg,
    overflow:"hidden",
    marginBottom:SPACING.md
  },

  image:{
    width:"100%",
    height:220
  },

  cardBody:{
    padding:SPACING.md
  },

  year:{
    fontSize:22,
    fontWeight:FONTS.bold,
    color:COLORS.textPrimary,
    marginBottom:SPACING.sm
  },

  infoRow:{
    flexDirection:"row",
    alignItems:"center",
    gap:8,
    marginBottom:8
  },

  text:{
    fontSize:15,
    color:COLORS.textSecondary,
    fontWeight:FONTS.medium
  },

  actions:{
    flexDirection:"row",
    justifyContent:"flex-end",
    paddingHorizontal:SPACING.md,
    paddingBottom:SPACING.md
  },

  editBtn:{
    width:40,
    height:40,
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:COLORS.primaryLight
  },

  fab:{
    position:"absolute",
    right:24,
    bottom:24,
    width:60,
    height:60,
    borderRadius:30,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:COLORS.primary,
    elevation:6
  }

});