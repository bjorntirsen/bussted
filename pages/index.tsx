import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { NextPage } from "next";
import * as React from "react";
import { useState } from "react";
import Footer from "../src/Footer";
import Hero from "../src/Hero";
import Main from "../src/Main";
import NavBar from "../src/NavBar";
import { fetchBuslineData, fetchBusstopData } from "../utils/APIhelpers";
import { processedBusstopObj } from "./api/busstopData";

const theme = createTheme();

export interface stopObj {
    stopId: number;
    direction: string;
    stopPointName?: string;
    locationNorthingCoordinate?: string;
    locationEastingCoordinate?: string;
}

export interface BusLine {
    lineNumber: string;
    numberOfStops: number;
    stops: stopObj[];
}

const Home: NextPage = () => {
    const [buslines, setBuslines] = useState<null | BusLine[]>(null);
    const [isFetchingBuslines, setIsFetchingBuslines] = useState(false);
    const [isFetchingBusstopDetails, setIsFetchingBusstopDetails] =
        useState(false);
    const [loading, setLoading] = useState(false);

    const fetchBuslines = async () => {
        setIsFetchingBuslines(true);
        const lineData = await fetchBuslineData();
        setBuslines(lineData);
        setIsFetchingBuslines(false);
        return lineData;
    };

    const fetchBusstops = async () => {
        setIsFetchingBusstopDetails(true);
        const stopData = await fetchBusstopData();
        setIsFetchingBusstopDetails(false);
        return stopData;
    };

    const addDetailsToBusstops = (
        lineData: BusLine[],
        stopData: processedBusstopObj
    ) => {
        const newBuslinesState = lineData.map((busline) => {
            const updatedStopArray = busline.stops.map((busstop) => {
                const {
                    stopPointName,
                    locationNorthingCoordinate,
                    locationEastingCoordinate,
                } = stopData[busstop.stopId];
                return {
                    ...busstop,
                    stopPointName,
                    locationNorthingCoordinate,
                    locationEastingCoordinate,
                };
            });
            return { ...busline, stops: updatedStopArray };
        });
        setBuslines(newBuslinesState);
    };

    const onClickHandler = async () => {
        setLoading(true);
        const lineData = await fetchBuslines();
        const stopData = await fetchBusstops();
        addDetailsToBusstops(lineData, stopData);
        setLoading(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar />
            <main>
                <Hero
                    isFetchingBuslines={isFetchingBuslines}
                    isFetchingBusstopDetails={isFetchingBusstopDetails}
                    onClickHandler={onClickHandler}
                    loading={loading}
                />
                <Main
                    buslines={buslines}
                    isFetchingBusstopDetails={isFetchingBusstopDetails}
                />
            </main>
            <Footer />
        </ThemeProvider>
    );
};

export default Home;
