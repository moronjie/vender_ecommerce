import { NextFunction, Request, Response } from 'express';
import { customError } from '../middleware/errorHandler';
import { User, validateUserSignUp } from '../model/user.model';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateUserSignUp(req.body);
    if (error) return next(customError(error.message, 400));

    const { name, email, password, confirmPassword } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return next(customError("user already exist", 409));

    if (password !== confirmPassword){
        return next(customError("passwords does not match", 400));
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      message: "user created successfully"
    });

  } catch (error: any) {
    next(customError(error.message, 500));
  }
};

export const signIn = async (req: Request, res: Response, next:NextFunction) => {
    try {
        
    } catch (error:any) {
        next(customError(error.message, 500))
        
    }
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error:any) {
        next(customError(error.message, 500))
        
    }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error:any) {
        next(customError(error.message, 500))
        
    }
}

