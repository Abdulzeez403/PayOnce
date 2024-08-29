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



export interface CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  balance?: string;
  verificationCode?:string;
  verificationCodeExpiry?:any;
  isVerified?: boolean;
}
