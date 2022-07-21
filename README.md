
npm i zustand

and create your desired store as example below:

```jsx
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
```

**Then use it anywhere as you wish(look at below example):**

```jsx
import React, { useState } from "react";
import useCourseStore from "../store/courseStore";

function CourseForm() {
  const addCourse = useCourseStore((state) => state.addCourse); //addCourse is a function that we can call to add a course from the store
  const [courseTitle, setCourseTitle] = useState("");
  console.log("CourseForm Rendered");

  const handleCourseSubmit = () => {
    if (!courseTitle) return alert("Please enter a course title");
    addCourse({
      id: Math.ceil(Math.random() * 1000),
      title: courseTitle,
    });
    setCourseTitle("");
    
  };

  return (
    <div className="form-container">
      <input
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        placeholder="Add Course"
        className="form-input"
      />
      <button onClick={handleCourseSubmit} className="form-submit-btn">
        Add Course
      </button>
    </div>
  );
}

export default CourseForm;
```

**and another component:**

```jsx
import React from "react";
import useCourseStore from "../store/courseStore";

function CourseList() {
  const { courses, removeCourse, editCourse, courseToggleStatus } =
    useCourseStore((state) => ({
      courses: state.courses,
      removeCourse: state.removeCourse,
      editCourse: state.editCourse,
      courseToggleStatus: state.courseToggleStatus,
    }));

  return (
    <>
      <ul>
        {courses.map((course, i) => {
          return (
            <React.Fragment key={i}>
              <li
                style={{
                  backgroundColor: course.completed ? "#00FF0044" : "white",
                }}
                className={"course-item"}
              >
                <span className="course-item-col-1">
                  <input
                    type="checkbox"
                    checked={course.completed}
                    onChange={() => courseToggleStatus(course.id)}
                  />
                </span>
                <span style={{color:"black"}} className="course-item-col-2">{course?.title}</span>
                <button
                  onClick={() => removeCourse(course)}
                  className="delete btn"
                >Delete</button>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
}

export default CourseList;
```
