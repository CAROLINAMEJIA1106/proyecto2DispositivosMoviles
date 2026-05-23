<<<<<<< HEAD
/***************************************************************
 * Nombre: createPaisGanadorUseCase.ts
 *
 * Descripción:
 * Caso de uso encargado de crear un nuevo
 * país ganador. Delega la operación al
 * repositorio correspondiente.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

=======
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
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