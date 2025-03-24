import { Schema, model, models, Document, Types } from "mongoose";

export interface IMusic extends Document {
  title: string;
  audioFile: string; // Cloudinary URL
  coverImage?: string; // Cloudinary URL
  artist: Types.ObjectId;
  album?: Types.ObjectId;
  genres: Types.ObjectId[];
  duration: number; // Duration in seconds
  releaseDate: Date;
  isPublic: boolean;
  plays: number;
}

const MusicSchema = new Schema<IMusic>(
  {
    title: {
      type: String,
      required: [true, "Please provide a music title"],
      trim: true,
    },
    audioFile: {
      type: String,
      required: [true, "Audio file URL is required"],
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 second"],
    },
    releaseDate: {
      type: Date,
      default: Date.now,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    plays: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const Music = models.Music || model<IMusic>("Music", MusicSchema);

export default Music;