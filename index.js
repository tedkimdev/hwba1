const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const { convertCsvToObj, convertArrayToObjWithId } = require('./utils/convert');
const { generateReport } = require('./utils/generateReport');
const { generateReportCard } = require('./utils/generateReportCard');

const studentsCsv = fs.readFileSync('./csv/students.csv');
const marksCsv = fs.readFileSync('./csv/marks.csv');
const coursesCsv = fs.readFileSync('./csv/courses.csv');
const testCsv = fs.readFileSync('./csv/tests.csv');

const studentRecords = parse(studentsCsv.toString('utf-8'));
const markRecords = parse(marksCsv.toString('utf-8'));
const courseRecords = parse(coursesCsv.toString('utf-8'));
const testRecords = parse(testCsv.toString('utf-8'));

const students = convertCsvToObj(studentRecords);
const marks = convertCsvToObj(markRecords);
const courses = convertArrayToObjWithId(convertCsvToObj(courseRecords));
const tests = convertArrayToObjWithId(convertCsvToObj(testRecords));

// console.log(courses);
// console.log(marks);
// console.log(students);
// console.log(tests);

const reports = generateReport(students, marks, courses, tests);

// reports.forEach(item => {
//   console.debug(item);
//   // console.debug(generateReportCard(item));
// });

const reportsString = reports
  .map(report => generateReportCard(report))
  .join('\n\n')
  .trim();

fs.writeFile('output.txt', reportsString, err => {
  if (err) throw err;
  console.log('The file has been saved!');
});
