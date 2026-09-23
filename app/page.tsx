'use client';

import { useState } from "react";
import Link from "next/link";

const modules = [
  ["👤","Talents","Créez un profil vérifié avec vos compétences, portfolio, tarifs et disponibilité.","profils"],
  ["💼","Projets","Les entreprises publient leurs besoins et trouvent des talents africains.","missions"],
  ["🤖","IA pour projets","Transformez une idée en cahier des charges et compétences recherchées.","assistant"],
  ["💬","Communauté","Échangez avec des développeurs, designers et experts numériques.","communaute"],
  ["💰","Paiements","Préparez des paiements et commissions pour les prestations numériques.","paiements"],
  ["🏆","Challenges","Prouvez vos compétences avec des défis et construisez votre réputation.","challenges"],
  ["📚","Formations","Développez des compétences directement utiles aux projets clients.","formations"],
  ["🌍","Afrique","Passez de la RDC à un réseau de talents présent dans toute l'Afrique.","afrique"],
  ["🔐","Compte sécurisé","Inscription et connexion avec vérification par e-mail.","login"]
];

export default function Home() {
  const [active, setActive] = useState("Accueil");
  const [role, setRole] = useState<"client" | "talent" | null>(null);

  return <main>
    <nav><Link href="/" className="brand"><strong>Developer<span> in Africa</span></strong></Link><div className="navlinks">
      {["Accueil","Talents","Projets","Communauté","Assistant IA","Paiements","Challenges","Formations","Afrique"].map(item =>
        <button key={item} onClick={() => setActive(item)}>{item}</button>
      )}
      <Link href="/login">Connexion</Link>
    </div></nav>

    <section className="hero">
      <div>
        <p className="eyebrow">🇨🇩 RDC → 🌍 AFRIQUE → 💻 MONDE</p>
        <h1>Le marché où les entreprises rencontrent les <em>talents numériques africains.</em></h1>
        <p className="lead">Developer in Africa transforme une idée de projet en opportunité : profils, portfolio, missions, IA, communauté et outils de collaboration dans une seule plateforme.</p>

        <div className="actions">
          <button className="primary" onClick={() => setRole("client")}>Je cherche un talent</button>
          <button className="secondary" onClick={() => setRole("talent")}>Je suis un talent</button>
        </div>

        {role && <div className="roleCard">
          <strong>{role === "client" ? "Pour les entreprises" : "Pour les talents"}</strong>
          <p>{role === "client"
            ? "Publiez votre projet, indiquez votre budget et trouvez des profils correspondant à vos besoins."
            : "Créez votre profil, ajoutez votre portfolio et rendez vos compétences visibles aux clients."
          }</p>
          <Link className="primary small" href={role === "client" ? "/modules/missions" : "/modules/profils"}>Continuer</Link>
        </div>}
      </div>

      <div className="card">
        <div className="dot">●</div>
        <p>Marché numérique africain</p>
        <h2>{active}</h2>
        <small>Talents • Projets • IA • Paiements • Réputation • Afrique</small>
        <div className="miniStats"><span><b>RDC</b><small>Point de départ</small></span><span><b>Afrique</b><small>Expansion</small></span><span><b>Monde</b><small>Clients</small></span></div>
      </div>
    </section>

    <section className="features" id="modules">
      {modules.map(([icon,title,desc,route]) =>
        <Link key={title} href={route === "login" ? "/login" : `/modules/${route}`}>
          <article><b>{icon}</b><h3>{title}</h3><p>{desc}</p></article>
        </Link>
      )}
    </section>

    <section className="join">
      <p className="eyebrow">OBJECTIF DU PRODUIT</p>
      <h2>Commencer en RDC. Construire pour l’Afrique.</h2>
      <p>La première version se concentre sur le cœur du modèle : mettre en relation des clients et des talents, puis ajouter progressivement vérification, paiements, réputation et IA.</p>
      <div className="actions">
        <Link className="primary" href="/login">Créer mon compte</Link>
        <Link className="secondary" href="/modules/missions">Voir les projets</Link>
      </div>
    </section>

    <footer>© 2026 Developer in Africa • Lancé depuis la RDC</footer>
  </main>;
}
