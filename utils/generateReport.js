/* generate report object */
// {
//   id: 1,
//   name: 'A',
//   totalAverage: 70,
//   courses: [
//     { finalGrade: 90.1, id: '1', name: 'Biology', teacher: 'Mr. D' },
//     { finalGrade: 51.8, id: '2', name: 'History', teacher: ' Mrs. P' },
//     { finalGrade: 74.2, id: '3', name: 'Math', teacher: ' Mrs. C' }
//   ]
// };

const generateReport = (students, marks, courses, tests) => {
  const testCourseCount = Object.values(tests).reduce((map, test, i) => {
    map[test.course_id] = map[test.course_id] ? map[test.course_id] + 1 : 1;
    return map;
  }, {});

  return students
    .sort((a, b) => a - b)
    .map((student, i) => {
      const studentMarks = marks.filter((mark, i) => {
        return mark.student_id === student.id;
      });

      let studentsCourseTests = {};
      let courseTestWeight = {};
      let totalGrade = 0;

      const studentGrades = studentMarks.reduce((obj, mark, i) => {
        const { course_id, weight } = tests[mark.test_id];
        const grade = (mark.mark * weight) / 100;

        studentsCourseTests[course_id] = studentsCourseTests[course_id]
          ? studentsCourseTests[course_id] + 1
          : 1;

        courseTestWeight[course_id] = courseTestWeight[course_id]
          ? courseTestWeight[course_id] + Number(weight)
          : Number(weight);

        if (obj[course_id] === undefined) {
          obj[course_id] = grade;
        } else {
          obj[course_id] += grade;
        }
        totalGrade += grade;
        return obj;
      }, {});

      // Validation
      Object.keys(courseTestWeight).forEach(key => {
        if (courseTestWeight[key] !== 100) {
          if (studentsCourseTests[key] !== testCourseCount[key]) {
            throw new Error(
              `[studend_id:${student.id}, course_id:${key}] incomplete course!`
            );
          } else {
            throw new Error(`[course_id:${key}] weight is not equal to 100!`);
          }
        }
      });

      const studentCourseIds = Object.keys(studentsCourseTests).sort(
        (a, b) => a - b
      );
      student.averageGrade = totalGrade / studentCourseIds.length;

      student.courses = studentCourseIds.reduce((arr, courseId, i) => {
        const courseSummary = {
          finalGrade: studentGrades[courseId],
          ...courses[courseId]
        };
        arr.push(courseSummary);
        return arr;
      }, []);

      return student;
    });
};

module.exports = { generateReport };
