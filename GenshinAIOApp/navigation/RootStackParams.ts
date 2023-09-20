import {IBaseCharacter} from '../interfaces/CharacterInterface';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
  Details: {character: IBaseCharacter};
  NotFound: undefined;
};
