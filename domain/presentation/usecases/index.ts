<<<<<<< HEAD
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
=======
// ── Campeonato use cases ────────────────────────────────────────────────────

/*import { CampeonatoRepositoryImpl } from '../../data/repository/campeonatoRepositoryImpl';
import { CampeonatoModel, CreateCampeonatoModel, UpdateCampeonatoModel } from '../../model/campeonatoModel';

export function getCampeonatosUseCase(): CampeonatoModel[] {
  return new CampeonatoRepositoryImpl().getAll();
}

export function createCampeonatoUseCase(data: CreateCampeonatoModel): CampeonatoModel {
  return new CampeonatoRepositoryImpl().create(data);
}

export function updateCampeonatoUseCase(id: number, data: UpdateCampeonatoModel): CampeonatoModel | null {
  return new CampeonatoRepositoryImpl().update(id, data);
}

export function deleteCampeonatoUseCase(id: number): boolean {
  return new CampeonatoRepositoryImpl().delete(id);
}*/

// ── Pais use cases ──────────────────────────────────────────────────────────

/*import { PaisGanadorRepositoryImpl } from '../../data/repository/paisGanadorRepositoryImpl';
import { PaisGanadorModel, CreatePaisGanadorModel, UpdatePaisGanadorModel } from '../../model/paisGanadorModel';

export function getPaisesUseCase(): PaisGanadorModel[] {
  return new PaisGanadorRepositoryImpl().getAll();
}

export function getPaisByIdUseCase(id: number): PaisGanadorModel | null {
  return new PaisGanadorRepositoryImpl().getById(id);
}

export function createPaisUseCase(data: CreatePaisGanadorModel): PaisGanadorModel {
  return new PaisGanadorRepositoryImpl().create(data);
}

export function updatePaisUseCase(id: number, data: UpdatePaisGanadorModel): PaisGanadorModel | null {
  return new PaisGanadorRepositoryImpl().update(id, data);
}*/

// ── Integrante use cases ────────────────────────────────────────────────────
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf

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
