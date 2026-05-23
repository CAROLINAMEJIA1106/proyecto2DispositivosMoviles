import { Campeonato } from "../entity/campeonato";

export interface CampeonatoRepository {
  findAll(): Promise<Campeonato[]>;

  create(
    campeonato: Omit<Campeonato, "caId">
  ): Promise<void>;

  update(
    campeonato: Campeonato
  ): Promise<void>;
}