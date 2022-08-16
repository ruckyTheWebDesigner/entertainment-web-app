import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import homeimg from "../assets/icon-nav-home.svg";
import movieimg from "../assets/icon-nav-movies.svg";
import seriesimg from "../assets/icon-nav-tv-series.svg";
import bookmarkimg from "../assets/icon-nav-bookmark.svg";
import logoimg from "../assets/logo.svg";

import { useAuthUser } from "@react-query-firebase/auth";

import { auth, LogOut } from "../helpers/firebase";
import { Card, Popper } from "@mui/material";

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

function Sidebar() {
  const user = useAuthUser(["user"], auth);
  const [anchorEl, setAnchorEl] = useState(null);
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
    <div className='flex flex-col justify-between w-16 h-screen sidebar'>
      <div>
        <div className='inline-flex items-center justify-center w-16 h-16'>
          <img src={logoimg} className='w-8  pt-2' alt='logo' />
        </div>

        <div className=''>
          <nav className='flex flex-col p-2'>
            <ul className='pt-8 space-y-1 '>
              <li>
                <a
                  href='/home'
                  className='flex justify-center px-2 py-3 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group'>
                  <img src={homeimg} alt='img' className='w-5 h-5' />
                </a>
              </li>

              <li>
                <a
                  href='/movies'
                  className='flex relative group justify-center px-2 py-3 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700'>
                  <img src={movieimg} alt='img' className='w-5 h-5' />
                </a>
              </li>

              <li>
                <a
                  href='/tvseries'
                  className='flex justify-center px-2 py-3 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group'>
                  <img src={seriesimg} alt='img' className='w-5 h-5' />
                </a>
              </li>

              <li>
                <a
                  href='/bookmarked'
                  className='relative group flex justify-center px-2 py-3 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700'>
                  <img src={bookmarkimg} alt='img' className='w-5 h-5' />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className='sticky inset-x-0 bottom-3 p-2  '>
        <button
          onClick={handleClick}
          type='submit'
          className='flex justify-center w-full px-2 py-1.5 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 group relative'>
          <StyledBadge
            overlap='circular'
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant='dot'>
            <Avatar
              alt='Remy Sharp'
              src={
                user?.data.photoURL
                  ? user?.data.photoURL
                  : "https://i.pravatar.cc/300"
              }
            />
          </StyledBadge>

          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Card className='my-2 py-2 px-2 text-slate-600 text-sm font-semibold'>
              <button onClick={handleSignOut}>Sign out</button>
            </Card>
          </Popper>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
