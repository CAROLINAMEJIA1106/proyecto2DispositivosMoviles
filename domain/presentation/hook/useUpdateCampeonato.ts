/***************************************************************
 * Nombre: useUpdateCampeonato.ts
 *
 * Descripción:
 * Hook encargado de gestionar la actualización
 * de campeonatos almacenados en SQLite.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import {
    useMemo,
    useState
} from "react";

import { db } from "@/domain/data/local/connection";

import { Campeonato } from "@/domain/data/entity/campeonato";

import { CampeonatoRepositoryImpl } from "@/domain/data/repository/campeonatoRepositoryImpl";

import { UpdateCampeonatoUseCase } from "../usecases/updateCampeonatoUseCase";

// Hook para actualizar campeonatos existentes
export function useUpdateCampeonato() {

  const [isLoading, setIsLoading]
    = useState(false);

  const [error, setError]
    = useState<string | null>(null);

  const repository = useMemo(() => {
    return new CampeonatoRepositoryImpl(db);
  }, []);

  const useCase = useMemo(() => {
    return new UpdateCampeonatoUseCase(
      repository
    );
  }, [repository]);

  const updateCampeonato = async (
    campeonato: Campeonato
  ) => {

    try {

      setIsLoading(true);
      setError(null);

      await useCase.execute(
        campeonato
      );

    } catch {

      setError(
        "No se pudo actualizar el campeonato"
      );

      throw new Error();

    } finally {

      setIsLoading(false);
    }
  };

  return {
    updateCampeonato,
    isLoading,
    error,
  };
}