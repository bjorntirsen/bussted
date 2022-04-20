import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface Props {
    isFetchingBuslines: boolean;
    isFetchingBusstops: boolean;
    onClickHandler: any;
    loading: boolean;
}

export default function Hero({
    isFetchingBuslines,
    isFetchingBusstops,
    onClickHandler,
    loading,
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
                    Hit the button to get the top ten bus lines according to
                    number of stops
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                >
                    <LoadingButton
                        loading={loading}
                        loadingIndicator="Loading..."
                        variant="contained"
                        onClick={onClickHandler}
                    >
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
                        <Typography>
                            Fetching Detailed Bus Stop info...
                        </Typography>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
