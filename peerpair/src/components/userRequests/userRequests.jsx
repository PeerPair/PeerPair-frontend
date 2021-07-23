// import React from 'react';
// import { Link  } from 'react-router-dom';
// import{Card,Button } from 'react-bootstrap'

// //all created requests by the user which rendered in his own profile
// let data = [
//   {
//       "user_ID": "60c916af5a89110015cc3b6b",
//       "submitters": [],
//       "accepted": false,
//       "current_partner": "none",
//       "_id": "60f464ce13ec63001523575d",
//       "description": "exam",
//       "keyword": "math calculas",
//       "category": "Study Group",
//       "created_date": "7/18/2021, 5:28:46 PM",
//       "__v": 0
//   },
//   {
//       "user_ID": "60c916af5a89110015cc3b6b",
//       "submitters": [],
//       "accepted": false,
//       "current_partner": "none",
//       "_id": "60f464de13ec63001523575e",
//       "description": "exam",
//       "keyword": "math calculas",
//       "category": "Study Group",
//       "created_date": "7/18/2021, 5:29:02 PM",
//       "__v": 0
//   },
//   {
//       "user_ID": "60c916af5a89110015cc3b6b",
//       "submitters": [],
//       "accepted": false,
//       "current_partner": "none",
//       "_id": "60f4669313ec630015235765",
//       "category": "Gaming",
//       "keyword": "chess ",
//       "description": "practice grandmaster player",
//       "created_date": "7/18/2021, 5:36:19 PM",
//       "__v": 0
//   },
//   {
//       "user_ID": "60c916af5a89110015cc3b6b",
//       "submitters": [],
//       "accepted": false,
//       "current_partner": "none",
//       "_id": "60f46aa513ec630015235767",
//       "keyword": "aaa aaa aaa",
//       "category": "Traveling",
//       "description": "built in methods",
//       "created_date": "7/18/2021, 5:53:41 PM",
//       "__v": 0
//   },
//   {
//       "user_ID": "60c916af5a89110015cc3b6b",
//       "submitters": [],
//       "accepted": false,
//       "current_partner": "none",
//       "_id": "60f4710e13ec63001523576c",
//       "category": "Gaming",
//       "description": "built in methods",
//       "keyword": "aaa",
//       "created_date": "7/18/2021, 6:21:02 PM",
//       "__v": 0
//   },
//   {
//       "user_ID": "60c916af5a89110015cc3b6b",
//       "submitters": [],
//       "accepted": false,
//       "current_partner": "none",
//       "_id": "60f477e513ec630015235771",
//       "keyword": "math calculas",
//       "category": "Sports",
//       "description": "aaaa",
//       "created_date": "7/18/2021, 6:50:13 PM",
//       "__v": 0
//   }
// ]
// const YourRequests = (props) =>{
//         return (
//             <>

//               {data.map((val,idx)=>{
//                 return (<Card className="text-center">
//                 <Card.Header >{(val.accepted)?'Closed':'Open'}</Card.Header>
//                 <Card.Body>
//                   <Card.Title style={{wordSpacing:'10px'}}>{val.keyword.toUpperCase()}</Card.Title>
//                   <Card.Text>
//                     {val.description}
//                   </Card.Text>
//                   <Link to={`/request/${val._id}`}>View Details</Link>
//                 </Card.Body>
//                 <Card.Footer className="text-muted">{val.created_date}</Card.Footer>
//               </Card>)
//               })}
//             </>
//         )
// }

// export default YourRequests;



import React from 'react';
import { Link  } from 'react-router-dom';
import{Card,Button } from 'react-bootstrap';
import { useEffect,useState } from "react";
import cookie from 'react-cookies';
const token = cookie.load('auth');


//all created requests by the user which rendered in his own profile
const YourRequests = (props) =>{
  const [requests, setRequests] = useState([])

    useEffect(() => {
      const getRequests = async () => {
        const requestsFromAPI = await fetchRequests();
        setRequests(requestsFromAPI);
    }
    getRequests()
  }, [])
  
  const fetchRequests = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/request`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
    })
    
    const data = await res.json()
    console.log(data, 'requests');
    return data ;
  }
  
    if(requests){
        return (
            <>
            <h4>{requests.map((val,idx)=>{
              return (<Card className="text-center">
              <Card.Header >{(val.accepted)?'Closed':'Open'}</Card.Header>
              <Card.Body>
                <Card.Title style={{wordSpacing:'10px'}}>{val.keyword.toUpperCase()}</Card.Title>
                <Card.Text>
                  {val.description}
                </Card.Text>
                <Link to={`/request/${val._id}`} ><Button>View Details</Button></Link>
              </Card.Body>
              <Card.Footer className="text-muted">{val.created_date}</Card.Footer>
            </Card>)
            })}</h4>
            </>
        )
      }
    else return (
      <h2>is loading</h2>
    )
}

export default YourRequests;