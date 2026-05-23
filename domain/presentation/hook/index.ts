/***************************************************************
 * Nombre: index.ts
 *
 * Descripción:
 * Hooks personalizados para la gestión de
 * integrantes. Incluye hooks para obtener,
 * crear, actualizar y eliminar integrantes
 * de un campeonato.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import { useCallback, useState } from 'react';
import { CreateIntegranteModel, IntegranteModel, UpdateIntegranteModel } from '../../model/integranteModel';
import {
  createIntegranteUseCase,
  deleteIntegranteUseCase,
  getIntegrantesByCampeonatoUseCase,
  updateIntegranteUseCase
} from '../usecases/index';


export function useIntegrantes(
  campeonatoId?: number
) {

  const [integrantes, setIntegrantes]
    = useState<IntegranteModel[]>(() =>

      campeonatoId
        ? getIntegrantesByCampeonatoUseCase(campeonatoId)
        : getIntegrantesByCampeonatoUseCase()
    );

  const [loading, setLoading]
    = useState(false);

  const refresh = useCallback(() => {

    setLoading(true);

    setIntegrantes(

      campeonatoId
        ? getIntegrantesByCampeonatoUseCase(campeonatoId)
        : getIntegrantesByCampeonatoUseCase()
    );

    setLoading(false);

  }, [campeonatoId]);

  return {
    integrantes,
    loading,
    refresh
  };
}

// ── useUpdateIntegrante ─────────────────────────────────────────────────────
export function useUpdateIntegrante(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback((data: CreateIntegranteModel) => {
    try {
      setLoading(true);
      setError(null);
      createIntegranteUseCase(data);
      onSuccess();
    } catch (e: any) {
      setError(e?.message ?? 'Error al agregar integrante');
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  const update = useCallback((id: number, data: UpdateIntegranteModel) => {
    try {
      setLoading(true);
      setError(null);
      updateIntegranteUseCase(id, data);
      onSuccess();
    } catch (e: any) {
      setError(e?.message ?? 'Error al actualizar integrante');
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  return { create, update, loading, error };
}

// ── useDeleteIntegrante ─────────────────────────────────────────────────────
export function useDeleteIntegrante(onSuccess: () => void) {
  const remove = useCallback((id: number) => {
    deleteIntegranteUseCase(id);
    onSuccess();
  }, [onSuccess]);

  return { remove };
}
