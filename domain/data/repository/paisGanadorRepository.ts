import { paisGanadorEntity } from "../entity/paisGanador";

export interface PaisGanadorRepositoy {
    findAll():Promise <paisGanadorEntity[]>;
    create(paisGanador:Omit <paisGanadorEntity,"pa_id">):Promise<void>;
    update(paisGanador:paisGanadorEntity):Promise<void>;
}