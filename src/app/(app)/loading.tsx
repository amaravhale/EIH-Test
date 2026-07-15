import { FunFactLoader } from "@/components/ui/fun-fact-loader";

export default function Loading() {
  return (
    <div className="flex-1 w-full h-full flex items-center justify-center">
      <FunFactLoader message="Loading Platform..." />
    </div>
  );
}
