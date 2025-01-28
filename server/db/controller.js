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
};

// const getStudents = async ()

module.exports = { createNewInstructor, loginInstructor, getInstructor };
