export type IElementType =
  | 'Anemo'
  | 'Geo'
  | 'Electro'
  | 'Dendro'
  | 'Hydro'
  | 'Pyro'
  | 'Cryo';

export type IRarityType =
  | 'QUALITY_PURPLE'
  | 'QUALITY_ORANGE'
  | 'QUALITY_ORANGE_SP';

export type IWeaponType =
  | 'WEAPON_BOW'
  | 'WEAPON_CATALYST'
  | 'WEAPON_CLAYMORE'
  | 'WEAPON_POLE'
  | 'WEAPON_SWORD_ONE_HAND';

export interface IBaseCharacter {
  id: string;
  enkaId: string;
  name: string;
  nameId: string;
  rarity: IRarityType;
  iconUrl: string;
  element: {
    id: string;
    name: IElementType;
  };
  splashUrl: string;
  weaponType: IWeaponType;
  nameCard: string;
  isTraveler: boolean;
  releasedAt: string;
}
