const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const fetch = require("node-fetch");
const headers = require("./sheetyHeaders.json");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/success", (req, res) => {
    res.render("success");
});

app.post("/register", (req, res) => {
    const { firstName, lastName, email } = req.body;

    let url =
        "https://api.sheety.co/ce814f97391c575b1aeb8ce8ffac546b/contacts/email";
    let body = {
        email: {
            firstName,
            lastName,
            email,
        },
    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
    })
        .then((response) => response.json())
        .then((json) => {});

    res.redirect("success");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Serving on port 3000");
});
