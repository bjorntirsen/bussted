import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { fetchBuslineData, fetchBusstopData } from "../utils/APIhelpers";

interface Props {
    isFetchingBuslines: any;
    isFetchingBusstops: any;
    setIsFetchingBuslines: any;
    setIsFetchingBusstops: any;
    setBuslines: any;
    setBusstops: any;
}

export default function Hero({
    isFetchingBuslines,
    isFetchingBusstops,
    setIsFetchingBuslines,
    setIsFetchingBusstops,
    setBuslines,
    setBusstops,
}: Props) {
    const [loading, setLoading] = useState(false);

    const fetchBuslines = async () => {
        setIsFetchingBuslines(true);
        const lineData = await fetchBuslineData();
        setBuslines(lineData);
        console.log("🚌buslines", lineData);
        setIsFetchingBuslines(false);
    };

    const fetchBusstops = async () => {
        setIsFetchingBusstops(true);
        const stopData = await fetchBusstopData();
        setBusstops(stopData);
        console.log("🛑busstops", stopData);
        setIsFetchingBusstops(false);
    };

    const onClickHandler = async () => {
        setLoading(true)
        await fetchBuslines();
        fetchBusstops();
        setLoading(false)
    };

    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 2,
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Bussted! - bus app
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                >
                    Hit the button to get the top ten bus lines according to
                    number of stops
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                >
                    <LoadingButton loading={loading} loadingIndicator="Loading..." variant="contained" onClick={onClickHandler}>
                        Fetch Bus Data
                    </LoadingButton>
                </Stack>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                >
                    {isFetchingBuslines && (
                        <Typography>Fetching Bus Lines...</Typography>
                    )}
                    {isFetchingBusstops && (
                        <Typography>Fetching Detailed Bus Stop info...</Typography>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
