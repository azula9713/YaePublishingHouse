export default function uniqueIdMapper(
  name: string,
  skillDepotId: number
): string {
  let id = name;
  if (name === "PlayerBoy" || name === "PlayerGirl") {
    switch (skillDepotId) {
      case 504:
        id = "traveler_anemo";
        break;
      case 507:
        id = "traveler_electro";
        break;
      case 706:
        id = "traveler_geo";
        break;
      case 708:
        id = "traveler_dendro";
        break;
    }
  }
  return id;
}

// Not using as of now
//   case 506:
//     id = "traveler_geo";
//     break;
