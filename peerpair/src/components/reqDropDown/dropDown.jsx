import React from 'react';
import { Icon } from "@iconify/react";
import dots from "@iconify-icons/uil/ellipsis-h";import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import UpdateRequest from '../updateRequest/updateRequest';
import { When } from 'react-if';
import { Redirect } from 'react-router';

export default function FadeMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [redirect, go] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={props.hidden?{visibility:'hidden'}:{}}>
      <div className="menu-icon">
        <Icon
          icon={dots}
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
        <When condition={!props.data.accepted}><UpdateRequest Provider={props.data} updateData={(d)=>{props.updateData(d)}}/></When>
        <MenuItem onClick={()=>{go(true);}}>View Details</MenuItem>
        <When condition={redirect}><Redirect to={'/request/'+props.data._id}></Redirect></When>
      </Menu>
    </div>
  );
}