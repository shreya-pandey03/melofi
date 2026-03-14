import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Radio, Headphones } from "lucide-react";
import { Appbar } from "./components/Appbar";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
        <>
        <Appbar/>
        </>
      {/* Hero Section */}
      <main className="flex-1 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
             Your Fans Choose The Music
            </h1>

            <p className="max-w-[700px] text-gray-400 md:text-xl">
           Melofi lets creators stream with music hand-picked by their community. Every vote counts. Every track connects.
            </p>

            <div className="flex gap-4 pt-4">
              <Link
                href={{
                  pathname: "/auth",
                  query: { authType: "signUp" },
                }}
              >
                <Button className="bg-purple-700 hover:bg-purple-700 text-white">
                  Get Started
                </Button>
              </Link>

              <Button
                variant="outline"
                className="border-gray-700 text-gray-200 hover:bg-gray-800"
              >
                Learn More
              </Button>
            </div>

          </div>
        </div>
      </main>

      {/* Features */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">

          <h2 className="text-center text-3xl font-bold mb-14">
            Key Features
          </h2>

          <div className="grid gap-10 md:grid-cols-3">

            <div className="flex flex-col items-center text-center space-y-4">
              <Users className="h-12 w-12 text-yellow-400" />
              <h3 className="text-xl font-semibold">Fan Interaction</h3>
              <p className="text-gray-400">
                Let your audience vote and choose the next track in real-time.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <Radio className="h-12 w-12 text-green-400" />
              <h3 className="text-xl font-semibold">Live Streaming</h3>
              <p className="text-gray-400">
                Stream music live while fans interact with your playlist.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <Headphones className="h-12 w-12 text-blue-400" />
              <h3 className="text-xl font-semibold">
                High Quality Audio
              </h3>
              <p className="text-gray-400">
                Deliver crystal clear sound and a premium listening experience.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Transform Your Streams?
          </h2>

          <p className="mx-auto max-w-[600px] mt-4 text-gray-400 md:text-lg">
            Join MusicStreamChoice today and create unforgettable streaming
            experiences with your fans.
          </p>

          <div className="mt-8">
            <Link
              href={{
                pathname: "/auth",
                query: { authType: "signUp" },
              }}
            >
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-5">
                Sign Up
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 px-4 md:px-6 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-xs text-gray-400">
          © 2026 MusicStreamChoice. All rights reserved.
        </p>

        <nav className="flex gap-6 sm:ml-auto">
          <Link
            href="#"
            className="text-xs text-gray-400 hover:text-white transition"
          >
            Terms of Service
          </Link>

          <Link
            href="#"
            className="text-xs text-gray-400 hover:text-white transition"
          >
            Privacy
          </Link>
        </nav>
      </footer>

    </div>
  );
}