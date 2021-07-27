import React from 'react';
import Navbar from '../navbar/navbar';
import TopBanner from "./topBanner";
import OthersReqCard from '../resultCard/card';
import ResultsBanner from '../resultBanner/banner';
import { useState, useEffect } from "react";
import cookie from "react-cookies";
import { When, If, Else, Then } from "react-if";
import superagent from 'superagent';
import { getUserInfo } from '../../store/userInfo/action.js';
import { connect } from 'react-redux';
import {getOthersProfile} from '../../store/othersProfile/reducer';
import { Link } from 'react-router-dom';
import "../../pages/reset.css";

const API = process.env.REACT_APP_API_URL;
let idArray = [];
let ownersArray = [];
const SearchResultRequest = (props) =>{

  const [owner, setOwner] = useState([]);
  const [loading, setLoading] = useState({load: false})

  let results = props.Provider;

  // console.log('THE RESULTS FROM THE PROVIDER', results)
  const iteration = async()=>{
    for(let i = 0; i < results.length; i++){
      idArray.push(results[i].user_ID)
      // getReqOwner(idArray[i])
    }
    for(let j = 0; j < idArray.length; j++){
       await getReqOwner(idArray[j])
    }
  }
  // console.log('THE ID ARRAY IS', idArray)
  useEffect(()=>{
    iteration();
  }, []);
  // console.log('REQUEST OWNER ID', props.Provider)

  console.log('THE OWNER DATA===>', owner);
  async function getReqOwner(id){
    try{
        const token = cookie.load('auth');
        setLoading({load: true})
        const response = await superagent.get(`${API}/profile/${id}`).set({'Authorization' : 'Bearer '+ token});
        console.log('THE Request Owner IS------' , response.body);
        ownersArray.push(response.body)
        setLoading({load: false})
        return setOwner([...owner, response.body])
    } catch(error){
                console.log('Failed To Get The Request User Data', error.message)
            }
  }
  console.log('THE OWNERS ARRAY', ownersArray)
  // console.log('Owner ----> ', owner)
        return (
          <>
          <style>{'body { background-color: #EDE3FA; }'}</style>
          <Navbar />
          <TopBanner />
          <ResultsBanner>
            {ownersArray.map((val,idx)=>{
              
              return <OthersReqCard key={idx} requestData={results[idx]} owner={val}/>
            })}

          </ResultsBanner>
            { /*   <div>

            </div>*/}
                {/* {results.map((element,i) => 
                  <ul key={i}>
                {ownersArray.map((e, i)=>
              <ul key={i}>
                  <If condition={props.Provider[i].user_ID === element.user_ID}>
                    <Then>
                  <div>
                  <Link to={`/profile/${element.user_ID}`} ><img src="http://via.placeholder.com/200x200" alt="placeHolder" /></Link>
                  <h4>{e.first_name} {e.last_name}</h4>
                  </div>
                  <h6>{element.keyword}</h6>
                  <h6>{element.category}</h6>
                  <h6>{element.description}</h6>
                  <h6>{element.created_date}</h6>
                  <Link to={`/request/${element._id}`} ><button>View Details</button></Link>
                    </Then>
                  </If>
                  </ul >
                )}
              </ul>
                )} */}
            </>
        )
}
export default(SearchResultRequest)