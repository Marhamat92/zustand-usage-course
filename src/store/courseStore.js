import create from 'zustand'
import {devtools,persist} from 'zustand/middleware'

const courseStore =(set) => ({
    courses:[],
    addCourse: (course) => {
        set((state) => ({
            courses: [...state.courses, course]
        }))
    },
    removeCourse: (course) => {
        set((state) => ({
            courses: state.courses.filter(c => c.id !== course.id)
        }))
    },
    editCourse: (course) => {
        set((state) => ({
            courses: state.courses.map(c => c.id === course.id ? course : c)
        }))
    },
    courseToggleStatus: (courseId) => {
        set((state) => ({
            courses: state.courses.map(c => c.id === courseId ? {...c, status: !c.status} : c)
        }))
    }

})

//we do below lines to get our store into local storage
const  useCourseStore = create(
    devtools(persist(courseStore,{
        name: 'courses',
    }))
)

 
export default useCourseStore
