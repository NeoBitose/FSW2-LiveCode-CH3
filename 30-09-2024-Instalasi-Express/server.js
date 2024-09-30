const fs = require("fs")
const express = require("express")

const app = express();

app.get('/', (req,res) => {
    res.status(200).json({
        "status" : "success",
        "message" : "app is running...",
        "data" : []
    })
})

app.get('/alif14', (req,res) => {
    res.status(200).json({
        "status" : "success",
        "message" : "ping successfully",
        "data" : []
    })
})

// Middleware
// Personal Middleware

app.use((req, res, next) => {
    res.status(404).json({
        "status" : "failed",
        "message" : "request not found",
        "data" : []
    })
})

app.listen("3000", () => {
    console.log("Server run in port 3000 ")
})