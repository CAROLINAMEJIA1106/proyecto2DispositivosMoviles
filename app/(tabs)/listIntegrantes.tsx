import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { EmptyState } from '../../components/emptyState';
import { LoadingView } from '../../components/loadingView';
import { IntegranteModel } from '../../domain/model/integranteModel';

import {
  useDeleteIntegrante,
  useIntegrantes
} from '../../domain/presentation/hook/index';

import {
  COLORS,
  FONTS,
  RADIUS,
  SPACING,
  globalStyles
} from '../../styles/globalStyles';

export default function ListIntegrantes() {

  const router = useRouter();

  const {
    campeonatoId,
    anio,
    paisGanadorId,
    nombrePais
  } = useLocalSearchParams<{
    campeonatoId?: string;
    anio?: string;
    paisGanadorId?: string;
    nombrePais?: string;
  }>();

  const caId =
    campeonatoId
      ? Number(campeonatoId)
      : undefined;

  const {
    integrantes,
    loading,
    refresh
  } = useIntegrantes(caId);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const { remove } =
    useDeleteIntegrante(refresh);

  const [filtro, setFiltro] =
    useState<
      'todos'
      | 'jugadores'
      | 'staff'
    >('todos');

  const filtered =
    integrantes.filter((i) => {

      if (filtro === 'jugadores')
        return i.int_es_jug === 1;

      if (filtro === 'staff')
        return i.int_es_jug === 0;

      return true;
    });

  const jugadores =
    integrantes.filter(
      (i) => i.int_es_jug === 1
    ).length;

  const staff =
    integrantes.filter(
      (i) => i.int_es_jug === 0
    ).length;

  const handleDelete = (
    item: IntegranteModel
  ) => {

    Alert.alert(
      'Eliminar integrante',
      `¿Eliminar a ${item.int_nombre}?`,
      [
        {
          text:'Cancelar',
          style:'cancel'
        },

        {
          text:'Eliminar',
          style:'destructive',
          onPress:() =>
            remove(item.int_id)
        }
      ]
    );

  };

  const renderItem = ({
    item
  }: {
    item: IntegranteModel
  }) => (

    <View style={styles.card}>

      <View
        style={[
          styles.avatar,
          {
            backgroundColor:
            item.int_es_jug
            ? COLORS.primaryLight
            : COLORS.successLight
          }
        ]}
      >

        <Ionicons
          name={
            item.int_es_jug
            ? 'football'
            : 'briefcase'
          }
          size={20}
          color={
            item.int_es_jug
            ? COLORS.primary
            : COLORS.success
          }
        />

      </View>

      <View style={styles.cardBody}>

        <Text style={styles.nombre}>
          {item.int_nombre}
        </Text>

        <View style={styles.rolRow}>

          <View
            style={[
              styles.rolBadge,
              {
                backgroundColor:
                item.int_es_jug
                ? COLORS.primaryLight
                : COLORS.successLight
              }
            ]}
          >

            <Text
              style={[
                styles.rolText,
                {
                  color:
                  item.int_es_jug
                  ? COLORS.primary
                  : COLORS.success
                }
              ]}
            >
              {
                item.int_es_jug
                ? 'Jugador'
                : 'Cuerpo técnico'
              }
            </Text>

          </View>

        </View>

      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() =>
          router.push({
            pathname:'/editIntegrante',
            params:{
              id:item.int_id,
              campeonatoId:caId
            }
          })
        }
      >

        <Ionicons
          name="create-outline"
          size={18}
          color={COLORS.primary}
        />

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() =>
          handleDelete(item)
        }
      >

        <Ionicons
          name="trash-outline"
          size={18}
          color={COLORS.danger}
        />

      </TouchableOpacity>

    </View>

  );

  if (loading)
    return <LoadingView />;

  return (

    <View style={globalStyles.screen}>

      <View style={styles.header}>

        {campeonatoId && (

          <TouchableOpacity

            style={styles.backButton}

            activeOpacity={0.7}

            hitSlop={{
              top:20,
              bottom:20,
              left:20,
              right:20
            }}

            onPress={() => {

              console.log(
                "BOTON INTEGRANTES PRESIONADO"
              );

              router.replace({
                pathname:"/(tabs)/listCampeonatos",
                params:{
                  paisGanadorId,
                  nombrePais
                }
              } as any);

            }}
          >

            <Ionicons
              name="arrow-back"
              size={22}
              color="#fff"
            />

          </TouchableOpacity>

        )}

      </View>

      <View style={styles.summary}>

        <Text style={styles.summaryTitle}>
          {
            anio
            ? `Mundial ${anio}`
            : 'Todos los campeonatos'
          }
        </Text>

        <View style={styles.summaryRow}>

          <View style={styles.summaryChip}>

            <Ionicons
              name="football"
              size={14}
              color={COLORS.primary}
            />

            <Text style={styles.summaryChipText}>
              {jugadores} jugadores
            </Text>

          </View>

          <View style={styles.summaryChip}>

            <Ionicons
              name="briefcase"
              size={14}
              color={COLORS.success}
            />

            <Text style={styles.summaryChipText}>
              {staff} Cuerpo técnico
            </Text>

          </View>

        </View>

      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item)=>
          String(item.int_id)
        }
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            icon="person-outline"
            title="Sin integrantes"
            subtitle="Agrega jugadores o cuerpo técnico con el botón +"
          />
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({

  header:{
    backgroundColor:COLORS.primaryDark,
    paddingHorizontal:SPACING.md,
    paddingTop:SPACING.sm
  },

  backButton:{
    width:50,
    height:50,

    borderRadius:25,

    backgroundColor:
      "rgba(255,255,255,0.12)",

    justifyContent:"center",
    alignItems:"center",

    marginBottom:SPACING.sm,
    marginRight:10
  },

  summary:{
    backgroundColor:COLORS.primaryDark,
    paddingHorizontal:SPACING.md,
    paddingVertical:SPACING.sm
  },

  summaryTitle:{
    fontSize:15,
    fontWeight:FONTS.bold,
    color:"#fff",
    marginBottom:6
  },

  summaryRow:{
    flexDirection:"row",
    gap:8
  },

  summaryChip:{
    flexDirection:"row",
    alignItems:"center",
    gap:5,
    backgroundColor:"rgba(255,255,255,0.12)",
    paddingHorizontal:10,
    paddingVertical:4,
    borderRadius:RADIUS.full
  },

  summaryChipText:{
    fontSize:12,
    color:"#fff"
  },

  list:{
    padding:SPACING.md,
    paddingBottom:90
  },

  card:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:COLORS.surface,
    borderRadius:RADIUS.lg,
    padding:SPACING.md,
    marginBottom:SPACING.xs,
    gap:SPACING.sm
  },

  avatar:{
    width:40,
    height:40,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center"
  },

  cardBody:{flex:1},

  nombre:{
    fontSize:15,
    fontWeight:FONTS.semibold,
    color:COLORS.textPrimary
  },

  rolRow:{
    flexDirection:"row"
  },

  rolBadge:{
    paddingHorizontal:8,
    paddingVertical:2,
    borderRadius:RADIUS.full
  },

  rolText:{
    fontSize:11
  },

  editBtn:{
    padding:8,
    borderRadius:RADIUS.full,
    backgroundColor:COLORS.background
  }

});