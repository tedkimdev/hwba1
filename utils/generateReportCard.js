const roundFix = precision => {
  let digits = 1;

  while (precision > 0) {
    digits *= 10;
    precision--;
  }

  return original => Math.round(original * digits) / digits;
};

const roundFixTwo = roundFix(2);

const generateReportCard = report => {
  const { id, name, averageGrade, courses } = report;
  let card = `
Student Id: ${id}, name: ${name}
Total Average:      ${roundFixTwo(averageGrade).toFixed(2)}%
  `;

  courses.forEach(course => {
    card += `
    Course: ${course.name}, Teacher: ${course.teacher}
    Final Grade:      ${roundFixTwo(course.finalGrade).toFixed(2)}%
    `;
  });

  return card;
};

module.exports = {
  generateReportCard
};
