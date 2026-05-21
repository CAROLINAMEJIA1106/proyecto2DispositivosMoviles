
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

export function useCampeonatos() {
  

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
          await getCampeonatosUseCase.execute();

        setCampeonatos(result);

      } catch {

        setError(
          "No se pudieron cargar los campeonatos"
        );

      } finally {

        setIsLoading(false);
      }

    }, [getCampeonatosUseCase]);

  useEffect(() => {
    loadCampeonatos();
  }, [loadCampeonatos]);

  useFocusEffect(
    useCallback(() => {
      loadCampeonatos();
    }, [])
  );

  return {
    campeonatos,
    isLoading,
    error,
    reload: loadCampeonatos,
  };
}