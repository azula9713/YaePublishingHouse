export interface ICommonNote {
  name: string;
  notes: string;
}

export interface ICommonRank {
  name: string;
  rank: number;
  hasNote: boolean;
}

export interface IMainStat {
  slot: string;
  stats: string;
}

export interface ISubStat {
  rank: number;
  stats: string[];
}

export interface ISpecialNotes {
  artifactNotes: ICommonNote[];
  weaponNotes: ICommonNote[];
}

export interface ITalentPriority {
  talents: {
    name: string;
    rank: number;
  }[];
  notes: string;
}

export interface IBuild {
  characterId: number;
  roleId: string;
  roleName: string;
  artifacts: ICommonRank[];
  mainStats: IMainStat[];
  subStats: ISubStat[];
  specialNotes: ISpecialNotes;
  talentPriority: ITalentPriority;
  weapons: ICommonRank[];
  description: string;
}
