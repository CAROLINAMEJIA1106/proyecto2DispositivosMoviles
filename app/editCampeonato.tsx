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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet
} from "react-native";

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

import { useUpdateCampeonato } from "../domain/presentation/hook/useUpdateCampeonato";

// Pantalla para gestionar la edición
// y creación de campeonatos
export default function EditCampeonato() {

  const router = useRouter();

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

    id?: string;

    anio?: string;

    goleador?: string;

    pais?: string;

    goles?: string;

    imagen?: string;

    paId?: string;
  }>();

  const isEdit = Boolean(id);

  const goBack = () => {

    router.back();

  };

  const handleSubmit = async (
    data: CampeonatoFormData
  ) => {

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
        });
      }

      router.back();

    } catch (error) {

      console.log(error);
    }
  };

  return (

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
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl
  }
});