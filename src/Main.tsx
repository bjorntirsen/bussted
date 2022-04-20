import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { BusLine } from "../pages/index";
import BuslineCard from "./BuslineCard";

interface Props {
    buslines: null | BusLine[];
    busstops: any;
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
                            <BuslineCard
                                busline={busline}
                                busstops={busstops}
                            />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
}
