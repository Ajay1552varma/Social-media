import * as Yup from 'yup';

const LoginFormSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().min(8,"Minimum 8 Characters").required()
})


export default LoginFormSchema;