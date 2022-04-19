import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { NextPage } from "next";
import * as React from "react";
import Footer from "../src/Footer";
import Hero from "../src/Hero";
import Main from "../src/Main";
import NavBar from "../src/NavBar";

const theme = createTheme();

const onClickHandler = () => {
    console.log("click!");
};

const Home: NextPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar />
            <main>
                <Hero onClickHandler={onClickHandler}/>
                <Main />
            </main>
            <Footer />
        </ThemeProvider>
    );
};

export default Home;
