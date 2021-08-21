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

app.post("/register", (req, res) => {
    const { email } = req.body;

    let url =
        "https://api.sheety.co/ce814f97391c575b1aeb8ce8ffac546b/contacts/email";
    let body = {
        email: {
            firstName: "test",
            lastName: "test",
            email: email,
        },
    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        });

    res.send(email);

    // let url =
    //     "https://api.sheety.co/ce814f97391c575b1aeb8ce8ffac546b/contacts/email";

    // fetch(url, {
    //     method: "GET",
    // })
    //     .then((response) => response.json())
    //     .then((json) => {
    //         // Do something with the data
    //         console.log(json.email);
    //     });
    // res.send(email);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Serving on port 3000");
});
