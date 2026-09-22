'use client';

import { useState } from "react";
import Link from "next/link";

const modules = [
  ["👤","Profils","Présentez vos compétences, projets et expérience."],
  ["💬","Communauté","Échangez, partagez vos idées et trouvez des collaborateurs."],
  ["💼","Missions","Publiez ou découvrez des missions et opportunités tech."],
  ["🤖","Assistant IA","Obtenez de l’aide pour coder, déboguer et apprendre."],
  ["💰","Paiements","Préparez une infrastructure de paiement adaptée aux services numériques."],
  ["🏆","Challenges","Participez à des défis et mettez vos compétences en avant."],
  ["📚","Formations","Apprenez avec des ressources et parcours orientés pratique."],
  ["🌍","Espace Afrique","Élargissez votre réseau aux développeurs africains."],
  ["🔐","Validation par code","Inscription sécurisée par code e-mail."]
];

export default function Home() {
  const [active, setActive] = useState("Accueil");
  const [joined, setJoined] = useState(false);

  return <main>
    <nav><strong>Developer<span> in DRC</span></strong><div className="navlinks">
      {["Accueil","Profils","Communauté","Missions","Assistant IA","Paiements","Challenges","Formations","Espace Afrique"].map(item => <button key={item} onClick={() => setActive(item)}>{item}</button>)}
      <a href="/login">Connexion</a>
    </div></nav>
    <section className="hero"><div>
      <p className="eyebrow">🇨🇩 RDC • AFRIQUE</p>
      <h1>Une plateforme pour les développeurs qui <em>construisent.</em></h1>
      <p className="lead">Developer in DRC réunit profils, projets, communauté, missions, apprentissage et outils IA dans un même espace.</p>
      <div className="actions"><button className="primary" onClick={() => setJoined(true)}>Rejoindre gratuitement</button><a className="secondary" href="#modules">Voir les fonctionnalités</a></div>
      {joined && <p className="notice">✓ Ton espace développeur est prêt à être créé.</p>}
    </div><div className="card"><div className="dot">●</div><p>Écosystème développeur</p><h2>{active}</h2><small>Profils • Communauté • Missions • IA • Paiements • Challenges • Formations • Afrique</small></div></section>
    <section id="modules" className="features">{modules.map(([icon,title,desc]) => { const routes:any={"Profils":"profils","Communauté":"communaute","Missions":"missions","Assistant IA":"assistant","Paiements":"paiements","Challenges":"challenges","Formations":"formations","Espace Afrique":"afrique","Validation par code":"login"}; return <Link key={title} href={routes[title]==="login"?"/login":`/modules/${routes[title]}`}><article><b>{icon}</b><h3>{title}</h3><p>{desc}</p></article></Link> })}</section>
    <section className="join"><p className="eyebrow">PLATEFORME</p><h2>Construisons l’écosystème tech congolais.</h2><p>Les modules sont maintenant accessibles comme de vrais espaces de l’application, avec Supabase pour les données et l’authentification.<button className="primary" onClick={() => setJoined(true)}>Commencer</button></section>
    <footer>© 2026 Developer in DRC • Fait pour les développeurs de RDC et d’Afrique</footer>
  </main>;
}
