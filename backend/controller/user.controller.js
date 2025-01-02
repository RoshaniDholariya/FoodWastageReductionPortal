const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client"); 
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { name, email, password, phone, address, userType } = req.body;

  if (!name || !email || !password || !phone || !address || !userType) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!["Ngo", "Donor"].includes(userType)) {
    return res.status(400).json({ error: "Invalid user type." });
  }
 
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Prisma Client:', prisma);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        userType,
      },
    });
    

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Email already exists." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = { registerUser, loginUser };
