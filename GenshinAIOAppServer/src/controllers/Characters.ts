import { CharacterData } from "enka-network-api";
import { Request, Response } from "express";
import { getAllCharactersFromEnka } from "../services/EnkaClient";
import uniqueIdMapper from "../utils/UniqueIdMapper";
import { decryptTextAsset } from "../utils/EnkaAssetMapper";

export async function getAllCharacters(req: Request<{}, {}>, res: Response) {
  try {
    const response: CharacterData[] = getAllCharactersFromEnka();

    const characters = response.map((character) => {
      const {
        _nameId,
        id,
        rarity,
        icon,
        element,
        skillDepotId,
        weaponType,
        isTraveler,
        releasedAt,
      } = character;

      console.log(id, decryptTextAsset(character.name));

      return {
        id: uniqueIdMapper(_nameId, skillDepotId).toLowerCase(),
        enkaId: id,
        name: decryptTextAsset(character.name),
        nameId: character._nameId,
        rarity,
        iconUrl: icon.url,
        splashUrl: character.splashImage.url,
        nameCard: character.nameCard?.pictures[0].url,
        element: {
          id: element?.id,
          name: decryptTextAsset(element?.name),
        },
        weaponType,
        isTraveler,
        releasedAt,
      };
    });

    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: "500" });
  }
}
