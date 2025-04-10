"use client";
import * as z from "zod";
import Heading from "@/components/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { BookImage, Download } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePromodal } from "@/hooks/use-pro-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Card, CardFooter } from "@/components/ui/card";
import toast from "react-hot-toast";
interface ImageUrl {
  base64Images: string[];
  message: string;
}

const ImagePage = () => {
  const proModal = usePromodal();
  const [images, setImages] = useState<string[]>([]);
  //Khai báo state messages để lưu trữ các tin nhắn dưới dạng các object
  const [messages, setMessages] = useState<{ text: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompts: "",
      amount: "1",
      resolution: "256x256",
    },
  });
  //IsLoading(default form)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.clearErrors();
      setImages([]);
      setIsSubmitting(true);
      console.log("values", values);

      const response = await axios.post<ImageUrl>("/api/images", values);

      if (response.data && Array.isArray(response.data.base64Images)) {
        console.log("response message ", response.data.message);

        setMessages((prevMessages) => [
          ...prevMessages, // Giữ lại tin nhắn cũ
          { text: ` ${values.prompts}` },
          { text: ` ${response.data.message}` },
        ]);

        setImages(response.data.base64Images);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages, // Giữ lại tin nhắn cũ
          { text: ` ${values.prompts}` },
          {
            text: `: ${response.data.message}`,
          },
        ]);
      }

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
      form.reset();
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title={"Images"}
        description={"Generate images from text"}
        icon={BookImage}
        iconColor={"text-yellow-300"}
        bgColor={"text-yellow-300/10"}
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
                  <FormItem className={"col-span-12 lg:col-span-6"}>
                    <FormControl className={"m-0 p-0"}>
                      <Input
                        className={
                          "border-0 outline-none " +
                          // focus-visible make effect when type or not
                          "focus-visible:ring-0 " +
                          "focus-visible:ring-transparent"
                        }
                        disabled={isSubmitting}
                        placeholder={"How can I generate pictures to you ?"}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"amount"}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem value={option.value} key={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"resolution"}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem value={option.value} key={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className={"col-span-12 lg:col-span-2 px-2 w-full"}
                disabled={isSubmitting}
              >
                Generate
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="space-y-4 mt-4">
          {isSubmitting && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isSubmitting && !messages && (
            <div>
              <Empty label="No images generated" />
            </div>
          )}
          <div className="flex flex-col gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 w-full rounded-lg flex items-start gap-x-8 ",
                  index % 2 === 0
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {index % 2 === 0 ? <UserAvatar /> : <BotAvatar />}

                <p className="text-sm ">{message.text}</p>
              </div>
            ))}
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3 xl:grid-cols-4
           gap-4 mt-8 p-4  "
          >
            {images.map((base64Images, index) => (
              <Card key={index} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={`data:image/png;base64,${base64Images}`}
                    alt="Generated Image"
                    fill
                  />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() =>
                      window.open(`data:image/png;base64,${base64Images}`)
                    }
                    variant={"secondary"}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Nhấn vào đây để hiển thị rõ ảnh hơn
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImagePage;
