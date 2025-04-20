"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { MAX_API_LIMITS } from "@/constants";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";
import axios from "axios";
import { usePromodal } from "@/hooks/use-pro-modal";
import { ProModal } from "@/components/modal/pro-modal";

interface FreeCounterProps {
  apiLimitCounts: number;
  isPro: boolean;
}

export const FreeCounter = ({
  apiLimitCounts = 0,
  isPro = false,
}: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  if (isPro) {
    return null;
  }
  const onSubscribe = async () => {
    try {
      const response = axios.get("/api/stripe");
      //Wait until open new url
      window.location.href = (await response).data.url;
    } catch (error) {
      console.error("Failed to STRIPE_CLIENT_ERROR:", error);
    }
  };

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
          {/* Todo-modal open */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full "
            variant="premium"
          >
            Upgrade to Pro
            <Zap className="w-4 h-4 fill-white" />
          </Button>
          <ProModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </CardContent>
      </Card>
    </div>
  );
};
