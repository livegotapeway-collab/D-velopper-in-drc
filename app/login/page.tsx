"use client";
import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ykeuhzossgqmjrpkejev.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_HwTLbkvbF6gk08WwVrFWQg_KwEfRh0Z"
);

export default function LoginPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
      if (error) setMessage(error.message);
      else { setVerify(true); setMessage(data.session ? "Compte créé." : "Code envoyé par e-mail."); }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else if (data.user) {
        await supabase.from("profiles").upsert({ id: data.user.id, full_name: data.user.user_metadata?.full_name || name, country: "RDC" });
        location.href = "/espace";
      }
    }
    setLoading(false);
  }

  async function verifyCode() {
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
    if (error) setMessage(error.message);
    else {
      if (data.user) await supabase.from("profiles").upsert({ id: data.user.id, full_name: name, country: "RDC" });
      location.href = "/espace";
    }
    setLoading(false);
  }

  return <main className="auth-page"><div className="auth-card">
    <Link className="back" href="/">← Accueil</Link>
    <p className="eyebrow">🇨🇩 DEVELOPER IN DRC</p>
    <h1>{mode === "signup" ? "Créer un compte" : "Se connecter"}</h1>
    <p className="auth-lead">Un vrai compte Supabase, avec session et validation e-mail.</p>
    <form onSubmit={submit}>
      {mode === "signup" && <label>Nom complet<input value={name} onChange={e => setName(e.target.value)} required minLength={2} /></label>}
      <label>E-mail<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
      <label>Mot de passe<input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} /></label>
      <button className="primary auth-button" disabled={loading}>{loading ? "Chargement…" : mode === "signup" ? "Créer mon compte" : "Se connecter"}</button>
    </form>
    {verify && <div className="otp-box"><input inputMode="numeric" maxLength={6} placeholder="Code e-mail à 6 chiffres" value={otp} onChange={e => setOtp(e.target.value)} /><button className="primary" type="button" onClick={verifyCode} disabled={loading}>Valider le code</button></div>}
    {message && <p className="auth-message">{message}</p>}
    <button className="switch" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setVerify(false); setMessage(""); }}>{mode === "signup" ? "J’ai déjà un compte" : "Créer un compte"}</button>
  </div></main>;
}
