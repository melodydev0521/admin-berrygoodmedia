import jwt from 'jsonwebtoken';

const generateToken = (user: any) => {
    const token = jwt.sign(user, process.env.JWT_SECRET as string, {expiresIn: "5h"});
    return token;
}

export default generateToken;