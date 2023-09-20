import {IBaseCharacter} from '../interfaces/CharacterInterface';

function filterCharactersByElement(
  characters: IBaseCharacter[],
  selectedElement: string,
): IBaseCharacter[] {
  return characters
    .filter(character => {
      if (
        selectedElement === character.element.name ||
        selectedElement === 'All'
      ) {
        if (character.nameId === 'PlayerGirl') {
          return ['Geo', 'Dendro', 'Pyro'].includes(character.element.name);
        } else if (character.nameId === 'PlayerBoy') {
          return ['Anemo', 'Electro', 'Hydro', 'Cryo'].includes(
            character.element.name,
          );
        }

        return true;
      }

      return false;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

//filter characters by release date. return only characters that are released
function filterCharactersByReleaseDate(
  characters: IBaseCharacter[],
): IBaseCharacter[] {
  return characters.filter(character => {
    //check if releasedAt is undefined or greater than current date minus 1 day
    //releasedAt format 2023-05-02T10:00:00.000Z

    if (
      character.releasedAt === undefined ||
      new Date(character.releasedAt) > new Date(Date.now() - 86400000)
    ) {
      return false;
    }
  });
}

export {filterCharactersByElement, filterCharactersByReleaseDate};
