export interface IntegranteModel {
  int_id: number;
  int_ca_id: number;
  int_nombre: string;
  int_es_jug: number; 
  
  ca_anio?: number;
  pa_nombre?: string;
}

export type CreateIntegranteModel = Omit<IntegranteModel, 'int_id' | 'ca_anio' | 'pa_nombre'>;
export type UpdateIntegranteModel = Partial<CreateIntegranteModel>;
