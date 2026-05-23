import { IntegranteModel } from '../../model/integranteModel';
import { IntegranteEntity } from '../entity/integrante';

export function integranteEntityToModel(e: IntegranteEntity): IntegranteModel {
  return {
    int_id: e.int_id,
    int_ca_id: e.int_ca_id,
    int_nombre: e.int_nombre,
    int_es_jug: e.int_es_jug,
    ca_anio: e.ca_anio,
    pa_nombre: e.pa_nombre,
  };
}
