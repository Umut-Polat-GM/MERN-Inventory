import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Button, Checkbox, Typography, FormControlLabel, Grid } from "@mui/material";
import { IconButton, InputAdornment, Box, Container, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { AccountCircle } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../utils/YupSchemas";

type FormData = {
    email: string;
    password: string;
};

type EndAdormentProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

const Login = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            setProgress(true);

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                requestOptions
            );
            const responseData = await response.json();
            console.log(responseData);

            setProgress(false);

            navigate("/");
        } catch (error) {
            setProgress(false);
            console.error("error:", error);
        }
    };

    const EndAdorment = ({ visible, setVisible }: EndAdormentProps) => {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setVisible(!visible)}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {visible ? <VisibilityIcon color="secondary" /> : <VisibilityOffIcon />}
                </IconButton>
            </InputAdornment>
        );
    };

    return (
        <Grid container height={"100vh"}>
            <Grid
                item
                md={8}
                sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: `url(${"https://picsum.photos/id/111/2000/1200"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></Grid>
            <Grid
                item
                xs={12}
                md={4}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Container component="main" maxWidth="xs">
                    <Box className="flex flex-col justify-center items-center">
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login Form
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                variant="outlined"
                                id="email"
                                label="Email Address"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                color="secondary"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle color="secondary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                variant="outlined"
                                id="password"
                                label="Password"
                                type={visible ? "text" : "password"}
                                autoComplete="current-password"
                                color="secondary"
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors?.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <EndAdorment visible={visible} setVisible={setVisible} />
                                    ),
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HttpsIcon color="secondary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="secondary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ my: 2, borderRadius: 10, textTransform: "capitalize" }}
                                color="secondary"
                                startIcon={
                                    progress ? (
                                        <CircularProgress color="inherit" size={"16px"} />
                                    ) : (
                                        <LoginIcon />
                                    )
                                }
                            >
                                Login
                            </Button>
                            <Box className="flex justify-between">
                                <Typography
                                    className="cursor-pointer flex items-center gap-1 hover:text-gray-700 duration-200"
                                    onClick={() => navigate("/register")}
                                >
                                    Forgot passwor
                                </Typography>

                                <Typography
                                    className="cursor-pointer flex items-center gap-1 hover:text-gray-700 duration-200"
                                    onClick={() => navigate("/register")}
                                >
                                    You don't have an account? Sign Up
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Login;
