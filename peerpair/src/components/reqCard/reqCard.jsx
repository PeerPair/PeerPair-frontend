import React,{useState} from "react";
// import '../../pages/reset.css';
import "./reqCard.css";
// import "../../pages/reset.css";
import ReqDropdown from "../reqDropDown/dropDown.jsx";
import { Icon } from "@iconify/react";
import heartbeat from "@iconify-icons/uil/heartbeat";

//categories icons 
import Study from "@iconify-icons/uil/graduation-cap";
import Gaming from "@iconify-icons/uil/laptop";
import Sports from "@iconify-icons/uil/football-ball";
import Traveling from "@iconify-icons/uil/plane";
import Cooking from "@iconify-icons/uil/utensils";

let categories={'Study Group':Study,Gaming,Sports,Traveling,Cooking}


export default function RequestCard(props) {
  console.log(props.data);
  const [state, setstate] = useState(props.data)
  return (
    <div className={(state.accepted)?"user-card accepted-card":"user-card"}>
      <div>
        <img
          className="req-image"
          alt="request"
          src={(state.image)?`data:image/jpg;base64,${state.image}`:"https://i.stack.imgur.com/y9DpT.jpg"}
        />
      </div>
      <div className="req-info">
        <div>
          <p>{state.keyword.toUpperCase()}</p>
          <ReqDropdown hidden={props.hidden} data={props.data} updateData={(d)=>{setstate(d)}}/>
        </div>
        <div className="category">
          <div className="category-icon">
            <Icon icon={categories[state.category]} />
          </div>
          <p>{state.category}</p>
        </div>
        <p className="description">
          {state.description}
          </p>
      </div>
    </div>
  );
}

/*
<Card className="text-center">
              <Card.Header >{(val.accepted)?'Closed':'Open'}</Card.Header>
              <Card.Body>
                <If condition={val.image}>
                  <Then>
                  <img alt='requestImage'style={{width:'30%'}} src={`data:image/jpg;base64,${val.image}`} />

                  </Then>
                  <Else>
                  <img alt='requestImage' src='https://filestage.io/wp-content/uploads/2021/06/request-for-approval-1.png'/>

                  </Else>
                </If>
                <Card.Title style={{wordSpacing:'10px'}}>{val.keyword.toUpperCase()}</Card.Title>
                <Card.Text>
                  {val.description}
                </Card.Text>
                <Link to={`/request/${val._id}`} ><Button>View Details</Button></Link>
              </Card.Body>
              <Card.Footer className="text-muted">{val.created_date}</Card.Footer>
            </Card>
            */