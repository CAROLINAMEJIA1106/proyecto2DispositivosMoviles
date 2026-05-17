import { CampeonatoMapper } from "@/domain/data/mapper/campeonatoMapper";
import { CampeonatoModel } from "@/domain/model/campeonatoModel";

import type { CampeonatoRepository } from "../../data/repository/campeonatoRepository";

export class GetCampeonatosUseCase {

  constructor(
    private readonly campeonatoRepository:
    CampeonatoRepository
  ) {}

  execute(): Promise<CampeonatoModel[]> {

    return this.campeonatoRepository
      .findAll()
      .then((campeonatos) =>
        campeonatos.map(
          CampeonatoMapper.toModel
        )
      );
  }
}