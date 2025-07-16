"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import InserimentoRinforzatori from "./InserimentoRinforzatori";

export default function NuovoUtente() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    nome_cane: "",
    razza: "",
    eta: "",
    sesso: "Maschio",
    peso: ""
  });

  const [idUtente, setIdUtente] = useState<string | null>(null);
  const [caricamento, setCaricamento] = useState(false);

  const aggiorna = (campo: string, valore: string | number) => {
    setForm({ ...form, [campo]: valore });
  };

  const salvaUtente = async () => {
    setCaricamento(true);
    const { data, error } = await supabase.from("utenti").insert([{ ...form }]).select();
    if (error) {
      console.error("Errore:", error);
      alert("Errore nel salvataggio");
    } else {
      setIdUtente(data[0].id);
    }
    setCaricamento(false);
  };

  if (idUtente) {
    return <InserimentoRinforzatori idUtente={idUtente} />;
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "auto" }}>
      <h1>🐶 Registrazione nuovo utente</h1>
      {["nome", "email", "nome_cane", "razza", "eta", "peso"].map((campo) => (
        <div key={campo}>
          <label>{campo}</label>
          <input
            type={campo === "eta" || campo === "peso" ? "number" : "text"}
            value={form[campo] as string}
            onChange={(e) => aggiorna(campo, e.target.value)}
          />
        </div>
      ))}
      <div>
        <label>Sesso</label>
        {["Maschio", "Femmina"].map((s) => (
          <button key={s} onClick={() => aggiorna("sesso", s)}>{s}</button>
        ))}
      </div>
      <button onClick={salvaUtente} disabled={caricamento}>
        {caricamento ? "Registrazione..." : "Registra utente"}
      </button>
    </div>
  );
}
