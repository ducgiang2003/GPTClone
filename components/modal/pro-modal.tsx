"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRoutesStore } from "@/hooks/use-routes-store";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import axios from "axios";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProModal = ({ isOpen, onClose }: ProModalProps) => {
  const tools = useRoutesStore((state) => state.routes);
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Failed to STRIPE_CLIENT_ERROR:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-200 w-full rounded-lg p-4">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="font-bold flex items-center gap-x-2 py-1">
              Upgrade to Pro
              <Badge className="uppercase text-sm py-2 rounded-2xl font-bold" variant={"premium"}>
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="text-center pt-2 space-y-2 font-medium text-zinc-900">
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="p-3 items-center justify-between flex border-black/10 flex-row"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.color)}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <div className="text-semibold text-sm font-bold">{tool.label}</div>
                  </div>
                  <Check className="text-primary w-6 h-6" />
                </Card>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            className="font-bold w-full"
            variant={"premium"}
            size="lg"
          >
            Upgrade to get unlimited counts
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
