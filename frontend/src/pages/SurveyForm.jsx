import {
    Container,
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Avatar,
    FormLabel,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Dialog,
    DialogActions,
    
  } from "@mui/material";
  import CssBaseline from "@mui/material/CssBaseline";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import img from "../assets/images/surveyor.png";
  import Radio from "@mui/material/Radio";
  import RadioGroup from "@mui/material/RadioGroup";
  import FormControlLabel from "@mui/material/FormControlLabel";
  import { useState } from "react";
  import { postData } from "../services/FetchNodeService";
  import Navbar from "../component/Navbar";
  import Swal from "sweetalert2";
  import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
  
  // const defaultTheme = createTheme();
  // Create a custom theme
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#1976D2", // Change this to your desired primary color
      },
      secondary: {
        main: "#FF4081", // Change this to your desired secondary color
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif", // Change this to your desired font family
    },
  });
  
  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));
  
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Satisfied',
    },
  };
  
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };
  
  export const SurveyForm = () => {
    const [name , setName] = useState('');
    const [gender , setGender] = useState('');
    const [nationality , setNationality] = useState('');
    const [email , setEmail] = useState('');
    const [phone , setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [open,setOpen] = useState(false)
  
    const handleSubmit = async () =>{
      let body = {
        name : name,
        gender : gender,
        nationality : nationality,
        email : email,
        phone : phone,
        address : address,
        message : message
      }
      console.log("body", body);
      var result = await postData("survey/submit-survey" , body)
      console.log(result);

      if(result.status){
        Swal.fire({
            icon: "success",
            title: "Survey Submitted",
            text: result.message,
          });
          // Clear the form fields after successful submission
      setName('');
      setGender('');
      setNationality('');
      setEmail('');
      setPhone('');
      setAddress('');
      setMessage('');

      setOpen(true);
      }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.message,
          });
      }
  
    }

    const handleClose = () => {
      setOpen(false);
    };
  
  
    return (
      <>
      <Navbar/>
        <ThemeProvider theme={customTheme} >
          <Container component="main" maxWidth="md" >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 100, height: 100 }} src={img}></Avatar>
              <Typography component="h1" variant="h5">
                Survey Form
              </Typography>
              <Box noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      required
                      fullWidth
                      label="Full Name"
                      autoFocus
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <FormLabel>Gendar</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        
                        onChange={(event) => setGender(event.target.value)}
                      >
                        <FormControlLabel
                          value="Male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="Female"
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Nationality</InputLabel>
                      <Select
                        onChange={(event) => setNationality(event.target.value)}
                        label="Nationality"
                       
                      >
                        <MenuItem>-Select Your Country-</MenuItem>
                        <MenuItem value="">-- select one --</MenuItem>
                        <MenuItem value="afghan">Afghan</MenuItem>
                        <MenuItem value="albanian">Albanian</MenuItem>
                        <MenuItem value="algerian">Algerian</MenuItem>
                        <MenuItem value="american">American</MenuItem>
                        <MenuItem value="andorran">Andorran</MenuItem>
                        <MenuItem value="angolan">Angolan</MenuItem>
                        <MenuItem value="antiguans">Antiguans</MenuItem>
                        <MenuItem value="argentinean">Argentinean</MenuItem>
                        <MenuItem value="armenian">Armenian</MenuItem>
                        <MenuItem value="australian">Australian</MenuItem>
                        <MenuItem value="austrian">Austrian</MenuItem>
                        <MenuItem value="azerbaijani">Azerbaijani</MenuItem>
                        <MenuItem value="bahamian">Bahamian</MenuItem>
                        <MenuItem value="bahraini">Bahraini</MenuItem>
                        <MenuItem value="bangladeshi">Bangladeshi</MenuItem>
                        <MenuItem value="barbadian">Barbadian</MenuItem>
                        <MenuItem value="barbudans">Barbudans</MenuItem>
                        <MenuItem value="batswana">Batswana</MenuItem>
                        <MenuItem value="belarusian">Belarusian</MenuItem>
                        <MenuItem value="belgian">Belgian</MenuItem>
                        <MenuItem value="belizean">Belizean</MenuItem>
                        <MenuItem value="beninese">Beninese</MenuItem>
                        <MenuItem value="bhutanese">Bhutanese</MenuItem>
                        <MenuItem value="bolivian">Bolivian</MenuItem>
                        <MenuItem value="bosnian">Bosnian</MenuItem>
                        <MenuItem value="brazilian">Brazilian</MenuItem>
                        <MenuItem value="british">British</MenuItem>
                        <MenuItem value="bruneian">Bruneian</MenuItem>
                        <MenuItem value="bulgarian">Bulgarian</MenuItem>
                        <MenuItem value="burkinabe">Burkinabe</MenuItem>
                        <MenuItem value="burmese">Burmese</MenuItem>
                        <MenuItem value="burundian">Burundian</MenuItem>
                        <MenuItem value="cambodian">Cambodian</MenuItem>
                        <MenuItem value="cameroonian">Cameroonian</MenuItem>
                        <MenuItem value="canadian">Canadian</MenuItem>
                        <MenuItem value="cape verdean">Cape Verdean</MenuItem>
                        <MenuItem value="central african">
                          Central African
                        </MenuItem>
                        <MenuItem value="chadian">Chadian</MenuItem>
                        <MenuItem value="chilean">Chilean</MenuItem>
                        <MenuItem value="chinese">Chinese</MenuItem>
                        <MenuItem value="colombian">Colombian</MenuItem>
                        <MenuItem value="comoran">Comoran</MenuItem>
                        <MenuItem value="congolese">Congolese</MenuItem>
                        <MenuItem value="costa rican">Costa Rican</MenuItem>
                        <MenuItem value="croatian">Croatian</MenuItem>
                        <MenuItem value="cuban">Cuban</MenuItem>
                        <MenuItem value="cypriot">Cypriot</MenuItem>
                        <MenuItem value="czech">Czech</MenuItem>
                        <MenuItem value="danish">Danish</MenuItem>
                        <MenuItem value="djibouti">Djibouti</MenuItem>
                        <MenuItem value="dominican">Dominican</MenuItem>
                        <MenuItem value="dutch">Dutch</MenuItem>
                        <MenuItem value="east timorese">East Timorese</MenuItem>
                        <MenuItem value="ecuadorean">Ecuadorean</MenuItem>
                        <MenuItem value="egyptian">Egyptian</MenuItem>
                        <MenuItem value="emirian">Emirian</MenuItem>
                        <MenuItem value="equatorial guinean">
                          Equatorial Guinean
                        </MenuItem>
                        <MenuItem value="eritrean">Eritrean</MenuItem>
                        <MenuItem value="estonian">Estonian</MenuItem>
                        <MenuItem value="ethiopian">Ethiopian</MenuItem>
                        <MenuItem value="fijian">Fijian</MenuItem>
                        <MenuItem value="filipino">Filipino</MenuItem>
                        <MenuItem value="finnish">Finnish</MenuItem>
                        <MenuItem value="french">French</MenuItem>
                        <MenuItem value="gabonese">Gabonese</MenuItem>
                        <MenuItem value="gambian">Gambian</MenuItem>
                        <MenuItem value="georgian">Georgian</MenuItem>
                        <MenuItem value="german">German</MenuItem>
                        <MenuItem value="ghanaian">Ghanaian</MenuItem>
                        <MenuItem value="greek">Greek</MenuItem>
                        <MenuItem value="grenadian">Grenadian</MenuItem>
                        <MenuItem value="guatemalan">Guatemalan</MenuItem>
                        <MenuItem value="guinea-bissauan">
                          Guinea-Bissauan
                        </MenuItem>
                        <MenuItem value="guinean">Guinean</MenuItem>
                        <MenuItem value="guyanese">Guyanese</MenuItem>
                        <MenuItem value="haitian">Haitian</MenuItem>
                        <MenuItem value="herzegovinian">Herzegovinian</MenuItem>
                        <MenuItem value="honduran">Honduran</MenuItem>
                        <MenuItem value="hungarian">Hungarian</MenuItem>
                        <MenuItem value="icelander">Icelander</MenuItem>
                        <MenuItem value="indian">Indian</MenuItem>
                        <MenuItem value="indonesian">Indonesian</MenuItem>
                        <MenuItem value="iranian">Iranian</MenuItem>
                        <MenuItem value="iraqi">Iraqi</MenuItem>
                        <MenuItem value="irish">Irish</MenuItem>
                        <MenuItem value="israeli">Israeli</MenuItem>
                        <MenuItem value="italian">Italian</MenuItem>
                        <MenuItem value="ivorian">Ivorian</MenuItem>
                        <MenuItem value="jamaican">Jamaican</MenuItem>
                        <MenuItem value="japanese">Japanese</MenuItem>
                        <MenuItem value="jordanian">Jordanian</MenuItem>
                        <MenuItem value="kazakhstani">Kazakhstani</MenuItem>
                        <MenuItem value="kenyan">Kenyan</MenuItem>
                        <MenuItem value="kittian and nevisian">
                          Kittian and Nevisian
                        </MenuItem>
                        <MenuItem value="kuwaiti">Kuwaiti</MenuItem>
                        <MenuItem value="kyrgyz">Kyrgyz</MenuItem>
                        <MenuItem value="laotian">Laotian</MenuItem>
                        <MenuItem value="latvian">Latvian</MenuItem>
                        <MenuItem value="lebanese">Lebanese</MenuItem>
                        <MenuItem value="liberian">Liberian</MenuItem>
                        <MenuItem value="libyan">Libyan</MenuItem>
                        <MenuItem value="liechtensteiner">
                          Liechtensteiner
                        </MenuItem>
                        <MenuItem value="lithuanian">Lithuanian</MenuItem>
                        <MenuItem value="luxembourger">Luxembourger</MenuItem>
                        <MenuItem value="macedonian">Macedonian</MenuItem>
                        <MenuItem value="malagasy">Malagasy</MenuItem>
                        <MenuItem value="malawian">Malawian</MenuItem>
                        <MenuItem value="malaysian">Malaysian</MenuItem>
                        <MenuItem value="maldivan">Maldivan</MenuItem>
                        <MenuItem value="malian">Malian</MenuItem>
                        <MenuItem value="maltese">Maltese</MenuItem>
                        <MenuItem value="marshallese">Marshallese</MenuItem>
                        <MenuItem value="mauritanian">Mauritanian</MenuItem>
                        <MenuItem value="mauritian">Mauritian</MenuItem>
                        <MenuItem value="mexican">Mexican</MenuItem>
                        <MenuItem value="micronesian">Micronesian</MenuItem>
                        <MenuItem value="moldovan">Moldovan</MenuItem>
                        <MenuItem value="monacan">Monacan</MenuItem>
                        <MenuItem value="mongolian">Mongolian</MenuItem>
                        <MenuItem value="moroccan">Moroccan</MenuItem>
                        <MenuItem value="mosotho">Mosotho</MenuItem>
                        <MenuItem value="motswana">Motswana</MenuItem>
                        <MenuItem value="mozambican">Mozambican</MenuItem>
                        <MenuItem value="namibian">Namibian</MenuItem>
                        <MenuItem value="nauruan">Nauruan</MenuItem>
                        <MenuItem value="nepalese">Nepalese</MenuItem>
                        <MenuItem value="new zealander">New Zealander</MenuItem>
                        <MenuItem value="ni-vanuatu">Ni-Vanuatu</MenuItem>
                        <MenuItem value="nicaraguan">Nicaraguan</MenuItem>
                        <MenuItem value="nigerien">Nigerien</MenuItem>
                        <MenuItem value="north korean">North Korean</MenuItem>
                        <MenuItem value="northern irish">Northern Irish</MenuItem>
                        <MenuItem value="norwegian">Norwegian</MenuItem>
                        <MenuItem value="omani">Omani</MenuItem>
                        <MenuItem value="pakistani">Pakistani</MenuItem>
                        <MenuItem value="palauan">Palauan</MenuItem>
                        <MenuItem value="panamanian">Panamanian</MenuItem>
                        <MenuItem value="papua new guinean">
                          Papua New Guinean
                        </MenuItem>
                        <MenuItem value="paraguayan">Paraguayan</MenuItem>
                        <MenuItem value="peruvian">Peruvian</MenuItem>
                        <MenuItem value="polish">Polish</MenuItem>
                        <MenuItem value="portuguese">Portuguese</MenuItem>
                        <MenuItem value="qatari">Qatari</MenuItem>
                        <MenuItem value="romanian">Romanian</MenuItem>
                        <MenuItem value="russian">Russian</MenuItem>
                        <MenuItem value="rwandan">Rwandan</MenuItem>
                        <MenuItem value="saint lucian">Saint Lucian</MenuItem>
                        <MenuItem value="salvadoran">Salvadoran</MenuItem>
                        <MenuItem value="samoan">Samoan</MenuItem>
                        <MenuItem value="san marinese">San Marinese</MenuItem>
                        <MenuItem value="sao tomean">Sao Tomean</MenuItem>
                        <MenuItem value="saudi">Saudi</MenuItem>
                      
                        <MenuItem value="somali">Somali</MenuItem>
                        <MenuItem value="south african">South African</MenuItem>
                        <MenuItem value="south korean">South Korean</MenuItem>
                        <MenuItem value="spanish">Spanish</MenuItem>
                        <MenuItem value="sri lankan">Sri Lankan</MenuItem>
                        <MenuItem value="sudanese">Sudanese</MenuItem>
                        <MenuItem value="surinamer">Surinamer</MenuItem>
                        <MenuItem value="swazi">Swazi</MenuItem>
                        <MenuItem value="swedish">Swedish</MenuItem>
                        <MenuItem value="swiss">Swiss</MenuItem>
                        <MenuItem value="syrian">Syrian</MenuItem>
                        <MenuItem value="taiwanese">Taiwanese</MenuItem>
                        <MenuItem value="tajik">Tajik</MenuItem>
                        <MenuItem value="tanzanian">Tanzanian</MenuItem>
                        <MenuItem value="thai">Thai</MenuItem>
                        <MenuItem value="togolese">Togolese</MenuItem>
                        <MenuItem value="tongan">Tongan</MenuItem>
                        <MenuItem value="trinidadian or tobagonian">
                          Trinidadian or Tobagonian
                        </MenuItem>
                        
                        <MenuItem value="tuvaluan">Tuvaluan</MenuItem>
                        <MenuItem value="ugandan">Ugandan</MenuItem>
                        <MenuItem value="ukrainian">Ukrainian</MenuItem>
                        <MenuItem value="uruguayan">Uruguayan</MenuItem>
                        <MenuItem value="uzbekistani">Uzbekistani</MenuItem>
                        <MenuItem value="venezuelan">Venezuelan</MenuItem>
                        <MenuItem value="vietnamese">Vietnamese</MenuItem>
                        <MenuItem value="welsh">Welsh</MenuItem>
                        <MenuItem value="yemenite">Yemenite</MenuItem>
                        <MenuItem value="zambian">Zambian</MenuItem>
                        <MenuItem value="zimbabwean">Zimbabwean</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                  
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      label="Phone Number"
                      type="number"
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth label="Address" 
                     onChange={(event) => setAddress(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-multiline-static"
                      label="Message"
                      multiline
                      rows={4}
                      fullWidth
                      onChange={(event) => setMessage(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Grid container justifyContent="flex-end">
                 
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         please give me a feedback
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <StyledRating
      name="highlight-selected-only"
      defaultValue={2}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
    />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose} autoFocus>
           Submit
          </Button>
        </DialogActions>
      </Dialog>
      </>
    );
  };
  