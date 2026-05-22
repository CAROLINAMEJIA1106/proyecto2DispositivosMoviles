import { paisGanadorEntity } from "@/domain/data/entity/paisGanador";
import { PaisGanadorRepositoy } from "@/domain/data/repository/paisGanadorRepository";

export class CreatePaisGanadorUseCase{
    constructor (
        private readonly repository:
        PaisGanadorRepositoy){}

    async execute(
        paisGanador: Omit<paisGanadorEntity,"pa_id">
    ): Promise<void>{
        await this.repository.create(paisGanador);
    }
}