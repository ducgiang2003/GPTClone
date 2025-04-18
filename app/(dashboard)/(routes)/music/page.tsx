"use client";
import * as z from "zod";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import formSchema from "@/app/(dashboard)/(routes)/conversation/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import Heading from "@/components/layout/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useRouter } from "next/navigation";
import { useState } from "react";

import toast from "react-hot-toast";
import { Music } from "lucide-react";
import { usePromodal } from "@/hooks/use-pro-modal";

const MusicPage = () => {
  const proModal = usePromodal();
  const [music, setMusic] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompts: "",
    },
  });

  //IsLoading(default form)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.clearErrors();

      setIsSubmitting(true);

      setMusic(undefined);

      const response = await axios.post("/api/music", values, {
        responseType: "blob",
      });

      // Tạo URL từ blob
      const audioUrl = URL.createObjectURL(response.data);

      console.log("audioUrl", audioUrl);

      // Lưu URL vào localStorage
      localStorage.setItem("audioUrl", audioUrl);

      setMusic(audioUrl);
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        console.log("Hết giới hạn sử dụng API");
        //Todo-modal open
        proModal.onOpen();
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title={"Music"}
        description={"Generate music "}
        icon={Music}
        iconColor={"text-rose-600"}
        bgColor={"text-rose-600/10"}
      />
      <div className={"px-4 lg:px-8"}>
        <div>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)();
                }
              }}
              className={
                "w-full border rounded-lg " +
                "p-4 px-3 md:px-6 focus-within:shadow-sm " +
                "grid grid-cols-12 gap-2"
              }
            >
              <FormField
                control={form.control}
                name={"prompts"}
                render={({ field }) => (
                  <FormItem className={"col-span-12 lg:col-span-10"}>
                    <FormControl className={"m-0 p-0"}>
                      <Input
                        className={
                          "border-0 outline-none px-2 " +
                          // focus-visible make effect when type or not
                          "focus-visible:ring-0 " +
                          "focus-visible:ring-transparent"
                        }
                        disabled={isSubmitting}
                        placeholder={"Guitar heroes"}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button
                className={"col-span-12 lg:col-span-2 w-full"}
                disabled={isSubmitting}
              >
                Generate
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="space-y-4 mt-4">
          {isSubmitting && (
            <div
              className="p-8 rounded-lg w-full flex items-center
                        justify-center bg-muted"
            >
              <Loader />
            </div>
          )}
          {!music && !isSubmitting && (
            <div>
              <Empty label="No music generated" />
            </div>
          )}
          <div className="flex flex-col gap-y-4">
            {music && (
              <audio controls className="w-full mt-8 ">
                <source src={music} type="audio/wav" />
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MusicPage;
