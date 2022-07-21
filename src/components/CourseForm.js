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
