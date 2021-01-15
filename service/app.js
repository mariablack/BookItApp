var express = require("express");
var cors = require('cors');
var app = express()
app.use(express.static('service'))
app.use(express.static('images'))

app.use(cors())

//Account username/pass
const auth = { login: 'maria', password: '1234' } 
const apartments = [
    { id: 1, Title: 'Apartment 1', Price: 25, Image: "http://localhost:3001/Small-apartment-design.jpg", People: 2, Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', From: '10-1-2021', To: '29-1-2021'},
    { id: 2, Title: 'Apartment 2', Price: 25, Image: "http://localhost:3001/cozy-modern-sofa.jpg", People: 3, Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', From: '6-2-2021', To: '15-2-2021' },
    { id: 3, Title: 'Apartment 3', Price: 25, Image: "http://localhost:3001/Tiny-Apartments-kitchen.jpg", People: 2, Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', From: '3-3-2021', To: '14-3-2021' },
    { id: 4, Title: 'Apartment 4', Price: 25, Image: "http://localhost:3001/Cozy-Studio.jpg", People: 4, Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', From: '12-4-2021', To: '1-5-2021' }, 
    { id: 5, Title: 'Apartment 5', Price: 25, Image: "http://localhost:3001/Warm-and-Cozy.jpg", People: 5, Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', From: '13-6-2021', To: '20-7-2021' }, 
    { id: 6, Title: 'Apartment 6', Price: 25, Image: "http://localhost:3001/white-grey-sofa.jpg", People: 6, Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', From: '22-7-2021', To: '20-9-2021'}]


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