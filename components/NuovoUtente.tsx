import { useState } from "react";

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

  const aggiorna = (campo: string, valore: string) => {
    setForm({ ...form, [campo]: valore });
  };

  const salvaUtente = async () => {
    setCaricamento(true);
    // Simulazione inserimento in Supabase: genera ID fittizio
    await new Promise((res) => setTimeout(res, 1000));
    const fakeId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    setIdUtente(fakeId);
    setCaricamento(false);
  };

  if (idUtente) {
    return (
      <div style={{ padding: 24, textAlign: "center", fontFamily: "sans-serif" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>✅ Utente registrato!</h2>
        <p><strong>Token utente:</strong> <code>{idUtente}</code></p>
        <p>Ora puoi inserire i rinforzatori personalizzati per questo cane.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: 20 }}>🐶 Registrazione nuovo utente</h1>
      {[
        ["nome", "👤 Nome proprietario"],
        ["email", "📧 Email"],
        ["nome_cane", "🐕 Nome cane"],
        ["razza", "🧬 Razza"],
        ["eta", "🎂 Età"],
        ["peso", "⚖️ Peso (kg)"]
      ].map(([campo, label]) => (
        <div key={campo} style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>{label}</label>
          <input
            type={campo === "eta" || campo === "peso" ? "number" : "text"}
            value={form[campo]}
            onChange={(e) => aggiorna(campo, e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: 16
            }}
          />
        </div>
      ))}

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", marginBottom: 8 }}>⚧️ Sesso</label>
        <div style={{ display: "flex", gap: 10 }}>
          {["Maschio", "Femmina"].map((s) => (
            <button
              key={s}
              onClick={() => aggiorna("sesso", s)}
              style={{
                padding: 10,
                flex: 1,
                backgroundColor: form.sesso === s ? "#0070f3" : "#f2f2f2",
                color: form.sesso === s ? "white" : "#333",
                border: "1px solid #ccc",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: form.sesso === s ? "bold" : "normal"
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={salvaUtente}
        disabled={caricamento}
        style={{
          padding: 12,
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: 6,
          fontSize: 16,
          cursor: "pointer",
          width: "100%"
        }}
      >
        {caricamento ? "Registrazione in corso..." : "✅ Registra utente"}
      </button>
    </div>
  );
}
