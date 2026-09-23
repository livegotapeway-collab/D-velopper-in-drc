'use client';

import { useState } from "react";
import Link from "next/link";

const modules = [
  ["🎬","Video","Shorts, vidéos longues, stories et lives dans un flux mondial.","modules/missions"],
  ["🌐","Global","Une plateforme pensée pour plusieurs pays, langues, devises et marchés.","modules/afrique"],
  ["🤖","AI","Création assistée, traduction, recherche intelligente et sécurité.","modules/assistant"],
  ["💬","Social","Profils, abonnements, communautés, messages et notifications.","modules/communaute"],
  ["💳","Payments","Une couche de paiement capable d'orchestrer cartes, wallets, Mobile Money et rails locaux.","modules/paiements"],
  ["🛍️","Commerce","Créateurs et entreprises peuvent vendre produits, services et contenus.","modules/missions"],
  ["💰","Creators","Abonnements, cadeaux, ventes, publicité et tableau de bord de revenus.","modules/profils"],
  ["🛡️","Trust","Authentification forte, anti-spam, anti-fraude, signalement et modération.","login"],
];

export default function Home() {
  const [active, setActive] = useState("Accueil");
  const [role, setRole] = useState<"creator" | "business" | null>(null);

  return (
    <main>
      <nav>
        <Link href="/" className="brand"><strong>ONE<span>WORLD</span></strong></Link>
        <div className="navlinks">
          {["Accueil","Video","Social","AI","Commerce","Payments","Global"].map(item =>
            <button key={item} onClick={() => setActive(item)}>{item}</button>
          )}
          <Link href="/login">Connexion</Link>
        </div>
      </nav>

      <section className="hero">
        <div>
          <p className="eyebrow">🇨🇩 CONÇU DEPUIS LA RDC • 🌍 CONÇU POUR LE MONDE</p>
          <h1>Un réseau mondial où <em>social, vidéo, IA et économie</em> vivent ensemble.</h1>
          <p className="lead">
            Une nouvelle génération de plateforme sociale : publier, découvrir, communiquer,
            créer, vendre et être payé à travers plusieurs pays et plusieurs moyens de paiement.
          </p>

          <div className="actions">
            <button className="primary" onClick={() => setRole("creator")}>Je suis créateur</button>
            <button className="secondary" onClick={() => setRole("business")}>Je suis une entreprise</button>
          </div>

          {role && (
            <div className="roleCard">
              <strong>{role === "creator" ? "Espace créateur" : "Espace entreprise"}</strong>
              <p>
                {role === "creator"
                  ? "Construisez votre audience, publiez du contenu et préparez vos futures sources de revenus."
                  : "Construisez votre présence, découvrez des audiences et préparez commerce et paiements."
                }
              </p>
              <Link className="primary small" href={role === "creator" ? "/modules/profils" : "/modules/missions"}>Commencer</Link>
            </div>
          )}
        </div>

        <div className="card">
          <div className="dot">●</div>
          <p>Plateforme mondiale</p>
          <h2>{active}</h2>
          <small>Video • Social • AI • Commerce • Payments • Creators</small>
          <div className="miniStats">
            <span><b>RDC</b><small>Origine</small></span>
            <span><b>🌍</b><small>International</small></span>
            <span><b>∞</b><small>Extensible</small></span>
          </div>
        </div>
      </section>

      <section className="features" id="modules">
        {modules.map(([icon,title,desc,route]) =>
          <Link key={title} href={route.startsWith("login") ? "/login" : `/${route}`}>
            <article><b>{icon}</b><h3>{title}</h3><p>{desc}</p></article>
          </Link>
        )}
      </section>

      <section className="join">
        <p className="eyebrow">PHASE 1 • FONDATION</p>
        <h2>Nous construisons le socle avant l'empire.</h2>
        <p>
          Compte, profil, sécurité, flux social et publication constituent la première base.
          Ensuite viennent vidéo avancée, recommandation, IA, commerce et orchestration des paiements.
        </p>
        <div className="actions">
          <Link className="primary" href="/login">Créer mon compte</Link>
          <Link className="secondary" href="/modules/assistant">Explorer l'IA</Link>
        </div>
      </section>

      <footer>© 2026 ONEWORLD • Conçu depuis la RDC • Architecture internationale</footer>
    </main>
  );
}
