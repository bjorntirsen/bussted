import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { NextPage } from "next";
import * as React from "react";
import { useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Main from "../components/Main";
import NavBar from "../components/NavBar";
import { processedTopTenBuslineObj } from "./api/topTenBusLines";

const theme = createTheme();

const Home: NextPage = () => {
    const [buslines, setBuslines] = useState<
        null | processedTopTenBuslineObj[]
    >(null);
    const [isFetchingBusData, setIsFetchingBusData] = useState(false);
    const [hideFetchButton, setHideFetchButton] = useState(false);

    const onClickHandler = async () => {
        setIsFetchingBusData(true);
        const response = await fetch("/api/topTenBusLines");
        const lineData = await response.json();
        setBuslines(lineData);
        setIsFetchingBusData(false);
        setHideFetchButton(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar />
            <main
                style={{
                    flexGrow: 1,
                }}
            >
                <Hero
                    isFetchingBusData={isFetchingBusData}
                    onClickHandler={onClickHandler}
                    hideFetchButton={hideFetchButton}
                />
                <Main
                    buslines={buslines}
                    isFetchingBusData={isFetchingBusData}
                />
            </main>
            <Footer />
        </ThemeProvider>
    );
};

export default Home;
