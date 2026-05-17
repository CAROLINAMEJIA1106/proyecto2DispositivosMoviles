// domain/data/repository/integranteRepository.ts
import { IntegranteModel, CreateIntegranteModel, UpdateIntegranteModel } from '../../model/integranteModel';

export interface IntegranteRepository {
  getAll(): IntegranteModel[];
  getByCampeonato(campeonatoId: number): IntegranteModel[];
  getById(id: number): IntegranteModel | null;
  create(data: CreateIntegranteModel): IntegranteModel;
  update(id: number, data: UpdateIntegranteModel): IntegranteModel | null;
  delete(id: number): boolean;
}
