import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Transaction } from '../PositionTypes/PositionTypes';

import "./PositionDetail.scss";

interface Props {
  transactions: Transaction[];
}

const tableCellProperties = { border: '1px solid black' };
const tableHeaderProperties = {...tableCellProperties, fontWeight: 'bold' };


// purley presentational component to display inner transactions table for a symbol
export const PositionDetail: React.FC<Props> = ({ transactions }) => {
  return (
    <div className='position_detail__transactions'>
      <h2>Transactions</h2>
      <Table sx={{ minWidth: 650, border: '1px solid black', backgroundColor: 'white' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" width="25%"  sx={tableHeaderProperties}>Desk Name</TableCell>
            <TableCell align="left" width="25%"  sx={tableHeaderProperties}>Account</TableCell>
            <TableCell align="left" width="25%"  sx={tableHeaderProperties}>Quantity</TableCell>
            <TableCell align="left" width="25%"  sx={tableHeaderProperties}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(({ desk_name, account, quantity, price }: Transaction, i: number) => (
            <TableRow
              key={`transaction-${i}`}
            >
              <TableCell width="25%" align="left" sx={tableCellProperties}>{desk_name}</TableCell>
              <TableCell width="25%" align="left" sx={tableCellProperties}>{account}</TableCell>
              <TableCell width="25%" align="right" sx={tableCellProperties}>{quantity}</TableCell>
              <TableCell width="25%" align="right" sx={tableCellProperties}>{price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

