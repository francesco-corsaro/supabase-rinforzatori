# Rinforzatori

This project uses Next.js and React.

## Environment variables

Create a `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=<project url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>
```

The `SUPABASE_SERVICE_ROLE_KEY` is used only on the server to bypass row-level
security when creating a new user.

## Running Tests

Install dependencies and run the test suite with:

```bash
npm install
npm test
```
