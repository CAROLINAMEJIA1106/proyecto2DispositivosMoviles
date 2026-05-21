import { paisGanadorMapper } from "@/domain/data/mapper/paisGanadorMapper";
import type { PaisGanadorRepositoy } from "@/domain/data/repository/paisGanadorRepository";
import { paisGanadorModel } from "@/domain/model/paisGanadorModel";

export class TraerPaisGanadorUseCase{
    constructor(private readonly paisGanadorRepository:
        PaisGanadorRepositoy){}

    execute(): Promise<paisGanadorModel[]>{
        return this.paisGanadorRepository.findAll()
        .then((paisGanador)=>paisGanador.map(paisGanadorMapper.toModel));
    }
}