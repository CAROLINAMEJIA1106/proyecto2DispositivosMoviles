/***************************************************************
 * Nombre: useCreateCampeonato.ts
 *
 * Descripción:
 * Hook encargado de gestionar la creación
 * de campeonatos en la base de datos SQLite.
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

import { CreateCampeonatoUseCase } from "../usecases/createCampeonatoUseCase";

// Hook para crear nuevos campeonatos
export function useCreateCampeonato() {

  const [isLoading, setIsLoading]
    = useState(false);

  const [error, setError]
    = useState<string | null>(null);

  const repository = useMemo(() => {
    return new CampeonatoRepositoryImpl(db);
  }, []);

  const useCase = useMemo(() => {
    return new CreateCampeonatoUseCase(
      repository
    );
  }, [repository]);

  const createCampeonato = async (
    campeonato: Omit<Campeonato, "caId">
  ) => {

    try {

      setIsLoading(true);
      setError(null);

      await useCase.execute(
        campeonato
      );

    } catch {

      setError(
        "No se pudo crear el campeonato"
      );

      throw new Error();

    } finally {

      setIsLoading(false);
    }
  };

  return {
    createCampeonato,
    isLoading,
    error,
  };
}