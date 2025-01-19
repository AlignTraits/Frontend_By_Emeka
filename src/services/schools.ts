import api from "../api/axios";
import { toast } from "react-toastify";

export interface School {
  id: number;
  name: string;
  location: string;
  logo: string;
  schoolType: string;
  updatedAt: string;
  createdAt: string;
  _count?: {
    courses: number;
  }
}

export const getSchools = async (token: string) => {
  try {
    const schools = localStorage.getItem('schools')
    if(schools) return JSON.parse(schools)

    const response = await api.get("/school/get/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as School[];
  } catch (err: any) {
        if (err.response && err.response.data && err.response.data.errors) {
          console.log(err)
          const errors = err.response.data.errors;
          console.log(errors);
  
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

    console.log(response)
    return response.data

  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      console.log(err);
      const errors = err.response.data.errors;
      console.log(errors);

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

export const createCourse = async (form:FormData, token: string) => {
  try {
    const response = await api.post("/school/add-course", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
    });
    if(response.data.status == 403) throw new Error(response)
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      console.log(err)
      const errors = err.response.data.errors;
      console.log(errors);

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

export const getDays = (date:string):string => {
const givenDate = new Date(date);
const currentDate = new Date();

const diffTime = givenDate.getHours()-currentDate.getHours() 
if(diffTime < 0) return '0'
if(diffTime > 24) {
  return Math.floor(diffTime/24)>1 ? `${Math.floor(diffTime/24)} days ago` : `${Math.floor(diffTime/24)} day`
}

console.log(diffTime)
return `${diffTime} hours ago`
// return daysDifference;
}