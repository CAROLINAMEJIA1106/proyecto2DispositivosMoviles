import { CreateIntegranteModel, IntegranteModel, UpdateIntegranteModel } from '../../model/integranteModel';
import { IntegranteEntity } from '../entity/integrante';
import { db } from '../local/connection';
import { integranteEntityToModel } from '../mapper/integranteMapper';
import { IntegranteRepository } from './integranteRepository';

const SELECT_WITH_JOIN = `
  SELECT i.*, c.ca_anio, p.pa_nombre
  FROM integrante i
  LEFT JOIN campeonato c ON i.int_ca_id = c.ca_id
  LEFT JOIN pais_ganador p ON c.ca_pa_id = p.pa_id
`;

export class IntegranteRepositoryImpl implements IntegranteRepository {
  getAll(): IntegranteModel[] {
    const rows = db.getAllSync<IntegranteEntity>(
      `${SELECT_WITH_JOIN} ORDER BY i.int_nombre ASC`
    );
    return rows.map(integranteEntityToModel);
  }

  getByCampeonato(campeonatoId: number): IntegranteModel[] {
    const rows = db.getAllSync<IntegranteEntity>(
      `${SELECT_WITH_JOIN} WHERE i.int_ca_id = ? ORDER BY i.int_es_jug DESC, i.int_nombre ASC`,
      [campeonatoId]
    );
    return rows.map(integranteEntityToModel);
  }

  getById(id: number): IntegranteModel | null {
    const row = db.getFirstSync<IntegranteEntity>(
      `${SELECT_WITH_JOIN} WHERE i.int_id = ?`,
      [id]
    );
    return row ? integranteEntityToModel(row) : null;
  }

  create(data: CreateIntegranteModel): IntegranteModel {
    const result = db.runSync(
      'INSERT INTO integrante (int_ca_id, int_nombre, int_es_jug) VALUES (?, ?, ?)',
      [data.int_ca_id, data.int_nombre, data.int_es_jug]
    );
    return this.getById(result.lastInsertRowId)!;
  }

  update(id: number, data: UpdateIntegranteModel): IntegranteModel | null {
    const current = this.getById(id);
    if (!current) return null;
    const m = { ...current, ...data };
    db.runSync(
      'UPDATE integrante SET int_ca_id=?, int_nombre=?, int_es_jug=? WHERE int_id=?',
      [m.int_ca_id, m.int_nombre, m.int_es_jug, id]
    );
    return this.getById(id);
  }

  delete(id: number): boolean {
    const r = db.runSync('DELETE FROM integrante WHERE int_id = ?', [id]);
    return r.changes > 0;
  }
}
