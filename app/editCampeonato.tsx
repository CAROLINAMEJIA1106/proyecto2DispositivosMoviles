/***************************************************************
 * Nombre: editCampeonato.tsx
 *
 * Descripción:
 * Pantalla encargada de crear y actualizar
 * campeonatos del mundial.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import React from "react";

import {
<<<<<<< HEAD
  ScrollView,
  StyleSheet,
  View
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

=======
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet
} from "react-native";

>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
import {
  useLocalSearchParams,
  useRouter
} from "expo-router";

import {
  CampeonatoForm,
  CampeonatoFormData
} from "../components/campeonatoForm";

import {
  COLORS,
  SPACING
} from "../styles/globalStyles";

import { useCreateCampeonato } from "../domain/presentation/hook/useCreateCampeonato";
<<<<<<< HEAD
import { useUpdateCampeonato } from "../domain/presentation/hook/useUpdateCampeonato";

export default function EditCampeonato() {

  const router = useRouter();
  const insets = useSafeAreaInsets();
=======

import { useUpdateCampeonato } from "../domain/presentation/hook/useUpdateCampeonato";

// Pantalla para gestionar la edición
// y creación de campeonatos
export default function EditCampeonato() {

  const router = useRouter();
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf

  const {
    createCampeonato,
    isLoading: isCreating,
    error: createError,
  } = useCreateCampeonato();

  const {
    updateCampeonato,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateCampeonato();

  const {
    id,
    anio,
    goleador,
    pais,
    goles,
    imagen,
    paId
  } = useLocalSearchParams<{
<<<<<<< HEAD
    id?: string;
    anio?: string;
    goleador?: string;
    pais?: string;
    goles?: string;
    imagen?: string;
=======

    id?: string;

    anio?: string;

    goleador?: string;

    pais?: string;

    goles?: string;

    imagen?: string;

>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
    paId?: string;
  }>();

  const isEdit = Boolean(id);

  const goBack = () => {
<<<<<<< HEAD
    router.back();
=======

    router.back();

>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
  };

  const handleSubmit = async (
    data: CampeonatoFormData
  ) => {
<<<<<<< HEAD
    try {

      if (isEdit) {
        await updateCampeonato({
          caId: Number(id),
          caPaId: data.ca_pa_id,
          caAnio: data.ca_anio,
          caGoleador: data.ca_goleador,
          caGolePais: data.ca_gole_pais,
          caGoleNumGol: data.ca_gole_num_gol,
          caGoleImg: data.ca_gole_img,
        });

      } else {
        await createCampeonato({
          caPaId: data.ca_pa_id,
          caAnio: data.ca_anio,
          caGoleador: data.ca_goleador,
          caGolePais: data.ca_gole_pais,
          caGoleNumGol: data.ca_gole_num_gol,
          caGoleImg: data.ca_gole_img,
=======

    try {

      if (isEdit) {

        await updateCampeonato({

          caId: Number(id),

          caPaId: data.ca_pa_id,

          caAnio: data.ca_anio,

          caGoleador:
            data.ca_goleador,

          caGolePais:
            data.ca_gole_pais,

          caGoleNumGol:
            data.ca_gole_num_gol,

          caGoleImg:
            data.ca_gole_img,
        });

      } else {

        await createCampeonato({

          caPaId: data.ca_pa_id,

          caAnio: data.ca_anio,

          caGoleador:
            data.ca_goleador,

          caGolePais:
            data.ca_gole_pais,

          caGoleNumGol:
            data.ca_gole_num_gol,

          caGoleImg:
            data.ca_gole_img,
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
        });
      }

      router.back();

    } catch (error) {
<<<<<<< HEAD
=======

>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
      console.log(error);
    }
  };

  return (
<<<<<<< HEAD
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <CampeonatoForm
          loading={isCreating || isUpdating}
          error={createError || updateError}
          initialValues={{
            ca_pa_id: Number(paId ?? 1),
            ca_anio: Number(anio ?? 0),
            ca_goleador: goleador ?? "",
            ca_gole_pais: pais ?? "",
            ca_gole_num_gol: Number(goles ?? 0),
            ca_gole_img: imagen ?? "",
          }}
          onSubmit={handleSubmit}
          onCancel={goBack}
          submitLabel={isEdit ? "Actualizar" : "Crear campeonato"}
        />
      </ScrollView>
    </View>
=======

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#EEF1F5",
        paddingTop:
          StatusBar.currentHeight || 40,
      }}
    >

      <ScrollView
        style={styles.screen}

        contentContainerStyle={
          styles.content
        }

        keyboardShouldPersistTaps="handled"

        showsVerticalScrollIndicator={false}
      >

        <CampeonatoForm

          loading={
            isCreating || isUpdating
          }

          error={
            createError || updateError
          }

          initialValues={{

            ca_pa_id:
              Number(paId ?? 1),

            ca_anio:
              Number(anio ?? 0),

            ca_goleador:
              goleador ?? "",

            ca_gole_pais:
              pais ?? "",

            ca_gole_num_gol:
              Number(goles ?? 0),

            ca_gole_img:
              imagen ?? "",
          }}

          onSubmit={handleSubmit}

          onCancel={goBack}

          submitLabel={
            isEdit
              ? "Actualizar"
              : "Crear campeonato"
          }
        />

      </ScrollView>

    </SafeAreaView>
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: COLORS.background,
=======
    backgroundColor: COLORS.background
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
  },

  content: {
    padding: SPACING.md,
<<<<<<< HEAD
    paddingBottom: SPACING.xl,
  }

=======
    paddingBottom: SPACING.xl
  }
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
});