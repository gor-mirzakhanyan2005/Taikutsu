//Assignment 1
class User {
    constructor({name, surname, email, role}){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        
        this.courses = [];
        this.messageHistory = [];
    }
    
    addCourse(course, level){
        this.courses.push({
            course: course,
            level: level
        });
    }
    
    removeCourse(course){
        this.courses = this.courses.filter(item => item.course !== course);
    }
    
    editCourse(course, level){
        let c = this.courses.find(item => item.course === course);
        
        if(c){
            c.course = course;
            c.level = level;
        }
    }
    
    sendMessage(from, message){
        this.messageHistory.push({
            from: from,
            message: message
        })
    }
    
    showMessagesHistory(){
        this.messageHistory.forEach(m => console.log(`"${m.from.email} -> ${this.email}: ${m.message}`))
    }
}

let student1 = new User({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com', role: 'student'});
let student2 = new User({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com', role: 'student'});
let teacher1 = new User({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com', role: 'teacher'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 1);
student1.removeCourse('physics');
teacher1.addCourse('biology', 3);
teacher1.editCourse('biology', 4);
console.log(`${student1.name}: ${student1.courses.length} courses`); // -> Rafael: 1 courses
console.log(`${teacher1.name}: ${teacher1.courses.length} courses`); // -> Paula: 1 courses
teacher1.sendMessage(student1, 'test message');
teacher1.sendMessage(student1, 'another message');
teacher1.showMessagesHistory();
// -> rfife@rhyta.com -> PaulaThompkins@jourrapide.com: test message
// -> rfife@rhyta.com -> PaulaThompkins@jourrapide.com: another message


//Assignment2
class User {
    constructor({name, surname, email, role}){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        
        this.courses = [];
        this.messageHistory = [];
    }
    
    addCourse(course, level){
        this.courses.push({
            course: course,
            level: level
        });
    }
    
    removeCourse(course){
        this.courses = this.courses.filter(item => item.course !== course);
    }
    
    editCourse(course, level){
        let c = this.courses.find(item => item.course === course);
        
        if(c){
            c.course = course;
            c.level = level;
        }
    }
    
    sendMessage(from, message){
        this.messageHistory.push({
            from: from,
            message: message
        })
    }
    
    showMessagesHistory(){
        this.messageHistory.forEach(m => console.log(`"${m.from.email} -> ${this.email}: ${m.message}`))
    }
}

class ExtendedUser extends User{
    constructor({name, surname, email, role}){
        super({name, surname, email, role});
    }

    get fullName(){
        return `${this.name} ${this.surname}`;
    }

    set fullName(value){
        const parts = value.split(" ");
        this.name = parts[0];
        this.surname = parts[1];
    }
}

class Teacher extends ExtendedUser{
    constructor({name, surname, email}){
        super({name, surname, email, role: 'teacher'})
    }
}

class Student extends ExtendedUser{
    constructor({name, surname, email}){
        super({name, surname, email, role: 'student'})
    }
}

let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
teacher1.addCourse('biology', 3);
teacher1.editCourse('chemistry', 4);
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fife: 1 courses
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); // -> Paula Thompkins: 2 courses
student1.fullName = 'Rafael Fifer';
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses

let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
teacher1.addCourse('biology', 3);
teacher1.editCourse('chemistry', 4);
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fife: 1 courses
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); // -> Paula Thompkins: 2 courses
student1.fullName = 'Rafael Fifer';
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses


//Assignment 3
class User {
    constructor(name, surname, email, role){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        
        this.courses = [];
        this.messageHistory = [];
    }
    
    addCourse(course, level){
        this.courses.push({
            course: course,
            level: level
        });
    }
    
    removeCourse(course){
        this.courses = this.courses.filter(item => item.course !== course);
    }
    
    editCourse(course, level){
        let c = this.courses.find(item => item.course === course);
        
        if(c){
            c.course = course;
            c.level = level;
        }
    }
    
    sendMessage(from, message){
        this.messageHistory.push({
            from: from,
            message: message
        })
    }
    
    showMessagesHistory(){
        this.messageHistory.forEach(m => console.log(`"${m.message}" -${m.from}`))
    }
}

class ExtendedUser extends User{
    constructor({name, surname, email, role}){
        super({name, surname, email, role});
    }

    get fullName(){
        return `${this.name} ${this.surname}`;
    }

    set fullName(value){
        const parts = value.split(" ");
        this.name = parts[0];
        this.surname = parts[1];
    }

    static match(teacher, student, course = false){
        const teacherCourses = teacher.courses;
        const studentCourses = student.courses;
        
        let result = [];
        
        if(course){
            let teacherCourse = teacherCourses.find(c => c.course === course);
            let studentCourse = studentCourses.find(c => c.course === course);
            
            if(teacherCourse && studentCourse){
                return {course: studentCourse.course, level: studentCourse.level};
            } else {
                return [];
            }
        } else {
            for(let i = 0; i < teacherCourses.length; i++) {
                const studentCourse = studentCourses.find(c => c.course === teacherCourses[i].course);
                
                if(studentCourse){
                    if(teacherCourses[i].level >= studentCourse.level){
                        result.push({course: studentCourse.course, level: studentCourse.level})
                    }
            }
        }
            
        }
        
        return result;
    }
}

class Teacher extends ExtendedUser{
    constructor({name, surname, email}){
        super({name, surname, email, role: 'teacher'})
    }
}

class Student extends ExtendedUser{
    constructor({name, surname, email}){
        super({name, surname, email, role: 'student'})
    }
}

let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 4);
teacher1.addCourse('maths', 4);
let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]
teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []
teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}

//Assignment 4
class User {
    constructor(name, surname, email, role){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        
        this.courses = [];
        this.messageHistory = [];
    }
    
    addCourse(course, level){
        this.courses.push({
            course: course,
            level: level
        });
    }
    
    removeCourse(course){
        this.courses = this.courses.filter(item => item.course !== course);
    }
    
    editCourse(course, level){
        let c = this.courses.find(item => item.course === course);
        
        if(c){
            c.course = course;
            c.level = level;
        }
    }
    
    sendMessage(from, message){
        this.messageHistory.push({
            from: from,
            message: message
        })
    }
    
    showMessagesHistory(){
        this.messageHistory.forEach(m => console.log(`"${m.message}" -${m.from}`))
    }
}

class ExtendedUser extends User{
    constructor({name, surname, email, role}){
        super(name, surname, email, role);
    }

    get fullName(){
        return `${this.name} ${this.surname}`;
    }

    set fullName(value){
        const parts = value.split(" ");
        this.name = parts[0];
        this.surname = parts[1];
    }

    static match(teacher, student, course = false){
        let matched = [];
        for(let scourse of student.courses) {
            for(let tcourse of teacher.courses) {
                if(scourse.course === tcourse.course && scourse.level <= tcourse.level) {
                    matched.push(scourse);
                }
            }
        }
        if(course) {
            for(let mcourse of matched) {
                if(mcourse.course === course) {
                    return mcourse;
                }
            }
            return null;
        } else
            return matched;
    }
}

class Teacher extends ExtendedUser{
    constructor({name, surname, email}){
        super({name, surname, email, role: 'teacher'})
    }
}

class Student extends ExtendedUser{
    constructor({name, surname, email}){
        super({name, surname, email, role: 'student'})
    }
}


class Tutoring{
    constructor(teachers, students){
        this.teachers = [];
        this.students = [];
    }
    
    addStudent(name, surname, email){
        this.students.push(new Student({name, surname, email}));
    }
    
    addTeacher(name, surname, email){
        this.teachers.push(new Teacher({name, surname, email}));
    }
    
    getStudentByName(name, surname){
        let student = this.students.find(student => student.name === name && student.surname === surname);
        
        if(student){
            return student;
        } else {
            return undefined;
        }
    }
    
    getTeacherByName(name, surname){
        let teacher = this.teachers.find(teacher => teacher.name === name && teacher.surname === surname);
        
        if(teacher){
            return teacher;
        } else {
            return undefined
        }
    }
    
    getStudentsForTeacher(teacher){
        let tutorable = [];
        let students = this.students;
        
        if(students.length > 0){
            for(let i = 0; i < students.length; i++){
                let match = ExtendedUser.match(teacher, students[i]);
                if(match.length > 0){
                    tutorable.push(students[i])
                }
            }
        } else {
            console.log('No students registered!')
        }
        
        return tutorable;
    }
    
    getTeacherForStudent(student){
        let tutors = [];
        let teachers = this.teachers;
        
        if(teachers.length > 0){
            for(let j = 0; j < teachers.length; j++){
                let match = ExtendedUser.match(teachers[j], student);
                if(match.length > 0){
                    tutors.push(teachers[j])
                }
            }
        }
        
        return tutors;
    }
}

let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);
let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
teacher.addCourse('maths', 4);
let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> undefined
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...

//Assignment 5
class User {
    constructor(name, surname, email, role){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        
        this.courses = [];
        this.messageHistory = [];
    }
    
    addCourse(course, level){
        this.courses.push({
            course: course,
            level: level
        });
    }
    
    removeCourse(course){
        this.courses = this.courses.filter(item => item.course !== course);
    }
    
    editCourse(course, level){
        let c = this.courses.find(item => item.course === course);
        
        if(c){
            c.course = course;
            c.level = level;
        }
    }
    
    sendMessage(from, message){
        this.messageHistory.push({
            from: from,
            message: message
        })
    }
    
    showMessagesHistory(){
        this.messageHistory.forEach(m => console.log(`"-${m.from} -> ${this.email}: ${m.message}"`))
    }
}

class ExtendedUser extends User{
    constructor({name, surname, email, role}){
        super(name, surname, email, role);
    }

    get fullName(){
        return `${this.name} ${this.surname}`;
    }

    set fullName(value){
        const parts = value.split(" ");
        this.name = parts[0];
        this.surname = parts[1];
    }

    static match(teacher, student, course = false){
        let matched = [];
        for(let scourse of student.courses) {
            for(let tcourse of teacher.courses) {
                if(scourse.course === tcourse.course && scourse.level <= tcourse.level) {
                    matched.push(scourse);
                }
            }
        }
        if(course) {
            for(let mcourse of matched) {
                if(mcourse.course === course) {
                    return mcourse;
                }
            }
            return null;
        } else
            return matched;
    }
}

class Teacher extends ExtendedUser{
    constructor({name, surname, email}){
        super({name, surname, email, role: 'teacher'})
    }
}

class Student extends ExtendedUser{
    constructor({name, surname, email}){
        super({name, surname, email, role: 'student'})
    }
}


class Tutoring{
    constructor(teachers, students){
        this.teachers = [];
        this.students = [];
    }
    
    addStudent(name, surname, email){
        this.students.push(new Student({name, surname, email}));
    }
    
    addTeacher(name, surname, email){
        this.teachers.push(new Teacher({name, surname, email}));
    }
    
    getStudentByName(name, surname){
        let student = this.students.find(student => student.name === name && student.surname === surname);
        
        if(student){
            return student;
        } else {
            return undefined;
        }
    }
    
    getTeacherByName(name, surname){
        let teacher = this.teachers.find(teacher => teacher.name === name && teacher.surname === surname);
        
        if(teacher){
            return teacher;
        } else {
            return undefined
        }
    }
    
    getStudentsForTeacher(teacher){
        let tutorable = [];
        let students = this.students;
        
        if(students.length > 0){
            for(let i = 0; i < students.length; i++){
                let match = ExtendedUser.match(teacher, students[i]);
                if(match.length > 0){
                    tutorable.push(students[i])
                }
            }
        } else {
            console.log('No students registered!')
        }
        
        return tutorable;
    }
    
    getTeacherForStudent(student){
        let tutors = [];
        let teachers = this.teachers;
        
        if(teachers.length > 0){
            for(let j = 0; j < teachers.length; j++){
                let match = ExtendedUser.match(teachers[j], student);
                if(match.length > 0){
                    tutors.push(teachers[j])
                }
            }
        }
        
        return tutors;
    }
}

class ExtendedTutoring extends Tutoring{
    sendMessages(from, to, message){
        for(let s of to){
            s.sendMessage(from.email, message);
        }
    }
}

let tutoring = new ExtendedTutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let to = [];
to.push(tutoring.getStudentByName('Rafael', 'Fife'));
to.push(tutoring.getStudentByName('Kelly', 'Estes'));
tutoring.sendMessages(tutoring.getTeacherByName('Paula', 'Thompkins'), to, 'test message');
for(let user of to) {
    user.showMessagesHistory();
}
// -> PaulaThompkins@jourrapide.com -> rfife@rhyta.com: test message
// -> PaulaThompkins@jourrapide.com -> k_estes@dayrep.com: test message