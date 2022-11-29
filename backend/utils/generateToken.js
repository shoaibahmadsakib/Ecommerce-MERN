import jwt from "jsonwebtoken"

const generateToken = (id) => {

    return jwt.sign({ id }, process.env.GENERATE_TOKEN, { expiresIn: '1h' });
}

export default generateToken