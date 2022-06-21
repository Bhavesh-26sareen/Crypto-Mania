import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Box, Button, Tab, Tabs } from '@material-ui/core';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import GitHubButton from 'react-github-btn'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { CurrencyContext } from '../../CryptoState';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
    // backgroundColor: "red"
  },
  github: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
    // backgroundColor: "red"
  },
  gitbutton: {
    width: "100%",
    height: "100%",
    // backgroundColor: "green",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  }

}));
function AuthModel() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { setAlert } = useContext(CurrencyContext);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();
  function signinwithgoogle() {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  }
  const githubProvider = new GithubAuthProvider();
  function signinwithgithub() {
    signInWithPopup(auth, githubProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  }

  return (
    <div>
      <Button variant="contained"
        style={{
          width: 85,
          height: 40,
          backgroundColor: "#EEBC1D",
          fontFamily: "Montserrat",
        }}
        onClick={handleOpen}>
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position="static" style={{
              backgroundColor: "transparent",
              color: "white"
            }}>
              <Tabs value={value} onChange={handleChange} variant="fullWidth" style={{
                borderRadius: 10
              }}>
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 ? <Login handleClose={handleClose} /> : <Signup handleClose={handleClose} />}
            <Box className={classes.google}>
              <span> OR </span>
              <GoogleButton style={
                {
                  width: "100%",
                  outlined: "none"
                }
              }
                onClick={signinwithgoogle}></GoogleButton>
            </Box>

            <Box className={classes.github}>

              <div className={classes.gitbutton}>
                <GitHubButton size="large" style={{ height: "100%" }}>
                </GitHubButton>
                <Button style={
                  {
                    backgroundColor: "#4285F4",
                    width: "100%",
                    height: "22px",
                    fontFamily: "Montserrat"
                  }
                }
                  onClick={signinwithgithub}>Sign in with Github</Button>
              </div>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AuthModel


