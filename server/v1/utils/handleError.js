// utils
module.exports.handleError = (err)=>{
        const errors = {email:"",password:""};
        if(err.code === 11000 && err.message.includes('email')){
            errors.email = "This email is already registered"
            return errors
        }
        if(err.code === 11000 && err.message.includes("username") ){
            errors.username = "This user name already registered"
            return errors;
        }
    // validation errs
    if(err.message.includes('User validation failed'))
        Object.values(err.errors).forEach(({properties})=>{
           errors[properties.path] = properties.message
        })
    if(err.message.includes('Incorrect')){
        errors.incorrect = 'Incorrect credentials'
    }
    return errors;
}
