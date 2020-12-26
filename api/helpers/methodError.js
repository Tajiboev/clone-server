module.exports.methodError = (methods) => (req, res, next) => {
    const allowedMethods = methods.allowed.join(', ').trim()
    res.set('Allow', allowedMethods).status(405).json({errorMessage: `The ${req.method} method for the ${req.originalUrl} route is not supported.`});
}
