// "use client"

// import { useState } from "react"
// import { Music, Users } from "lucide-react"
// import { VideoPlayer } from "@/components/video-player"
// import { SongSubmission } from "@/components/song-submission"
// import { SongQueue } from "@/components/song-queue"
// import type { QueueItemData } from "@/components/queue-item"

// const initialQueue: QueueItemData[] = [
//   {
//     id: "1",
//     videoId: "dQw4w9WgXcQ",
//     title: "Rick Astley - Never Gonna Give You Up",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
//     votes: 12,
//     userVote: null,
//   },
//   {
//     id: "2",
//     videoId: "9bZkp7q19f0",
//     title: "PSY - GANGNAM STYLE",
//     thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg",
//     votes: 8,
//     userVote: null,
//   },
//   {
//     id: "3",
//     videoId: "fJ9rUzIMcZQ",
//     title: "Queen - Bohemian Rhapsody",
//     thumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/mqdefault.jpg",
//     votes: 15,
//     userVote: null,
//   },
//   {
//     id: "4",
//     videoId: "kJQP7kiw5Fk",
//     title: "Luis Fonsi - Despacito ft. Daddy Yankee",
//     thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
//     votes: 5,
//     userVote: null,
//   },
// ]

// export default function StreamQueuePage() {
//   const [queue, setQueue] = useState<QueueItemData[]>(initialQueue)
//   const [currentVideo, setCurrentVideo] = useState<{
//     videoId: string
//     title: string
//   } | null>({
//     videoId: "L_jWHffIx5E",
//     title: "Smash Mouth - All Star",
//   })

//   const handleVote = (id: string, vote: "up" | "down") => {
//     setQueue((prev) =>
//       prev.map((item) => {
//         if (item.id !== id) return item

//         let newVotes = item.votes
//         let newUserVote: "up" | "down" | null = vote

//         if (item.userVote === vote) {
//           // Remove vote
//           newVotes = vote === "up" ? item.votes - 1 : item.votes + 1
//           newUserVote = null
//         } else if (item.userVote === null) {
//           // New vote
//           newVotes = vote === "up" ? item.votes + 1 : item.votes - 1
//         } else {
//           // Change vote
//           newVotes = vote === "up" ? item.votes + 2 : item.votes - 2
//         }

//         return { ...item, votes: newVotes, userVote: newUserVote }
//       })
//     )
//   }

//   const handleSubmit = (videoId: string, title: string, thumbnail: string) => {
//     const newItem: QueueItemData = {
//       id: Date.now().toString(),
//       videoId,
//       title,
//       thumbnail,
//       votes: 1,
//       userVote: "up",
//     }
//     setQueue((prev) => [...prev, newItem])
//   }

//   const handleSkip = () => {
//     const sortedQueue = [...queue].sort((a, b) => b.votes - a.votes)
//     if (sortedQueue.length > 0) {
//       const nextVideo = sortedQueue[0]
//       setCurrentVideo({ videoId: nextVideo.videoId, title: nextVideo.title })
//       setQueue((prev) => prev.filter((item) => item.id !== nextVideo.id))
//     } else {
//       setCurrentVideo(null)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
//                 <Music className="h-5 w-5 text-primary-foreground" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-foreground">StreamQueue</h1>
//                 <p className="text-sm text-muted-foreground">Vote for the next song</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <Users className="h-4 w-4" />
//               <span>42 viewers</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-6">
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Video Player - Takes up 2 columns on large screens */}
//           <div className="lg:col-span-2 space-y-6">
//             <VideoPlayer
//               videoId={currentVideo?.videoId ?? null}
//               title={currentVideo?.title ?? ""}
//               onSkip={handleSkip}
//             />

//             {/* Song Submission below video on larger screens */}
//             <div className="hidden lg:block">
//               <SongSubmission onSubmit={handleSubmit} />
//             </div>
//           </div>

//           {/* Queue Sidebar */}
//           <div className="space-y-6">
//             {/* Song Submission on mobile */}
//             <div className="lg:hidden">
//               <SongSubmission onSubmit={handleSubmit} />
//             </div>

//             <SongQueue items={queue} onVote={handleVote} />
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-border mt-12">
//         <div className="container mx-auto px-4 py-6">
//           <p className="text-center text-sm text-muted-foreground">
//             Submit YouTube links and vote to decide what plays next
//           </p>
//         </div>
//       </footer>
//     </div>
//   )
// }

"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/socket-context";
import jwt from "jsonwebtoken";
import StreamView from "@/components/StreamView";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";

export default function Component({
  params: { spaceId },
}: {
  params: { spaceId: string };
}) {
  const { socket, user, loading, setUser, connectionError } = useSocket();

  const [creatorId, setCreatorId] = useState<string | null>(null);
  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    async function fetchHostId() {
      try {
        const response = await fetch(`/api/spaces/?spaceId=${spaceId}`, {
          method: "GET",
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to retreive space's host id");
        }
        setCreatorId(data.hostId);
      } catch (error) {
      } finally {
        setLoading1(false);
      }
    }
    fetchHostId();
  }, [spaceId]);

  useEffect(() => {
    if (user && socket && creatorId) {
      const token =
        user.token ||
        jwt.sign(
          {
            creatorId: creatorId,
            userId: user?.id,
          },
          process.env.NEXT_PUBLIC_SECRET || "",
          {
            expiresIn: "24h",
          },
        );

      socket?.send(
        JSON.stringify({
          type: "join-room",
          data: {
            token,
            spaceId,
          },
        }),
      );
      if (!user.token) {
        setUser({ ...user, token });
      }
    }
  }, [user, spaceId, creatorId, socket]);

  if (connectionError) {
    return <ErrorScreen>Cannot connect to socket server</ErrorScreen>;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (loading1) {
    return <LoadingScreen></LoadingScreen>;
  }

  if (user.id != creatorId) {
    return <ErrorScreen>You are not the creator of this space</ErrorScreen>;
  }

  return (
    <StreamView
      creatorId={creatorId as string}
      playVideo={true}
      spaceId={spaceId}
    />
  );
}

export const dynamic = "auto";
