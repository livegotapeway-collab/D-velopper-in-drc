import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "cd.velopper.drc",
  appName: "Développer in DRC",
  webDir: "out",
  server: {
    url: "https://d-velopper-in-drc.vercel.app",
    cleartext: false
  }
};

export default config;
