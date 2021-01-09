var express = require("express");
var cors = require('cors');
var app = express()

app.use(cors())

//Account username/pass
const auth = { login: 'maria', password: '1234' } 
const apartments = [
    { id: 1, Title: 'Apartment 1', Price: 25, Image: "/static/media/Small-apartment-design.bdc0e5ce.jpg",  People: 2,  Description: 'this is the description', Available: 'Yes'},
    { id: 2, Title: 'Apartment 2', Price: 25, Image: "/static/media/cozy-modern-sofa.96b83d88.jpg", People: 3, Description: 'this is the description', Available: 'Yes' },
    { id: 3, Title: 'Apartment 3', Price: 25, Image: "/static/media/Tiny-Apartments-kitchen.cfbd184e.jpg", People: 2, Description: 'this is the description', Available: 'Yes' },
    { id: 4, Title: 'Apartment 4', Price: 25, Image: "/static/media/Cozy-Studio.599c760b.jpg", People: 4, Description: 'this is the description', Available: 'Yes' }, 
    { id: 5, Title: 'Apartment 5', Price: 25, Image: "/static/media/Warm-and-Cozy.3a0c7ee4.jpg", People: 5, Description: 'this is the description', Available: 'Yes' }, 
    { id: 6, Title: 'Apartment 6', Price: 25, Image: "/static/media/white-grey-sofa.ad35ebc9.jpg", People: 6, Description: 'this is the description', Available: 'Yes' }]

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

app.listen(3001, () => {
    console.log("Server running on port 3001");
});