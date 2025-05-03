import {
    findAllColleges,
    findCollegeById,
    createCollegeRecord,
    updateCollegeRecord,
    deleteCollegeRecord,
  } from "../models/college.model.js";
  
  export const getAllCollegesService = async (params: {
    name?: string;
    location?: string;
    page: number;
    limit: number;
  }) => {
    return findAllColleges(params);
  };
  
  export const getCollegeByIdService = async (id: string) => {
    return findCollegeById(id);
  };
  
  export const createCollegeService = async (body: {
    name: string;
    location: string;
    website?: string;
    logoUrl?: string;
    description?: string;
  }) => {
    return createCollegeRecord(body);
  };
  
  export const updateCollegeService = async (
    id: string,
    body: {
      name?: string;
      location?: string;
      website?: string;
      logoUrl?: string;
      description?: string;
    }
  ) => {
    return updateCollegeRecord(id, body);
  };
  
  export const deleteCollegeService = async (id: string) => {
    return deleteCollegeRecord(id);
  };