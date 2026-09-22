"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ykeuhzossgqmjrpkejev.supabase.co", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_HwTLbkvbF6gk08WwVrFWQg_KwEfRh0Z");

export default function LoginPage(){
  const [mode,setMode]=useState<"signup"|"login">("signup");
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [message,setMessage]=useState(""); const [loading,setLoading]=useState(false); const [otp,setOtp]=useState(""); const [verify,setVerify]=useState(false);
  async function verifyCode(){ const {error}=await supabase.auth.verifyOtp({email,token:otp,type:"email"}); setMessage(error?error.message:"Compte validé. Vous pouvez maintenant vous connecter."); if(!error)setVerify(false); }
  async function submit(e:FormEvent){e.preventDefault();setLoading(true);setMessage("");
    if(mode==="signup"){
      const {error}=await supabase.auth.signUp({email,password,options:{data:{full_name:name}}});
      setMessage(error?error.message:"Code envoyé par e-mail. Entrez le code à 6 chiffres."); setVerify(!error);
    }else{
      const {error}=await supabase.auth.signInWithPassword({email,password});
      setMessage(error?error.message:"Connexion réussie. Votre compte est maintenant actif.");
    }
    setLoading(false);
  }
  return <main className="auth-page"><div className="auth-card"><a className="back" href="/">← Accueil</a><p className="eyebrow">🇨🇩 DÉVELOPPER IN DRC</p><h1>{mode==="signup"?"Créer un compte":"Se connecter"}</h1><p className="auth-lead">{mode==="signup"?"Rejoignez la communauté des développeurs congolais et africains.":"Accédez à votre espace développeur."}</p><form onSubmit={submit}>{mode==="signup"&&<label>Nom complet<input value={name} onChange={e=>setName(e.target.value)} required minLength={2}/></label>}<label>E-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Mot de passe<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6}/></label><button className="primary auth-button" disabled={loading}>{loading?"Chargement…":mode==="signup"?"Créer mon compte":"Se connecter"}</button></form>{verify&&<div className="otp-box"><input inputMode="numeric" maxLength={6} placeholder="Code à 6 chiffres" value={otp} onChange={e=>setOtp(e.target.value)}/><button className="primary" type="button" onClick={verifyCode}>Valider le code</button></div>}{message&&<p className="auth-message">{message}</p>}<button className="switch" onClick={()=>{setMode(mode==="signup"?"login":"signup");setMessage("")}}>{mode==="signup"?"J’ai déjà un compte":"Je veux créer un compte"}</button></div></main>}