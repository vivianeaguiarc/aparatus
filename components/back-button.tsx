"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-background shadow-md"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
  );
};
