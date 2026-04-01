import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    
    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Remove Bearer prefix if present
    if (token.startsWith("Bearer ")) {
        token = token.slice(7); // Remove "Bearer " (7 characters)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}

export default protect;