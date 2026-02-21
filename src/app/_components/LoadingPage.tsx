import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <LoadingSpinner className="text-primary h-8 w-8" />
    </div>
  );
}
