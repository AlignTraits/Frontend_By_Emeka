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
    const response = await api.post("/career/answers/server", data)

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

export const checkEligibility = async (data: any) => {
  try {
    const response = await api.post("/server/eligible/answers", data)

    console.log("response: from API", response) 

    if(response.data.status == 403) throw new ResponseError(response)
    if(response.data.status == 500) throw new ResponseError(response)  
    return response.data;
  } catch (err: any) {
    throw err;
  }
}

export const createAcademicRecords = async (data: any) => {
  try {
    const response = await api.post("/admission-logic/academic-records", data)

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

export const updateAcademicRecords = async (data: any, id: string) => {
  try {
    const response = await api.put(`/admission-logic/academic-records/${id}`, data)

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

export const deleteAcademicRecords = async (id: string) => {
  try {
    const response = await api.delete(`/admission-logic/academic-records/${id}`)

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

export const addDebitCard = async (data: any) => {
  try {
    const response = await api.post("/monthly/payment/add-direct-debit", data)

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

export const getAcademicRecords = async () => {
  try {
    const response = await api.get("/admission-logic/academic-records")

    if(response.data.status == 403) throw new ResponseError(response)
    if(response.data.status == 500) throw new ResponseError(response)  
    return response.data;
  } catch (err: any) {
    // if (err.response && err.response.data && err.response.data.errors) {
      
    //   const errors = err.response.data.errors;

    //   errors.forEach((error: { message: string }) => {
    //     if (error.message) {
    //       toast.error(error.message);
    //     }
    //   });
    // }


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

export const makePayment = async (data: any) => {
  try {
    let url = data.paymentPlan === 'BASIC_ONETIME' ? '/monthly/payment/paystack/basic' : '/monthly/payment/paystack/subscription'
    const response = await api.post(url, data);

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

export const getUser = async (email: string) => {
  try {
    const response = await api.get(`/users/email/${email}`)

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

export const deleteCard = async (authId: string, token: string) => {
  try {
    const response = await api.delete(`/monthly/payment/cards/${authId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
};



