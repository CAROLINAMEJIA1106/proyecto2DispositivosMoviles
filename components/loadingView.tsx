
/***************************************************************
 * Nombre: loadingView.tsx
 *
 * Descripción:
 * Componente reutilizable que muestra un indicador
 * de carga centrado en pantalla con un mensaje
 * opcional. Se usa mientras se obtienen datos
 * de la base de datos o servicios externos.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/


import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../styles/globalStyles';

interface Props {
  message?: string;
}

export function LoadingView({ message = 'Cargando...' }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: FONTS.medium,
  },
});
