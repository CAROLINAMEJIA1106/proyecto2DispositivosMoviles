
/***************************************************************
 * Nombre: getCampeonatosUseCase.ts
 *
 * Descripción:
 * Caso de uso encargado de obtener la lista
 * de campeonatos. Soporta filtrado opcional
 * por país y convierte las entidades a
 * modelos usando el mapper correspondiente.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/


import { CampeonatoMapper } from "@/domain/data/mapper/campeonatoMapper";
import { CampeonatoModel } from "@/domain/model/campeonatoModel";

import type { CampeonatoRepository } from "../../data/repository/campeonatoRepository";

export class GetCampeonatosUseCase {

  constructor(
    private readonly campeonatoRepository:
    CampeonatoRepository
  ) {}

  execute(paisId?: number): Promise<CampeonatoModel[]> {

    return this.campeonatoRepository
    .findAll()
    .then((campeonatos) => {

      const filtered =
        paisId

          ? campeonatos.filter(
              (campeonato) =>
                campeonato.caPaId === paisId
            )

          : campeonatos;

      return filtered.map(
        CampeonatoMapper.toModel
      );
    });
  }
}