// pages/dashboard.js
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Disc3, Play } from "lucide-react";
import { ContentLayout } from '@/components/panel/content-layout';
const popularAlbums = [
    {
      id: 1,
      title: "Sanam Teri Kasam",
      subtitle: "Original Motion Picture Soundtrack",
      artists: "Himesh Reshammiya, Sameer Anjaan, Subrat Sinha",
      coverArt: "/album-covers/sanam-teri-kasam.jpg",
    },
    {
      id: 2,
      title: "Yeh Jawaani Hai Deewani",
      subtitle: "",
      artists: "Pritam",
      coverArt: "/album-covers/yeh-jawani-hai-deewani.jpg",
    },
    {
      id: 3,
      title: "Aashiqui 2",
      subtitle: "",
      artists: "Mithoon, Ankit Tiwari, Jeet Gannguli",
      coverArt: "/album-covers/aashiqui-2.jpg",
    },
    {
      id: 4,
      title: "Young G.O.A.T",
      subtitle: "",
      artists: "Cheema Y, Gur Sidhu",
      coverArt: "/album-covers/young-goat.jpg",
    },
    {
      id: 5,
      title: "Glory",
      subtitle: "",
      artists: "Yo Yo Honey Singh",
      coverArt: "/album-covers/glory.jpg",
    },
    {
      id: 6,
      title: "Sicario",
      subtitle: "",
      artists: "Shubh",
      coverArt: "/album-covers/sicario.jpg",
    },
  ];

  const popularRadio = [
    {
      id: 1,
      name: "Arijit Singh",
      collaborators: "With Sachin-Jigar, Mithoon, Jeet Gannguli",
      background: "bg-yellow-100",
      coverArt: "/radio-covers/arijit-singh.jpg",
    },
    {
      id: 2,
      name: "Diljit Dosanjh",
      collaborators: "With Karan Aujla, Shubh, Badshah and more",
      background: "bg-green-100",
      coverArt: "/radio-covers/diljit-dosanjh.jpg",
    },
    {
      id: 3,
      name: "Kishore Kumar",
      collaborators: "With Mohammed Rafi, Mukesh, Asha Bhosle",
      background: "bg-red-200",
      coverArt: "/radio-covers/kishore-kumar.jpg",
    },
    {
      id: 4,
      name: "Shreya Ghoshal",
      collaborators: "With A.R. Rahman, Vishal-Shekhar, Atif Aslam",
      background: "bg-orange-200",
      coverArt: "/radio-covers/shreya-ghoshal.jpg",
    },
    {
      id: 5,
      name: "KK",
      collaborators: "With Armaan Malik, Pritam, Atif Aslam and more",
      background: "bg-emerald-100",
      coverArt: "/radio-covers/kk.jpg",
    },
    {
      id: 6,
      name: "Kumar Sanu",
      collaborators: "With Abhijeet, Asha Bhosle, Alka Yagnik and more",
      background: "bg-purple-200",
      coverArt: "/radio-covers/kumar-sanu.jpg",
    },
  ];

export default function Dashboard() {


  return (
    <ContentLayout title="Dashboard">
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-8">
        <ScrollArea className="h-screen">
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Popular albums and singles</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {popularAlbums.map((album) => (
                <div key={album.id} className="flex flex-col">
                  <Card className="bg-zinc-900 border-none overflow-hidden">
                    <CardContent className="p-0 relative group">
                      <div className="aspect-square relative">
                        <div className="w-full h-full bg-zinc-800 animate-pulse"></div>
                        {/* In a real app, you'd replace this with actual images */}
                        {/* <Image
                          src={album.coverArt}
                          alt={album.title}
                          fill
                          className="object-cover"
                        /> */}
                      </div>
                      {album.id === 3 && (
                        <button className="absolute right-2 bottom-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play fill="white" size={24} />
                        </button>
                      )}
                    </CardContent>
                  </Card>
                  <div className="mt-2">
                    <h3 className="font-semibold text-white truncate">
                      {album.title}
                    </h3>
                    {album.subtitle && (
                      <p className="text-sm text-white truncate">{album.subtitle}</p>
                    )}
                    <p className="text-sm text-gray-400 truncate">
                      {album.artists}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Radio Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Popular radio</h2>
              <button className="text-gray-400 hover:text-white">
                Show all
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {popularRadio.map((station) => (
                <div key={station.id} className="flex flex-col">
                  <Card className={`border-none overflow-hidden ${station.background}`}>
                    <CardContent className="p-0 relative">
                      <div className="p-4 relative aspect-square flex flex-col items-center justify-center">
                        <div className="radio-badge absolute top-2 left-2 bg-black text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Disc3 size={12} />
                          <span>RADIO</span>
                        </div>
                        <div className="rounded-full w-24 h-24 bg-zinc-800 mb-4 overflow-hidden">
                          {/* In a real app, you'd replace this with actual images */}
                          {/* <Image
                            src={station.coverArt}
                            alt={station.name}
                            fill
                            className="object-cover"
                          /> */}
                        </div>
                        <h3 className="font-bold text-black text-center">
                          {station.name}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      {station.collaborators}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollArea>
      </main>
    </div>
  </ContentLayout>

  );
}