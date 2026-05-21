import { paisGanadorEntity } from "@/domain/data/entity/paisGanador";
import { PaisGanadorRepositoy } from "@/domain/data/repository/paisGanadorRepository";

export class UpdatePaisGanadorUseCase{
    constructor(private readonly repository: PaisGanadorRepositoy){}

    async execute( paisganadorEntity:paisGanadorEntity ):
    Promise <void>{
        await this.repository.update(paisganadorEntity);
    }
}