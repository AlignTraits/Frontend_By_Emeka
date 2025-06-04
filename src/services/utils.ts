import api from "../api/axios";
import { toast } from "react-toastify";

interface ErrorResponse {
  status: number;
  message: string;
  errors: { message: string }[];
}

class ResponseError extends Error {
  response: { data: ErrorResponse };
  constructor(response: { data: ErrorResponse }) {
    super(`Request failed with status ${response.data.status}`);
    this.response = response; // Attach the full response object for debugging
  }
}

export const sendCareerPath = async (data: any) => {
  try {
    const response = await api.post("/career/answers", data)

    console.log("response: response", response) 

    if(response.data.status == 403) throw new ResponseError(response)
    if(response.data.status == 500) throw new ResponseError(response)  
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      
      const errors = err.response.data.errors;

      errors.forEach((error: { message: string }) => {
        if (error.message) {
          toast.error(error.message);
        }
      });
    }
    if(err.response && err.response.data) {

      toast.error(err.response.data.error)
    }

    if (
      err.response &&
      err.response.data.message &&
      !err.response.data.errors
    ) {
      toast.error(err.response.data.message);
    }

    throw err;
  }
}


