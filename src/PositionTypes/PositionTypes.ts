// raw record types
export type TransactionRec = {
    id: string;
    time: Date;
    instrument_id: string;
    quantity: number;
    price: number;
    desk_id: string;
    account_id: string;
  };
  
  export type AccountRec = {
    id: string;
    accountNumber: string;
  };
  
  export type DeskRec = {
    id: string;
    name: string;
    market: string;
  };
  
  export type InstrumentRec = {
    id: string;
    symbol: string;
    name: string;
    description: string;
    country: string;
  };
  
  // processed for presentation, data types
  export type Transaction = {
    desk_name: string;
    account: string;
    quantity: number;
    price: number;
  }
  
  export type TransactionSummary = {
    symbol: string;
    quantity: number;
    transactions: Transaction[];
  };
  