/***************************************************************
 * Nombre: useCreatePaisGanador.ts
 *
 * Descripción:
 * Hook personalizado para crear un nuevo país
 * ganador. Gestiona el estado de carga y error
 * durante la operación de creación.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import { paisGanadorEntity } from "@/domain/data/entity/paisGanador";
import { db } from "@/domain/data/local/connection";
import { PaisGanadorRepositoyImpl } from "@/domain/data/repository/paisGanadorRepositoryImpl";
import { useMemo, useState } from "react";
import { CreatePaisGanadorUseCase } from "../usecases/createPaisGanadorUseCase";

export function UseCreatePaisGanador()
{
      const [isLoading, setIsLoading]    = useState(false);
      const [error, setError]    = useState<string | null>(null);
      const repository = useMemo(() => {
          return new PaisGanadorRepositoyImpl(db);}, []);

    const useCase = useMemo(() => {
        return new CreatePaisGanadorUseCase(repository);
        }, [repository]);
        
    const createPaisGanador = async (paisGanador: Omit<paisGanadorEntity, "pa_id">) => 
        {
            try {
                setIsLoading(true);
                setError(null);
                await useCase.execute(paisGanador);
                } 
            catch {
              setError("No se pudo crear el pais ganador");
            throw new Error();
                  } 
            finally {setIsLoading(false);
    }
  };

  return {
    createPaisGanador,
    isLoading,
    error,
  };
}