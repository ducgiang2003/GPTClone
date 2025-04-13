import * as z  from 'zod';

const formSchema = z.object({
    prompts : z.string().min(1, {
        message:"Prompt is required",
    }),
})
export default formSchema