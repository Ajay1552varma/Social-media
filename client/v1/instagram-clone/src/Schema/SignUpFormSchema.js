import * as Yup from 'yup';

const SignUpFormSchema = Yup.object().shape({
    name: Yup.string().min(3,"Minimum 3 characters").required("Name is required"),
    dob: Yup.date().required(),
    bio: Yup.string().max(50,"Maximum 50 characters"),
    email: Yup.string().email().required(),
    username: Yup.string().required(),
    password: Yup.string().min(8,"Minimum 8 Characters").required()
})


export default SignUpFormSchema;