import User from "../../models/user.model.js";



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate request body
    if([email, password].some(field => field.trim() === "")) {
      return res.status(400).json({ 
            success: false,
            message: "Email and password are required",
            data: {}
        })
    }

    // find user by email
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(404).json({ 
            success: false,
            message: "User not found",
            data: {}
        })
    }

    // check user role
    if(user.role !== "admin") {
      return res.status(403).json({ 
            success: false,
            message: "Access denied. Only admins are allowed to login here",
            data: {}
        })
    }

    // check if password is correct
    const isPasswordMatched = await user.isPasswordMatched(password);
    if(!isPasswordMatched) {
      return res.status(401).json({ 
            success: false,
            message: "Invalid credentials",
            data: {}
        })
    }

    // generate access token
    const accessToken = user.generateAccessToken();

    return res.status(200).json({ 
        success: true,
        message: "Login successful",
        data: { accessToken }
    });

  } catch (error) {
    return res.status(500).json({ 
        success: false,
        message: error.message || "something went wrong while logging in user",
        data: {}
    });
  }
};

export { login };
