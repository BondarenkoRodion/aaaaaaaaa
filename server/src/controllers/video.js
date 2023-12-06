import { createError } from '../error.js'
import Video from '../models/Video.js'
import User from '../models/User.js'


export const addVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body })
    const saveVideo = await newVideo.save()
    res.json(saveVideo)
  } catch (err) {
    next(err)
  }
}


export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)

    if (!video) {
      return next(createError(404, 'Video not found...'))
    }

    if (req.user.id === video.userId) {
      Object.assign(video, req.body)
      const updatedVideo = await video.save()
      res.json(updatedVideo)
    } else {
      return next(createError(403, 'You can update only your video...'))
    }

  } catch (err) {
    next(err)
  }
}


export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)

    if (!video) {
      return next(createError(404, 'Video not found...'))
    }

    if (req.user.id === video.userId) {
      await Video.deleteOne({ _id: video._id })
      res.json('The video has been deleted!')
    } else {
      return next(createError(403, 'You can delete only your video...'))
    }
  } catch (err) {
    next(err)
  }
}


export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
    res.json(video)
  } catch (err) {
    next(err)
  }
}


export const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.find()
    res.json(videos)
  } catch (err) {
    next(err)
  }
}


export const getUserVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({ userId: req.user.id})
    res.json(videos)
  } catch (err) {
    next(err)
  }
}

export const getLikes = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
    res.json(video.likedUsers)
  } catch (err) {
    next(err)
  }
}

export const addLike = async (req, res, next) => {
  try {
    const video = await Video.findOne({ _id: req.params.id})
    let l = video.likedUsers.length
    video.likedUsers[l] = req.params.userid
    video.save() 
    res.json(video)
  } catch (err) {
    next(err)
  }
}

/////////////////////////////////////
export const removeLike = async (req, res, next) => {
  try {
    const video = await Video.findOne({ _id: req.params.id})
    let i = video.likedUsers.indexOf(req.params.userid)
    if (i != -1) {
      video.likedUsers.splice(i, 1);
    }
    video.save() 
    res.json(video)
  } catch (err) {
    next(err)
  }
}