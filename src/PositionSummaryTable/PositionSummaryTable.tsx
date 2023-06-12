import { FC } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TransactionSummary } from '../PositionTypes/PositionTypes';
import { PositionDetail } from '../PositionDetail/PositionDetail';

interface PositionSummaryProps {
  transactionSummary: TransactionSummary[];
}

// purley presentational component to display outer symbol/quantity table
export const PositionSummaryTable: FC<PositionSummaryProps> = ({ transactionSummary }) => {
  return (
    <>
      <div style={{ padding: '0 16px 0 40px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                width="25%"
                sx={{ fontWeight: 'bold', borderLeft: '1px solid black', borderTop: '1px solid black', borderBottom: '1px solid black' }}
              >
                Symbol
              </TableCell>
              <TableCell
                align="left"
                width="25%"
                sx={{ fontWeight: 'bold', borderTop: '1px solid black', borderBottom: '1px solid black' }}
              ></TableCell>
              <TableCell align="left" width="25%" sx={{ fontWeight: 'bold', border: '1px solid black' }}>Quantity</TableCell>
              <TableCell align="left" width="25%" sx={{ fontWeight: 'bold', border: '1px solid black' }}></TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </div>
      {transactionSummary.map(({ symbol, quantity, transactions }, i) => (
        <Accordion key={`accordion-${symbol}-${i}`} className="position_summary_table__width" disableGutters={true} sx={{minWidth: '50px'}}>
          <AccordionSummary
            style={{ flexDirection: 'row-reverse', margin: '0' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel header ${symbol}`}
            id={`panel-header-${i}`}
            sx={{minWidth: '650px'}}
          >
            <Table sx={{ minWidth: 650, borderBottom: 'none', marginRight: '0' }} aria-label="simple table">
              <TableBody sx={{ minWidth: 650, borderBottom: 'none' }}>
                <TableRow sx={{ borderBottom: 'none' }}>
                  <TableCell
                    align="left"
                    width="25%"
                    sx={{ borderTop: '1px solid black', borderLeft: '1px solid black', borderBottom: '1px solid black' }}
                  >
                    {symbol}
                  </TableCell>
                  <TableCell
                    align="left"
                    width="25%"
                    sx={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}
                  ></TableCell>
                  <TableCell align="right" width="25%" sx={{ border: '1px solid black' }}>
                    {quantity}
                  </TableCell>
                  <TableCell align="left" width="25%" sx={{ border: '1px solid black' }}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionSummary>
          <AccordionDetails>
            <PositionDetail transactions={transactions} />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

