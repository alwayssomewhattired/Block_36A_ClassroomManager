const router = require("express").Router();
const jwt = require("jsonwebtoken");

const {
  createNewInstructor,
  loginInstructor,
  getInstructor,
} = require("../db/controller");

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);
  if (!token) return next();
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const instructor = await getInstructor(id);
    req.instructor = instructor;
    next();
  } catch (error) {
    next(error);
  }
};

// Register a new instructor account
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const response = await createNewInstructor(username, password);
    console.log(response);
    // Create a token with the instructor id
    const token = jwt.sign({ id: instructor.id }, process.env.JWT);

    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

// Login to an existing instructor account
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const response = await loginInstructor(username, password);
    console.log(response);

    if (!response) {
      return res.status(401).send("Invalid login credentials.");
    }

    // Create a token with the instructor id
    const token = jwt.sign({ id: instructor.id }, process.env.JWT);

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in instructor
router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    res.status(200).send(req.instructor);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
