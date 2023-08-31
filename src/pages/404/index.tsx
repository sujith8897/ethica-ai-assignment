import Button from "@/components/Button";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <h1 className="text-xl font-bold">404 Not Found</h1>
      <Button text="Go Back" onClick={() => router.push("/")} />
    </div>
  );
}
