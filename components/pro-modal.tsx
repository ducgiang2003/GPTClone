"use client";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { usePromodal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { useRoutesStore } from "@/hooks/use-routes-store";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const ProModal = () => {
  const tools = useRoutesStore((state) => state.routes);
  const proModal = usePromodal();

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="bg-gray-200 w-full  rounded-lg p-4">
        <DialogHeader>
          <DialogTitle
            className="flex justify-center items-center
          flex-col gap-y-4 pb-2"
          >
            <div className="font-bold flex items-center gap-x-2 py-1 ">
              Upgrade to Pro
              <Badge
                className=" uppercase text-sm py-2 rounded-2xl font-bold"
                variant={"premium"}
              >
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription asChild>
            <div
              className="text-center pt-2 
          space-y-2 font-medium text-zinc-900"
            >
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="p-3 items-center justify-between flex 
                border-black/10 flex-row"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md ", tool.color)}>
                      <tool.icon className={cn("w-6 h-6", tool.icon)} />
                    </div>
                    <div className="text-semibold text-sm font-bold">
                      {tool.label}
                    </div>
                  </div>
                  <Check className="text-primary w-6 h-6" />
                </Card>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
