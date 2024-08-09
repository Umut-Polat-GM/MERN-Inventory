import { ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import { ModeState } from "./store/mode/modeSlice";


function App() {
    const mode = useSelector((state: { mode: ModeState }) => state.mode.mode);
    const [theme, setTheme] = useState(createTheme({ palette: { mode: mode } }));
    
    useEffect(() => {
        setTheme(createTheme({ palette: { mode: mode } }));
    }, [mode]);
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
