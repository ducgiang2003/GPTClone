import * as z  from 'zod';

export const formSchema = z.object({
    prompts : z.string().min(1, {
        message:"Image prompt is required",
    }),
    amount:z.string().min(1),
    resolution:z.string().min(1)
})
export const amountOptions = [
    {
        value:"1",
        label:"1 Photo"
    },
    {
        value:"2",
        label:"2 Photo"
    },
    {
        value:"3",
        label:"3 Photo"
    },
    {
        value:"4",
        label:"4 Photo"
    },
    {
        value:"5",
        label:"5 Photo"
    },
]
export const resolutionOptions = [
    {
        value:"256x256",
        label:"Image with 256px"
    },
    {
        value:"512x512",
        label:"Image with 512px"
    },
    {
        value:"1024x1024",
        label:"Image with 1024px"
    }
]