
// function Queue(){var a=[],b=0;this.getLength=function(){return a.length-b};this.isEmpty=function(){return 0==a.length};this.enqueue=function(b){a.push(b)};this.dequeue=function(){if(0!=a.length){var c=a[b];2*++b>=a.length&&(a=a.slice(b),b=0);return c}};this.peek=function(){return 0<a.length?a[b]:void 0}};

//A queue implementation if you have an upperbound on the length of your queue.
class ArrayQueue{
  constructor(size){
    this.data = [];
    this.capacity = size;
    for (let i = 0; i < size; i++){
      this.data.push(null);
    }
    this.frontp = 0;
    this.backp = 0;
    this.size = 0;
  }
  pop(){
    if (this.frontp == this.backp){
      return null;
    }
    let result = this.data[this.frontp];
    this.data[this.frontp] = null;
    this.frontp = (this.frontp+1)%this.capacity;
    this.size--;
    return result;
  }
  push(thing){
    this.data[this.backp] = thing;
    this.backp = (this.backp+1)%this.capacity;
    this.size++;
  }
  clear(){
    while(this.frontp != this.backp){
      this.pop();
    }
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
}
