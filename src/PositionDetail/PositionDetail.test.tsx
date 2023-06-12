import { render, screen } from '@testing-library/react';
import { PositionDetail } from './PositionDetail'; 
import { Transaction } from '../PositionTypes/PositionTypes';

describe('PositionDetail', () => {
  const transactions: Transaction[] = [
    {
      desk_name: 'Desk 1',
      account: 'Account 1',
      quantity: 10,
      price: 100
    },
    {
      desk_name: 'Desk 2',
      account: 'Account 2',
      quantity: 20,
      price: 200
    }
  ];

  it('renders transactions detail table correctly', () => {
    render(<PositionDetail transactions={transactions} />);

    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Desk Name')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();

    expect(screen.getByText('Desk 1')).toBeInTheDocument();
    expect(screen.getByText('Account 1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByText('Desk 2')).toBeInTheDocument();
    expect(screen.getByText('Account 2')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });
});
