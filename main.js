const carcanvas = document.getElementById('cc')
carcanvas.width =200;

const networkCanvas = document.getElementById('nc')
networkCanvas.width =300;

const carctx = carcanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const road= new Road(carcanvas.width/2, carcanvas.width * 0.9);
const cars = generateCars(100);

let bestcar = cars[0];
if (localStorage.getItem("bestBrain")) {
    bestcar.brain=JSON.parse(
        localStorage.getItem("bestBrain")
    )
}

const traffic =[
    new Car(road.getLaneCenter(1), -100, 30,50, "DUMMY")
];

animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain)
    )
}

function discard() {
    localStorage.removeItem("bestBrain");
}
function generateCars(N){
    const cars =[];
    for (let i=1;i<N;i++){
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI", 6));
    }
    return cars;
}


function animate(time){
    for (let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders, traffic);
    }
    for (let i =0; i< cars.length;i++){
        cars[i].update(road.borders, traffic);
    }
    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c=>c.y)
        )
    );
    carcanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carctx.save();
    carctx.translate(0,-bestCar.y+carcanvas.height*0.7);

    road.draw(carctx);


    for (let i =0;i<traffic.length;i++){
        traffic[i].draw(carctx, "green");
    }
    
    carctx.globalAlpha=0.2;
    for (let i =0; i< cars.length;i++){

        cars[i].draw(carctx, "blue")
    }
    carctx.globalAlpha=1;
    bestCar.draw(carctx, "blue", true);

    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}
