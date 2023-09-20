import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

import { IModerator } from "./Moderators.model";

const nanoid = customAlphabet("1234567890abcdef", 10);

export interface ICharacterBuildsInput {
  createdBy: IModerator["_id"];
  updatedBy: IModerator["_id"];
  buildName: string;
  characterId: string;
  weapons: {
    name: string;
    rank: number;
    notes: string;
  }[];
  artifacts: {
    name: string;
    rank: number;
    notes: string;
  }[];
  mainStats: {
    slot: string;
    stat: string;
  }[];
  subStats: {
    stats: string[];
    rank: number;
  }[];
  talentPriority: {
    talents: {
      name: string;
      rank: number;
    }[];
    notes: string;
  };
  specialNotes: {
    weaponNotes: {
      name: string;
      notes: string;
    }[];
    artifactNotes: {
      name: string;
      notes: string;
    }[];
  };
}

export interface ICharacterBuilds
  extends ICharacterBuildsInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const CharacterBuildsSchema = new mongoose.Schema(
  {
    buildId: {
      type: String,
      default: () => nanoid(),
      required: true,
      unique: true,
    },
    buildName: {
      type: String,
      required: true,
    },
    characterId: {
      type: String,
      required: true,
    },
    weapons: [
      {
        name: {
          type: String,
          required: true,
        },
        rank: {
          type: Number,
          required: true,
        },
        notes: {
          type: String,
          required: false,
        },
      },
    ],
    artifacts: [
      {
        name: {
          type: String,
          required: true,
        },
        rank: {
          type: Number,
          required: true,
        },
        notes: {
          type: String,
          required: false,
        },
      },
    ],
    mainStats: [
      {
        slot: {
          type: String,
          required: true,
        },
        stat: {
          type: String,
          required: true,
        },
      },
    ],
    subStats: [
      {
        stats: {
          type: [String],
          required: true,
        },
        rank: {
          type: Number,
          required: true,
        },
      },
    ],
    talentPriority: {
      talents: [
        {
          name: {
            type: String,
            required: true,
          },
          rank: {
            type: Number,
            required: true,
          },
        },
      ],
      notes: {
        type: String,
        required: false,
      },
    },
    specialNotes: {
      weaponNotes: [
        {
          name: {
            type: String,
            required: false,
          },
          notes: {
            type: String,
            required: false,
          },
        },
      ],
      artifactNotes: [
        {
          name: {
            type: String,
            required: false,
          },
          notes: {
            type: String,
            required: false,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const CharacterBuildsModel = mongoose.model<ICharacterBuilds>(
  "CharacterBuildsModel",
  CharacterBuildsSchema
);

export default CharacterBuildsModel;
