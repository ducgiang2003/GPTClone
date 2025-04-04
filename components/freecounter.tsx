import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_API_LIMITS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps {
  apiLimitCounts: number;
}

export const FreeCounter = ({ apiLimitCounts = 0 }: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-gray-800 border-0">
        <CardContent className="py-6">
          <div
            className=" text-center mb-4 text-white font-bold
          text-sm space-y-2 "
          >
            <p>
              {apiLimitCounts} / {MAX_API_LIMITS} Free Counters
            </p>
            <Progress
              className="h-3 rounded-md"
              value={(apiLimitCounts / MAX_API_LIMITS) * 100}
            />
          </div>
          <Button className="w-full " variant="premium">
            Upgrade to Pro
            <Zap className="w-4 h-4 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
