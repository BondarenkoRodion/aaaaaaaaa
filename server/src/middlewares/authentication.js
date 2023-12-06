/**
 * Middleware for authenticating users using JSON Web Tokens (JWT).
 */

import jwt from 'jsonwebtoken'
import { createError } from '../error.js'


/**
 * This function check verify token
 */
export const authentication = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return next(createError(401, 'You are not authenticated!'))
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, 'Token is not valid!'))
    }
    req.user = user
    next()
  })
}
