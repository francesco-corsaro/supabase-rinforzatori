import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://mcrrafxlbcolkpfwlvzz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jcnJhZnhsYmNvbGtwZndsdnp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODY4MTEsImV4cCI6MjA2ODI2MjgxMX0.EsQsPRSbwHrmV5sg_4eeGWv877a30vRFe7S3BHj7bQk"
);
