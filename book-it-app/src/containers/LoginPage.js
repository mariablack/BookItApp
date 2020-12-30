import React , {useState} from 'react'
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

const LoginPage = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isDisable, setIsDisable] = useState(true);
const [login, setLogin] = React.useState(false)


// Props for Button Icon in Password
const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword(!showPassword);
const handleMouseDownPassword = () => setShowPassword(!showPassword);


    return(
    
         <><TextField
                required
                id="username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <TextField
                required
                id="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                    setIsDisable(false);
                }}
                type={showPassword ? 'text' : 'password'} // <-- This is where the magic happens
                InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {/* {showPassword ? <Visibility /> : <VisibilityOff />} */}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                disabled={isDisable}
                variant="contained"
                onClick={setLogin(true)}
            >
                    Login
        </Button>
        </> 
    )
}

export default LoginPage;