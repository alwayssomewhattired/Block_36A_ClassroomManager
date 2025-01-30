const { prisma } = require("../common");

const createNewInstructor = async (username, password) => {
  const response = await prisma.instructor.create({
    data: {
      username,
      password,
    },
  });
  console.log(response);
  return response;
};

const loginInstructor = async (username, password) => {
  const response = await prisma.instructor.findFirstOrThrow({
    where: {
      username,
      password,
    },
  });
  console.log(response);
  return response;
};

const getInstructor = async (id) => {
  const response = await prisma.instructor.findFirstOrThrow({
    where: {
      id,
    },
  });
  return response;
};

const getStudents = async (instructorID) => {
  const response = await prisma.student.findMany({
    where: {
      instructorID,
    },
  });
  return response;
};

const getSingleStudent = async (id, instructorID) => {
  const response = await prisma.student.findFirstOrThrow({
    where: {
      id,
      instructorID,
    },
  });
  return response;
};

const createStudent = async (name, cohort, instructorID) => {
  const response = await prisma.student.create({
    data: {
      name,
      cohort,
      instructorID,
    },
  });
  return response;
};

const updateStudent = async (name, cohort, id, instructorID) => {
  const response = await prisma.student.update({
    where: {
      id,
      instructorID,
    },
    data: {
      name,
      cohort,
    },
  });
  return response;
};

const deleteStudent = async (id, instructorID) => {
  const response = await prisma.student.delete({
    where: {
      id,
      instructorID,
    },
  });
  return response;
};

module.exports = {
  createNewInstructor,
  loginInstructor,
  getInstructor,
  getStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
