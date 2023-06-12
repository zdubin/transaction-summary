import { render, screen } from '@testing-library/react';
import { PositionSummaryTable } from './PositionSummaryTable';

describe('PositionSummaryTable', () => {
  const transactionSummary = [
    {
      symbol: 'AAPL',
      quantity: 10,
      transactions: [{ id: 1, date: '2022-01-01', price: 100, desk_name: 'Desk 1', account: 'Account 1', quantity: 100 }],
    },
    {
      symbol: 'GOOGL',
      quantity: 5,
      transactions: [{ id: 2, date: '2022-02-01', price: 200, desk_name: 'Desk 12', account: 'Account 2', quantity: 200 }],
    },
  ];

  test('renders the table with transaction summary data', () => {
    render(<PositionSummaryTable transactionSummary={transactionSummary} />);

    // Verify that the table header is rendered
    expect(screen.getByText('Symbol')).toBeInTheDocument();

    // Verify that the transaction summary data is rendered
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('GOOGL')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

  });
});
