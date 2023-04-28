import { useState } from "react";
import "./NavBar.scss";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    const confirm = window.confirm("Are you sure you want to Log Out?");
    if (confirm) {
      localStorage.setItem("loggedIn", JSON.stringify("false"));
      window.location.reload();
    }
  };

  return (
    <div className="navbar-container">
      <div className="icon1">
        <HomeRoundedIcon className="icons" onClick={() => navigate("/")} />
        {localStorage.getItem("loggedIn") === "true" && (
          <AdminPanelSettingsIcon
            className="icons"
            onClick={() => navigate("/dashboard")}
          />
        )}
      </div>

      {localStorage.getItem("loggedIn") === "true" ? (
        <div className="icon2">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <PersonIcon className="icons" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogOut();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="icon2">
          <PersonIcon className="icons" onClick={() => navigate("/login")} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
