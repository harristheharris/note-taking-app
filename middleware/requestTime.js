//started learning about middleware and and found this tool that allows us to see the time when a request is made. not neccassary in the slightest for this 

const requestTime = (req , res, next) => {
    req.requestTime = Date.now();
    next();
}

exports.requestTime = requestTime;