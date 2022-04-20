import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { stopObj } from "../pages/api/busData";

interface Props {
    buslines: any;
    busstops: any;
}

interface BusLine {
    lineNumber: string;
    numberOfStops: number;
    stops: stopObj[];
}

export default function Main({ buslines, busstops }: Props) {
    return (
        <Container sx={{ py: 2 }} maxWidth="md">
            <Grid container spacing={4}>
                {buslines &&
                    buslines.map((busline: BusLine) => (
                        <Grid
                            item
                            key={busline.lineNumber}
                            xs={12}
                            sm={6}
                            md={4}
                        >
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        gutterBottom
                                        variant="h3"
                                        component="h2"
                                        align="center"
                                    >
                                        <DirectionsBusIcon fontSize="large" />
                                        {busline.lineNumber}
                                    </Typography>
                                    <Typography align="center">
                                        Total number of stops:{" "}
                                        {busline.numberOfStops}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Box textAlign="center" width="100%">
                                        <Button size="small">
                                            View Details
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
}
