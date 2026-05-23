/***************************************************************
 * Nombre: customButton.tsx
 *
 * Descripción:
 * Componente reutilizable de botón con soporte
 * para múltiples variantes visuales (primary,
 * secondary, danger, ghost), estado de carga
 * y estado deshabilitado.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../styles/globalStyles';


type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function CustomButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}: Props) {
  const bg: Record<Variant, string> = {
    primary: COLORS.primary,
    secondary: COLORS.surface,
    danger: COLORS.danger,
    ghost: 'transparent',
  };
  const textColor: Record<Variant, string> = {
    primary: '#FFFFFF',
    secondary: COLORS.primary,
    danger: '#FFFFFF',
    ghost: COLORS.primary,
  };
  const borderColor: Record<Variant, string> = {
    primary: COLORS.primary,
    secondary: COLORS.border,
    danger: COLORS.danger,
    ghost: 'transparent',
  };

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor: bg[variant],
          borderColor: borderColor[variant],
          opacity: disabled || loading ? 0.6 : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor[variant]} size="small" />
      ) : (
        <Text style={[styles.label, { color: textColor[variant] }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    paddingVertical: 13,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  label: {
    fontSize: 15,
    fontWeight: FONTS.semibold,
    letterSpacing: 0.3,
  },
});
