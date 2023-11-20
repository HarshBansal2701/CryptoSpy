import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppBar, Tab, Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase';
import { CryptoState } from '../../CryptoContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#393433',
  color: "white",
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
//   p: 4,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setalert } = CryptoState();

  const googleProvider = new GoogleAuthProvider();

  const SignInWithGoogle = () => {
    signInWithPopup(auth , googleProvider).then(res =>{
      setalert({
        open: true,
        message: `Sign Up Successfully. Welcome ${res.user.email}`,
        type: "success",
      });
      handleClose();
    }).catch((err) =>{
      setalert({
        open: true,
        message: err.message,
        type: "error",
      });
      return;
    })
  };

  return (
    <div>
      <Button variant='contained' style={{
        width: 85,
        height: 38,
        // marginLeft: 15,
        backgroundColor: "#EEBC1D",
      }} onClick={handleOpen}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar position='static' style={{ backgroundColor:"transparent", color:"white"}}>
                <Tabs value={value} onChange = {handleChange} variant='fullWidth' style={{borderRadius: 10}}>
                    <Tab label="Login" style={{fontWeight: 700}}/>
                    <Tab label="Sign Up "/>
                </Tabs>
            </AppBar>

            {value === 0 && <Login handleClose={handleClose}/>}
            {value === 1 && <Signup handleClose={handleClose}/>}

            <Box style = {{ padding: 24 , paddingTop:0 , display: "flex" , flexDirection: "column" , textAlign: "center" , gap: 20 , fontSize: 20}}>
                <span>OR</span>

                <GoogleButton style={{ width:"100%" , outline: "none"}} onClick={SignInWithGoogle}/>

            </Box>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}