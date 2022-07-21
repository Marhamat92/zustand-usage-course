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
