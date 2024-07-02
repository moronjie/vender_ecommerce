import {userInterface } from "./model/user.model"
import { Request, Response, NextFunction } from "express"

export interface AuthReq extends Request {
    user?: userInterface
}

