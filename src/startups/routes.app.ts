import {Express} from "express"
import user from '../routes/user.route'

export const routesFunctions = (app:Express) => {
    app.use('/api/users', user)
}