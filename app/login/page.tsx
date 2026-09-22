"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ykeuhzossgqmjrpkejev.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_HwTLbkvbF6gk08WwVrFWQg_KwEfRh0Z"
);

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();
    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        shouldCreateUser: true,
        data: { full_name: name.trim(), country: "RDC" },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      localStorage.setItem("developer_drc_name", name.trim());
      localStorage.setItem("developer_drc_email", cleanEmail);
      setEmail(cleanEmail);
      setStep("otp");
      setMessage("Code envoyé. Vérifiez votre boîte de réception et vos spams.");
    }
    setLoading(false);
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.replace(/\D/g, "").slice(0, 6);
    const { data, error } = await supabase.auth.verifyOtp({
      email: cleanEmail,
      token: cleanOtp,
      type: "email",
    });

    if (error) {
      setMessage(error.message);
    } else if (data.user) {
      const fullName =
        data.user.user_metadata?.full_name ||
        localStorage.getItem("developer_drc_name") ||
        "";
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        country: "RDC",
      });
      location.href = "/espace";
    }
    setLoading(false);
  }

  async function resend() {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: true },
    });
    setMessage(error ? error.message : "Nouveau code demandé. Vérifiez votre e-mail.");
    setLoading(false);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link className="back" href="/">← Accueil</Link>
        <p className="eyebrow">🇨🇩 DEVELOPER IN DRC</p>
        <h1>{step === "email" ? "Créer un compte" : "Vérifier votre e-mail"}</h1>
        <p className="auth-lead">
          {step === "email"
            ? "Entrez votre nom et votre e-mail. Nous vous envoyons un code de vérification."
            : <>Un code a été demandé pour <strong>{email}</strong>.</>}
        </p>

        {step === "email" ? (
          <form onSubmit={sendCode}>
            <label>Nom complet<input value={name} onChange={e => setName(e.target.value)} required minLength={2} /></label>
            <label>E-mail<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
            <button className="primary auth-button" disabled={loading}>
              {loading ? "Envoi…" : "Recevoir mon code"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode}>
            <label>Code à 6 chiffres
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                pattern="[0-9]{6}"
                placeholder="123456"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
              />
            </label>
            <button className="primary auth-button" disabled={loading || otp.length !== 6}>
              {loading ? "Vérification…" : "Vérifier et continuer"}
            </button>
            <button className="switch" type="button" onClick={resend} disabled={loading}>
              Renvoyer le code
            </button>
            <button className="switch" type="button" onClick={() => { setStep("email"); setOtp(""); setMessage(""); }}>
              Modifier l’e-mail
            </button>
          </form>
        )}

        {message && <p className="auth-message">{message}</p>}
      </div>
    </main>
  );
}
