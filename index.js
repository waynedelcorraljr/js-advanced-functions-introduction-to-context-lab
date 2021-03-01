function createEmployeeRecord(recordArray) {
   let employee = {};
   employee.firstName = recordArray[0];
   employee.familyName = recordArray[1];
   employee.title = recordArray[2];
   employee.payPerHour = recordArray[3];
   employee.timeInEvents = [];
   employee.timeOutEvents = [];
   return employee;
}

function createEmployeeRecords(recordArrayArray) {
    return recordArrayArray.map((record) => {
        return createEmployeeRecord(record);
    })
}

function createTimeInEvent(employee, date) {
    let timeInEvent = {};
    timeInEvent.type = 'TimeIn';
    timeInEvent.hour = parseInt(date.split(' ')[1]);
    timeInEvent.date = date.split(' ')[0];
    employee.timeInEvents.push(timeInEvent);
    return employee;
}

function createTimeOutEvent(employee, date) {
    let timeOutEvent = {};
    timeOutEvent.type = 'TimeOut';
    timeOutEvent.hour = parseInt(date.split(' ')[1]);
    timeOutEvent.date = date.split(' ')[0];
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(e => e.date === date).hour;
    let timeOut = employee.timeOutEvents.find(e => e.date === date).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    let payRate = employee.payPerHour;
    return hours * payRate; 
}

function allWagesFor(employee) {
    let datesWorked = employee.timeOutEvents.map(e => e.date);
    let wagesEarned = datesWorked.map(d => wagesEarnedOnDate(employee, d));
    let reducer = (currentValue, newValue) => currentValue += newValue;
    return wagesEarned.reduce(reducer);
}

function calculatePayroll(employeeArray) {
    let allWagesArray = employeeArray.map(e => allWagesFor(e));
    let reducer = (currentValue, newValue) => currentValue += newValue;
    return allWagesArray.reduce(reducer);
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(e => e.firstName === name);
}