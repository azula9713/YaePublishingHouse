function weaponTypeParser(weaponType: string) {
  switch (weaponType) {
    case "WEAPON_CATALYST":
      return "Catalyst";

    case "WEAPON_SWORD_ONE_HAND":
      return "Sword";

    case "WEAPON_CLAYMORE":
      return "Claymore";

    case "WEAPON_POLE":
      return "Polearm";

    case "WEAPON_BOW":
      return "Bow";
  }
}

export default weaponTypeParser;
