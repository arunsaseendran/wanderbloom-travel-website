// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   console.log(req.headers.authorization)

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ success: false, message: "You are not authenticated" });
//   }

//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {   // ✅ fixed secret name
//     if (err) {
//       return res.status(403).json({ success: false, message: "Token is not valid" });
//     }
//     req.user = user;
//     next();
//   });
// };

// // export const verifyUser = (req, res, next) => {
// //   verifyToken(req, res, () => {
// //     if (req.user.id === req.params.id || req.user.role === "admin") {
// //       next();
// //     } else {
// //       return res.status(403).json({ success: false, message: "You are not authorized" });
// //     }
// //   });
// // };

// export const verifyUser = (req, res, next) => {
//  try{
//    const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"
//    console.log(token)
//    console.log(req.headers.authorization)

//   if (!token) {
//     return res.status(401).json({ success: false, message: "No token provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ success: false, message: "Token is not valid" });
//     }

//     // Attach user details to req.user
//     req.user = {
//       id: decoded.id,
//       email: decoded.email,
//       role: decoded.role || "user" // default role
//     };

//     next();
//  });}
  
//   catch(err){
//     console.log(err)

//   }
// };

// export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.role === "admin") {
//       next();
//     } else {
//       return res.status(403).json({ success: false, message: "You are not authorized" });
//     }
//   });
// };


import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Token is not valid" });
    }

    // Attach decoded payload to req.user
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "user",
    };

    next();
  });
};

// ✅ Reuse verifyToken here (no duplicated logic)
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // If you want to restrict by id or role, add checks here
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "You are not authorized" });
    }
  });
};
