import JWT from "jsonwebtoken"; 

export const requireSignIn = async (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    // console.log(req.headers.Authorization)
      const decodedToken = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
      console.log(decodedToken)
      req.user = decodedToken; 
      next();
  } catch (error) {
      res.status(401).send({
          success: false,
          error,
          message: "Error in requireSignIn middleware",
          errorMessage: error.message
      });
  }
}

 