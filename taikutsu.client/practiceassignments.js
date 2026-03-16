//TOPIC 1

//Assignment #1
let images = [
  {
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    date: 1503
  },
  {
    title: 'The Last Supper',
    artist: 'Leonardo da Vinci',
    date: 1495
  },
  {
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    date: 1889
  },
  {
    title: 'The Scream',
    artist: 'Edvard Munch',
    date: 1893
  },
  {
    title: 'Guernica',
    artist: 'Pablo Picasso',
    date: 1937
  },
  {
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    date: 1907
  },
  {
    title: 'Girl With a Pearl Earring',
    artist: 'Johannes Vermeer',
    date: 1665
  },
  {
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    date: 1485
  },
  {
    title: 'Las Meninas',
    artist: 'Diego Velázquez',
    date: 1656
  },
  {
    title: 'Creation of Adam',
    artist: 'Michelangelo',
    date: 1512
  }
];

images.forEach(image => console.log(`${image.title}, (${image.artist}, ${image.date})`))

//Assignment #2

let Image = function(title, artist, date) {
  this.title = title;
  this.artist = artist;
  this.date = date;
}

let getImage = function(title, artist, date) {
  let image = {};
  image.title = title;
  image.artist = artist;
  image.date = date;
  return image;
};

let images1 = images.map(image => {
  return new Image(image.title, image.artist, image.date);
});

let images2 = images1.map(image => {
  return getImage(image.title, image.artist, image.date);
});

//Assignment #3

let Image = function(title, artist, date) {
  this.title = title;
  this.artist = artist;
  this.date = date;
}

let Images = {
    list: [],
    contains: function(title) {
        this.list.some(image => image.title === title);
    },
    add: function(title, artist, date) {
        this.list.push(new Image(title, artist, date))
        console.log("Image added.");
    },
    show: function() {
        this.list.forEach(image => console.log(`${image.title}, (${image.artist}, ${image.date})`))
    },
    clear: function() {
        this.list.length = 0;
    }
};

images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);
images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.show();
// -> Mona Lisa (Leonardo da Vinci, 1503)
// -> Last Supper (Leonardo da Vinci, 1495)
// -> The Starry Night (Vincent van Gogh, 1889)
images.clear();
images.show();

//Assignment #4

Image.prototype.show() = function(title) {
  if(this.list.some(image => image.title === title)){
    console.log(`${image.title}, (${image.date}, ${image.date})`)
  } else {
    console.log("No such image!")
  }
}

let Images2 = {
    list: [],
    contains: function(title) {
        this.list.some(image => image.title === title);
    },
    add: function(title, artist, date) {
        this.list.push(new Image(title, artist, date))
        console.log("Image added.");
    },
    show: function(title) {
        Image.show(title);
    },
    clear: function() {
        this.list.length = 0;
    }
};

//Assignment #5
const deepComp = function(obj1, obj2){

  if(a === null || b === null || typeof a !== 'object' || typeof b !== 'object'){
    return false;
  }

  if(obj1 === obj2){
    return true;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  return keys1.every(key => deepComp(keys1[key], keys2[key]))
}


console.log(match); // -> [{course: 'maths', level: 2}]
teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []
teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}