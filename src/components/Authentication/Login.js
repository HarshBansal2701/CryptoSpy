import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import  { signInWithEmailAndPassword }  from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../Firebase';


const Login = ( {handleClose} ) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const { setalert } = CryptoState();

    const handleSubmit = async ()=> {
        if(!email || !password){
            setalert({
                open: true,
                message: "Please fill all the fields",
                type: "error",
            });
            return ;
        }

        try {

            const result = await signInWithEmailAndPassword(auth , email, password);

            setalert({
                open: true,
                message: `Login Successful. Welcome ${result.user.email}`,
                type: "success",
            });

            handleClose();
            
        } catch (error) {
            setalert({
                open: true,
                message: error.message,
                type: "error"
            });
            return;
        }
     };



  return (
    <Box p={3} color={"whitesmoke"} style={{ display:"flex", flexDirection: "column", gap: "20px" , }}>
        <TextField variant='outlined' type='email' label="Enter Email" value={email} onChange={(e)=> setemail(e.target.value)} fullWidth/>
        <TextField variant='outlined' type='password' label="Enter Password" value={password} onChange={(e)=> setpassword(e.target.value)} fullWidth/>
       
        <Button variant='contained' size='large' style={{backgroundColor:"#EEBC1D"}} onClick={handleSubmit}>
            Login
        </Button>
    </Box>
  )
}

export default Login