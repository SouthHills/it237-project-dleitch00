import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {IEmployee} from "../shared/IEmployee.js";

const SALT_ROUNDS = 10;
const JWT_SECRET = 'your_jwt_secret_key';

export const hashPassword = async (password: string): Promise<string> =>
{
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> =>
{
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (employee: IEmployee): string =>
{
    const payload = {
        employeeID: employee.employeeID,
        employeeIsAdmin: employee.employeeIsAdmin,
        plantID: employee.plantID
    };
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '12h'});
};

export const verifyToken = (token: string): any =>
{
    try
    {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === 'string' || !('employeeID' in decoded))
        {
            throw new Error('Invalid token');
        }
        return decoded;
    }
    catch (error)
    {
        throw new Error('Invalid token');
    }

};

// block for redirecting users based on their authentication status
export const redirectNonAdmins = (req: any, res: any, next: any) =>
{
    const token = req.headers.authorization?.split(' ')[1];

    if (!token)
    {
        // If no token is provided, redirect to the login page
        console.warn('No token provided, redirecting to login page.');
        return res.status(401).json({redirectUrl: `/login`})
    }

    try
    {
        const decoded = verifyToken(token);
        const adminFlag = String(decoded.employeeIsAdmin ?? '').trim().toLowerCase();
        const isAdmin = adminFlag === 'y' || adminFlag === 'yes' || adminFlag === 'true' || adminFlag === '1';
        if (!isAdmin)
        {
            // If the user is not an admin, redirect to their plant page
            return res.status(403).json({redirectUrl: `/plants/${decoded.plantID}`})//.redirect(`http://localhost:4200/plants/${decoded.plantID}`);
        }
        // If the user is an admin, allow them to proceed to the requested page
        next();

    }
    catch (error)
    {
        // If the token is invalid, redirect to the login page
        return res.status(401).json({redirectUrl: `/login`})
    }
};