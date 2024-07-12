import {Express} from "express"
import user from '../routes/user.route'
import vendor from '../routes/vendor.route'

export const routesFunctions = (app:Express) => {
    app.use('/api/users', user)
    app.use('/api/vendors', vendor)
}