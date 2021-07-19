//Used to change the first three circles.
var circleA;
var circleB;
var circleC;
var circleN1;
var currmove;
var pmousePressed = false;
var nmousePressed = false;
var stack = [];
var maxiterations = 10000;
var minsize = 2;
function setup() {
	createCanvas(600,600);
	reset();
	// console.log(circleA.rad);
	currmove = null;
	cursor(CROSS);

}
function draw() {
	background(50, 96, 168);
	noFill();
	stroke(255);
  strokeWeight(1);
	if (currmove != null){
		currmove.x = mouseX;
		currmove.y = mouseY;
		initControl();
	}
	circleA.display();
	circleB.display();
	circleC.display();
	let newCurvature1 = getCurvature(circleA,circleB,circleC,1);
	let newCoord1 = getCoord(circleA,circleB,circleC,newCurvature1,1);
	circleN1 = new Circle(newCoord1[0],newCoord1[1],(1/newCurvature1));

	circleN1.display();
  stack = [];
  let iter = 0;
  circleN2 = new Descartes(circleA,circleB,circleC,circleN1).newCircle;
  stack.push(new Descartes(circleA,circleB,circleC,circleN1));
  stack.push(new Descartes(circleA,circleB,circleC,circleN2));

  while(stack.length > 0 && iter < maxiterations){
    let d = stack.shift();
    // console.log("hey");
    let nc = d.newCircle;
    // console.log("newcircle r: "+ nc.rad);
    nc.display();
    if (abs(nc.rad)>=minsize){
      stack.push(new Descartes(d.c1,d.c2,nc,d.c3));
      stack.push(new Descartes(d.c2,d.c3,nc,d.c1));
      stack.push(new Descartes(d.c3,d.c1,nc,d.c2));


      // stack.push(new Descartes(circleB,circleA,nc,circleC));
      //
      // stack.push(new Descartes(circleB,circleC,nc,circleA));
      // stack.push(new Descartes(circleC,circleB,nc,circleA));
      // stack.push(new Descartes(circleA,circleC,nc,circleB));
      // stack.push(new Descartes(circleC,circleA,nc,circleB));

      // stack.push(new Descartes(circleB,circleA,nc,circleC));

      // stack.push(new Descartes(circleB,circleC,nc,circleA));
      // stack.push(new Descartes(circleC,circleA,nc,circleB));


      // stack.push(new Descartes(circleA,circleB,nc,circleC))

    }
    iter++;
  }

  // newCurvature1 = getCurvature(circleA,circleB,circleC,1);
	// newCoord1 = getCoord(circleA,circleB,circleC,newCurvature1,1);
	// let newCircle2 = new Circle(newCoord1[0],newCoord1[1],(1/newCurvature1));
	// newCircle2.display();
  displayControl();
}
function mousePressed() {
		if (dist(mouseX,mouseY,circleA.x,circleA.y) < 5) {
			currmove = circleA;
			return;
		} else if (dist(mouseX,mouseY,circleB.x,circleB.y) < 5){
			currmove = circleB;
			return;
		}	else if (dist(mouseX,mouseY,circleC.x,circleC.y) < 5){
			currmove = circleC;
			return;
		}
}
function mouseReleased() {
		currmove = null;
}
function reset(){
  circleA = new Circle(300 + 150,300);
  circleB = new Circle(300 + 150*cos(TAU/3.),300+150*sin(TAU/3.));
  circleC = new Circle(300 + 150*cos(2.*TAU/3.),300+150*sin(2.*TAU/3.));
  initControl();
}
function displayControl(){
  fill(255,0,0);
  noStroke();
	ellipse(circleA.x,circleA.y,10,10);
	ellipse(circleB.x,circleB.y,10,10);
	ellipse(circleC.x,circleC.y,10,10);
}
function initControl(){
	let v1 = dist(circleA.x,circleA.y,circleB.x,circleB.y);
	let v2 = dist(circleB.x,circleB.y,circleC.x,circleC.y);
	let v3 = dist(circleC.x,circleC.y,circleA.x,circleA.y);
	circleA.rad = (v1+v2+v3)/2-v2;
	circleB.rad = (v1+v2+v3)/2-v3;
	circleC.rad = (v1+v2+v3)/2-v1;
}

// function get
function getCurvature(c1,c2,c3,n){
	let k1 = 1./c1.rad;
	let k2 = 1./c2.rad;
	let k3 = 1./c3.rad;
	return k1 + k2 + k3 + n * 2 * sqrt(k1*k2+k2*k3+k3*k1);
}
function getCoord(c1,c2,c3,k4,n){
	let k1 = 1./c1.rad;
	let k2 = 1./c2.rad;
	let k3 = 1./c3.rad;
	let sq = sqrtComplex(k1*k2*(c1.x*c2.x-c1.y*c2.y)+k2*k3*(c2.x*c3.x-c2.y*c3.y)+k3*k1*(c3.x*c1.x-c3.y*c1.y),k1*k2*(c1.x*c2.y+c1.y*c2.x)+k2*k3*(c2.x*c3.y+c2.y*c3.x)+k3*k1*(c3.x*c1.y+c3.y*c1.x));
	sq = [sq[0]*2/k4,sq[1]*2/k4];
	let r = (c1.x*k1+c2.x*k2+c3.x*k3)/k4;
	let i = (c1.y*k1+c2.y*k2+c3.y*k3)/k4;
	return [r+n*sq[0],i+n*sq[1]];
}
function sqrtComplex(r,i){
	let d1 = sqrt(r*r+i*i);
	let d2 = sqrt((d1+r)*(d1+r)+i*i);
	return [sqrt(d1)*(r+d1)/d2,sqrt(d1)*(i)/d2];
}
