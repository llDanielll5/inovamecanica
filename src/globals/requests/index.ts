import { BrasilAPICNPJResponse } from "../types/cnpj";

export const getViaCepInfo = async (val: string) => {
  if (val.length === 8) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${val}/json/`);
      const json = await res.json();
      if (json) {
        return {
          neighbor: json.bairro,
          city: json.localidade,
          complement: json.complemento,
          line1: json.logradouro,
          uf: json.uf,
          cep: val,
          address: `${json.logradouro}, ${json.bairro} ${json.complemento}, ${json.localidade} - ${json.uf}`,
        };
      }
    } catch (error) {}
  }
};

export const getCNPJInformations = async (cnpj: string) => {
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    const json: BrasilAPICNPJResponse = await res.json();
    if (json) {
      return {
        companyName: json.razao_social,
        phantasyName: json.nome_fantasia,
        status: json.descricao_situacao_cadastral,
        startDate: json.data_inicio_atividade,
        cnae: json.cnae_fiscal_descricao,
      };
    }
  } catch (error) {
    console.log({ error });
  }
};
