/***************************************************************
 * Nombre: paisGanadorEdit.tsx
 *
 * Descripción:
 * Pantalla encargada de crear y actualizar
 * países ganadores del mundial.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import React, { useState } from "react";

import {
  useLocalSearchParams,
  useRouter
} from "expo-router";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS, FONTS, RADIUS, SPACING } from "../styles/globalStyles";

import { UseCreatePaisGanador } from "../domain/presentation/hook/useCreatePaisGanador";
import { UseUpdatePaisGanador } from "../domain/presentation/hook/useUpdatePaisGanador";

export default function PaisGanadorEdit() {

  const router = useRouter();

  const {
    createPaisGanador,
    isLoading: isCreating,
    error: createError,
  } = UseCreatePaisGanador();

  const {
    updatePaisGanador,
    isLoading: isUpdating,
    error: updateError,
  } = UseUpdatePaisGanador();

  const {
    id,
    nombre,
    num_campeonatos,
    bandera,
    anios
  } = useLocalSearchParams<{

    id?: string;
    nombre?: string;
    num_campeonatos?: string;
    bandera?: string;
    anios?: string;
  }>();

  const isEdit = Boolean(id);

  const [nombrePais, setNombrePais] = useState(nombre ?? "");
  const [numCampeonatos, setNumCampeonatos] = useState(
    num_campeonatos ?? ""
  );

  const [banderaPais, setBanderaPais] = useState(
    bandera ?? ""
  );

  const [aniosPais, setAniosPais] = useState(
    anios ?? ""
  );

  const isLoading = isCreating || isUpdating;

  const error = createError || updateError;

  const handleSave = async () => {

    try {

      const payload = {

        pa_nombre: nombrePais,

        pa_num_campeon: Number(numCampeonatos),

        pa_bandera: banderaPais,

        pa_anios: aniosPais
      };

      if (isEdit && id) {

        await updatePaisGanador({
          pa_id: Number(id),
          ...payload
        });

      } else {

        await createPaisGanador(payload);
      }

      router.navigate("/(tabs)/paisGanadorList");

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <ScrollView
      contentContainerStyle={styles.container}
    >

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            router.navigate("/(tabs)/paisGanadorList")
          }
        >

          <Ionicons
            name="arrow-back"
            size={22}
            color="#fff"
          />

        </TouchableOpacity>

        <Text style={styles.title}>

          {isEdit
            ? "Editar País"
            : "Nuevo País"}

        </Text>

      </View>

      <View style={styles.form}>

        <Text style={styles.label}>
          Nombre del país
        </Text>

        <TextInput
          style={styles.input}
          value={nombrePais}
          onChangeText={setNombrePais}
          placeholder="Ejemplo: Brasil"
        />

        <Text style={styles.label}>
          Número de campeonatos
        </Text>

        <TextInput
          style={styles.input}
          value={numCampeonatos}
          onChangeText={setNumCampeonatos}
          keyboardType="numeric"
          placeholder="5"
        />

        <Text style={styles.label}>
          URL bandera
        </Text>

        <TextInput
          style={styles.input}
          value={banderaPais}
          onChangeText={setBanderaPais}
          placeholder="https://..."
        />

        <Text style={styles.label}>
          Años campeonatos
        </Text>

        <TextInput
          style={[styles.input, styles.multiline]}
          value={aniosPais}
          onChangeText={setAniosPais}
          multiline
          placeholder="1958, 1962, 1970..."
        />

        {error && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}
        >

          {isLoading ? (

            <ActivityIndicator color="#fff" />

          ) : (

            <Text style={styles.saveText}>
              Guardar
            </Text>
          )}

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            router.navigate("/(tabs)/paisGanadorList")
          }
        >

          <Text style={styles.cancelText}>
            Cancelar
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: SPACING.lg,
    backgroundColor: "#fff",
    flexGrow: 1
  },

  header: {

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 30,
    marginTop: 20,

    gap: 16
  },

  backButton: {

    width: 40,
    height: 40,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.primary
  },

  title: {

    fontSize: 24,

    fontWeight: FONTS.bold,

    color: COLORS.textPrimary
  },

  form: {
    gap: 14
  },

  label: {

    fontSize: 15,

    fontWeight: FONTS.medium,

    color: COLORS.textPrimary
  },

  input: {

    borderWidth: 1,

    borderColor: "#D1D5DB",

    borderRadius: RADIUS.md,

    padding: 14,

    fontSize: 16,

    backgroundColor: "#fff"
  },

  multiline: {
    minHeight: 100,
    textAlignVertical: "top"
  },

  saveButton: {

    backgroundColor: COLORS.primary,

    padding: 16,

    borderRadius: RADIUS.md,

    alignItems: "center",

    marginTop: 20
  },

  saveText: {

    color: "#fff",

    fontWeight: FONTS.bold,

    fontSize: 16
  },

  cancelButton: {

    padding: 16,

    borderRadius: RADIUS.md,

    alignItems: "center",

    backgroundColor: "#E5E7EB"
  },

  cancelText: {

    color: COLORS.textPrimary,

    fontWeight: FONTS.medium
  },

  error: {
    color: "red",
    marginTop: 10
  }
});