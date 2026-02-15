const carcanvas = document.getElementById('cc')
carcanvas.width =200;

const networkCanvas = document.getElementById('nc')
networkCanvas.width =300;

const carctx = carcanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const LANE_COUNT = 4;
const road= new Road(carcanvas.width/2, carcanvas.width * 0.9, LANE_COUNT);
const cars = generateCars(100);

let bestcar = cars[0];
if (localStorage.getItem("bestBrain")) {
    bestcar.brain=JSON.parse(
        localStorage.getItem("bestBrain")
    )
}

const traffic = generateTraffic();

function generateTraffic(){
    const t = [];
    const rows = 50;
    const spacing = 150;
    for (let i = 0; i < rows; i++){
        const lanes = Array.from({length: LANE_COUNT}, (_, i) => i);
        const count = Math.floor(Math.random()*(LANE_COUNT-1))+1;
        for (let j = lanes.length-1; j > 0; j--){
            const k = Math.floor(Math.random()*(j+1));
            [lanes[j], lanes[k]] = [lanes[k], lanes[j]];
        }
        const chosen = lanes.slice(0, count);
        for (const lane of chosen){
            t.push(new Car(road.getLaneCenter(lane), -100 - i*spacing, 30, 50, "DUMMY", 2));
        }
    }
    return t;
}

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
    for (let i=0;i<N;i++){
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
