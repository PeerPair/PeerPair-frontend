import React from 'react';
import { Icon } from "@iconify/react";
import slider from "@iconify-icons/uil/sliders-v";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div>
        <Icon
          icon={slider}
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        />
      </div>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
      
        <MenuItem onClick={handleClose}>Study Group</MenuItem>
        <MenuItem onClick={handleClose}>Gaming</MenuItem>
        <MenuItem onClick={handleClose}>Sports</MenuItem>
        <MenuItem onClick={handleClose}>Traveling</MenuItem>
        <MenuItem onClick={handleClose}>Cooking</MenuItem>
      </Menu>
    </div>
  );
}