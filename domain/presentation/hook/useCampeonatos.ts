<<<<<<< HEAD
/***************************************************************
 * Nombre: useCampeonatos.ts
 *
 * Descripción:
 * Hook personalizado para obtener y gestionar
 * la lista de campeonatos. Soporta filtrado
 * por país y recarga automática al enfocar
 * la pantalla.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

=======
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { useFocusEffect } from "expo-router";

import { CampeonatoModel } from "@/domain/model/campeonatoModel";

import { CampeonatoRepositoryImpl } from "../../data/repository/campeonatoRepositoryImpl";

import { GetCampeonatosUseCase } from "../usecases/getCampeonatosUseCase";

import { db } from "@/domain/data/local/connection";

export function useCampeonatos(paisId?: number) {

  const [campeonatos, setCampeonatos]
    = useState<CampeonatoModel[]>([]);

  const [isLoading, setIsLoading]
    = useState(true);

  const [error, setError]
    = useState<string | null>(null);

  const campeonatoRepository = useMemo(() => {

    return new CampeonatoRepositoryImpl(db);

  }, []);

  const getCampeonatosUseCase = useMemo(() => {

    return new GetCampeonatosUseCase(
      campeonatoRepository
    );

  }, [campeonatoRepository]);

  const loadCampeonatos =
    useCallback(async () => {

      try {

        setIsLoading(true);

        setError(null);

        const result =
          await getCampeonatosUseCase.execute(
            paisId
          );

        setCampeonatos(result);

      } catch {

        setError(
          "No se pudieron cargar los campeonatos"
        );

      } finally {

        setIsLoading(false);

      }

    }, [
      getCampeonatosUseCase,
      paisId
    ]);

  useEffect(() => {

    loadCampeonatos();

  }, [
    loadCampeonatos
  ]);

  useFocusEffect(

    useCallback(() => {

      loadCampeonatos();

    }, [
      loadCampeonatos
    ])

  );

  return {

    campeonatos,

    isLoading,

    error,

    reload: loadCampeonatos,

  };
}