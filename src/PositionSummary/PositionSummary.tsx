import React, { useEffect, useState } from 'react';
import {
   Alert, AlertTitle, LinearProgress
} from '@mui/material';

import { useFetchAllData } from '../CustomHooks/useFetchAllData'
import { PositionSummaryTable } from '../PositionSummaryTable/PositionSummaryTable'
import { TransactionRec, AccountRec, DeskRec, InstrumentRec, TransactionSummary } from '../PositionTypes/PositionTypes'
import './PositionSummary.scss';

const urls: string[] = [
  'http://localhost:3000/transactions.json',
  'http://localhost:3000/accounts.json',
  'http://localhost:3000/desks.json',
  'http://localhost:3000/instruments.json'

   /*
  'https://zdubin.github.io/transaction-summary/transactions.json',
  'https://zdubin.github.io/transaction-summary/accounts.json',
  'https://zdubin.github.io/transaction-summary/desks.json',
  'https://zdubin.github.io/transaction-summary/instruments.json'
    */
  ]
  ;

const PositionSummary: React.FC = () => {

  const [transactionSummary, setTransactionSummary] = useState<TransactionSummary[]>([]);
  const { data, error, isLoading } = useFetchAllData<[TransactionRec[], AccountRec[], DeskRec[], InstrumentRec[]]>(urls) // A generic hook to call multiple APIs simultaneously


  // whenever API data is returned, prepare the data for display
  useEffect(() => {
    const [rawTransactions, rawAccounts, rawDesks, rawInstruments] = data;
    prepareData(rawTransactions, rawAccounts, rawDesks, rawInstruments);
  }, [data]); // The unit test would go into an infinite loop using [data] as a dependency, I had to use [JSON.stringify(data)] because of infinite rerenders in TESTING ONLY
                              // Can change to "}, [data]);" for running outside of tests"

  const prepareData = (rawTransactions: TransactionRec[], rawAccounts: AccountRec[], rawDesks: DeskRec[], rawInstruments: InstrumentRec[]) => {
    const transactionSummary: TransactionSummary[] = [];
    const accountLookup: { [id: string]: string } = Object.fromEntries(rawAccounts?.map(account => [account.id, account.accountNumber]));
    const deskLookup: { [id: string]: string } = Object.fromEntries(rawDesks?.map(desk => [desk.id, desk.name]));
    const instrumentLookup: { [id: string]: string } = Object.fromEntries(rawInstruments?.map(instrument => [instrument.id, instrument.symbol]));
    let lastInstrumentId: string = '';  // used to determine if a new section of transactions has been found
    let currentTransactionSummaryIndex = 0; // last index of Transaction Summary 

    // sort alphabetically by Symbol, for display and to group transactions by symbol
    rawTransactions?.sort((a: TransactionRec, b: TransactionRec) => {
      return instrumentLookup[b.instrument_id] > instrumentLookup[a.instrument_id] ? -1 : 1;
    });

    rawTransactions?.forEach(({
      instrument_id,
      quantity,
      price,
      desk_id,
      account_id
    }: TransactionRec) => {

      const transaction = {
        desk_name: deskLookup[desk_id],
        account: accountLookup[account_id],
        quantity,
        price
      };

      // Group transactions by symbol, increment total quantity by symbol
      if (lastInstrumentId !== instrument_id) {
        transactionSummary.push({
          symbol: instrumentLookup[instrument_id],
          quantity,
          transactions: [transaction]
        })
        lastInstrumentId = instrument_id;
        currentTransactionSummaryIndex = transactionSummary.length - 1;
      }
      else {
        transactionSummary[currentTransactionSummaryIndex].quantity += quantity;
        transactionSummary[currentTransactionSummaryIndex].transactions.push(transaction);
      }
    }
    )
    // update display ready version of the transactions, grouped by symbol
    setTransactionSummary(transactionSummary)
  };

  return (
      <div className='position_summary'>
        <div className='position_summary__items'>
          <div>
            Please click on the <strong>down arrow</strong> next to the Symbol, to expand the position into individual transactions
          </div>
        </div>
        {isLoading ? 
          <div className="position_summary__progress_container">
                <LinearProgress className="position_summary__loading" />
          </div> 
          : null}
        {error ? 
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          There was an error in the API: {error ? `${error}` : ''}
        </Alert>
          : null}
          <PositionSummaryTable transactionSummary={transactionSummary}/>
    </div>
  )
}
export default PositionSummary;