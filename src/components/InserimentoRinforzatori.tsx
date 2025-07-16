"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function InserimentoRinforzatori({ idUtente }: { idUtente: string }) {
  const [nome, setNome] = useState("");
  const [emoji, setEmoji] = useState("");
  const [rinforzi, setRinforzi] = useState<{ nome: string; emoji: string }[]>([]);

  const aggiungi = () => {
    if (nome && emoji) {
      setRinforzi([...rinforzi, { nome, emoji }]);
      setNome("");
      setEmoji("");
    }
  };

  const salva = async () => {
    const payload = rinforzi.map((r) => ({ ...r, id_utente: idUtente }));
    const { error } = await supabase.from("rinforzatori").insert(payload);
    if (error) alert("Errore nel salvataggio");
    else alert("Rinforzatori salvati con successo!");
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "auto" }}>
      <h2>🎁 Inserisci i rinforzatori</h2>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder="Emoji" />
      <button onClick={aggiungi}>➕ Aggiungi</button>
      <ul>
        {rinforzi.map((r, i) => (
          <li key={i}>{r.emoji} {r.nome}</li>
        ))}
      </ul>
      <button onClick={salva}>💾 Salva tutti</button>
    </div>
  );
}
