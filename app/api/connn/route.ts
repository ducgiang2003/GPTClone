import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(){
  try{
    const response = await axios.get("http://backend:3001/api/v1/c");

    const conversations = response.data.conversations
    return NextResponse.json({ conversations });
  }catch(error){
    console.error("Error message in getConversation servicecc:", error);
   throw error;
  }

}
