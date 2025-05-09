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
import { Loader } from "@/components/shared/loading/loading-result";
import { UserAvatar } from "@/components/avatar/user-avatar";
import { BotAvatar } from "@/components/avatar/bot-avatar";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { ProModal } from "@/components/modal/pro-modal";
import { Baby } from "lucide-react";
import { FormattedText } from "@/components/helper/formated-text";
import { getCookie, setCookie } from "cookies-next";



interface GeminiMessage {
  parts: { text: string }[];
}
const ConversationPage = () => {
  const [messages, setMessages] = useState<GeminiMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [conversationId, setConversationId] = useState<string | null>(null); // State cho conversationId

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompts: "",
    },
  });

  //Scroll down if have have result
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages]);

  useEffect(() => {
    const storedConversationId = getCookie("conversationId");
    if (storedConversationId) {
      setConversationId(storedConversationId as string);
      console.log("Loaded conversationId from cookies:", storedConversationId);
    }
  }, [])

  
//Reset cookie when create new conversation
  const handleCreateNewConversation = () => {
    setMessages([]);
    setConversationId(null); // Reset conversationId
    setCookie("conversationId", "", { path: "/" }); // Clear the cookie
    console.log("New conversation started, conversationId cleared.");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.clearErrors();
      setIsSubmitting(true);
      //User messages from client
      const userMessage: GeminiMessage = {
        parts: [{ text: values.prompts }],
      };
      const newMessages = [...messages, userMessage];
      console.log("Current conversationId before sending:", conversationId); // Debug conversationId

      
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
        conversationId,
      });
      console.log("Received conversationId from API:", response.data.conversationId);

      //Message from Gemini
      const aiMessage: GeminiMessage = {
        parts: [{ text: response.data.messages }],
      };

      setMessages((current) => [...current, userMessage, aiMessage]);
      if (!conversationId && response.data.conversationId) {
        setCookie("conversationId", response.data.conversationId, {
          maxAge:7*24*60*60,
          path: "/",
        });
        setConversationId(response.data.conversationId);
        console.log("New conversationId set:", response.data.conversationId); // Debug new conversationId

      }
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
          <Button
                className={"col-span-12 lg:col-span-2 w-full"}
                disabled={isSubmitting}
                onClick={handleCreateNewConversation}
              >
               Create new conversation
              </Button>
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
          <div className="flex flex-col  gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 w-full rounded-lg flex items-start gap-x-8",
                  index % 2 === 0
                    ? "bg-muted border border-black/10"
                    : "bg-muted"
                )}
              >
                <div className="min-w-[40px] mt-1">
                  {index % 2 === 0 ? <UserAvatar /> : <BotAvatar />}
                </div>

                <div className="flex-1 overflow-hidden">
                  <FormattedText content={message.parts[0].text} />
                </div>
              </div>
            ))}
            <ProModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <div ref={messageRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConversationPage;

