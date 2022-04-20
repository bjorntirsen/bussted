import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { NextPage } from "next";
import * as React from "react";
import { useState } from "react";
import Footer from "../src/Footer";
import Hero from "../src/Hero";
import Main from "../src/Main";
import NavBar from "../src/NavBar";

const theme = createTheme();

const Home: NextPage = () => {
    const [buslines, setBuslines] = useState(null);
    const [busstops, setBusstops] = useState(null);
    const [isFetchingBuslines, setIsFetchingBuslines] = useState(false);
    const [isFetchingBusstops, setIsFetchingBusstops] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar />
            <main>
                <Hero
                    isFetchingBuslines={isFetchingBuslines}
                    isFetchingBusstops={isFetchingBusstops}
                    setIsFetchingBuslines={setIsFetchingBuslines}
                    setIsFetchingBusstops={setIsFetchingBusstops}
                    setBuslines={setBuslines}
                    setBusstops={setBusstops}
                />
                <Main buslines={buslines} busstops={busstops}/>
            </main>
            <Footer />
        </ThemeProvider>
    );
};

export default Home;
