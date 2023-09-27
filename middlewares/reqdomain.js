// Create a middleware to pick the domain from the request and log it
const ReqDomain = (req, res, next) => {
    // Extract the domain from the 'referer' header of the request
    const referer = req.get('referer');

    // Parse the referer URL to get the domain
    if (referer) {
        const urlParts = new URL(referer);
        const domain = urlParts.hostname;
        
        // Log the domain to the console
        console.log(`Request from domain: ${domain}`);
    } else {
        console.log('Request from an unknown domain');
    }

    // Continue processing the request
    next();
};

module.exports = ReqDomain;