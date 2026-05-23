
/***************************************************************
 * Nombre: updatePaisGanadorUseCase.ts
 *
 * Descripción:
 * Caso de uso encargado de actualizar un país
 * ganador existente. Delega la operación al
 * repositorio correspondiente.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/


import { paisGanadorEntity } from "@/domain/data/entity/paisGanador";
import { PaisGanadorRepositoy } from "@/domain/data/repository/paisGanadorRepository";

export class UpdatePaisGanadorUseCase{
    constructor(private readonly repository: PaisGanadorRepositoy){}

    async execute( paisganadorEntity:paisGanadorEntity ):
    Promise <void>{
        await this.repository.update(paisganadorEntity);
    }
}