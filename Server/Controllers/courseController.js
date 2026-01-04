import uploadOnCloudinary from "../Config/cloudinary.js";
import Course from "../Models/CourseModel.js";
import Lecture from "../Models/LectureModel.js";
import User from "../Models/UserModel.js";


// For Courses

export const createCourse = async (req, res) => {
    try {
        const { title, category } = req.body;
        if(!title || !category) {
            return res.status(400).json({
                message: 'Title and Category are required!'
            });
        }

        const course = await Course.create({
            title, 
            category,
            creator: req.userId
        });

        return res.status(201).json(course);

    } catch (error) {
        return res.status(500).json({
            message: `Create-Course Error: ${error}`
        });
    }
};


export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({isPublished: true}).populate('lectures reviews');
        if(!courses) {
            return res.status(500).json({
                message: 'Courses not found!'
            });
        }

        return res.status(201).json(courses);

    } catch (error) {
        return res.status(500).json({
            message: `Get-Published-Courses Error: ${error}`
        });
    }
};


export const getCreatorCoures = async (req, res) => {
    try {
        const userId = req.userId;
        const courses = await Course.find({creator: userId});
        if(!courses) {
            return res.status(400).json({
                message: 'Courses not found!'
            });
        }

        return res.status(201).json(courses);

    } catch (error) {
        return res.status(500).json({
            message: `Get-Creator-Courses Error: ${error}`
        });
    }
};


export const editCourse = async (req, res) => {
    try {
        const {courseId} = req.params;
        const { title, description, category, subTitle, level, price, isPublished } = req.body;
        let thumbnail;
        if(req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path)
        }

        let course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                message: 'Course not found!'
            });
        }

        const updatedData = { title, description, category, subTitle, level, price, isPublished, thumbnail };

        course = await Course.findByIdAndUpdate(courseId, updatedData, {new: true});

        return res.status(200).json(course);
        
    } catch (error) {
        return res.status(500).json({
            message: `Edit-Course Error: ${error}`
        });
    }
};


export const getCourseById = async (req, res) => {
    try {
        const {courseId} = req.params;

        let course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                message: 'Course not found!'
            });
        }

        return res.status(200).json(course);

    } catch (error) {
        return res.status(500).json({
            message: `Get-Course-By-Id Error: ${error}`
        });
    }
};


export const removeCourse = async (req, res) => {
    try {
        const {courseId} = req.params;
        let course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                message: 'Course not found!'
            });
        }

        course = await Course.findByIdAndDelete(courseId, {new: true});

        return res.status(200).json({
            message: 'Course Removed Successfully!'
        });

    } catch (error) {
        return res.status(500).json({
            message: `Remove-Course Error: ${error}`
        });
    }
};



// For  Lectures
export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;
        if(!lectureTitle || !courseId) {
            return res.status(400).json({
                message: 'Lecture Title are required!'
            });
        }

        const lecture = await Lecture.create({
            lectureTitle
        });


        const course = await Course.findById(courseId);
        if(course) {
            course.lectures.push(lecture?._id);
        }
        await course.populate('lectures');
        await course.save();

        return res.status(201).json({
            lecture,
            course
        });

    } catch (error) {
        return res.status(500).json({
            message: `Create-Lecture Error: ${error}`
        });
    }
};


export const getCourseLecture = async (req, res) => {
    try {
        const {courseId} = req.params;
        let course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                message: 'Course not found!'
            });
        }
        await course.populate('lectures');
        await course.save();

        return res.status(200).json(course);

    } catch (error) {
        return res.status(500).json({
            message: `Get-Course-Lecture Error: ${error}`
        });
    }
};


export const editLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const { lectureTitle, isPreviewFree } = req.body;
        let lecture = await Lecture.findById(lectureId);
        if(!lecture) {
            return res.status(404).json({
                message: 'Lecture not found!'
            });
        }

        let videoUrl;
        if(req.file) {
            videoUrl = await uploadOnCloudinary(req.file.path);
            lecture.videoUrl = videoUrl
        }
        if(lectureTitle) {
            lecture.lectureTitle = lectureTitle;
        }
        lecture.isPreviewFree = isPreviewFree;

        await lecture.save();

        return res.status(200).json(lecture);

    } catch (error) {
        return res.status(500).json({
            message: `Edit-Lecture Error: ${error}`
        });
    }
};


export const checkEnrollment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.userId;

        if (!courseId) {
            return res.status(400).json({
                message: 'Course ID is required!'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        // Check if user is enrolled in the course
        const isEnrolled = user.enrolledCourses.some(course => 
            course.toString() === courseId.toString()
        );

        return res.status(200).json({
            isEnrolled,
            courseId
        });

    } catch (error) {
        return res.status(500).json({
            message: `Check-Enrollment Error: ${error.message}`
        });
    }
};

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if(!lecture) {
            return res.status(404).json({
                message: 'Lecture not found!'
            });
        }

        await Course.updateOne(
            {lectures: lectureId},
            {$pull: {lectures: lectureId}}
        );

        return res.status(200).json({
            message: 'Lecture Removed!'
        });

    } catch (error) {
        return res.status(500).json({
            message: `Remove-Lecture Error: ${error}`
        });
    }
};


// For Get-Creator
export const getCreatorById = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId).select('-password');
        if(!user) {
            return res.status(404).json({
                message: 'Creator not found!'
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            message: `Get-Creator Error: ${error}`
        });
    }
};