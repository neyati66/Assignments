const students = [
    { id: 101, name: "Aman", marks: 82, course: "Java" },
    { id: 102, name: "Priya", marks: 95, course: "Python" },
    { id: 103, name: "Rahul", marks: 67, course: "Java" },
    { id: 104, name: "Neha", marks: 76, course: "Web" },
    { id: 105, name: "Rohan", marks: 88, course: "Python" }
];

console.log("Original Student Data:");
console.log(students);


// push()

students.push({
    id: 106,
    name: "Simran",
    marks: 91,
    course: "Java"
});

console.log("After push:");
console.log(students);


// pop()

const removedStudent = students.pop();

console.log("Removed Student:");
console.log(removedStudent);


// unshift()

students.unshift({
    id: 100,
    name: "Ankit",
    marks: 80,
    course: "Web"
});

console.log("After unshift:");
console.log(students);


// shift()

const firstStudent = students.shift();

console.log("Removed First Student:");
console.log(firstStudent);


// splice()

students.splice(2, 1, {
    id: 107,
    name: "Karan",
    marks: 78,
    course: "Java"
});

console.log("After splice:");
console.log(students);


// slice()

const firstThree = students.slice(0, 3);

console.log("First Three Students:");
console.log(firstThree);


// for of loop

for (const student of students) {
    console.log(
        student.name + " - " +
        student.course + " - " +
        student.marks
    );
}


// forEach()

students.forEach((student) => {
    console.log(student.name);
});


// map()

const names = students.map((student) => {
    return student.name;
});

console.log("Student Names:");
console.log(names);


// filter()

const topperStudents = students.filter((student) => {
    return student.marks >= 80;
});

console.log("Students having marks >= 80:");
console.log(topperStudents);


// reduce()

const totalMarks = students.reduce((sum, student) => {
    return sum + student.marks;
}, 0);

const average = totalMarks / students.length;

console.log("Total Marks = " + totalMarks);
console.log("Average Marks = " + average);


// sort()

students.sort((a, b) => {
    return a.marks - b.marks;
});

console.log("Ascending Order:");
console.log(students);


students.sort((a, b) => {
    return b.marks - a.marks;
});

console.log("Descending Order:");
console.log(students);


// Summary

console.log("push() adds element at the end");
console.log("pop() removes last element");
console.log("unshift() adds element at beginning");
console.log("shift() removes first element");
console.log("splice() is used for insert/delete");
console.log("slice() creates a new array");
console.log("for...of is used for iteration");
console.log("forEach() runs function for every element");
console.log("map() creates a new transformed array");
console.log("filter() returns matching elements");
console.log("reduce() gives a single value");
console.log("sort() rearranges array");