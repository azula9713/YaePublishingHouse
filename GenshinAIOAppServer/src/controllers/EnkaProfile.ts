import { User } from "enka-network-api";
import { Request, Response } from "express";
import { getEnkaUser } from "../services/EnkaClient";
import { decryptTextAsset } from "../utils/EnkaAssetMapper";

export async function genEnkaProfile(
  req: Request<{ genshinUID: string }>,
  res: Response
) {
  try {
    const { genshinUID } = req.params;

    console.log(genshinUID);

    const response: User = await getEnkaUser(genshinUID);

    const { uid, nickname, profilePicture, signature, profileCard } = response;

    const enkaUserDetails = {
      uid,
      nickname,
      profilePicture: {
        id: profilePicture?.characterData._nameId,
        name: decryptTextAsset(profilePicture?.characterData.name),
        url: profilePicture?.characterData.icon.url,
      },
      profileCard: {
        id: profileCard?.id,
        name: decryptTextAsset(profileCard?.name),
        url: profileCard?.pictures[0].url,
      },
      signature,
    };

    res.status(200).json(enkaUserDetails);
  } catch (error) {
    res.status(500).json({ error: "500" });
  }
}
