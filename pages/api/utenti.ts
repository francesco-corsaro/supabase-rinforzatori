import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, email, nome_cane, razza, eta, sesso, peso } = req.body;

  const { data, error } = await supabase
    .from('utenti')
    .insert([{ nome, email, nome_cane, razza, eta, sesso, peso }])
    .select()
    .maybeSingle();

  if (error) {
    console.error('Insert error:', error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}
