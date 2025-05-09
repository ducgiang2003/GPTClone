import axios from "axios";

export async function sendMessage(userMessage:object,aiMessage:object, conversationId?: string){
    try{
        const response = await axios.post("http://backend:3001/api/v1/c/newConversation",{
            message:[
                userMessage,
                aiMessage,
            ],
            conversationId,
        })
        return response.data; 


    }catch(error){
        console.error("Error message in sendMessage service:", error);
        throw error;
    }

}