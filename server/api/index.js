// An instructor can only access their own students' data.
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const {
  getInstructor,
  getStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../db/controller");

// Deny access if user is not logged in
// router.use((req, res, next) => {
//   if (!req.user) {
//     return res.status(401).send("You must be logged in to do that.");
//   }
//   next();
// });

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);
  if (!token) return next();
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const instructor = await getInstructor(id);
    console.log(instructor);
    req.instructor = instructor;
    next();
  } catch (error) {
    next(error);
  }
};

// Get all students
router.get("/students", isLoggedIn, async (req, res, next) => {
  try {
    if (req.instructor == undefined) {
      res.status(401).send("No instructor logged in.");
    } else {
      const { instructorID } = req.body;
      const students = await getStudents(instructorID);
      console.log(students);
      res.send(students);
    }
  } catch (error) {
    next(error);
  }
});

// Get a student by id
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    if (req.instructor == undefined) {
      res.status(401).send("No instructor logged in.");
    } else {
      const { id } = req.params;
      const { instructorID } = req.body;
      const student = await getSingleStudent(id, instructorID);
      console.log(student);
      if (!student) {
        return res.status(404).send("Student not found.");
      }
      res.send(student);
    }
  } catch (error) {
    next(error);
  }
});

// Create a new student
router.post("/student", isLoggedIn, async (req, res, next) => {
  try {
    if (req.instructor == undefined) {
      res.status(401).send("No instructor logged in.");
    } else {
      const { name, cohort, instructorID } = req.body;
      const student = await createStudent(name, cohort, instructorID);
      console.log(student);
      res.status(201).send(student);
    }
  } catch (error) {
    next(error);
  }
});

// Update a student
router.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    if (req.instructor == undefined) {
      res.status(401).send("No instructor logged in.");
    } else {
      const { id } = req.params;
      const { name, cohort, instructorID } = req.body;
      const student = await updateStudent(name, cohort, id, instructorID);
      console.log(student);
      if (!student) {
        return res.status(404).send("Student not found.");
      }

      res.send(student);
    }
  } catch (error) {
    next(error);
  }
});

// Delete a student by id
router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    if (req.instructor == undefined) {
      res.status(401).send("No instructor logged in");
    } else {
      const { id } = req.params;
      const { instructorID } = req.body;
      const student = await deleteStudent(id, instructorID);

      if (!student) {
        return res.status(404).send("Student not found.");
      }

      res.send(student);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
