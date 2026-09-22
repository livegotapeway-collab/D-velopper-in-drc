import ModuleClient from "./ModuleClient";

export function generateStaticParams() {
  return [
    { module: "profils" },
    { module: "communaute" },
    { module: "missions" },
    { module: "assistant" },
    { module: "paiements" },
    { module: "challenges" },
    { module: "formations" },
    { module: "afrique" }
  ];
}

export default async function Page({
  params
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  return <ModuleClient module={module} />;
}
