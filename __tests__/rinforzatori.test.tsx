import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Rinforzatori from '../components/Rinforzatori';

describe('Rinforzatori component', () => {
  it('adds a new reinforcement to the list', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test';
    // @ts-ignore
    global.alert = jest.fn();
    const fetchMock = jest.fn()
      .mockResolvedValueOnce({ json: async () => [] })
      .mockResolvedValueOnce({ json: async () => [{ id: '1', nome: 'Biscotto', emoji: '🌭' }] });
    // @ts-ignore
    global.fetch = fetchMock;

    render(<Rinforzatori />);

    fireEvent.change(screen.getByPlaceholderText('Incolla qui il token'), { target: { value: 'token' } });
    fireEvent.change(screen.getByPlaceholderText('Es. Wurstel'), { target: { value: 'Biscotto' } });
    fireEvent.click(screen.getByRole('button', { name: '➕' }));

    await waitFor(() => {
      expect(screen.getByText('🌭 Biscotto')).toBeInTheDocument();
    });
  });
});
