import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export default function AuthServices(){

    return{
        async login(email, password){
            const user = await prisma.user.findUnique({
                where: {
                    email: email 
                }
            });

            if(!email || !password) {
                throw new Error('Email and password are required');
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            const token = jwt.sign({ id: user.id, email: user.email,role:user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });

            return { message: 'Login successful', token };
        },

        async register(name, email, password){
            if(!name || !email || !password) {
                throw new Error('Name, email and password are required');
            }

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            if (existingUser) {
                throw new Error('Email already in use');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: "VIEWER"
                }
            });
             return { message: 'Registration successful',user: { id: user.id, name: user.name, email: user.email } };    
        }

    }

}

