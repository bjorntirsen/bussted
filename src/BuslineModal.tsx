import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Backdrop, Box, Fade, Grid, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import BusstopList from "./BusstopList";
import { BusLine } from "./Main";

interface Props {
    busline: BusLine;
    busstops: any;
}

export default function BuslineModal({ busline, busstops }: Props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "scroll",
        height: "100%",
        display: "block",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        width: 1300,
        maxWidth: "80%",
    };

    return (
        <Box textAlign="center" width="100%">
            <Button size="small" onClick={handleOpen}>
                View Details
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h3"
                            component="h3"
                            align="center"
                        >
                            <DirectionsBusIcon fontSize="large" />
                            {busline.lineNumber} List of busstops
                        </Typography>
                        {!busstops && (
                            <Typography>
                                Busstop names are loading...
                            </Typography>
                        )}
                        <Grid container spacing={2}>
                            <BusstopList busline={busline} direction="1" />
                            <BusstopList busline={busline} direction="2" />
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
