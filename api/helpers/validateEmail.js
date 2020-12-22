module.exports = (email) => {
    if (typeof email !== 'string') {
        return false
    } 
    const valid = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    return valid.test(email)
}