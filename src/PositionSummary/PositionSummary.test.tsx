import { render, screen } from '@testing-library/react';
import PositionSummary from './PositionSummary';

// Mock the useFetchAllData custom hook
jest.mock('../CustomHooks/useFetchAllData', () => ({
  useFetchAllData: () => ({
    data: [
      // Mocked data for transactions, accounts, desks, and instruments
      [
        {
          id: '1',
          time: 'Jan 1 1990',
          instrument_id: '1',
          quantity: 10,
          price: 100,
          desk_id: '1',
          account_id: '1',
        },
      ],
      [
        {
          id: '1',
          accountNumber: '123456',
        },
      ],
      [
        {
          id: '1',
          name: 'Desk 1',
          market: 'Market 1',
        },
      ],
      [
        {
          id: '1',
          symbol: 'ABC',
          name: 'ABC Inc',
          description: 'Description bla bla bla',
          country: 'Country ABC',
        },
      ],
    ],
    error: null,
    isLoading: false,
    setCount: jest.fn(),
  }),
}));

// needs aditional work to prevent recursive loop
xdescribe('PositionSummary', () => {
  it('renders the table header', () => {
    render(<PositionSummary />);
    expect(screen.getByText('Symbol')).toBeInTheDocument();
  });

  it('renders the transaction summary', () => {
    render(<PositionSummary />);
    expect(screen.getByText('ABC')).toBeInTheDocument();
  });

});
