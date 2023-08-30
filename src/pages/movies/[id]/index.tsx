import { useRouter } from "next/router";
import MOVIES from "../../../movies.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import Modal from "@/components/Modal";

export default function Movie() {
  const router = useRouter();

  const [movie, setMovie] = useState<any>();
  const [toggleReview, setToggleReview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // const res:any =
    setIsLoading(false);
  };

  useEffect(() => {
    const id = router?.query?.id;
    if (typeof id === "string") {
      try {
        const parsedId = parseInt(id);
        setMovie(MOVIES[parsedId - 1]);
      } catch (error) {
        console.error("Failed to parse ID:", error);
      }
    }
  }, [router.query]);

  return (
    <main className="flex flex-col items-center align-center space-y-4">
      <Link href="/" className="text-blue-700 underline">
        Back
      </Link>
      <h2 className="my-8 text-xl font-bold">{movie?.name}</h2>
      <div>
        {movie?.image ? (
          <Image
            src={movie?.image}
            alt="movie image"
            height="200"
            width="200"
            className="rounded-md"
          />
        ) : (
          <div className="w-[200px] h-[300px] bg-gray-100 rounded-md"></div>
        )}
      </div>
      <Button
        text="Add Review"
        onClick={() => setToggleReview((prv) => !prv)}
      />
      <Modal open={toggleReview} onClose={() => setToggleReview(false)}>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="font-semibold">Review:</label>
            <br />
            <textarea
              required
              placeholder="Your review"
              className="outline-none w-full h-[200px] border border-gray-500 p-2 text-sm rounded focus:border-gray-900"
            />
            <div className="flex justify-end">
              <Button
                text="Analyze"
                onClick={() => null}
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </Modal>
    </main>
  );
}
