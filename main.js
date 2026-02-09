const carcanvas = document.getElementById('cc')
carcanvas.width =200;

const networkCanvas = document.getElementById('nc')
networkCanvas.width =300;

const carctx = carcanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const road= new Road(carcanvas.width/2, carcanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1),100,30,50, "AI",5);
const traffic =[
    new Car(road.getLaneCenter(1), -100, 30,50, "DUMMY")
];

animate();

function animate(){
    for (let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders, traffic);
    }
    car.update(road.borders, traffic);
    carcanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carctx.save();
    carctx.translate(0,-car.y+carcanvas.height*0.7);

    road.draw(carctx);
    for (let i =0;i<traffic.length;i++){
        traffic[i].draw(carctx, "green");
    }
    car.draw(carctx)

    Visualizer.drawNetwork(networkCtx, car.brain);
    requestAnimationFrame(animate);
}
