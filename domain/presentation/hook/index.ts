import { useCallback, useState } from 'react';
import {
  createIntegranteUseCase,
  deleteIntegranteUseCase,
  getIntegrantesByCampeonatoUseCase,
  updateIntegranteUseCase
} from '../usecases/index';
//import { CampeonatoModel, CreateCampeonatoModel, UpdateCampeonatoModel } from '../../model/campeonatoModel';
//import { PaisGanadorModel, CreatePaisGanadorModel, UpdatePaisGanadorModel } from '../../model/paisGanadorModel';
import { CreateIntegranteModel, IntegranteModel, UpdateIntegranteModel } from '../../model/integranteModel';

// ── useCampeonatos ──────────────────────────────────────────────────────────
/*export function useCampeonatos() {
  const [campeonatos, setCampeonatos] = useState<CampeonatoModel[]>(() =>
    getCampeonatosUseCase()
  );
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    setCampeonatos(getCampeonatosUseCase());
    setLoading(false);
  }, []);

  return { campeonatos, loading, refresh };
}

// ── useCreateCampeonato ─────────────────────────────────────────────────────
export function useCreateCampeonato(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback((data: CreateCampeonatoModel) => {
    try {
      setLoading(true);
      setError(null);
      createCampeonatoUseCase(data);
      onSuccess();
    } catch (e: any) {
      setError(e?.message ?? 'Error al crear el campeonato');
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  return { create, loading, error };
}

// ── useUpdateCampeonato ─────────────────────────────────────────────────────
export function useUpdateCampeonato(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback((id: number, data: UpdateCampeonatoModel) => {
    try {
      setLoading(true);
      setError(null);
      updateCampeonatoUseCase(id, data);
      onSuccess();
    } catch (e: any) {
      setError(e?.message ?? 'Error al actualizar el campeonato');
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  const remove = useCallback((id: number) => {
    try {
      deleteCampeonatoUseCase(id);
      onSuccess();
    } catch (e: any) {
      setError(e?.message ?? 'Error al eliminar');
    }
  }, [onSuccess]);

  return { update, remove, loading, error };
}

// ── usePaises ───────────────────────────────────────────────────────────────
export function usePaises() {
  const [paises, setPaises] = useState<PaisGanadorModel[]>(() =>
    getPaisesUseCase()
  );
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    setPaises(getPaisesUseCase());
    setLoading(false);
  }, []);

  const getPaisById = useCallback(
    (id: number) => getPaisByIdUseCase(id),
    []
  );

  return { paises, loading, refresh, getPaisById };
}

// ── useCreatePais ───────────────────────────────────────────────────────────
export function useCreatePais(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback((data: CreatePaisGanadorModel) => {
    try {
      setLoading(true);
      setError(null);
      createPaisUseCase(data);
      onSuccess();
    } catch (e: any) {
      setError(e?.message ?? 'Error al crear el país');
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  const update = useCallback((id: number, data: UpdatePaisGanadorModel) => {
    try {
      setLoading(true);
      setError(null);
      updatePaisUseCase(id, data);
      onSuccess();
    } catch (e: any) {
      setError(e?.message ?? 'Error al actualizar el país');
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  return { create, update, loading, error };
}*/

// ── useIntegrantes ──────────────────────────────────────────────────────────
export function useIntegrantes(campeonatoId: number) {
  const [integrantes, setIntegrantes] = useState<IntegranteModel[]>(() =>
    getIntegrantesByCampeonatoUseCase(campeonatoId)
  );
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    setIntegrantes(getIntegrantesByCampeonatoUseCase(campeonatoId));
    setLoading(false);
  }, [campeonatoId]);

  return { integrantes, loading, refresh };
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
