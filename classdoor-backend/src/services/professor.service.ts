import {
    findAllProfessors,
    findProfessorById,
    createProfessorRecord,
    updateProfessorRecord,
    deleteProfessorRecord,
  } from "../models/professor.model.js";
  
  export const getAllProfessorsService = async () => {
    return findAllProfessors();
  };
  
  export const getProfessorByIdService = async (id: string) => {
    return findProfessorById(id);
  };
  
  export const createProfessorService = async (body: {
    name: string;
    department: string;
    bio: string;
    imageUrl: string;
    collegeId: string;
  }) => {
    return createProfessorRecord(body);
  };
  
  export const updateProfessorService = async (
    id: string,
    body: {
      name: string;
      department: string;
      bio: string;
      imageUrl: string;
      collegeId: string;
    }
  ) => {
    return updateProfessorRecord(id, body);
  };
  
  export const deleteProfessorService = async (id: string) => {
    return deleteProfessorRecord(id);
  };
  