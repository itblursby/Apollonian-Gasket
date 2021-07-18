class Circle{
	constructor(x,y,r){
		this.x = x;
		this.y = y;
		this.rad = r;
	}
	display(){
		ellipse(this.x,this.y,abs(this.rad*2),abs(this.rad*2));
	}
}
