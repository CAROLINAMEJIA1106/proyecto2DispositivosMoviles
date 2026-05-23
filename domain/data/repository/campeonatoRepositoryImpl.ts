import { SQLiteDatabase } from "expo-sqlite";

import { Campeonato } from "../entity/campeonato";
import { CampeonatoRepository } from "./campeonatoRepository";

export class CampeonatoRepositoryImpl
  implements CampeonatoRepository {

  constructor(
    private readonly db: SQLiteDatabase
  ) {}

  async findAll(): Promise<Campeonato[]> {

    const result =
      await this.db.getAllAsync<Campeonato>(`
        SELECT
          ca_id as caId,
          ca_pa_id as caPaId,
          ca_anio as caAnio,
          ca_goleador as caGoleador,
          ca_gole_pais as caGolePais,
          ca_gole_num_gol as caGoleNumGol,
          ca_gole_img as caGoleImg
        FROM campeonato
        ORDER BY ca_anio ASC
      `);

    return result;
  }

  async create(
    campeonato: Omit<Campeonato, "caId">
  ): Promise<void> {

    await this.db.runAsync(
      `
      INSERT INTO campeonato (
        ca_pa_id,
        ca_anio,
        ca_goleador,
        ca_gole_pais,
        ca_gole_num_gol,
        ca_gole_img
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        campeonato.caPaId,
        campeonato.caAnio,
        campeonato.caGoleador,
        campeonato.caGolePais,
        campeonato.caGoleNumGol,
        campeonato.caGoleImg
      ]
    );
  }

  async update(
    campeonato: Campeonato
  ): Promise<void> {

    await this.db.runAsync(
      `
      UPDATE campeonato
      SET
        ca_pa_id = ?,
        ca_anio = ?,
        ca_goleador = ?,
        ca_gole_pais = ?,
        ca_gole_num_gol = ?,
        ca_gole_img = ?
      WHERE ca_id = ?
      `,
      [
        campeonato.caPaId,
        campeonato.caAnio,
        campeonato.caGoleador,
        campeonato.caGolePais,
        campeonato.caGoleNumGol,
        campeonato.caGoleImg,
        campeonato.caId
      ]
    );
  }
}