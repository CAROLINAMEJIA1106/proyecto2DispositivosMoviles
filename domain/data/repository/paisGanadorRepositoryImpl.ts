import { SQLiteDatabase } from "expo-sqlite";
import { paisGanadorEntity } from "../entity/paisGanador";
import { PaisGanadorRepositoy } from "./paisGanadorRepository";

export class PaisGanadorRepositoyImpl
implements PaisGanadorRepositoy
{
    constructor(private readonly db:SQLiteDatabase){}
    async findAll(): Promise<paisGanadorEntity[]> {
        const resultado = await this.db.getAllAsync<paisGanadorEntity>(`
        select 
        pa_id as pa_id,
        pa_nombre as pa_nombre,
        pa_num_campeon as pa_num_campeon,
        pa_bandera as pa_bandera,
        pa_anios as pa_anios
        from pais_ganador order by pa_num_campeon desc
      `);
      return resultado;
    }
    async create(paisGanador: Omit<paisGanadorEntity, "pa_id">): Promise<void> {
        await this.db.runAsync(
            `
            insert into pais_ganador
                (
                pa_nombre,
                pa_num_campeon,
                pa_bandera,
                pa_anios
                )
                VALUES(?,?,?,?)
        `,
        [
            paisGanador.pa_nombre,
            paisGanador.pa_num_campeon,
            paisGanador.pa_bandera ?? null,
            paisGanador.pa_anios ?? null
        ]
    );
}
    async update(paisGanador: paisGanadorEntity): Promise<void> {
        await this.db.runAsync(
            `
            UPDATE pais_ganador 
            SET  
            pa_nombre= ?,
            pa_num_campeon= ?,
            pa_bandera= ?,
            pa_anios = ?
            WHERE pa_id = ?
        `,
        [
            paisGanador.pa_nombre,
            paisGanador.pa_num_campeon,
            paisGanador.pa_bandera ?? null,
            paisGanador.pa_anios ?? null,
            paisGanador.pa_id
        ]
    );
    }  
}