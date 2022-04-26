import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { processedTopTenBuslineObj } from "../pages/api/topTenBusLines";
import BuslineModal from "./BuslineModal";

interface Props {
    busline: processedTopTenBuslineObj;
}

export default function BuslineCard({ busline }: Props) {
    return (
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
                    Total number of stops: {busline.numberOfStops}
                </Typography>
            </CardContent>
            <CardActions>
                <BuslineModal busline={busline} />
            </CardActions>
        </Card>
    );
}
