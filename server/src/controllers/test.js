import Test from '../models/Test1.js'


export const getTest = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id)
    res.json(test)
  } catch (err) {
    next(err)
  }
}