import {Express} from "express"
import user from '../routes/user.route'
import vendor from '../routes/vendor.route'
import product from '../routes/product.route'
import brand from '../routes/brand.route'
// import category from '../routes/category.route'
// import wishlist from '../routes/wishlist.route'

export const routesFunctions = (app:Express) => {
    app.use('/api/users', user)
    app.use('/api/vendors', vendor)
    app.use('/api/product', product)
    // app.use('/api/wishlist', wishlist)
    app.use('/api/brand', brand)
    // app.use('/api/category', category)
}