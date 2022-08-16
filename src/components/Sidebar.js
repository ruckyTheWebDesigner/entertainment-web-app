import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className='inline-flex items-center justify-center w-16 h-16 cursor-pointer'>
          <img src={logoimg} className='w-8  pt-2' alt='logo' />
        </div>

        <div className=''>
          <nav className='flex flex-col p-2'>
            <ul className='pt-8 space-y-1 '>
              <li>
                <a
                  href='/home'
                  className='flex justify-center px-2 py-3 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group'>
                  <svg
                    className='icon'
                    width='20'
                    height='20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z'
                      fill={
                        window.location.pathname === "/home"
                          ? "#fff"
                          : "#5A698F"
                      }
                    />
                  </svg>{" "}
                </a>
              </li>

              <li>
                <a
                  href='/movies'
                  className='flex relative group justify-center px-2 py-3 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700'>
                  <svg
                    width='20'
                    height='20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z'
                      fill={
                        window.location.pathname === "/movies"
                          ? "#fff"
                          : "#5A698F"
                      }
                    />
                  </svg>{" "}
                </a>
              </li>

              <li>
                <a
                  href='/tvseries'
                  className='flex justify-center px-2 py-3 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group'>
                  <svg
                    width='20'
                    height='20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z'
                      fill={
                        window.location.pathname === "/tvseries"
                          ? "#fff"
                          : "#5A698F"
                      }
                    />
                  </svg>{" "}
                </a>
              </li>

              <li>
                <a
                  href='/bookmarked'
                  className='relative group flex justify-center px-2 py-3 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700'>
                  <svg
                    width='20'
                    height='20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z'
                      fill={
                        window.location.pathname === "/bookmarked"
                          ? "#fff"
                          : "#5A698F"
                      }
                    />
                  </svg>{" "}
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
              alt='User Avatar'
              src={
                user?.data.photoURL
                  ? user?.data.photoURL
                  : "https://i.pravatar.cc/300"
              }
            />
          </StyledBadge>

          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Card className='my-2 py-2 px-2 text-slate-600 text-sm font-medium'>
              <button onClick={handleSignOut}>Sign out</button>
            </Card>
          </Popper>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
