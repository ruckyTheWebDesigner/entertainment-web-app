import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Popper from "@mui/material/Popper";

import homeimg from "../assets/icon-nav-home.svg";
import movieimg from "../assets/icon-nav-movies.svg";
import seriesimg from "../assets/icon-nav-tv-series.svg";
import bookmarkimg from "../assets/icon-nav-bookmark.svg";
import logoimg from "../assets/logo.svg";

import { useAuthUser } from "@react-query-firebase/auth";

import { useNavigate } from "react-router-dom";

import { LogOut, auth } from "../helpers/firebase";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function ButtonAppBar() {
  const user = useAuthUser(["user"], auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleSignOut = () => {
    LogOut();
    navigate("/login");
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className='px-4 py-4 '
      style={{
        backgroundColor: "#161D2F",
        borderRadius: "10px",
      }}>
      <div className='flex justify-between items-center align-middle'>
        <div>
          <img src={logoimg} alt='logo' />
        </div>
        <div className='flex align-middle appbar_icons'>
          <a href='/home'>
            <img src={homeimg} alt='home icon' />
          </a>
          <a href='/movies'>
            <img src={movieimg} className='mx-6' alt='movie icon' />
          </a>
          <a href='/tvseries'>
            <img src={seriesimg} className='mr-6' alt='series icon' />
          </a>
          <a href='/bookmarked'>
            <img src={bookmarkimg} alt='bookmarked icon' />
          </a>
        </div>
        <div>
          <StyledBadge
            onClick={handleClick}
            overlap='circular'
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant='dot'>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src={
                user?.data.photoURL
                  ? user?.data.photoURL
                  : "https://i.pravatar.cc/300"
              }
            />{" "}
          </StyledBadge>

          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Card className='my-3 mx-2 py-2 px-3 text-slate-600 text-sm font-semibold'>
              <button onClick={handleSignOut}>Sign out</button>
            </Card>
          </Popper>
        </div>
      </div>
    </Box>
  );
}
