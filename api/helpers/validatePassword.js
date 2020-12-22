module.exports = (pwd) => {
    if (typeof pwd !== 'string' || pwd.length < 6) {
        return false
    }
    return true
}