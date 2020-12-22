module.exports = (req, res, next)=>{
    try {
        const data = req.userData
        if(data._id !== req.params.userId) {
            return res.status(403).json({
                success: false,
                error: {
                    message: "Action allowed only for the owner of this account"
                }
            })
        }
        next()
    } catch (err) {
        return res.status(403).json({
            success: false,
            error: {
                message: "Forbidden"
            }            
        })
    }
}