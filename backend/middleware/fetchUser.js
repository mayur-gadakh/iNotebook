const jwt = require('jsonwebtoken');
const JWT_SECRET = 'id';


const fetchUser = (req, res, next) => {
    const token = req.header('authtoken');
    //this is find the tocen from the header

    if (!token) {
        res.status(401).send({ error: "please enter valid  token" })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);//this is verify the the tocen and secret
        req.user = data.user;//this is send the user id to the auth file
        next();//after this next file auth will run 
    } catch (error) {
        res.status(401).send({ error: "please enter valid  token" })

    }


}



module.exports = fetchUser;