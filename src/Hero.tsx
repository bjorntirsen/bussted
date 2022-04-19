import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface Props {
    onClickHandler: any
}

export default function Hero({onClickHandler}: Props) {
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
                    <Button variant="contained" onClick={onClickHandler}>Fetch Bus Data</Button>
                </Stack>
            </Container>
        </Box>
    );
}
