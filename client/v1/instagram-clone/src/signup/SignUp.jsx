import React from 'react'
import { Formik ,Form,Field} from 'formik';
import * as yup from "yup";
import Customerror from './Error'
import './style.css'

const validationSchema=yup.object({
  email:yup.string().email('Must be a valid email').max(255).required('Email is required'),
  name:yup.string().min(3).required("Name is requred !").max(25),
  uname:yup.string().min(6).required("Username is requared"),
  pass: yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
 age:yup.string()
.required()
.matches(/^[0-9]+$/, "Must be only digits")
.min(1, 'Must be exactly 5 digits')
.max(3, 'Must be exactly 5 digits'),
bio:yup.string().required().max(50),
});

function SignUp() {
  return (
    <div>
    <div className='wrapper'>
    <div className='main-container'>
      <Formik 
       validationSchema={validationSchema}
          initialValues=
          {{
          email:"",
          name:"",
          uname:"",
          pass:"",
          age:"",
        }} 
          onSubmit={(value)=>{
            console.log(value);
          }}
        >
         <Form>
            
            <img className='insta' src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
            <p className='disc'>Sign up to see photos and videos from your friends.</p>
            <p className= 'loginwith-face'> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///9HWZM9UY81S4z09fgxSIqkq8Xd4OpAU5CHkbU7T46Zob5EVpG+w9ZBVJBjcKB/ibBOYJjn6fGwt85ebZ/w8fZreabU1+RUZJrFytt0gKrl5+/N0eBZaZ1dbJ9LXZe5vtOTm7yhqcUVgHx+AAAEAUlEQVR4nO2d6XarIBRGDQ4xBI1mTlozvf9DtmmzbtNGUC6DHNe3fyfgXijo4QBRBAAAAAAAAAAAAAAAAAAAAAAAAAAAADAn8Ytnu+WqavLUJ+ft9d2f5eGY81JM/FLmcX1devGbLnjp2e6BYHzuoR3n6UB+X7B659gv2fIB/T4RfOVWcJEPK/hJ7FQxAEG3ihUb2u4L7uxZLOKh3b4RtaMeNfE9BEphVzeG8zDu0TvcydCfnIf2+sFNI14GHgmfcfMkHod8l/lL/G5fMAlhKPxH7uA23QUyVHxTbu0bhvQY3rH/IGbhjBV30vEb2h8RAzOMpzCEIQytI14Yj6HIORfn/eIvucqRjqFgfD27TDctNS7XCkUqhmW6zt6kVb4pXhRpGIp4q4641PJGJGHI110RJdqGgmeddZI2FKJHSJCyYXlu6z1HZFju+wgSNhR1v28fuoa8ZxyJrCG/9ayTqqHY962TqmH/WCdRw/LYu06ihn27GbKGYt2/TpqGrPt1lLghl38PvqCYCwrXsP9QEUUHxURCuIYdc5vJZrl5sFzRjNPwQl5FUZ3qn18KZYXhGsbSxzBLedkRQqRhKCu/0pufDNZQ2tHcNCdgwzWUzN1udGeYgzUsq/bSV7ozzMEayjIMtBM9wjWct5euXRA5Q+00CGqGCQxhCEMYwhCGMIQhDGEIQxiqEYw/kUoMU/4KoxEvLfdZ8Ywkx+RSvHLbU4jqi6ZX0kU7yZ7AzIzGZGELiomLYAxzo5T6TTp2w6k8ijoSw/HfpSt5nSMxnMvXy43EUBEJH4nhicB4aGZIYR7fzFA+HAZkqJFb8gKJ1QjMZIOHdwp3KTO5kIKCITe5kJuiymAMjdpwplggH4yhURtuKXwBG7VhQ2HtmkkbJrWi4HAMDUaLJYlIlCwzoQ/KHJtgDCf5f29bVSiz+MIxnLDmeW3vWpIxdHpZBdyo6wvI8PcibSbJ+ronXuos5Q7K8BeyvDbtwmEIQxjCEIYwhCEMYQhDGOobks6ngSEMYQhDGMJQFzbC/NLfjDGDFoYwhCEMYQhDGDozdLCvviIjeQhDZt9QtWmTf0PRWBfU31/FqaEsZmeEKkPJu6GT8+WsHPdky9As91jC1MaDaMnQxTEzkTpV0LMhPzgx3FloRDuG4uREMIoq8yOf7Bg6eKF5XMfEuDu1YsgN0gE7MD/VyoZh7qab+cb4xcaCYb5wemLuITa7Uc0N2cnxkcC7iVF3Y2wYV87PPE6q2GBcNDRkQrE5qD12W/VmAK4MSz7xcWj1F9N5k3LGcn1i2Z4KHf9jPObHi8Hafn02h1U206e6tBtW6r9ds8vO39nxAAAAAAAAAAAAAAAAAAAAAAAAAAAAjJcPriR27CHd9lQAAAAASUVORK5CYII=" alt="" /> Login with facebook</p>
            <p>OR</p>
           <Field className='input-field' placeholder="Email" name="email" type="email"></Field>
           <Customerror name="email"/>
           <Field className='input-field' placeholder="Full Name" name="name" type="text"></Field>
           <Customerror name="name"/>
           <Field className='input-field' placeholder="Username" name="uname" type="text"></Field>
           <Customerror name="uname"/>
           <Field className='input-field' placeholder="Age" name="age" type="number"></Field>
           <Customerror name="age"/>
           <Field className='input-field' placeholder="Bio" name="bio" type="text"></Field>
           <Customerror name="bio"/>
           <Field className='input-field' placeholder="Profile pic" name="file" type="file"></Field>
           <Customerror name="file"/>
           <Field className='input-field' placeholder="Date of birth" name="date" type="date"></Field>
           <Customerror name="date"/>
           <Field className='input-field' placeholder="Password" name="pass" type="password"></Field>
           <Customerror name="pass"/>
           <p className='content'>People who use our service may have uploaded your contact information to Instagram <a href='google.com'>Learn more</a></p>
          <p className='content'>By signing up, you agree to our Terms , Data Policy and Cookies Policy </p>
           <br/>
           <button className='btn' type="submit">Sign up</button>
         </Form>
       </Formik> 
    </div>
  </div>
  <div className='acc'>
    <p>Have an account? <a href='www.facebook.com'>Log in</a></p>
  </div>
</div>
  )
}

export default SignUp