# Rinforzatori

This project uses Next.js and React.

## Configurazione

Per poter salvare i dati su Supabase è necessario fornire la chiave anon del
proprio progetto. Copia il file `.env.example` in `.env.local` e imposta il
valore di `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

```bash
cp .env.example .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=la-tua-chiave" >> .env.local
```

## Running Tests

Install dependencies and run the test suite with:

```bash
npm install
npm test
```
