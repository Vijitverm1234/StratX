import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorised, login again' }); 
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.status(401).json({ success: false, msg: "Not authorized" }); 
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, msg: error.message }); // ✅ Added return
    }
};

export default userAuth;
