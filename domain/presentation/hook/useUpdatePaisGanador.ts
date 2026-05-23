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

import { paisGanadorEntity } from "@/domain/data/entity/paisGanador";
import { db } from "@/domain/data/local/connection";
import { PaisGanadorRepositoyImpl } from "@/domain/data/repository/paisGanadorRepositoryImpl";
import { useMemo, useState } from "react";
import { UpdatePaisGanadorUseCase } from "../usecases/updatePaisGanadorUseCase";

export function UseUpdatePaisGanador()
{
    const [isLoading, setIsLoading]= useState(false);
    const [error, setError]= useState<string | null>(null);
    
    const repository = useMemo(() => {
        return new PaisGanadorRepositoyImpl(db);
      }, []);
    const useCase = useMemo(() => {
    return new UpdatePaisGanadorUseCase(repository);
        }, [repository]);

    const updatePaisGanador = async (
            paisGanador: paisGanadorEntity
          ) => {
            try {
              setIsLoading(true);
              setError(null);
              await useCase.execute(paisGanador);
                } 
            catch {
              setError("No se pudo actualizar el pais ganador");
              throw new Error();
            } 
            finally {setIsLoading(false);}
          };
          return {updatePaisGanador,isLoading,error,};
    }