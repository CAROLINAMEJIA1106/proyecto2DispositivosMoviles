
/***************************************************************
 * Nombre: index.ts
 *
 * Descripción:
 * Casos de uso para la gestión de integrantes.
 * Expone funciones para obtener, crear, actualizar
 * y eliminar integrantes de un campeonato,
 * delegando la lógica al repositorio.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/


import { IntegranteRepositoryImpl } from '../../data/repository/integranteRepositoryImpl';
import { CreateIntegranteModel, IntegranteModel, UpdateIntegranteModel } from '../../model/integranteModel';

export function getIntegrantesUseCase(): IntegranteModel[] {
  return new IntegranteRepositoryImpl().getAll();
}

export function getIntegrantesByCampeonatoUseCase(
  campeonatoId?: number
): IntegranteModel[] {

  const repository =
    new IntegranteRepositoryImpl();

  if (campeonatoId) {

    return repository.getByCampeonato(
      campeonatoId
    );
  }

  return repository.getAll();
}

export function createIntegranteUseCase(data: CreateIntegranteModel): IntegranteModel {
  return new IntegranteRepositoryImpl().create(data);
}

export function updateIntegranteUseCase(id: number, data: UpdateIntegranteModel): IntegranteModel | null {
  return new IntegranteRepositoryImpl().update(id, data);
}

export function deleteIntegranteUseCase(id: number): boolean {
  return new IntegranteRepositoryImpl().delete(id);
}
