export interface IBuyAirtime {
  amount: number;
  phoneNumber: number;
  serviceID: string;
}

export interface IBuyData {
  serviceID?: string;
  request_id?: string;
  billersCode?: string;
  variation_code?: string;
  amount?: number;
  phone?: number | any;
}

export interface IVerifyMeterNumber {
  billersCode?: string;
  serviceID?: string;
  type: string;
  variation_code?: string;
  amount?: number;
  phone?: number | any;
  request_id?: string;
}

export interface IWallet {
  walletReference?: string;
  walletName?: string;
  customerName?: string;
  customerEmail?: string;
  bvn: string;
  bvnDateOfBirth: any;
}

export interface CreateUserInput {
  bvn: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
}
