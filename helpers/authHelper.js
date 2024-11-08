import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        const saltRouds = 10 
        const hashedPass = await bcrypt.hash(password, saltRouds)
        return hashedPass
    } catch (error) {
     console.log(error)   
    }
}

export const comparePassword = async (password, hashedPass) => {
    return bcrypt.compare(password,hashedPass)
}