<<<<<<< HEAD
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
=======
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
import { IntegranteForm } from '../components/integranteForm';
import { IntegranteRepositoryImpl } from '../domain/data/repository/integranteRepositoryImpl';
import { CreateIntegranteModel } from '../domain/model/integranteModel';
import { useUpdateIntegrante } from '../domain/presentation/hook/index';
import { COLORS, SPACING } from '../styles/globalStyles';

export default function EditIntegrante() {

  const router = useRouter();

<<<<<<< HEAD

=======
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
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

<<<<<<< HEAD
 return (
  <SafeAreaView style={styles.safeArea}>
=======
  return (

>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
<<<<<<< HEAD
=======

>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
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
<<<<<<< HEAD
    </ScrollView>
  </SafeAreaView>
);
=======

    </ScrollView>
  );
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
}

const styles = StyleSheet.create({

<<<<<<< HEAD
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, 
  },

=======
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
  screen: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl
  }

});