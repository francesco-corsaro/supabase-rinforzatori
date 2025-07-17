import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

    try {
      const { data, error } = await supabase
        .from("rinforzatori")
        .insert({ id_utente: token, nome, emoji })
        .select()
        .single();

      if (error || !data) {
        console.error("Errore nel salvataggio:", error);
        alert("Errore nel salvataggio");
        setCaricamento(false);
        return;
      }

      setLista([...lista, data]);
      setNome("");
    } catch (err) {
      console.error("Errore nel salvataggio:", err);
    }

    setCaricamento(false);
  };

  const caricaEsistenti = async () => {
    if (!token) return;

    try {
      const { data, error } = await supabase
        .from("rinforzatori")
        .select()
        .eq("id_utente", token);

      if (error) {
        console.error("Errore nel caricamento:", error);
        setLista([]);
        return;
      }

      setLista(Array.isArray(data) ? data : []);
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
