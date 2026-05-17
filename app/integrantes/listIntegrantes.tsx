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
import { COLORS, FONTS, RADIUS, SPACING, globalStyles } from '../../styles/globalStyles';

export default function ListIntegrantes() {
  const router = useRouter();
  const { campeonatoId, anio } = useLocalSearchParams<{
    campeonatoId?: string;
    anio?: string;
  }>();

  const caId = Number(campeonatoId ?? 0);
  const { integrantes, loading, refresh } = useIntegrantes(caId);
  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));

  const { remove } = useDeleteIntegrante(refresh);

  const [filtro, setFiltro] = useState<'todos' | 'jugadores' | 'staff'>('todos');

  const filtered = integrantes.filter((i) => {
    if (filtro === 'jugadores') return i.int_es_jug === 1;
    if (filtro === 'staff') return i.int_es_jug === 0;
    return true;
  });

  const jugadores = integrantes.filter((i) => i.int_es_jug === 1).length;
  const staff = integrantes.filter((i) => i.int_es_jug === 0).length;

  const handleDelete = (item: IntegranteModel) => {
    Alert.alert(
      'Eliminar integrante',
      `¿Eliminar a ${item.int_nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => remove(item.int_id) },
      ]
    );
  };

  const renderItem = ({ item }: { item: IntegranteModel }) => (
    <View style={styles.card}>
      <View style={[styles.avatar, { backgroundColor: item.int_es_jug ? COLORS.primaryLight : COLORS.successLight }]}>
        <Ionicons
          name={item.int_es_jug ? 'football' : 'briefcase'}
          size={20}
          color={item.int_es_jug ? COLORS.primary : COLORS.success}
        />
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.nombre}>{item.int_nombre}</Text>
        <View style={styles.rolRow}>
          <View style={[styles.rolBadge, { backgroundColor: item.int_es_jug ? COLORS.primaryLight : COLORS.successLight }]}>
            <Text style={[styles.rolText, { color: item.int_es_jug ? COLORS.primary : COLORS.success }]}>
              {item.int_es_jug ? 'Jugador' : 'Cuerpo técnico'}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() =>
          router.push({
            pathname: '/integrantes/editIntegrante',
            params: { id: item.int_id, campeonatoId: caId },
          })
        }
      >
        <Ionicons name="create-outline" size={18} color={COLORS.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.editBtn} onPress={() => handleDelete(item)}>
        <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );

  if (loading) return <LoadingView />;

  return (
    <View style={globalStyles.screen}>
      {/* Resumen */}
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>
          {anio ? `Mundial ${anio}` : 'Todos los campeonatos'}
        </Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryChip}>
            <Ionicons name="football" size={14} color={COLORS.primary} />
            <Text style={styles.summaryChipText}>{jugadores} jugadores</Text>
          </View>
          <View style={styles.summaryChip}>
            <Ionicons name="briefcase" size={14} color={COLORS.success} />
            <Text style={styles.summaryChipText}>{staff} Cuerpo técnico</Text>
          </View>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filtros}>
        {(['todos', 'jugadores', 'staff'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filtroBtn, filtro === f && styles.filtroBtnActive]}
            onPress={() => setFiltro(f)}
          >
            <Text style={[styles.filtroText, filtro === f && styles.filtroTextActive]}>
              {f === 'todos' ? 'Todos' : f === 'jugadores' ? 'Jugadores' : 'Cuerpo técnico'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.int_id)}
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

      {caId > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            router.push({
              pathname: '/integrantes/editIntegrante',
              params: { campeonatoId: caId },
            })
          }
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: FONTS.bold,
    color: '#fff',
    marginBottom: 6,
  },
  summaryRow: { flexDirection: 'row', gap: 8 },
  summaryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  summaryChipText: { fontSize: 12, color: '#fff', fontWeight: FONTS.medium },
  filtros: {
    flexDirection: 'row',
    padding: SPACING.sm,
    backgroundColor: COLORS.surface,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filtroBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
  },
  filtroBtnActive: { backgroundColor: COLORS.primary },
  filtroText: { fontSize: 13, fontWeight: FONTS.medium, color: COLORS.textSecondary },
  filtroTextActive: { color: '#fff', fontWeight: FONTS.bold },
  list: { padding: SPACING.md, paddingBottom: 90 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { flex: 1 },
  nombre: { fontSize: 15, fontWeight: FONTS.semibold, color: COLORS.textPrimary, marginBottom: 4 },
  rolRow: { flexDirection: 'row' },
  rolBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  rolText: { fontSize: 11, fontWeight: FONTS.semibold },
  editBtn: {
    padding: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});
