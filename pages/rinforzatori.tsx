import { useEffect, useState } from "react";

type Rinforzatore = {
  id: string;
  nome: string;
  emoji: string;
};

export default function Rinforzatori() {
  const [token, setToken] = useState("");
  const [nome, setNome] = useState("");
  const [emoji, setEmoji] = useState("🐾");
  const [lista, setLista] = useState<Rinforzatore[]>([]);
  const [caricamento, setCaricamento] = useState(false);

  const salva = async () => {
    if (!token || !nome) return alert("Inserisci token e nome");
    setCaricamento(true);

    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY non è definita");
      alert("Configurare la chiave anon di Supabase in .env.local");
      setCaricamento(false);
      return;
    }

    try {
      const res = await fetch("https://mcrrafxlbcolkpfwlvzz.supabase.co/rest/v1/rinforzatori", {
        method: "POST",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify({
          id_utente: token,
          nome,
          emoji
        })
      });

      const dati = await res.json();

      if (!Array.isArray(dati)) {
        console.error("Risposta inattesa dal salvataggio:", dati);
        alert("Errore nel salvataggio");
        setCaricamento(false);
        return;
      }

      setLista([...lista, dati[0]]);
      setNome("");
    } catch (err) {
      console.error("Errore nel salvataggio:", err);
    }

    setCaricamento(false);
  };

  const caricaEsistenti = async () => {
    if (!token) return;

    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY non è definita");
      alert("Configurare la chiave anon di Supabase in .env.local");
      return;
    }

    try {
      const res = await fetch(`https://mcrrafxlbcolkpfwlvzz.supabase.co/rest/v1/rinforzatori?id_utente=eq.${token}`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
        }
      });

      const dati = await res.json();

      if (!Array.isArray(dati)) {
        console.warn("Dati ricevuti non validi:", dati);
        setLista([]);
        return;
      }

      setLista(dati);
    } catch (err) {
      console.error("Errore nel caricamento:", err);
      setLista([]);
    }
  };

  useEffect(() => {
    caricaEsistenti();
  }, [token]);

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "auto" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
        🧠 Inserisci rinforzatori per il tuo cane
      </h2>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 4 }}>🔑 Token utente</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Incolla qui il token"
          style={{ width: "100%", padding: 8, fontSize: 16 }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Es. Wurstel"
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <select value={emoji} onChange={(e) => setEmoji(e.target.value)} style={{ fontSize: 20 }}>
          <option value="🌭">🌭</option>
          <option value="🧀">🧀</option>
          <option value="🎾">🎾</option>
          <option value="🍼">🍼</option>
          <option value="🧦">🧦</option>
          <option value="🚿">🚿</option>
          <option value="🏃">🏃</option>
        </select>
        <button
          onClick={salva}
          disabled={caricamento}
          style={{
            padding: 8,
            background: "#28a745",
            color: "white",
            fontWeight: "bold",
            borderRadius: 4
          }}
        >
          ➕
        </button>
      </div>

      <ul style={{ padding: 0 }}>
        {lista.map((r) => (
          <li key={r.id} style={{ listStyle: "none", fontSize: 18, marginBottom: 4 }}>
            {r.emoji} {r.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}
