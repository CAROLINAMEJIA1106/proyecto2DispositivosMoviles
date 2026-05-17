import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { CreateIntegranteModel } from '../domain/model/integranteModel';
import { COLORS, FONTS, RADIUS, SPACING, globalStyles } from '../styles/globalStyles';
import { CustomButton } from './customButton';

interface Props {
  campeonatoId: number;
  initialValues?: Partial<CreateIntegranteModel>;
  onSubmit: (data: CreateIntegranteModel) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string | null;
  submitLabel?: string;
}

export function IntegranteForm({
  campeonatoId,
  initialValues,
  onSubmit,
  onCancel,
  loading,
  error,
  submitLabel = 'Guardar',
}: Props) {
  const [nombre, setNombre] = useState(initialValues?.int_nombre ?? '');
  const [esJugador, setEsJugador] = useState<number>(
    initialValues?.int_es_jug !== undefined ? initialValues.int_es_jug : 1
  );

  const handleSubmit = () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }
    onSubmit({
      int_ca_id: campeonatoId,
      int_nombre: nombre.trim(),
      int_es_jug: esJugador,
    });
  };

  const roles: { label: string; value: number }[] = [
    { label: 'Jugador', value: 1 },
    { label: 'Cuerpo técnico', value: 0 },
  ];

  return (
    <View>
      {/* Nombre */}
      <View style={styles.field}>
        <Text style={globalStyles.label}>Nombre completo *</Text>
        <TextInput
          style={globalStyles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre del integrante"
          placeholderTextColor={COLORS.textMuted}
          autoFocus
        />
      </View>

      {/* Rol: jugador o staff */}
      <View style={styles.field}>
        <Text style={globalStyles.label}>Rol</Text>
        <View style={styles.toggle}>
          {roles.map((r) => (
            <View
              key={r.value}
              style={[styles.toggleOption, esJugador === r.value && styles.toggleOptionActive]}
            >
              <Text
                style={[styles.toggleText, esJugador === r.value && styles.toggleTextActive]}
                onPress={() => setEsJugador(r.value)}
              >
                {r.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {error && <Text style={globalStyles.errorText}>{error}</Text>}

      <View style={styles.actions}>
        <CustomButton label="Cancelar" onPress={onCancel} variant="ghost" fullWidth={false} style={{ flex: 1 }} />
        <CustomButton label={submitLabel} onPress={handleSubmit} loading={loading} fullWidth={false} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: SPACING.md },
  toggle: {
    flexDirection: 'row',
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  toggleOptionActive: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: FONTS.medium,
    color: COLORS.textSecondary,
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: FONTS.bold,
  },
  actions: { flexDirection: 'row', gap: 12, marginTop: SPACING.lg },
});
