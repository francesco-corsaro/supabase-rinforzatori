import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Rinforzatori from '../components/Rinforzatori';
import { supabase } from '../lib/supabase';

jest.mock('../lib/supabase', () => ({
  supabase: { from: jest.fn() }
}));

describe('Rinforzatori component', () => {
  it('adds a new reinforcement to the list', async () => {
    const fromMock = jest.fn().mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: { id: '1', nome: 'Biscotto', emoji: '🌭' },
            error: null
          })
        })
      }),
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ data: [], error: null })
      })
    });

    (supabase.from as jest.Mock) = fromMock as any;

    render(<Rinforzatori />);

    fireEvent.change(screen.getByPlaceholderText('Incolla qui il token'), { target: { value: 'token' } });
    fireEvent.change(screen.getByPlaceholderText('Es. Wurstel'), { target: { value: 'Biscotto' } });
    fireEvent.click(screen.getByRole('button', { name: '➕' }));

    await waitFor(() => {
      expect(screen.getByText('🌭 Biscotto')).toBeInTheDocument();
    });
  });
});
