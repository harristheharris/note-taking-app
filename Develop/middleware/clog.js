// Custom middleware that logs out the type and path of each request to the server
// we are just console logging our request. seems very helpful so we took it from the min project
const clog = (req, res, next) => {
    //loooool we are setting colors in the console. very based
    const fgCyan = '\x1b[36m';
    //refresher on switch
    //switch evals once. It goes through each case looking for a match. The first case that matches it, that block of code will run
    //thefore
    //we have req.method as the object we are looking for a match for
    //we have three scenarios
    //'get'
    //'post'
    // and then a default one if neither of the other ones are a match
    //if we the req.method is a 'get' THEN that block of code will run
    //if the req.method is a 'post' THEN that block of code will run
    //the default will run if neither of the others do 
    switch (req.method) {
      case 'GET': {
        console.info(`📗 ${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      case 'POST': {
        console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      default:
        console.log(`📙${fgCyan}${req.method} request to ${req.path}`);
    }
  
    next();
  };
  
  exports.clog = clog;
  