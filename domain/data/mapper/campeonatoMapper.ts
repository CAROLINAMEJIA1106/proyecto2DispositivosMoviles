import { CampeonatoModel } from "@/domain/model/campeonatoModel";
import { Campeonato } from "../entity/campeonato";

export class CampeonatoMapper {

  static toModel(
    entity: Campeonato
  ): CampeonatoModel {

    return {
      id: entity.caId,
      paisId: entity.caPaId,
      anio: entity.caAnio,
      goleador: entity.caGoleador,
      golePais: entity.caGolePais,
      numeroGoles: entity.caGoleNumGol,
      imagen: entity.caGoleImg
    };
  }

  static toEntity(
    model: CampeonatoModel
  ): Campeonato {

    return {
      caId: model.id,
      caPaId: model.paisId,
      caAnio: model.anio,
      caGoleador: model.goleador,
      caGolePais: model.golePais,
      caGoleNumGol: model.numeroGoles,
      caGoleImg: model.imagen
    };
  }
}