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
            "data": []
        })
    }
})

app.post('/api/v1/cars', (req, res) => {
    // Insert data
    const newCar = req.body;
    console.log(newCar);
    cars.push(newCar);

    fs.writeFile(`${__dirname}/Data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            "status": "success",
            "message": "Get data successfully",
            "isSuccess": true,
            "totalData": cars.length,
            "data": {newCar}
        })
    })
})

// Middleware
// Personal Middleware

app.use((req, res, next) => {
    res.status(404).json({
        "status": "failed",
        "message": "request not found",
        "data": []
    })
})

app.listen("3000", () => {
    console.log("Server run in port 3000 ")
})