import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import Header from "./Header";
import { HEADER_HEIGHT } from "../constants";
import Footer from "./Footer";

const jokeMessages = [
  "Nothing good will ever come out of you… probably.",
  "You are a true $asscoin legend. Or maybe just a legend in your own mind.",
  "Congratulations! You scanned... something. We hope you're proud.",
  "Legend says the real treasure was the scan we made along the way.",
  "This scan result is as valuable as a screen door on a submarine.",
  "You did it! And by 'it', we mean absolutely nothing.",
  "If you expected more, that's on you.",
  "Scan complete! Please consult your local psychic for interpretation.",
  "You scanned. The blockchain is unchanged.",
  "Wow! Such scan. Much result. Very $asscoin.",
];

const Banner = () => {
  const [phase, setPhase] = useState<"idle" | "scanning" | "result">("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showResultText, setShowResultText] = useState(true);
  const [jokeMessage, setJokeMessage] = useState(jokeMessages[0]);

  const showRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokeMessages.length);
    setJokeMessage(jokeMessages[randomIndex]);
    setShowResultText(false);
  };

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (phase === "scanning" && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
            setTimeout(() => setPhase("result"), 5000);
          }
        })
        .catch(() => {
          setTimeout(() => setPhase("result"), 5000);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "result") {
      setShowResultText(true); // Reset to show text first
      const timer = setTimeout(() => {
        showRandomJoke();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Simulate scanning process
  const handleStart = () => {
    setPhase("scanning");
  };

  return (
    <Box
      minHeight='100vh'
      position='relative'
      width='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Header />
      <Container
        sx={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          mt: `${HEADER_HEIGHT}px`,
          py: 5,
        }}
      >
        {phase === "idle" && (
          <>
            {/* Scanner illustration */}
            <Box
              sx={{
                width: { xs: "100%" },
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: { xs: 270, md: 370 },
                  height: { xs: 300, md: 500 },
                  borderRadius: "50% / 45%",
                  border: "6px dashed #8B4513 ",
                  background: "8B4513 ",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                  boxShadow: "0 0 16px 0 #8B4513 ",
                }}
              />
              <Typography
                variant='h1'
                color='#8B4513 '
                mb={2}
                textAlign='center'
                fontSize={{ xs: 25, md: 50 }}
              >
                Face to screen
                <br /> Let's find out what kinda mistake you are
              </Typography>
              <Box display='flex' justifyContent='center' mt={3}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleStart}
                >
                  Start
                </Button>
              </Box>
              {/* You can add an SVG or image here */}
            </Box>
          </>
        )}
        {phase === "scanning" && (
          <Box
            sx={{
              width: { xs: "100%" },
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* Webcam video in a circle */}
            <Box
              sx={{
                width: { xs: 270, md: 370 },
                height: { xs: 300, md: 500 },
                borderRadius: "50% / 45%",
                border: "6px dashed #8B4513 ",
                background: "8B4513 ",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                boxShadow: "0 0 16px 0 #8B4513 ",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <video
                ref={videoRef}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  background: "#222",
                }}
                autoPlay
                muted
                playsInline
              />
              {/* Animated scanning line */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "6px",
                  background: "rgba(255,255,255,0.85)",
                  boxShadow: "0 0 16px 4px #fff, 0 0 32px 8px #8B4513",
                  borderRadius: "8px",
                  zIndex: 2,
                  animation: "scanLineMove 5s infinite",
                  top: 0,
                  opacity: 0.95,
                  // Add a subtle border for a more "scanner" look
                  border: "1.5px solid #8B4513",
                  // Optionally, add a gradient for a more "laser" effect
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, #ffe7a0 40%, #8B4513 100%)",
                }}
              />
              <style>
                {`
                  @keyframes scanLineMove {
                    0% {
                      top: 0;
                    }
                    45% {
                      top: calc(100% - 4px);
                    }
                    55% {
                      top: calc(100% - 4px);
                    }
                    100% {
                      top: 0;
                    }
                  }
                `}
              </style>
            </Box>
            <CircularProgress size={60} sx={{ color: "#8B4513 ", mb: 2 }} />
            <Typography
              variant='h1'
              color='#8B4513 '
              mb={2}
              textAlign='center'
              fontSize={{ xs: 25, md: 50 }}
            >
              Scanning...
            </Typography>
          </Box>
        )}
        {phase === "result" && (
          <>
            <Box
              sx={{
                width: { xs: "100%" },
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              {showResultText ? (
                <>
                  <Typography
                    variant='h1'
                    color='#8B4513 '
                    mb={2}
                    fontSize={{ xs: 25, md: 50 }}
                  >
                    Scan Complete!
                  </Typography>
                  <Typography
                    variant='body1'
                    fontSize={{ xs: 20, md: 40 }}
                    color='#000'
                    mb={2}
                  >
                    {jokeMessage}
                  </Typography>
                </>
              ) : (
                <>
                  <img src='/shit.jpeg' alt='Result' style={{ height: 400 }} />
                  <Box display='flex' justifyContent='center' mt={3}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleStart}
                    >
                      Scan again
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default Banner;
