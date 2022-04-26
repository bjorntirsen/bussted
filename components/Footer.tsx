import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link
                color="inherit"
                href="https://bjorntirsen-portfolio.netlify.app/"
            >
                Björn Tirsén
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function Footer() {
    return (
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            <Copyright />
        </Box>
    );
}
