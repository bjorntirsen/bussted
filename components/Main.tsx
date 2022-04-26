import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { processedTopTenBuslineObj } from "../pages/api/topTenBusLines";
import BuslineCard from "./BuslineCard";

interface Props {
    buslines: null | processedTopTenBuslineObj[];
    isFetchingBusData: boolean;
}

export default function Main({ buslines, isFetchingBusData }: Props) {
    return (
        <Container sx={{ py: 2 }} maxWidth="md">
            <Grid container spacing={4}>
                {buslines &&
                    buslines.map((busline: processedTopTenBuslineObj) => (
                        <Grid
                            item
                            key={busline.lineNumber}
                            xs={12}
                            sm={6}
                            md={4}
                        >
                            <BuslineCard busline={busline} />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
}
