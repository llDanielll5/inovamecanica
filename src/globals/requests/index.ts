import { BrasilAPICNPJResponse } from "../types/cnpj";

export interface CNPJAPIResponse {
  updated: Date;
  taxId: string;
  alias: null;
  founded: string;
  head: true;
  company: {
    members: [];
    id: number;
    name: string;
    equity: number;
    nature: { id: number; text: string };
    size: { id: number; acronym: string; text: string };
    simples: { optant: boolean; since: null };
    simei: { optant: boolean; since: null };
  };
  statusDate: string;
  status: { id: number; text: string };
  address: {
    municipality: number;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    details: null;
    zip: string;
    country: { id: number; name: string };
  };
  mainActivity: { id: number; text: string };
  phones: { area: string; number: string }[];
  emails: { address: string; domain: string }[];
  sideActivities: { id: number; text: string }[];
  registrations: [];
  suframa: [];
}

export const getViaCepInfo = async (cep: string) => {
  if (cep.length === 8) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const json = await res.json();
      if (json) {
        return {
          neighbor: json.bairro,
          city: json.localidade,
          complement: json.complemento,
          line1: json.logradouro,
          uf: json.uf,
          cep: cep,
          address: `${json.logradouro}, ${json.bairro} ${json.complemento}, ${json.localidade} - ${json.uf}`,
        };
      }
    } catch (error) {}
  }
};

export const getCNPJInformations = async (cnpj: string) => {
  try {
    const res = await fetch(`https://open.cnpja.com/office/${cnpj}`);
    const json: CNPJAPIResponse = await res.json();
    if (json) {
      return {
        companyName: json.company.name,
        phantasyName: json.company.name,
        status: json.status.text,
        startDate: json.founded,
        cnae: json.mainActivity.text,
      };
    }
  } catch (error) {
    console.log({ error });
  }
};
