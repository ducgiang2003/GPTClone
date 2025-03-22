"use client"
import * as z from "zod";
import Heading from "@/components/heading"
import {Baby} from "lucide-react";
import {Form, FormProvider, useForm} from "react-hook-form";
import formSchema from "@/app/(dashboard)/(routes)/conversation/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
const ConversationPage = () =>{
    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues: {
            prompts:""
        }
    });
    //IsLoading(default form)
    const isLoading = form.formState.isLoading;
    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        console.log("gia tri khi nhap la ",values)
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
                    <Form >
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className={"w-full border rounded-lg " +
                                "p-4 px-3 md:px-6 focus-within:shadow-sm " +
                                "grid grid-cols-12 gap-2"}
                           >
                            <FormField control = {form.control}
                                       name={"prompts"}
                                       render={({field}) =>(
                                <FormItem className={"col-span-12 lg:col-span-10"}>
                                <FormControl className={"m-0 p-0"}>
                                    <Input className={"border-0 outline-none " +
                                        // focus-visible make effect when type or not
                                        "focus-visible:ring-0 " +
                                        "focus-visible:ring-transparent"}
                                           disabled={isLoading}
                                           placeholder={"How can I help you ?"}
                                           {...field} />
                                </FormControl>
                                </FormItem>
                            )}>
                            </FormField>
                            <Button className={"col-span-12 lg:col-span-2 w-full"}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                    </FormProvider>
                </div>
                <div>
                    Message Content
                </div>
            </div>
        </div>
    )
}
export default ConversationPage;