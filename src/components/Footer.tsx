import React from "react";
import { Box, Container, MenuItem, Typography, Paper } from "@mui/material";

const Footer: React.FC = () => (
  <Paper
    elevation={3}
    sx={{
      display: { xs: "block", md: "none" },
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      bgcolor: "#fff",
      color: "#8B4513",
      zIndex: 1300,
    }}
  >
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant='subtitle2'
          sx={{
            fontFamily: "Schoolbell, Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 700,
            color: "#8B4513",
            fontSize: 18,
          }}
        >
          Socials:
        </Typography>
        <MenuItem
          component='a'
          href='https://x.com/YourASScoin'
          target='_blank'
          rel='noopener noreferrer'
          sx={{ px: 1, fontWeight: "bold", fontSize: 14 }}
        >
          X
        </MenuItem>
        <MenuItem
          component='a'
          href='https://t.me/YourASScoin'
          target='_blank'
          rel='noopener noreferrer'
          sx={{ px: 1, fontWeight: "bold", fontSize: 14 }}
        >
          Telegram
        </MenuItem>
      </Box>
    </Container>
  </Paper>
);

export default Footer;
