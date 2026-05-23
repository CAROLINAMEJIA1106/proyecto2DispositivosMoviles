/***************************************************************
 * Nombre: editIntegrante.tsx
 *
 * Descripción:
 * Pantalla encargada de crear y actualizar
 * integrantes del mundial.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IntegranteForm } from '../components/integranteForm';
import { IntegranteRepositoryImpl } from '../domain/data/repository/integranteRepositoryImpl';
import { CreateIntegranteModel } from '../domain/model/integranteModel';
import { useUpdateIntegrante } from '../domain/presentation/hook/index';
import { COLORS, SPACING } from '../styles/globalStyles';

export default function EditIntegrante() {

  const router = useRouter();


  const { id, campeonatoId } = useLocalSearchParams<{
    id?: string;
    campeonatoId?: string;
  }>();

  const isEdit = Boolean(id);

  const caId = Number(campeonatoId ?? 0);

  const existing = isEdit
    ? new IntegranteRepositoryImpl().getById(Number(id))
    : null;

  const goBack = () => {

    router.back();

  };

  const {
    create,
    update,
    loading,
    error
  } = useUpdateIntegrante(goBack);

  const handleSubmit = (
    data: CreateIntegranteModel
  ) => {

    if (isEdit) {

      update(
        Number(id),
        data
      );

    } else {

      create(data);

    }
  };

 return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <IntegranteForm
        campeonatoId={existing?.int_ca_id ?? caId}
        initialValues={existing ?? undefined}
        onSubmit={handleSubmit}
        onCancel={goBack}
        loading={loading}
        error={error}
        submitLabel={
          isEdit
            ? 'Actualizar'
            : 'Agregar integrante'
        }
      />
    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, 
  },

  screen: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl
  }

});