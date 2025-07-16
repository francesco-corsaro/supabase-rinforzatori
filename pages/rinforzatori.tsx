import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ✅ CONFIGURA IL TUO SUPABASE
const supabase = createClient(
  "https://mcrrafxlbcolkpfwlvzz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jcnJhZnhsYmNvbGtwZndsdnp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODY4MTEsImV4cCI6MjA2ODI2MjgxMX0.EsQsPRSbwHrmV5sg_4eeGWv877a30vRFe7S3BHj7bQk"
);

export default function RinforzatoriPage() {
  const [token, setToken] = useState("");
  const [nome, setNome] = useState("");
  const [emoji, setEmoji] = useState("🐾");
  const [lista, setLista] = useState([]);
  const [caricamento, setCaricamento] = useState(false);

  const emojiOptions = ["🌭", "🧀", "🎾", "🧦", "🍼", "🏃‍♂️", "🎯", "🎁", "🐾"];

  const caricaRinforzatori = async () => {
    if (!token) return;
    const { data, error } = await supabase
      .from("rinforzatori")
      .select("*")
      .eq("utente_id", token);
    if (!error) setLista(data);
  };

  const aggiungiRinforzatore = async () => {
    if (!token || !nome || !emoji) return;
    setCaricamento(true);
    const { error } = await supabase.from("rinforzatori").insert({
      nome,
      emoji,
      utente_id: token
    });
    setNome("");
    setEmoji("🐾");
    setCaricamento(false);
    caricaRinforzatori();
  };

  useEffect(() => {
    caricaRinforzatori();
  }, [token]);

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: 20 }}>🎯 Inserisci Rinforzatori</h1>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 4 }}>🔐 Token utente</label>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Incolla qui il token"
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome rinforzatore"
          style={{ flex: 2, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <select
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        >
          {emojiOptions.map((em) => (
            <option key={em} value={em}>
              {em}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={aggiungiRinforzatore}
        disabled={caricamento}
        style={{
          width: "100%",
          padding: 12,
          backgroundColor: "#0070f3",
          color: "white",
          fontWeight: "bold",
          fontSize: 16,
          borderRadius: 6,
          border: "none",
          cursor: "pointer"
        }}
      >
        {caricamento ? "Aggiunta..." : "➕ Aggiungi rinforzatore"}
      </button>

      <hr style={{ margin: "24px 0" }} />

      <h2 style={{ fontSize: "1.25rem", marginBottom: 10 }}>📋 Rinforzatori inseriti</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {lista.map((r) => (
          <li
            key={r.id}
            style={{
              padding: 10,
              marginBottom: 8,
              backgroundColor: "#f2f2f2",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <span>{r.emoji} {r.nome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
