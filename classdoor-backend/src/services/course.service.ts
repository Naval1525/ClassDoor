import {
    findAllCourses,
    findCourseById,
    createCourseRecord,
    updateCourseRecord,
    deleteCourseRecord,
  } from "../models/course.model.js";
  
  export const getAllCoursesService = async (params: {
    collegeId?: string;
    name?: string;
    code?: string;
    page: number;
    limit: number;
  }) => {
    return findAllCourses(params);
  };
  
  export const getCourseByIdService = async (id: string) => {
    return findCourseById(id);
  };
  
  export const createCourseService = async (body: {
    code: string;
    name: string;
    description?: string;
    collegeId: string;
    professorIds: string[];
  }) => {
    return createCourseRecord(body);
  };
  
  export const updateCourseService = async (
    id: string,
    body: {
      code?: string;
      name?: string;
      description?: string;
      collegeId?: string;
      professorIds?: string[];
    }
  ) => {
    return updateCourseRecord(id, body);
  };
  
  export const deleteCourseService = async (id: string) => {
    return deleteCourseRecord(id);
  };