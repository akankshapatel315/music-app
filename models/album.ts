import { model, models, Schema, Types } from "mongoose";
import { IUser } from "./user";
import { IArtist } from "./artist";
import { IGenre } from "./genre";

export interface IAlbum extends Document {
  title: string;
  artist: Types.ObjectId | IArtist;
  releaseDate: Date;
  coverImage?: string;
  genres: Types.ObjectId[] | IGenre[];
  trackCount: number;
  createdBy: Types.ObjectId | IUser;
  featured: boolean;
}

const AlbumSchema = new Schema<IAlbum>(
  {
    title: {
      type: String,
      required: [true, "Please provide an album title"],
      trim: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    trackCount: {
      type: Number,
      default: 0,
      min: [0, "Track count cannot be negative"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const Album = models.Album || model<IAlbum>("Album", AlbumSchema);

export default Album;
