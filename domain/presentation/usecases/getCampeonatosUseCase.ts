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