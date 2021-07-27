import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SearchDropdown from './searchDropDown'

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft:'2.8em',
    display: 'flex',
    alignItems: 'center',
    width: 500,
    borderRadius:"1em"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search For Requests"
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon/>
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton  className={classes.iconButton} aria-label="directions">
      <SearchDropdown/>
      </IconButton>
    </Paper>
  );
}
