import { Box, Grid, List, ListItem, ListItemText } from "@mui/material";
import Typography from "@mui/material/Typography";
import { processedTopTenBuslineObj } from "../pages/api/topTenBusLines";

interface Props {
    busline: processedTopTenBuslineObj;
    direction: string;
}

export default function BusstopList({ busline, direction }: Props) {
    const directionText =
        direction === "1" ? "Outgoing direction:" : "Homebound direction:";

    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                {directionText}
            </Typography>
            <Box sx={{ backgroundColor: "grey" }}>
                <List dense>
                    {direction === "1" &&
                        busline.stops.map((stop) => {
                            if (stop.direction === "1") {
                                return (
                                    <ListItem key={stop.stopId}>
                                        <ListItemText
                                            primary={`Id: ${stop.stopId}`}
                                            secondary={
                                                stop.stopPointName &&
                                                stop.stopPointName
                                            }
                                        />
                                    </ListItem>
                                );
                            }
                        })}
                    {direction === "2" &&
                        busline.stops
                            .slice(0)
                            .reverse()
                            .map((stop) => {
                                if (stop.direction === "2") {
                                    return (
                                        <ListItem key={stop.stopId}>
                                            <ListItemText
                                                primary={`Id: ${stop.stopId}`}
                                                secondary={
                                                    stop.stopPointName &&
                                                    stop.stopPointName
                                                }
                                            />
                                        </ListItem>
                                    );
                                }
                            })}
                </List>
            </Box>
        </Grid>
    );
}
