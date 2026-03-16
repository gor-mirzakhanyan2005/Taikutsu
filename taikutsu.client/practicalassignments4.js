//Assignment #1
 class MyIterable{
  constructor(range = Infinity){
    this.data = new Set();
  }

  [Symbol.iterator] = function* (){
      for(let ele of this.data){
        yield ele;
      }    
  } 

  has(smth){
    return this.data.has(smth);
  }

  add(smth){
    if(!this.has(smth)){
      this.data.add(smth);
      console.log(`Added ${smth}.`)
    } else{
      console.log('Such element already exists.');
      return;
    }
  }

  del(smth){
    if(this.has(smth)){
      this.data.delete(smth);
    } else{
      console.log('No such element to delete.')
    }
  }  

  get length(){
    return this.data.size;
  }
}

let iterable = new MyIterable();
iterable.add(2);
iterable.add(5);
iterable.add(3);
iterable.add(2);
iterable.del(3);

console.log(iterable.length); // -> 2
console.log(iterable.has(2)); // -> true
console.log(iterable.has(3)); // -> false
console.log(...iterable); // -> 2 5


//Assignment #2
