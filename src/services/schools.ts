import api from "../api/axios";
import { toast } from "react-toastify";
import { logout } from "./auth.service";

export interface School {
  id: string;
  name: string;
  location: string;
  logo: string;
  schoolType: string;
  updatedAt: string;
  createdAt: string;
  websiteUrl: string;
  country: string;
  region: string;
  _count?: {
    courses: number;
  }
}

export const getSchools = async (token: string) => {
  try {
    const response = await api.get("/school/get/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as School[];
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




export const deleteSchools = async (schoolList: string[], token: string) => {
  try {
    const response = await api.delete("/bulk/bulk-delete-schools",{
      data: {"schoolIds": schoolList},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as School[];
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


export const deleteCourses = async (coursesList: string[], token: string) => {
  try {
    const response = await api.delete("/bulk/bulk-delete-courses",{
      data: {"courseIds": coursesList},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as School[];
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

export const getSchool = async (id: string) => {
  try {
    const response = await api.get(
      `/school/get/${id}`
    );

    return response.data

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
}

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

export const createCourse = async (form:FormData, token: string, id?: string) => {
  try {
    const response = !id
      ? await api.post("/school/add-course", form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
      : await api.patch(`/school/course/${id}`, form, {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
            Authorization: `Bearer ${token}`,
          },
        });
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


export const getCourses = async (token: string)=> {
  try {
    const response = await api.get(`/school/courses`, {
      headers : {
        "Authorization": `Bearer ${token}`
      }
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
}

export const getCoursesWithoutToken = async ()=> {
  try {
    const response = await api.get(`/school/courses`);

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
}


export const getCourseDetails = async (id:string) => {
  try {
    const response = await api.get(
      `/school/course/${id}`
    );

    return response.data

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
}

export const getSchoolsByLocation = async (country: string, state: string) => {
  try {
    const response:any = await api.get(`school/search/location?country=${country}&region=${state}`)
    console.log("response: ", response)
    if (response.status === 200) {
      return response.data
    }
  } catch(e) {
    toast.error("An unexpected error occurred");
    console.log("e: ", e)
    return []
  }
}

export const getDays = (date:string):string => {
const givenDate = new Date(date);
const currentDate = new Date();

const diffTime = givenDate.getHours()-currentDate.getHours() 
if(diffTime < 0) return '0'
if(diffTime > 24) {
  return Math.floor(diffTime/24)>1 ? `${Math.floor(diffTime/24)} days ago` : `${Math.floor(diffTime/24)} day`
}

return `${diffTime} hours ago`
// return daysDifference;
}

export const updateAdmissionLogic = async (payload:any , token: string, id:string) => {
  try {
    const response = await api.patch(`/admission-logic/course/${id}`, JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
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


export const getBulkHistory = async (token: string) => {
  try {
    const response = await api.get("/school/get/all/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    if (err.response.status === 400) {
      logout()
      window.location.href = '/admin/login'
    }
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

export const getAllAdmins = async (token: string) => {
  try {
    const response = await api.get("/super-admin/admin/profiles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err: any) {
    if (err.response.status === 400) {
      logout()
      window.location.href = '/admin/login'
    }
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
