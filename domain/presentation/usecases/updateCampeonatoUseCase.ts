/***************************************************************
 * Nombre: updateCampeonatoUseCase.ts
 *
 * Descripción:
 * Caso de uso encargado de ejecutar
 * la lógica para actualizar campeonatos.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import { CampeonatoRepository } from "@/domain/data/repository/campeonatoRepository";

import { Campeonato } from "@/domain/data/entity/campeonato";

// Clase encargada de actualizar campeonatos
export class UpdateCampeonatoUseCase {

  constructor(
    private readonly repository:
      CampeonatoRepository
  ) {}

  async execute(
    campeonato: Campeonato
  ): Promise<void> {

    await this.repository.update(
      campeonato
    );
  }
}