"use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabase";
const cfg:any={profils:["👤","Profils"],communaute:["💬","Communauté"],missions:["💼","Missions"],assistant:["🤖","Assistant IA"],paiements:["💰","Paiements"],challenges:["🏆","Challenges"],formations:["📚","Formations"],afrique:["🌍","Espace Afrique"]};
export default function Page({params}:{params:Promise<{module:string}>}){
 const [m,setM]=useState("profils"),[data,setData]=useState<any[]>([]),[user,setUser]=useState<any>(null),[text,setText]=useState(""),[title,setTitle]=useState("");
 useEffect(()=>{params.then(p=>setM(p.module));supabase.auth.getUser().then(r=>setUser(r.data.user));},[params]);
 useEffect(()=>{load()},[m,user]);
 async function load(){const t=m==="communaute"?"community_posts":m==="missions"?"missions":m==="challenges"?"challenges":m==="formations"?"courses":m==="afrique"?"africa_posts":m==="paiements"?"payment_requests":"profiles";let q=supabase.from(t).select("*").limit(30);if(t==="payment_requests"&&user)q=q.eq("user_id",user.id);const r=await q;setData(r.data||[])}
 async function publish(){if(!user){alert("Connectez-vous d’abord.");return}if(m==="communaute")await supabase.from("community_posts").insert({author_id:user.id,content:text});if(m==="missions")await supabase.from("missions").insert({owner_id:user.id,title,description:text});if(m==="afrique")await supabase.from("africa_posts").insert({author_id:user.id,country:"RDC",content:text});setText("");setTitle("");load()}
 const c=cfg[m]||cfg.profils;
 return <main className="module-page"><nav><Link href="/"><strong>Developer<span> in DRC</span></strong></Link><Link href="/login">Connexion</Link></nav><section className="module-header"><p>{c[0]} MODULE</p><h1>{c[1]}</h1><p>Votre espace fonctionnel Developer in DRC.</p></section><section className="module-body">
 {["communaute","missions","afrique"].includes(m)&&<div className="composer">{m==="missions"&&<input placeholder="Titre de la mission" value={title} onChange={e=>setTitle(e.target.value)}/>}<textarea placeholder="Écrivez ici…" value={text} onChange={e=>setText(e.target.value)}/><button className="primary" onClick={publish}>Publier</button></div>}
 {m==="assistant"&&<div className="composer"><h2>Assistant IA</h2><textarea placeholder="Votre question technique…"/><button className="primary">Demander à l’IA</button></div>}
 <div className="grid">{data.map(x=><article key={x.id||x.username}><h3>{x.title||x.full_name||x.username||x.country||"Élément"}</h3><p>{x.description||x.content||x.bio||x.status||x.level||""}</p></article>)}</div>
 </section><footer><Link href="/">← Accueil</Link></footer></main>}