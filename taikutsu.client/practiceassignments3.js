//Assignment #1

    // let array = [...Array(n)].map(() => Math.round(Math.random() * (m - n + 1) + n));
    
function getRandomSet(m, n, allowDupes = false, allowSort = false){
  let dupes = allowDupes;
  let sort = allowSort;

  let array = [];

  if(dupes && allowSort){
    for(let i = 0; i < n; i++){
      array.push(Math.floor(Math.random() * (m - n + 1) + n));
    }
    return array.sort((first, second) => first - second);
  }

  if(!dupes && allowSort){
    let set;
    for(let i = 0; i < n; i++){
      array.push(Math.floor(Math.random() * (m - n + 1) + n));
    }

    set = new Set([...array.sort((first, second) => first - second)]);
    return [...set];
  }

  if(dupes && !allowSort){
    for(let i = 0; i < n; i++){
      array.push(Math.floor(Math.random() * (m - n + 1) + n));
    }
    return array;
  }

  if(!dupes && !allowSort){
    let set;
    for(let i = 0; i < n; i++){
      array.push(Math.floor(Math.random() * (m - n + 1) + n));
    }

    set = new Set([...array]);
    return [...set];
  }
}

console.log(getRandomSet(10, 20, false, false));
console.log(getRandomSet(10, 20, false, true));
console.log(getRandomSet(10, 20, true, false));
console.log(getRandomSet(10, 20, true, true));

//Assignment #2

class User{
    constructor(firstName, lastName, email){
        let namecheck =  /^[A-Z]/;
        let emailcheck = /[^a-zA-Z@.]/;
        
        if(!namecheck.test(firstName)){
          throw new Error("Illegal characters in name.");
        }
        
        if(!namecheck.test(lastName)){
          throw new Error("Illegal characters in surname.");
        }
        
        if(emailcheck.test(email)){
          throw new Error("Illegal characters in email.");
        }
        
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    get getData(){
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        }
    }

    set setData({firstName, lastName, email}){
        let namecheck =  /^[A-Z]/;
        let emailcheck = /[^a-z,@.]/;
        
        if(!namecheck.test(firstName)){
          throw new Error("Illegal characters in name.");
        }
        
        if(!namecheck.test(lastName)){
          throw new Error("Illegal characters in surname.");
        }
        
        if(emailcheck.test(email)){
          throw new Error("Illegal characters in email.");
        }
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

try {
    let user1 = new User('Aaaa', 'Bbbb', 'Aaaa@gmail.com');
    console.log(user1);
    let user2 = new User('aaaa', 'Bbbb', 'Aaaa@gmail.com'); // -> Error
    
} catch(err) {
    console.log(err.message);
}

//Assignment #3
class User{
    constructor(name, surname, email){
        let namecheck =  /^[A-Z]/;
        let emailcheck = /[^a-zA-Z@.]/;
        
        if(!namecheck.test(name)){
          throw new Error("Illegal characters in name.");
        }
        
        if(!namecheck.test(surname)){
          throw new Error("Illegal characters in surname.");
        }
        
        if(emailcheck.test(email)){
          throw new Error("Illegal characters in email.");
        }
        
        
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    get getData(){
        return {
            name: this.name,
            surname: this.surname,
            email: this.email
        }
    }

    set setData({firstName, lastName, email}){
        let namecheck =  /^[A-Z]/;
        let emailcheck = /[^a-z,@.]/;
        
        if(!namecheck.test(name)){
          throw new Error("Illegal characters in name.");
        }
        
        if(!namecheck.test(surname)){
          throw new Error("Illegal characters in surname.");
        }
        
        if(emailcheck.test(email)){
          throw new Error("Illegal characters in email.");
        }
        
        this.name = name;
        this.surname = surname;
        this.email = email;
    }
}

class Users{
  constructor(){
    this.users = new Map();
  }
  
  add(name, surname, email) {
      this.users.set(email, new User(name, surname, email));
    }
    
  delete(email) {
      this.users.delete(email);
    }
    
  get(email) {
      return this.users.get(email)
    }
    
  getAll(sortArg) {
    let array = [];
    this.users.forEach(e => array.push(e));
    return array.sort((a, b) => a[sortArg].localeCompare(b[sortArg]));
  }
}

let users = new Users();
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Mmmm", "Ffff", "eeee@gmail.com");
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Xxxx", "Oooo", "dddd@gmail.com");
console.log(users);
console.log(users.get("dddd@gmail.com"));
console.log(users.getAll("name").map(u => u.name));
console.log(users.getAll("surname").map(u => u.surname));
console.log(users.getAll("email").map(u => u.email));

//Assignment #4
class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.type = 'point';
  }
}

class Line{
  constructor(pointArray){
    this.type = 'line';
    this.points = pointArray.map(([x, y]) => new Point(x, y));
  }
}

class Figure{
  constructor(elements = []){
    this.elements = {
      points: [],
      lines: []
    }
    
    elements.forEach(element => {
      if(element instanceof point){
        this.elements.points.push(element);
      } else if(element instanceof line){
        this.elements.lines.push(element);
      }
    })
  }
  
  addPoint(x, y){
    this.elements.points.push(new Point(x, y));
  }
  
  addLine(pointArray){
    this.elements.lines.push(new Line(pointArray));
  }
  
  toJSON(){
    return JSON.stringify({
      points: this.elements.points,
      lines: this.elements.lines
    })
  }
  
  deleteAll(){
    this.elements.points = [];
    this.elements.lines = [];
  }
  
  fromJSON(json, add){
    let notJson = JSON.parse(json);
    
    if(!add){
      this.deleteAll();
    }
    
    if(notJson.points){
      notJson.points.map(point => this.elements.points.push(new Point(point.x, point.y)));
    }
    
    if(notJson.lines){
      notJson.lines.map(line => {
        let linePoints = line.points.map(point => [point.x, point.y]);
        this.elements.lines.push(new Line(linePoints));
      })
    }
  }
}

let f = new Figure();
f.addPoint(10,20);
f.addPoint(10,10);
console.log(f.elements.points);
f.addLine([[10,20], [30,40], [50,60]]);
console.log(f.elements.lines)
let json = f.toJSON();
console.log(json);
f.fromJSON(json, true);
console.log(f.elements.points.length);
console.log(f.elements.lines.length);
f.fromJSON('{"points":[{"type":"point","x":10,"y":20},{"type":"point","x":10,"y":30},{"type":"point","x":10,"y":-30},{"type":"point","x":10,"y":20},{"type":"point","x":20,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":130,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":0,"y":20},{"type":"point","x":0,"y":-20},{"type":"point","x":0,"y":20}],"lines":[{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":-10},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]}]}');
console.log(f.elements.points.length);
console.log(f.elements.lines.length);

//Assignment #5
class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.type = 'point';
  }
}

class Line{
  constructor(pointArray){
    this.type = 'line';
    this.points = pointArray.map(([x, y]) => new Point(x, y));
  }
}

class Figure{
  constructor(elements = []){
    this.elements = {
      points: [],
      lines: []
    }
    
    elements.forEach(element => {
      if(element instanceof Point){
        this.elements.points.push(element);
      } else if(element instanceof Line){
        this.elements.lines.push(element);
      }
    })
  }
  
  addPoint(x, y){
    this.elements.points.push(new Point(x, y));
    this.elements.points.sort((a, b) => {
      if(a.x !== b.x){
        return a.x - b.x;
      }
      return a.y - b.y;
    });
  }
  
  addLine(pointArray){
    this.elements.lines.push(new Line(pointArray));
    this.elements.lines.sort((a, b) => {
      if(a.points.length !== b.points.length){
        a.points.length - b.points.length;
      }
      
      let aPoint = a.points[0];
      let bPoint = b.points[0];
      
      if(aPoint.x !== bPoint.x){
        return aPoint.x - bPoint.x;
      }
      
      return aPoint.y - bPoint.y;
    });
  }
  
  toJSON(){
    return JSON.stringify({
      points: this.elements.points,
      lines: this.elements.lines
    })
  }
  
  deleteAll(){
    this.elements.points = [];
    this.elements.lines = [];
  }
  
  fromJSON(json, add){
    let notJson = JSON.parse(json);
    
    if(!add){
      this.deleteAll();
    }
    
    if(notJson.points){
      notJson.points.map(point => this.elements.points.push(new Point(point.x, point.y)));
    }
    
    if(notJson.lines){
      notJson.lines.map(line => {
        let linePoints = line.points.map(point => [point.x, point.y]);
        this.elements.lines.push(new Line(linePoints));
      })
    }
  }
}

let f = new Figure();
f.addPoint(10,20);
f.addPoint(10,10);
f.addLine([[10,20], [30,40], [50,60]]);
let json = f.toJSON();
console.log(json);
f.fromJSON(json, true);
console.log(f.elements.points);
console.log(f.elements.points.length);
console.log(f.elements.lines);
console.log(f.elements.lines.length);