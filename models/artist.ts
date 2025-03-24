import { model, models, Schema, Types } from "mongoose";
import { IGenre } from "./genre";
import { IUser } from "./user";

// Artist Schema
export interface IArtist extends Document {
    name: string;
    bio?: string;
    image?: string;
    genres: Types.ObjectId[] | IGenre[];
    createdBy: Types.ObjectId | IUser;
    verified: boolean;
  }
  
  const ArtistSchema = new Schema<IArtist>(
    {
      name: {
        type: String,
        required: [true, "Please provide an artist name"],
        trim: true,
      },
      bio: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
        trim: true,
      },
      genres: [{
        type: Schema.Types.ObjectId,
        ref: "Genre",
      }],
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      verified: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      strict: true,
    }
  );

  const Artist = models.User || model<IArtist>("User", ArtistSchema);

export default Artist;
