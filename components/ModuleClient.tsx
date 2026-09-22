"use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";

type Props={module:string};
const meta:any={
 profils:["👤","Profils","Présentez votre identité, vos compétences et vos projets."],
 communaute:["💬","Communauté","Publiez, lisez et partagez avec les développeurs."],
 missions:["💼","Missions","Publiez et consultez des opportunités numériques."],
 assistant:["🤖","Assistant IA","Posez une question technique et obtenez une aide structurée."],
 paiements:["💰","Paiements","Suivez vos demandes et leur statut."],
 challenges:["🏆","Challenges","Participez aux défis et suivez vos points."],
 formations:["📚","Formations","Suivez les formations et votre progression."],
 afrique:["🌍","Espace Afrique","Échangez avec les développeurs africains du continent."]
};

export default function ModuleClient({module}:Props){
 const [user,setUser]=useState<any>(null),[rows,setRows]=useState<any[]>([]),[busy,setBusy]=useState(false),[msg,setMsg]=useState("");
 const [form,setForm]=useState<any>({full_name:"",username:"",bio:"",content:"",title:"",description:"",budget:"",country:"RDC"});
 const [progress,setProgress]=useState<Record<string,number>>({});
 const m=meta[module]||meta.profils;
 useEffect(()=>{supabase.auth.getUser().then(({data})=>setUser(data.user));},[]);
 useEffect(()=>{load();},[module,user?.id]);

 async function load(){
  setMsg("");
  if(module==="profils"){const {data}=await supabase.from("profiles").select("*").limit(50);setRows(data||[]);}
  else if(module==="communaute"){const {data}=await supabase.from("community_posts").select("*").order("created_at",{ascending:false}).limit(50);setRows(data||[]);}
  else if(module==="missions"){const {data}=await supabase.from("missions").select("*").order("created_at",{ascending:false}).limit(50);setRows(data||[]);}
  else if(module==="challenges"){const {data}=await supabase.from("challenges").select("*").order("created_at",{ascending:false});setRows(data||[]);}
  else if(module==="formations"){const {data}=await supabase.from("courses").select("*").order("created_at",{ascending:false});setRows(data||[]); if(user){const p=await supabase.from("course_progress").select("*").eq("user_id",user.id);const map:any={};(p.data||[]).forEach(x=>map[x.course_id]=x.progress);setProgress(map);}}
  else if(module==="afrique"){const {data}=await supabase.from("africa_posts").select("*").order("created_at",{ascending:false}).limit(50);setRows(data||[]);}
  else if(module==="paiements"){const {data}=await supabase.from("payment_requests").select("*").order("created_at",{ascending:false}).limit(50);setRows(data||[]);}
 }
 async function requireUser(){if(!user){setMsg("Connectez-vous pour utiliser cette fonction.");return false}return true}
 async function save(){
  if(!(await requireUser()))return; setBusy(true);setMsg("");
  let error:any=null;
  if(module==="profils"){error=(await supabase.from("profiles").upsert({id:user.id,full_name:form.full_name,username:form.username,bio:form.bio,country:form.country}).select().single()).error;}
  if(module==="communaute"){error=(await supabase.from("community_posts").insert({author_id:user.id,content:form.content})).error;}
  if(module==="afrique"){error=(await supabase.from("africa_posts").insert({author_id:user.id,country:form.country||"RDC",content:form.content})).error;}
  if(module==="missions"){error=(await supabase.from("missions").insert({owner_id:user.id,title:form.title,description:form.description,budget:form.budget?Number(form.budget):null})).error;}
  if(module==="paiements"){error=(await supabase.from("payment_requests").insert({user_id:user.id,mission_id:null,amount:Number(form.budget),currency:"USD",purpose:"mission"})).error;}
  setBusy(false);setMsg(error?error.message:"Action enregistrée."); if(!error){setForm({...form,content:"",title:"",description:"",budget:""});load();}
 }
 async function joinChallenge(id:number){if(!(await requireUser()))return;const {error}=await supabase.from("challenge_entries").upsert({challenge_id:id,user_id:user.id,status:"joined"});setMsg(error?error.message:"Challenge rejoint.");}
 async function setCourseProgress(id:number,value:number){if(!(await requireUser()))return;const {error}=await supabase.from("course_progress").upsert({course_id:id,user_id:user.id,progress:value,updated_at:new Date().toISOString()});setProgress({...progress,[id]:value});setMsg(error?error.message:"Progression enregistrée.");}
 async function signOut(){await supabase.auth.signOut();location.href="/";}
 return <main className="module-page">
  <nav><Link href="/"><strong>Developer<span> in DRC</span></strong></Link><div style={{display:"flex",gap:16,alignItems:"center"}}>{user?<><span>{user.email}</span><button onClick={signOut}>Déconnexion</button></>:<Link href="/login">Connexion</Link>}</div></nav>
  <section className="module-header"><p>{m[0]} MODULE</p><h1>{m[1]}</h1><p>{m[2]}</p></section>
  <section className="module-body">
   {["profils","communaute","afrique","missions","paiements"].includes(module)&&<div className="composer">
    {module==="profils"?<><input placeholder="Nom complet" value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})}/><input placeholder="Nom d'utilisateur" value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/><input placeholder="Pays" value={form.country} onChange={e=>setForm({...form,country:e.target.value})}/><textarea placeholder="Bio" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/></>:module==="missions"?<><input placeholder="Titre de la mission" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/><input type="number" placeholder="Budget USD" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/></>:<><textarea placeholder={module==="paiements"?"Montant USD à demander":"Écrivez votre publication…"} value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/>{module==="paiements"&&<input type="number" min="1" step=".01" placeholder="Montant USD" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/>}</>}
    <button className="primary" onClick={save} disabled={busy}>{busy?"Enregistrement…":"Enregistrer / publier"}</button>{msg&&<p className="auth-message">{msg}</p>}
   </div>}
   {module==="assistant"&&<div className="composer"><h2>Assistant technique</h2><p>Expliquez votre problème de code, l’erreur rencontrée ou ce que vous voulez construire.</p><textarea id="ai-question" placeholder="Ex. Comment corriger une erreur Supabase RLS ?"/><button className="primary" onClick={()=>setMsg("Assistant prêt : décrivez précisément votre code, l’erreur et le résultat attendu. Cette version ne simule pas une réponse IA.")}>Analyser ma question</button>{msg&&<p className="auth-message">{msg}</p>}</div>}
   <div className="grid">
    {rows.map((x:any)=><article key={x.id??x.username??x.challenge_id}>
      <h3>{x.title||x.full_name||x.username||x.country||"Élément"}</h3><p>{x.description||x.content||x.bio||x.status||x.level||""}</p>
      {module==="challenges"&&<button className="primary" onClick={()=>joinChallenge(x.id)}>Rejoindre</button>}
      {module==="formations"&&<><p>Progression : {progress[x.id]||0}%</p><input type="range" min="0" max="100" value={progress[x.id]||0} onChange={e=>setCourseProgress(x.id,Number(e.target.value))}/></>}
      {module==="missions"&&<small>Statut : {x.status||"open"} • Budget : {x.budget??"à discuter"} USD</small>}
    </article>)}
   </div>
  </section><footer><Link href="/">← Accueil</Link></footer>
 </main>;
}