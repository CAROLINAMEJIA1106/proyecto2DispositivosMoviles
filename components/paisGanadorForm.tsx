/***************************************************************
 * Nombre: paisGanadorForm.tsx
 * Descripción:
 * Componente reutilizable que contiene
 * el formulario de países ganadores.
 * Autor: Grupo 3
 * Fecha: Mayo/2026
 ***************************************************************/
import { globalStyles, SPACING } from "@/styles/globalStyles";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { CustomButton } from "./customButton";



export interface PaisGanadorFormData {
    pa_id: number;
    pa_nombre: string;
    pa_num_campeon: number;
    pa_bandera: string;
    pa_anios: string;
}

interface Props {initialValues?: Partial<PaisGanadorFormData>;
    onSubmit: (    data: PaisGanadorFormData  ) => void;
    onCancel: () => void;
    loading?: boolean;
    error?: string | null;
    submitLabel?: string;
}

export function PaisGanadorForm({
    initialValues,
    onSubmit,   
    onCancel,
    loading,
    error,
    submitLabel = "Guardar",    
}: Props) { // inicio del propiedades del formulario
    const [nombre, setNombre] = useState(initialValues?.pa_nombre ?? "");
    const [numCampeon, setNumCampeon] = useState(initialValues?.pa_num_campeon?.toString() ?? "");
    const [bandera, setBandera] = useState(initialValues?.pa_bandera ?? "");
    const [anios, setAnios] = useState(initialValues?.pa_anios ?? "");

    const handleSubmit = () => {

        if (!nombre || !numCampeon || !anios) {
            Alert.alert("Error", "Por favor, complete los campos.");
            return;
        }
        const data: PaisGanadorFormData = {
            pa_id: initialValues?.pa_id ?? 0,
            pa_nombre: nombre,
            pa_num_campeon: parseInt(numCampeon) || 0,
            pa_bandera: initialValues?.pa_bandera ?? "",
            pa_anios: anios
        };
        onSubmit(data);
    };
    return (
        <View>
            <View style={styles.field}>
                <Text style={globalStyles.label}>
                    Nombre del país:</Text>
                <TextInput
                style={globalStyles.input}
                    value={nombre}
                    onChangeText={setNombre}
                    placeholder="Nombre del país"
                />
            </View>
        
        <View style={styles.field}>
            <Text style={globalStyles.label}>
                Campeonatos ganados:</Text>
            <TextInput
                style={globalStyles.input}
                value={numCampeon}
                onChangeText={setNumCampeon}
                keyboardType="numeric"
                placeholder="Ej: 2022"
            />  
        </View>
        <View style={styles.field}>
            <Text style={globalStyles.label}>
                Bandera:</Text>  
            <TextInput
                style={globalStyles.input}
                value={bandera}
                onChangeText={setBandera}
                placeholder="https://..."
            />
        </View>
        <View style={styles.field}>
            <Text style={globalStyles.label}>
                Años de los campeonatos:</Text>
            <TextInput
                style={globalStyles.input}
                value={anios}
                onChangeText={setAnios}
                placeholder="Ej: 2020, 2022"
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
    </View> //vista principal del formulario
    );

} // fin del propiedades del formulario
// estilos específicos para el formulario de países ganadores
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