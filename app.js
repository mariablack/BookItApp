var express = require("express");
var app = express();

//Account username/pass
const auth = { login: 'maria', password: '1234' } 
const apartments = [
    { id: 1, Title: 'Apartment 1', Price: 25, Image: "/WebApis/images/Tiny-Apartments-kitchen.jpg",  People: 2,  Description: 'this is the description', Available: true},
    { id: 2, Title: 'Apartment 2', Price: 25, Image: "/WebApis/images/Small-apartment-design.jpg", People: 3, Description: 'this is the description', Available: true },
    { id: 3, Title: 'Apartment 3', Price: 25, Image: "/WebApis/images/Tiny-Apartments-kitchen.jpg", People: 2, Description: 'this is the description', Available: true },
    { id: 4, Title: 'Apartment 4', Price: 25, Image: "/WebApis/images/Small-apartment-design.jpg", People: 4, Description: 'this is the description', Available: true }, 
    { id: 5, Title: 'Apartment 5', Price: 25, Image: "/WebApis/images/Tiny-Apartments-kitchen.jpg", People: 5, Description: 'this is the description', Available: true }, 
    { id: 6, Title: 'Apartment 6', Price: 25, Image: "/WebApis/images/Small-apartment-design.jpg", People: 6, Description: 'this is the description', Available: true }]

app.get('/login', (req, res) => {
    try {
        // parse login and password from headers
        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

        // Verify login and password
        if (login && password && login === auth.login && password === auth.password) {
            res.status(200).send('You are authenticated.')    
            return 
        }
        // Access denied...
        res.status(401).send('Authentication required.')
    } catch (err) {
        console.warn(err);
        res.status(500).send(err)
    }
})

app.get('/apartments', (req,res) => {
    try {
        res.status(200).json(apartments);
    } catch (err) {
        console.warn(err);
        res.status(500).send(err)
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});