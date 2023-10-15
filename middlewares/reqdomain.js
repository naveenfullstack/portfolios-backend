const ReqDomain = (req, res, next) => {
    // Extract the domain from the 'referer' header of the request
    const referer = req.get('referer');

    // Parse the referer URL to get the domain
    const domain = referer ? new URL(referer).hostname : 'Unknown Domain';

    // Get the current date and time
    const now = new Date();
    const formattedDate = `${now.getFullYear()} ${now.toLocaleString('default', { month: 'short' })} ${now.getDate()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    // Log the domain, request time and date, and client's IP address to the console
    console.log(`${domain} has requested at ${formattedDate}`);

    // Continue processing the request
    next();
};

module.exports = ReqDomain;
