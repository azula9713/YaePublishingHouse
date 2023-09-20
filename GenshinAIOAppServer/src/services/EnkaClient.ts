import { EnkaClient } from "enka-network-api";

const enka = new EnkaClient({
  // defaultImageBaseUrl: "https://cdn.shogunate.tools/assets/genshin",
  defaultImageBaseUrl: "https://api.ambr.top/assets/UI",
});

enka.cachedAssetsManager.activateAutoCacheUpdater({
  instant: true, // Run the first update check immediately
  timeout: 24 * 60 * 60 * 1000, // 1d interval
  onUpdateStart: async () => {
    console.log("Updating Genshin Data...");
  },
  onUpdateEnd: async () => {
    enka.cachedAssetsManager.refreshAllData(); // Refresh memory
    console.log("Updating Completed!");
  },
});

export function getAllCharactersFromEnka() {
  return enka.getAllCharacters();
}

export function getEnkaUser(uid: string) {
  return enka.fetchUser(uid);
}
