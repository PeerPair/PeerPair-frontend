import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/Favorite';

let chipArr = [
  { key: 0, label: 'Yoga' },
  { key: 1, label: 'Painting' },
  { key: 2, label: 'Programming' },
  { key: 3, label: 'Hiking' },
  { key: 4, label: 'React' },
];


const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top:"15em",
    left:"5.5em",
    marginRight: theme.spacing.unit *6,
    marginLeft: theme.spacing.unit *6,
    height:theme.spacing.unit *(chipArr.length*2.3),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: "rgba(246, 242, 250, .1)",
    borderRadius:".4em",
    boxShadow: "none",
    width:"20em"
  },
  chip: {
    marginLeft: theme.spacing.unit / 2,
    width:"28%",
    fontSize:".6em",
  },
}));

const ChipsArray=(props)=> {
    const classes = useStyles();





  return(

  
      <Paper className={classes.root}>
        {props.intrests.map(data => {
          let avatar = (
              <Avatar>
                <TagFacesIcon style={{ color: "#00dbed", fontSize:"small" }} className={classes.svgIcon} />
              </Avatar>
            );

          return (
            <Chip
              key={data}
              avatar={avatar}
              label={data}
              className={classes.chip}
            />
          );
        })}
      </Paper>
   
  );
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ChipsArray;