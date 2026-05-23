<<<<<<< HEAD
/***************************************************************
 * Nombre: traerPaisGanadorUseCase.ts
 *
 * Descripción:
 * Caso de uso encargado de obtener la lista
 * de países ganadores. Convierte las entidades
 * a modelos usando el mapper correspondiente.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/

=======
>>>>>>> 4457da13d24af4786422fe8fd6d9c285d5c089cf
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