import express from 'express';
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorById, getCreatorCoures, getPublishedCourses, removeCourse, removeLecture, checkEnrollment } from '../Controllers/courseController.js';
import isAuth from '../Middlewares/isAuth.js';
import upload from '../Middlewares/multer.js';
import { searchWithAI } from '../Controllers/searchController.js';


const courseRouter = express.Router();

// For Course
courseRouter.post('/create-course', isAuth, createCourse);
courseRouter.get('/get-published-courses', getPublishedCourses);
courseRouter.get('/get-creator-courses', isAuth, getCreatorCoures);
courseRouter.post('/edit-course/:courseId', isAuth, upload.single('thumbnail'), editCourse);
courseRouter.get('/get-course/:courseId', isAuth, getCourseById);
courseRouter.delete('/remove-course/:courseId', isAuth, removeCourse);


// For Lecture
courseRouter.post('/create-lecture/:courseId', isAuth, createLecture);
courseRouter.get('/course-lecture/:courseId', isAuth, getCourseLecture);
courseRouter.post('/edit-lecture/:lectureId', isAuth, upload.single('videoUrl'), editLecture);
courseRouter.delete('/remove-lecture/:lectureId', isAuth, removeLecture);


// For Enrollment
courseRouter.post('/check-enrollment', isAuth, checkEnrollment);

// For Get-Creator
courseRouter.post('/get-creator', isAuth, getCreatorById);

// For Search
courseRouter.post('/search', searchWithAI);


export default courseRouter;