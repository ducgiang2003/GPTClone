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
import { Empty } from "@/components/layout/empty";
import { ProModal } from "@/components/modal/pro-modal";
import { Loader } from "@/components/shared/loading/loading-result";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { Video } from "lucide-react";

const VideoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [video, setVideo] = useState<string>();
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

      setVideo(undefined);

      const response = await axios.post("/api/video", values, {
        responseType: "blob",
      });

      // Tạo URL từ blob
      const videoUrl = URL.createObjectURL(response.data);

      console.log("videoUrl duoc tao la ", videoUrl);

      // Lưu URL vào localStorage
      localStorage.setItem("videoUrl", videoUrl);

      console.log("response", response);

      setVideo(videoUrl);
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        console.log("Hết giới hạn sử dụng API");
        //Todo-modal open
        setIsModalOpen(true);
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  useEffect(() => {
    const videoUrl = localStorage.getItem("videoUrl");
    if (videoUrl) {
      setVideo(videoUrl);
    }
  }, []);

  return (
    <div>
      <Heading
        title={"Video Generation"}
        description={"Generate video from text "}
        icon={Video}
        iconColor={"text-orange-600"}
        bgColor={"text-orange-600/10"}
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
                        placeholder={"UIA cats "}
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
          {!video && !isSubmitting && (
            <div>
              <Empty label="No music generated" />
            </div>
          )}
          <div className="flex flex-col gap-y-4">
            {video && (
              <video
                controls
                className="w-full mt-8 aspect-video rounded-lg border-black/10 "
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <ProModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};
export default VideoPage;
