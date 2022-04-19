import { AppBar, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import * as React from "react";

export default function NavBar() {
    return (
        <AppBar position="relative">
            <Toolbar>
                <DirectionsBusIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                    Bussted! - bus app
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
