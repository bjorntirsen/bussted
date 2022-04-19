import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
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
    const fetchBuslines = async () => {
        setIsFetchingBuslines(true);
        const lineData = await fetchBuslineData();
        fetchBusstops();
        setBuslines(lineData);
        console.log("🚌buslines", lineData);
        setIsFetchingBuslines(false);
    };

    const fetchBusstops = async () => {
        setIsFetchingBusstops(true);
        const stopData = await fetchBusstopData();
        setBuslines(stopData);
        console.log("🛑busstops", stopData);
        setIsFetchingBusstops(false);
    };

    const onClickHandler = () => {
        fetchBuslines();
    };

    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
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
                    number of stops!
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={onClickHandler}>
                        Fetch Bus Data
                    </Button>
                    {isFetchingBuslines && (
                        <Typography>Fetching Bus Lines...</Typography>
                    )}
                    {isFetchingBusstops && (
                        <Typography>Fetching Bus Stops...</Typography>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
