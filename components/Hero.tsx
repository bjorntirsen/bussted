import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface Props {
    isFetchingBusData: boolean;
    onClickHandler: any;
    hideFetchButton: boolean;
}

export default function Hero({
    isFetchingBusData,
    onClickHandler,
    hideFetchButton,
}: Props) {
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
                    {!hideFetchButton
                        ? "Hit the button to get the top ten bus lines according to number of stops"
                        : "The top ten bus lines according to number of stops:"}
                </Typography>
                {!hideFetchButton && (
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                    >
                        <LoadingButton
                            loading={isFetchingBusData}
                            loadingIndicator="Loading..."
                            variant="contained"
                            onClick={onClickHandler}
                        >
                            Fetch Bus Data
                        </LoadingButton>
                    </Stack>
                )}
                {!hideFetchButton && (
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                    >
                        {isFetchingBusData && (
                            <Typography>Fetching Bus Data...</Typography>
                        )}
                    </Stack>
                )}
            </Container>
        </Box>
    );
}
