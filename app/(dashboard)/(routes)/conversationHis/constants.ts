import * as z  from 'zod';

const formSchema = z.object({
    prompts : z.string().min(1, {
        message:"No Promts",
    }),
})
export default formSchema