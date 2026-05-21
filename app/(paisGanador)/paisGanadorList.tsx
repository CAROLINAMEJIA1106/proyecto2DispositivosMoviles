import { EmptyState } from "@/components/emptyState";
import { LoadingView } from "@/components/loadingView";
import { usePaisGanador } from "@/domain/presentation/hook/usePaisGanador";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { COLORS, FONTS, globalStyles, RADIUS, SPACING } from "../../styles/globalStyles";



export default function PaisGanadorList() {
  const router = useRouter();
  const navigation = useNavigation();

  const {paisGanador,isLoading,error
    } = usePaisGanador();
  
  if (isLoading) {
      return (<LoadingView message="Cargando países ganadores..."/>);
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
  {/* HEADER */}
  <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
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
              keyExtractor={(item) =>item.pa_id.toString()}
              contentContainerStyle={styles.list}
              ListEmptyComponent={
                <EmptyState
                  icon="football-outline"
                  title="Sin países ganadores"
                  subtitle="No existen países ganadores registrados"
                />
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.card}
                  onPress={() =>
                    router.push({
                      pathname: "/(campeonatos)/listCampeonatos",
                      params: {
                        paisGanadorId: item.pa_id,
                        nombrePais: item.pa_nombre
                      }
                    })
                  }
                >
                  <Image
                    source={{uri: item.pa_bandera}}
                    style={styles.image}
                    resizeMode="contain"
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
                        {item.pa_num_campeon} Campeonatos
                      </Text>
                    </View>
                  </View>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() =>
                        router.push({
                          pathname:
                            "/(paisGanador)/paisGanadorEdit",
                          params: {
                            id: item.pa_id,
                            nombre: item.pa_nombre,
                            num_campeonatos: item.pa_num_campeon,
                            bandera: item.pa_bandera,
                            anios: item.pa_anios
                          }
                        })
                      }
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
</View>
);
}

const styles = StyleSheet.create({

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.15)"
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: FONTS.bold,
    color: "#fff",
    marginBottom: 4
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#CBD5E1"
  },

  list: {
    padding: SPACING.md,
    paddingBottom: 100
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: "hidden",

    marginBottom: SPACING.md,

    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3
  },

  image: {
    width: "100%",
    height: 220,
  },

  cardBody: {
    padding: SPACING.md
  },

  year: {
    fontSize: 22,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8
  },

  text: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: FONTS.medium
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md
  },

  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.primaryLight
  },

  fab: {
    position: "absolute",

    right: 24,
    bottom: 24,

    width: 60,
    height: 60,

    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.primary,

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4
    },

    shadowOpacity: 0.3,
    shadowRadius: 6,

    elevation: 6
  }
});