"use client";
import * as z from "zod";
import Heading from "@/components/heading";
import { Baby } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import formSchema from "@/app/(dashboard)/(routes)/conversation/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

interface GeminiMessage {
  parts: { text: string }[];
}
const ConversationPage = () => {
  const [messages, setMessages] = useState<GeminiMessage[]>([]);
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
      //User messages from client
      const userMessage: GeminiMessage = {
        parts: [{ text: values.prompts }],
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      const aiMessage: GeminiMessage = {
        parts: [{ text: response.data.messages }],
      };

      setMessages((current) => [...current, userMessage, aiMessage]);

      form.reset();
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        "code" in error
      ) {
        const customError = error as MyCustomError;
        return console.error(`Error: ${customError.message}`, {
          status: customError.code,
        });
      } else {
        return console.error("Error: Unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title={"Conversation"}
        description={"Answer mostly exact your question"}
        icon={Baby}
        iconColor={"text-green-400"}
        bgColor={"text-green-400/10"}
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
                          "border-0 outline-none " +
                          // focus-visible make effect when type or not
                          "focus-visible:ring-0 " +
                          "focus-visible:ring-transparent"
                        }
                        disabled={isSubmitting}
                        placeholder={"How can I help you ?"}
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
          {messages.length === 0 && !isSubmitting && (
            <div>
              <Empty label="No conversation started" />
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

                <p className="text-sm ">{message.parts[0].text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConversationPage;
