import { useRouter } from "next/router";
import MOVIES from "../../../movies.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import Modal from "@/components/Modal";
import Head from "next/head";

export default function Movie() {
  const router = useRouter();

  const [movie, setMovie] = useState<any>();
  const [toggleReview, setToggleReview] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res: any = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ content: review }),
      });
      const resp = await res.json();
      const data = resp?.data;
      console.log({ data });
      setReview("");
      setReviews(
        handleSortReviews([
          ...reviews,
          {
            review: review,
            result: data?.sentiment,
            timestamp: new Date().toString(),
            upvotes: 0,
          },
        ])
      );
      setToggleReview(false);
    } catch (e: any) {
      console.log({ e });
    }
    setIsLoading(false);
  };

  const handleChangeVote = (e: any, index: number, i: number) => {
    e.stopPropagation();
    let updatedReviews = structuredClone(reviews);
    updatedReviews[index].upvotes = updatedReviews[index].upvotes + i;
    setReviews(handleSortReviews(updatedReviews));
  };

  const handleSortReviews = (reviews: any[]) => {
    return reviews.sort(function (a, b) {
      if (a.upvotes < b.upvotes) return 1;
      if (a.upvotes > b.upvotes) return -1;
      return 0;
    });
  };

  useEffect(() => {
    const id = router?.query?.id;
    if (typeof id === "string") {
      try {
        const parsedId = parseInt(id);
        setMovie(MOVIES[parsedId - 1]);
        setReviews(handleSortReviews(MOVIES[parsedId - 1]?.reviews));
      } catch (error) {
        console.error("Failed to parse ID:", error);
      }
    }
  }, [router.query]);

  return (
    <main className="flex flex-col items-center align-center space-y-4 py-4">
      <Head>
        <title>{movie?.name || "Movie"}</title>
      </Head>
      <Link href="/" className="text-blue-700 underline">
        Back
      </Link>
      {movie ? (
        <>
          <h2 className="my-8 text-xl font-bold">{movie?.name}</h2>
          <div>
            {movie?.image ? (
              <Image
                src={movie?.image}
                alt="movie image"
                height="200"
                width="200"
                className="rounded-md w-auto h-auto"
                priority
              />
            ) : (
              <div className="w-[200px] h-[300px] bg-gray-100 rounded-md"></div>
            )}
          </div>
          <Button
            text="Add Review"
            onClick={() => setToggleReview((prv) => !prv)}
          />
          <div className="space-y-2 flex flex-col justify-center items-center">
            <h3 className="font-semibold text-center">Reviews</h3>
            <div className="pb-10 space-y-1">
              {reviews?.map?.((review: any, index: number) => (
                <div
                  key={index}
                  className="w-[350px] md:w-[400px] flex space-x-4 justify-between items-center border border-gray-200 rounded p-4 cursor-pointer hover:shadow"
                >
                  <div className="space-y-2">
                    <p className="font-semibold line-clamp-2 break-words">
                      {review?.review}
                    </p>
                    <div className="text-xs">
                      <p
                        className={`text-sm font-semibold ${
                          review?.result === "Positive"
                            ? "text-green-600"
                            : review?.result === "Neutral"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {review?.result}
                      </p>
                      <p>{review?.timestamp?.substr(0, 25)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => handleChangeVote(e, index, -1)}
                      disabled={review?.upvotes === 0}
                    >
                      <svg
                        width="24px"
                        height="24px"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="#263238"
                        className="w-5 h-5 cursor-pointer"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="#263238"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <p>{review?.upvotes}</p>
                    <button onClick={(e) => handleChangeVote(e, index, 1)}>
                      <svg
                        width="24px"
                        height="24px"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="#263238"
                        className="w-5 h-5 cursor-pointer"
                      >
                        <path
                          d="M6 15l6-6 6 6"
                          stroke="#263238"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Modal open={toggleReview} onClose={() => setToggleReview(false)}>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="font-semibold">Review:</label>
                <br />
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
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
        </>
      ) : (
        <p>No movie found</p>
      )}
    </main>
  );
}
