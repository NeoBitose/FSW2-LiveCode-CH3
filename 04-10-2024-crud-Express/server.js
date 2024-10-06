const fs = require("fs")
const express = require("express")

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        "status": "success",
        "message": "app is running...",
        "isSuccess": true,
        "data": []
    })
})

const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/Data/cars.json`, "utf-8")
)

app.get('/api/v1/cars', (req, res) => {
    // Select from
    try {
        const cars = JSON.parse(
            fs.readFileSync(`${__dirname}/Data/cars.json`)
        )
        res.status(201).json({
            "status": "success",
            "message": "Get data successfully",
            "isSuccess": true,
            "totalData": cars.length,
            "data": {cars},
        })
    }
    catch (error) {
        res.status(500).json({
            "status": "Failed",
            "message": `Get data Failed : ${error}`,
            "isSuccess": false,
            "data": null
        })
    }
})

app.post('/api/v1/cars', (req, res) => {
    // Insert into
    const newCar = req.body;
    console.log(newCar);
    cars.push(newCar);

    fs.writeFile(`${__dirname}/Data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            "status": "success",
            "message": "Add data successfully",
            "isSuccess": true,
            "totalData": cars.length,
            "data": {newCar}
        })
    })
})

app.get('/api/v1/cars/:id', (req, res) => {
    // select where
    console.log(req.params)
    const car = cars.find((i) => i.id === req.params.id); 
    console.log(car)

    if (!car) {
        res.status(404).json({
            "status": "Failed",
            "message": "Get data not successfully",
            "isSuccess": false,
            "data": null
        })
    }

    res.status(200).json({
        "status": "success",
        "message": "Get data successfully",
        "isSuccess": true,
        "data": {car}
    })
})

app.patch('/api/v1/cars/:id', (req, res) => {
    const id = req.params.id;
    // update into
    console.log(req.body)
    const {name, year, type} = req.body;

    const car = cars.find((i) => i.id === req.params.id); 
    if (!car) {
        res.status(500).json({
            "status": "failed",
            "message": "Get data not successfully",
            "isSuccess": false,
            "data": null
        })
    }
    console.log(car)

    const carIndex = cars.findIndex((car) => car.id === id);
    console.log(carIndex);

    cars[carIndex] = {...cars[carIndex], ...req.body}
    console.log(cars)

    fs.writeFile(`${__dirname}/Data/cars.json`, JSON.stringify(cars), (err) => {
        const newCar = cars.find((i) => i.id === req.params.id); 
        res.status(201).json({
            "status": "success",
            "message": "Edit data successfully",
            "isSuccess": true,
            "data": {
                newCar
            }
        })
    })
})

app.delete('/api/v1/cars/:id', (req, res) => {
    const id = req.params.id;
    // select where
    console.log(req.params)
    const car = cars.find((i) => i.id === id); 
    console.log(car)

    if (!car) {
        res.status(404).json({
            "status": "Failed",
            "message": "Get data not successfully",
            "isSuccess": false,
            "data": null
        })
    }

    const carIndex = cars.findIndex((car) => car.id === id);
    cars.splice(carIndex,1)

    fs.writeFile(`${__dirname}/Data/cars.json`, JSON.stringify(cars), (err) => {
        const newCar = cars.find((i) => i.id === req.params.id); 
        res.status(201).json({
            "status": "success",
            "message": "Delete data successfully",
            "isSuccess": true,
            "data": null
        })
    })
})



// Middleware
// Personal Middleware

app.use((req, res, next) => {
    res.status(404).json({
        "status": "failed",
        "message": "request not found",
        "data": null
    })
})

app.listen("3000", () => {
    console.log("Server run in port 3000 ")
})