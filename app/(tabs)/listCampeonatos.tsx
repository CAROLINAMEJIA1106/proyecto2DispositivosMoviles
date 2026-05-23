/***************************************************************
 * Nombre: listCampeonatos.tsx
 *
 * Descripción:
 * Pantalla que lista los campeonatos mundiales. Permite filtrar entre
 * campeonatos por país ganador, además de navegar a la lista de integrantes.
 *
 * crear, editar y eliminar campeonatos.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  useLocalSearchParams,
  useRouter
} from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from "../../components/emptyState";
import { LoadingView } from "../../components/loadingView";

import { useCampeonatos } from "@/domain/presentation/hook/useCampeonatos";

import {
  COLORS,
  FONTS,
  globalStyles,
  RADIUS,
  SPACING
} from "../../styles/globalStyles";

export default function ListCampeonatos() {

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    paisGanadorId,
    nombrePais
  } = useLocalSearchParams<{
    paisGanadorId?: string;
    nombrePais?: string;
  }>();

  const {
    campeonatos,
    isLoading,
    error
  } = useCampeonatos(
    paisGanadorId
      ? Number(paisGanadorId)
      : undefined
  );

  if (isLoading) {
    return (
      <LoadingView
        message="Cargando campeonatos..."
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

    <View style={globalStyles.screen}>

      <View style={[styles.header, { paddingTop: insets.top + SPACING.md }]}>

        <View style={styles.headerTop}>

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            hitSlop={{
              top:20,
              bottom:20,
              left:20,
              right:20
            }}
            onPress={() => {

              console.log(
                "BOTON CAMPEONATO PRESIONADO"
              );

              router.push(
                "/(tabs)/paisGanadorList" as any
              );

            }}
          >

            <Ionicons
              name="arrow-back"
              size={22}
              color="#fff"
            />

          </TouchableOpacity>

          <View>

            <Text style={styles.headerTitle}>
              Campeonatos Mundiales
            </Text>

            <Text style={styles.headerSubtitle}>

              {
                nombrePais
                ? `Campeonatos de ${nombrePais}`
                : `${campeonatos.length} campeonatos registrados`
              }

            </Text>

          </View>

        </View>

      </View>

      <FlatList

        data={campeonatos}

        keyExtractor={(item) =>
          item.id.toString()
        }

        contentContainerStyle={styles.list}

        ListEmptyComponent={
          <EmptyState
            icon="football-outline"
            title="Sin campeonatos"
            subtitle="No existen campeonatos registrados"
          />
        }

        renderItem={({ item }) => (

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/listIntegrantes" as any,
                params: {
                  campeonatoId: item.id,
                  anio: item.anio,

                  
                  paisGanadorId: paisGanadorId,
                  nombrePais: nombrePais
                }
              })
            }
          >

            <Image
              source={{
                uri: item.imagen
              }}
              style={styles.image}
              resizeMode="contain"
            />

            <View style={styles.cardBody}>

              <Text style={styles.year}>
                Mundial {item.anio}
              </Text>

              <View style={styles.infoRow}>

                <Ionicons
                  name="football"
                  size={18}
                  color={COLORS.primary}
                />

                <Text style={styles.text}>
                  {item.goleador}
                </Text>

              </View>

              <View style={styles.infoRow}>

                <Ionicons
                  name="earth"
                  size={18}
                  color={COLORS.success}
                />

                <Text style={styles.text}>
                  {item.golePais}
                </Text>

              </View>

              <View style={styles.infoRow}>

                <Ionicons
                  name="trophy"
                  size={18}
                  color={COLORS.accent}
                />

                <Text style={styles.text}>
                  {item.numeroGoles} goles
                </Text>

              </View>

            </View>

            <View style={styles.actions}>

              <TouchableOpacity
                style={styles.editBtn}
                onPress={(e) => {

                  e.stopPropagation();

                  router.push({
                    pathname:"/editCampeonato",
                    params:{
                      id:item.id,
                      anio:item.anio,
                      goleador:item.goleador,
                      pais:item.golePais,
                      goles:item.numeroGoles,
                      imagen:item.imagen
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

          </TouchableOpacity>

        )}
      />

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() =>
          router.push({
            pathname:"/editCampeonato",
            params:{
              paId: paisGanadorId
            }
          })
        }
      >

        <Ionicons
          name="add"
          size={28}
          color="#fff"
        />

      </TouchableOpacity>

    </View>
  );

}

const styles = StyleSheet.create({

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  header:{
    backgroundColor:COLORS.primaryDark,
    paddingHorizontal:SPACING.md,
    paddingVertical:SPACING.md,

    
  },

  headerTop:{
    flexDirection:"row",
    alignItems:"center",
    gap:12
  },

  backButton:{
    width:50,
    height:50,

    borderRadius:25,

    justifyContent:"center",
    alignItems:"center",

    backgroundColor:"rgba(255,255,255,0.15)",

    marginRight:10,

    
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
    paddingBottom:100
  },

  card:{
    backgroundColor:COLORS.surface,
    borderRadius:RADIUS.lg,
    overflow:"hidden",
    marginBottom:SPACING.md,

    shadowColor:COLORS.shadow,
    shadowOffset:{
      width:0,
      height:2
    },

    shadowOpacity:0.08,
    shadowRadius:6,
    elevation:3
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
