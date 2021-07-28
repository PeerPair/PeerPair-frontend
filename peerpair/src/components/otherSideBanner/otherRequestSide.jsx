import React from "react";
import "./otherSideBanner.css";
import { Icon } from "@iconify/react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { If,Then,Else } from "react-if";
import Study from "@iconify-icons/uil/graduation-cap";
import Gaming from "@iconify-icons/uil/laptop";
import Sports from "@iconify-icons/uil/football-ball";
import Traveling from "@iconify-icons/uil/plane";
import Cooking from "@iconify-icons/uil/utensils";

let categories={'Study Group':Study,Gaming,Sports,Traveling,Cooking}

const useStyles = makeStyles((theme) => ({
  button: {
    textShadow: "2px 1px 3px rgba(24, 24, 24, 0.39)",
    color: "white",
    width: "10em",
    backgroundColor: "rgba(90, 214, 224,.7)",
    position:"absolute",
    bottom:"1em",
    left:"15em",
    padding:".55em .1em",
    marginTop:"1em",
    zIndex:"4",
    fontSize:".8em"
  },
}));


export default function OtherSideBanner(props) {

  const classes = useStyles();

  return (
    <div>
      <div className="side-banner2">
        <div className="side-data2">
          <p>{props.data.keyword.split(' ').join(' - ').toUpperCase()}</p>
          <div className="side-category2">
            <div className="side-category-icon2">
            <Icon icon={categories[props.data.category]} />
            </div>
            <p>{props.data.category}</p>
          </div>
          <p className="side-date2">{props.data.created_data} </p>
        </div>
        <img
          alt="ladder"
          className="side-req-image"
          src={(props.data.image)?`data:image/jpg;base64,${props.data.image}`:"https://i.stack.imgur.com/y9DpT.jpg"}
        />
        <div className="side-desc2">
          <p>
          {props.data.description +" "}
</p>
        </div>
            <If condition={!props.data.submitters.includes(props.owner)}>
                <Then>
<Button
              variant="contained"
              className={`${classes.button} + newbtn`}
              startIcon={<AddIcon />}
              onClick={()=>{props.submitREQ(props.data._id)}}
            > SUBMIT
            </Button>
                </Then>
                <Else>
<Button
              variant="contained"
              className={`${classes.button} + newbtn`}
              startIcon={<AddIcon />
            }

            onClick={()=>{props.unsubmitREQ(props.data._id)}}

            >
                CANCEL
            </Button>

                </Else>

            </If>
        
        
      </div>

      <div className="side-number2">
        <p>{props.data.submitters.length}</p>
        <p className="submitters-p2">Submits</p>
      </div>
      <div className="side-circle5"></div>

      
    </div>
  );
}
