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
    const response = await api.post("/career/answers/server", data);

    console.log("response: response", response);

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
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

//This is the logic for my feedback modal, it will be used to send feedback to the backend
export const sendFeedback = async (data: {
  source: string;
  isClear: boolean;
  message: string;
}) => {
  try {
    const response = await api.post("/feedback", data);

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    throw err;
  }
};

// Runs the paid check for the logged in student. The server uses the account
// from the login token, so any email in the payload is dropped before sending.
export const checkEligibility = async (data: any) => {
  try {
    const payload = { ...(data ?? {}) };
    delete payload.email;
    const response = await api.post("/server/eligible/answers", payload);

    console.log("response: from API", response);

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    // if (err.response && err.response.data) {
    //   toast.error(err.response.data.error);
    // }

    // if (
    //   err.response &&
    //   err.response.data.message &&
    //   !err.response.data.errors
    // ) {
    //   toast.error(err.response.data.message);
    // }
    throw err;
  }
};

export const createAcademicRecords = async (data: any) => {
  try {
    const response = await api.post("/admission-logic/academic-records", data);

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
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

export const updateAcademicRecords = async (data: any, id: string) => {
  try {
    const response = await api.put(
      `/admission-logic/academic-records/${id}`,
      data,
    );

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
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

export const deleteAcademicRecords = async (id: string) => {
  try {
    const response = await api.delete(
      `/admission-logic/academic-records/${id}`,
    );

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
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

export const addDebitCard = async (data: any) => {
  try {
    const response = await api.post("/monthly/payment/add-direct-debit", data);

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
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

interface newProps {
  showToast?: boolean;
}

export const getAcademicRecords = async ({ showToast = false }: newProps) => {
  try {
    const response = await api.get("/admission-logic/academic-records");

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
      if (showToast) {
        toast.error(err.response.data.message);
      }
    }

    throw err;
  }
};

export const makePayment = async (data: any) => {
  try {
    let url =
      data.paymentPlan === "BASIC_ONETIME"
        ? "/monthly/payment/paystack/basic"
        : "/monthly/payment/paystack/subscription";
    const response = await api.post(url, data);

    console.log("response: response", response);

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
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

// For visitors: does this email already have an account? The answer is only
// { ok: true } or { ok: false }. No profile, payments or results are returned.
export const lookupAccount = async (email: string) => {
  try {
    const response = await api.post("/users/lookup", { email });
    return response.data as { ok: boolean; message: string };
  } catch (err: any) {
    const message = err?.response?.data?.message;
    if (message) toast.error(message);
    throw err;
  }
};

// The logged in student's own record (needs the login token).
export const getMe = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const deleteCard = async (authId: string, token: string) => {
  try {
    const response = await api.delete(`/monthly/payment/cards/${authId}`, {
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
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
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

export const getCourseRecommendation = async (data: any) => {
  try {
    console.log("data from util: ", data);
    let url = "/career/recommended-courses";
    const response = await api.post(url, data);

    console.log("response: response", response);

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
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

export const getCareerPath = async () => {
  try {
    const response = await api.get(`/career`);

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
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

// src/utils/access.ts
export const hasActiveAccess = (user: any): boolean => {
  if (!user?.payment_plan || !user?.payment_plan_expires_at) return false;
  return new Date(user.payment_plan_expires_at).getTime() > Date.now();
};

export const getSavedCards = async () => {
  try {
    const response = await api.get("/monthly/payment/cards");

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    throw err;
  }
};

export const removeSavedCard = async (authorization_code: string) => {
  try {
    const response = await api.delete(`/monthly/payment/cards/${authorization_code}`);

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    throw err;
  }
};

export const getUserActivity = async () => {
  try {
    const response = await api.get("/users/activity");

    if (response.data.status == 403) throw new ResponseError(response);
    if (response.data.status == 500) throw new ResponseError(response);
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
    throw err;
  }
};
