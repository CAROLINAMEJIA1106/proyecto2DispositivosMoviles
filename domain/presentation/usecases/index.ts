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

import { IntegranteRepositoryImpl } from '../../data/repository/integranteRepositoryImpl';
import { CreateIntegranteModel, IntegranteModel, UpdateIntegranteModel } from '../../model/integranteModel';

export function getIntegrantesUseCase(): IntegranteModel[] {
  return new IntegranteRepositoryImpl().getAll();
}

export function getIntegrantesByCampeonatoUseCase(campeonatoId: number): IntegranteModel[] {
  return new IntegranteRepositoryImpl().getByCampeonato(campeonatoId);
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
