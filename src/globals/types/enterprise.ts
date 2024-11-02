export type EnterpriseType = "CAR_WASH" | "MECHANIC_SHOP" | "";

export interface AddressInterface {
  cep: string;
  number: string;
  city: string;
  line1: string;
  neighbor: string;
  uf: string;
  complement: string;
  latitude?: number;
  longitude?: number;
}

export interface EnterpriseManagerInterface {
  cpf?: string;
  companyName?: string;
  phantasyName?: string;
  status?: string;
  startDate?: string;
  cnae?: string;
}

export interface EnterpriseInterface {
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  email: string;
  cnpj: string;
  enterprise: EnterpriseManagerInterface;
  type: EnterpriseType;
  address: AddressInterface;
  password?: string;
  phone: string;
  images: string[];
}
