import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { HEADER_HEIGHT } from "../constants";

const jokeMessages = [
  "Are you joking? We don't have this.",
  "Nothing good will ever come out of you… probably.",
  "Seriously? You expected something here?",
  "404: Usefulness not found.",
  "Try again later... or never.",
  "This is as empty as my motivation.",
  "Nope. Not today.",
  "You must be new here.",
  "Keep dreaming!",
  "Nice try, but no.",
];

const Header: React.FC = () => {
  const [aboutAnchor, setAboutAnchor] = useState<null | HTMLElement>(null);
  const [linksAnchor, setLinksAnchor] = useState<null | HTMLElement>(null);
  const [openJokeDialog, setOpenJokeDialog] = useState(false);
  const [jokeMessage, setJokeMessage] = useState(jokeMessages[0]);

  const showRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokeMessages.length);
    setJokeMessage(jokeMessages[randomIndex]);
    setOpenJokeDialog(true);
  };

  return (
    <AppBar
      sx={{
        position: "fixed",
        top: 0,
        background: "#fff",
        color: "#8B4513 ",
        height: HEADER_HEIGHT,
        justifyContent: "center",
      }}
    >
      <Container>
        <Toolbar
          sx={{
            minHeight: HEADER_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant='h5'
            sx={{
              fontFamily: "Schoolbell, Roboto, Helvetica, Arial, sans-serif",
              fontWeight: 700,
              color: "#8B4513 ",
              display: "flex",
              alignItems: "center",
              fontSize: "1.6rem",
            }}
          >
            $asscoin
          </Typography>
          {/* Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Button
                endIcon={<ArrowDropDownIcon />}
                sx={{
                  background: aboutAnchor ? "#ffe7a0" : "#fff",
                }}
                onClick={(e) => setAboutAnchor(e.currentTarget)}
              >
                Socials
              </Button>
              <Menu
                anchorEl={aboutAnchor}
                open={Boolean(aboutAnchor)}
                onClose={() => setAboutAnchor(null)}
                MenuListProps={{ sx: { minWidth: 140 } }}
              >
                <MenuItem
                  component='a'
                  href='https://x.com/YourASScoin'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => setAboutAnchor(null)}
                >
                  X
                </MenuItem>
                <MenuItem
                  component='a'
                  href='https://t.me/YourASScoin'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => setAboutAnchor(null)}
                >
                  Telegram
                </MenuItem>
              </Menu>
            </Box>
            <Box>
              <Button
                endIcon={<ArrowDropDownIcon />}
                sx={{
                  background: linksAnchor ? "#ffe7a0" : "#fff",
                }}
                onClick={(e) => setLinksAnchor(e.currentTarget)}
              >
                Useless Links
              </Button>
              <Menu
                anchorEl={linksAnchor}
                open={Boolean(linksAnchor)}
                onClose={() => setLinksAnchor(null)}
                MenuListProps={{ sx: { minWidth: 160 } }}
              >
                <MenuItem
                  onClick={() => {
                    setLinksAnchor(null);
                    showRandomJoke();
                  }}
                >
                  Whitepaper
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setLinksAnchor(null);
                    showRandomJoke();
                  }}
                >
                  Docs
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setLinksAnchor(null);
                    showRandomJoke();
                  }}
                >
                  Community
                </MenuItem>
              </Menu>
            </Box>
            <Button
              sx={{ display: { xs: "none", md: "block" } }}
              component='a'
              href='https://dexscreener.com/solana/C2WZb4PgkzhAB28HgMamEXpGrsWcLHvDEyXSr7aapump'
              target='_blank'
              rel='noopener noreferrer'
            >
              DEX Chart
            </Button>
            <Button
              variant='contained'
              component='a'
              href='https://swap.pump.fun/?input=So11111111111111111111111111111111111111112&output=C2WZb4PgkzhAB28HgMamEXpGrsWcLHvDEyXSr7aapump'
              target='_blank'
              rel='noopener noreferrer'
            >
              Buy
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        fullWidth
        open={openJokeDialog}
        onClose={() => setOpenJokeDialog(false)}
      >
        <DialogTitle>
          <Typography variant='h3'>Are you joking?</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant='h6'>{jokeMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ bgcolor: "transparent" }}
            onClick={() => setOpenJokeDialog(false)}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
