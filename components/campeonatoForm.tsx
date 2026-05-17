/***************************************************************
 * Nombre: campeonatoForm.tsx
 *
 * Descripción:
 * Componente reutilizable que contiene
 * el formulario de campeonatos.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import React, {
    useState
} from "react";

import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import {
    globalStyles,
    SPACING
} from "../styles/globalStyles";

import { CustomButton } from "./customButton";

export interface CampeonatoFormData {
  ca_pa_id: number;
  ca_anio: number;
  ca_goleador: string;
  ca_gole_pais: string;
  ca_gole_num_gol: number;
  ca_gole_img: string;
}

interface Props {
  initialValues?: Partial<CampeonatoFormData>;

  onSubmit: (
    data: CampeonatoFormData
  ) => void;

  onCancel: () => void;

  loading?: boolean;

  error?: string | null;

  submitLabel?: string;
}

// Componente de formulario para crear o editar campeonatos
export function CampeonatoForm({
  initialValues,
  onSubmit,
  onCancel,
  loading,
  error,
  submitLabel = "Guardar",
}: Props) {

  const [anio, setAnio]
    = useState(
      initialValues?.ca_anio?.toString() ?? ""
    );

  const [goleador, setGoleador]
    = useState(
      initialValues?.ca_goleador ?? ""
    );

  const [pais, setPais]
    = useState(
      initialValues?.ca_gole_pais ?? ""
    );

  const [goles, setGoles]
    = useState(
      initialValues?.ca_gole_num_gol?.toString() ?? ""
    );

  const [imagen, setImagen]
    = useState(
      initialValues?.ca_gole_img ?? ""
    );

  const handleSubmit = () => {

    if (
      !anio ||
      !goleador ||
      !pais ||
      !goles
    ) {

      Alert.alert(
        "Error",
        "Todos los campos son obligatorios"
      );

      return;
    }

    onSubmit({

      ca_pa_id:
        initialValues?.ca_pa_id ?? 1,

      ca_anio: Number(anio),

      ca_goleador: goleador,

      ca_gole_pais: pais,

      ca_gole_num_gol:
        Number(goles),

      ca_gole_img: imagen,
    });
  };

  return (

    <View>

      <View style={styles.field}>

        <Text style={globalStyles.label}>
          Año
        </Text>

        <TextInput
          style={globalStyles.input}
          value={anio}
          onChangeText={setAnio}
          keyboardType="numeric"
          placeholder="Ej: 2022"
        />

      </View>

      <View style={styles.field}>

        <Text style={globalStyles.label}>
          Goleador
        </Text>

        <TextInput
          style={globalStyles.input}
          value={goleador}
          onChangeText={setGoleador}
          placeholder="Nombre goleador"
        />

      </View>

      <View style={styles.field}>

        <Text style={globalStyles.label}>
          País
        </Text>

        <TextInput
          style={globalStyles.input}
          value={pais}
          onChangeText={setPais}
          placeholder="País"
        />

      </View>

      <View style={styles.field}>

        <Text style={globalStyles.label}>
          Número de goles
        </Text>

        <TextInput
          style={globalStyles.input}
          value={goles}
          onChangeText={setGoles}
          keyboardType="numeric"
          placeholder="Ej: 8"
        />

      </View>

      <View style={styles.field}>

        <Text style={globalStyles.label}>
          URL imagen
        </Text>

        <TextInput
          style={globalStyles.input}
          value={imagen}
          onChangeText={setImagen}
          placeholder="https://..."
        />

      </View>

      {error && (
        <Text style={globalStyles.errorText}>
          {error}
        </Text>
      )}

      <View style={styles.actions}>

        <CustomButton
          label="Cancelar"
          onPress={onCancel}
          variant="ghost"
          fullWidth={false}
          style={{ flex: 1 }}
        />

        <CustomButton
          label={submitLabel}
          onPress={handleSubmit}
          loading={loading}
          fullWidth={false}
          style={{ flex: 1 }}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  field: {
    marginBottom: SPACING.md
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: SPACING.lg
  }
});