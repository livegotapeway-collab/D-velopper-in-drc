import ModuleClient from "./ModuleClient";

export function generateStaticParams() {
  return [
    { module: "profils" }, { module: "communaute" }, { module: "missions" },
    { module: "assistant" }, { module: "paiements" }, { module: "challenges" },
    { module: "formations" }, { module: "afrique" }
  ];
}

export default function Page({ params }: { params: { module: string } }) {
  return <ModuleClient module={params.module} />;
}
