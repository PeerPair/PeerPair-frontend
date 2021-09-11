import React from 'react';
import emailjs from 'emailjs-com';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const ContactUs = (props) => {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_t84uk1d', 'template_hoavy2d', e.target, 'user_pY4vLSW2UR1ntEkbLihPC')
      .then((result) => {
        console.log(result);
      }, (error) => {
        console.log(error);
      });
      e.target.reset();
  }

  const useStyles = makeStyles((theme) => ({
    button: {
      textShadow: "2px 1px 3px rgba(24, 24, 24, 0.39)",
      color: "white",
      width: "11.8em",
      backgroundColor: "rgba(90, 214, 224,.7)",
    },
    paper: {
      marginTop: '180px',
      marginLeft: '-50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '530px',
      height: '450px',
      borderRadius: '7px',
      boxShadow: '1',
    },
    textField: {
      [`& fieldset`]: {
        borderRadius: 30,
      },
      [`&.Mui-focused `]: {
        padding: 30,
      },
      "&.Mui-activated fieldset": {
        padding: 30,
      },
    }
  }));
  const classes = useStyles();
  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5"
          style={{ fontFamily: '"Righteous", cursive', color: 'rgb(50, 218, 231)', marginTop: '30px', marginBottom: '10px' }}
        >
          Get In Touch
        </Typography>
        <form className={classes.form} onSubmit={sendEmail}>
          <input type="hidden" name="contact_number" />
          <br></br>
          <TextField
            name="firstName"
            type="text"
            variant="outlined"
            margin="normal"
            required
            className={classes.textField}
            style={{ wordSpacing: '15px', fontWeight: 'bold' }}
            placeholder="Your First Name "
            label="First_Name"
          />
          <span> </span>
          <TextField
            name="lastName"
            type="text"
            variant="outlined"
            margin="normal"
            required
            className={classes.textField}
            style={{ wordSpacing: '15px', fontWeight: 'bold' }}
            placeholder="Your Last Name "
            label="Last_Name"
          />
          <br></br>
          <br></br>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            type="email"
            autoComplete="email"
            className={classes.textField}
            style={{ wordSpacing: '15px', fontWeight: 'bold' }}
            placeholder="Enter Your Email "
            label="Email"
          />
          <br></br>
          <br></br>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="message"
            type="text"
            className={classes.textField}
            style={{ wordSpacing: '15px', fontWeight: 'bold' }}
            placeholder="Enter Your Message "
            label="Message"
          />
          <br></br>
          <Button
            type="submit"
            variant="contained"
            className={`${classes.button} + newbtn`}
            style={{ width: '250px', marginLeft: '100px', marginTop: '10px' }}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default ContactUs;