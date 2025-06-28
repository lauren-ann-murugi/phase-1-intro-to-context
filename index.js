
// Creates an employee record from a single array
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}

// Converts an array of arrays into an array of employee records
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

// Adds a TimeIn event to an employee record
function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });
  return employee;
}

// Adds a TimeOut event to an employee record
function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return employee;
}

// Calculates hours worked on a given date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(e => e.date === date);
  const timeOut = employee.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculates wages earned on a given date
function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// Calculates total wages for all dates
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, event) => {
    return total + wagesEarnedOnDate(employee, event.date);
  }, 0);
}

// Finds an employee by first name from a given array of employee records
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(emp => emp.firstName === firstName);
}

// Calculates total payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, emp) => {
    return total + allWagesFor(emp);
  }, 0);
}
