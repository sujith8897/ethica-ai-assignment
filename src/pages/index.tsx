import Image from "next/image";
import MOVIES from "../movies.json";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <main className="flex flex-col items-center align-center space-y-6">
      <Head>
        <title>Movie Review Analyzer</title>
      </Head>
      <h1 className="my-8 text-2xl md:text-3xl font-bold">
        Movie Review Analyzer 🎬
      </h1>
      <h2 className="text-xl font-bold">Movies</h2>
      <div className="flex flex-col md:flex-row flex-wrap md:space-x-6 space-y-6 md:space-y-0">
        {MOVIES?.map?.((movie: any, index: number) => (
          <div
            key={index}
            className="cursor-pointer transition-all duration-500 hover:scale-105"
          >
            <Link href={`/movies/${movie?.id}`}>
              <Image
                src={movie?.image}
                alt="movie image"
                height="200"
                width="200"
                className="rounded-md"
              />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
