import { paisGanadorModel } from "@/domain/model/paisGanadorModel";
import { paisGanadorEntity } from "../entity/paisGanador";

export class paisGanadorMapper{
    static toModel(entity:paisGanadorEntity):paisGanadorModel{
        return{
            pa_id:entity.pa_id,
            pa_nombre:entity.pa_nombre,
            pa_num_campeon:entity.pa_num_campeon,
            pa_bandera:entity.pa_bandera,
            pa_anios:entity.pa_anios
        };
    }
    static toEntity(model:paisGanadorModel):paisGanadorEntity{
        return{
            pa_id:model.pa_id,
            pa_nombre:model.pa_nombre,
            pa_num_campeon:model.pa_num_campeon,
            pa_bandera:model.pa_bandera,
            pa_anios:model.pa_anios
        };
    }
}