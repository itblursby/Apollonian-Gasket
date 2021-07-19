class Circle{
	constructor(x,y,r){
		this.x = x;
		this.y = y;
		this.rad = r;
	}
  get curvature(){
    // console.log("hey"+1./this.r);
    return 1./this.rad;
  }
	display(){
		ellipse(this.x,this.y,abs(this.rad*2),abs(this.rad*2));
	}
}
class Descartes{
  constructor(c1,c2,c3,c4){
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
    this.c4 = c4;
  }
  get newCircle(){
    // console.log(this.c1.curvature);
    let newcurve = 2*(this.c1.curvature+this.c2.curvature+this.c3.curvature)-this.c4.curvature;
    let newx = (2*(this.c1.curvature*this.c1.x+this.c2.curvature*this.c2.x+this.c3.curvature*this.c3.x)-this.c4.curvature*this.c4.x)/newcurve;
    let newy = (2*(this.c1.curvature*this.c1.y+this.c2.curvature*this.c2.y+this.c3.curvature*this.c3.y)-this.c4.curvature*this.c4.y)/newcurve;

    return new Circle(newx,newy,1/newcurve);
  }
}
