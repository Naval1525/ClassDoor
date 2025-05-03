import { prisma } from '@/config/db.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { handleControllerError } from '@/middleware/error.middleware.js';
import { Request, Response } from 'express';


export const createAnonymousSession = async (req: Request, res:Response) => {
    try{
        const id = uuidv4()
        const anonId = id;
        const user = await prisma.anonymousUser.create({
            data:{id:anonId}
        });
        const token = jwt.sign(
            { anonId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '30d' }
          );

          res.cookie('anonToken', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });

          res.status(201).json({ anonId: user.id, token });
        } catch (error) {
          handleControllerError(error, res);
        }

    }