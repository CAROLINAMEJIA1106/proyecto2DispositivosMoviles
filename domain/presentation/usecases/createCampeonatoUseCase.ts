/***************************************************************
 * Nombre: createCampeonatoUseCase.ts
 *
 * Descripción:
 * Caso de uso encargado de ejecutar
 * la lógica para crear campeonatos.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

import { CampeonatoRepository } from "@/domain/data/repository/campeonatoRepository";

import { Campeonato } from "@/domain/data/entity/campeonato";

// Clase encargada de crear campeonatos
export class CreateCampeonatoUseCase {

  constructor(
    private readonly repository:
      CampeonatoRepository
  ) {}

  async execute(
    campeonato: Omit<Campeonato, "caId">
  ): Promise<void> {

    await this.repository.create(
      campeonato
    );
  }
}