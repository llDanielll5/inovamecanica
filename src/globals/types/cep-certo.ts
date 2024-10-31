export interface CepCertotype {
  origin: string;
  destiny: string;
  key: string;
  weight: number;
  height: number;
  width: number;
  length: number;
}

export interface CepResultConsult {
  ceporigem: string;
  cepdestino: string;
  valorpac: string;
  prazopac: string;
  valorsedex: string;
  prazosedex: string;
}

export interface TracingResult {
  data: string;
  descrição: string;
  unidade: string;
  cidade: string;
  uf: string;
}
