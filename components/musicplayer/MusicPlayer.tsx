"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack] = useState({
    title: "Song Title",
    artist: "Artist Name",
    duration: 180, // in seconds
    cover: "/api/placeholder/60/60"
  });
  const [currentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Initialize audio element
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      // You would set the actual source here
      // audioRef.current.src = "path-to-music-file.mp3";
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, []);
  
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="flex items-center justify-between h-full px-4">
      {/* Track info */}
      <div className="flex items-center">
        <img 
          src={currentTrack.cover} 
          alt={`${currentTrack.title} cover`} 
          className="w-12 h-12 rounded-md mr-4"
        />
        <div>
          <h4 className="text-sm font-medium dark:text-white">{currentTrack.title}</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{currentTrack.artist}</p>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-4">
          <button className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
            <SkipBack size={20} />
          </button>
          <button 
            onClick={togglePlay}
            className="p-2 bg-zinc-200 dark:bg-zinc-700 rounded-full text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
            <SkipForward size={20} />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 mt-2 flex items-center">
          <span className="text-xs text-zinc-500 w-8">{formatTime(currentTime)}</span>
          <div className="mx-2 h-1 flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-zinc-500 dark:bg-zinc-400" 
              style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
            />
          </div>
          <span className="text-xs text-zinc-500 w-8">{formatTime(currentTrack.duration)}</span>
        </div>
      </div>
      
      {/* Volume control */}
      <div className="flex items-center">
        <button 
          onClick={toggleMute}
          className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <div className="w-24 h-1 ml-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
          <div className="h-full bg-zinc-500 dark:bg-zinc-400 w-1/2" />
        </div>
      </div>
    </div>
  );
}