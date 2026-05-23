<<<<<<< HEAD
/***************************************************************
 * Nombre: usePaisGanador.ts
 *
 * Descripción:
 * Hook personalizado para obtener y gestionar
 * la lista de países ganadores. Recarga los
 * datos automáticamente al enfocar la pantalla.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import { useFocusEffect } from "expo-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useState
=======
import { useFocusEffect } from "expo-router";
import {
    useCallback,
    useEffect,
    useMemo,
    useState
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
} from "react";

import { db } from "@/domain/data/local/connection";
import { PaisGanadorRepositoyImpl } from "@/domain/data/repository/paisGanadorRepositoryImpl";
import { paisGanadorModel } from "@/domain/model/paisGanadorModel";
import { TraerPaisGanadorUseCase } from "@/domain/presentation/usecases/traerPaisGanadorUseCase";

export function usePaisGanador()
{
    const [paisGanador,setPaisGanador]=useState<paisGanadorModel[]>([]); 
    const [isLoading,setIsLoading ]=useState(true);
    const [error,SetError]=useState<string|null>(null);

    const paisGanadorRepository= useMemo(() => 
    {return new PaisGanadorRepositoyImpl(db)},[]);

    const getPaisGanadorUseCase = useMemo(()=>{
        return new TraerPaisGanadorUseCase(
            paisGanadorRepository
        );
    },[paisGanadorRepository]);

    const loadPaisGanador =
    useCallback(async () => {
        try {

        setIsLoading(true);
        SetError(null);

        const result =
          await getPaisGanadorUseCase.execute();

        setPaisGanador(result);
      }
      catch {
        SetError(
          "No se pudieron cargar los PAISES GANADORES"
        );

      } finally {

        setIsLoading(false);
      }
    },[getPaisGanadorUseCase]);
useEffect(() => {
    loadPaisGanador();
  }, [loadPaisGanador]);

  useFocusEffect(
    useCallback(() => {
      loadPaisGanador();
    }, [])
  );

  return {
    paisGanador,
    isLoading,
    error,
    reload: loadPaisGanador,
  };
}