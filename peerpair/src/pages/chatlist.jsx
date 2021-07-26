import React,{useState,useEffect} from 'react';
import { If,Then,Else } from 'react-if';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies'

const Chatlist = () => {
    const [list, setlist] = useState([]);
    useEffect(()=>{
        let token = cookie.load('auth')
        const getData=async()=>{
            let data = await fetch(process.env.REACT_APP_API_URL+'/chatList',{
                method: 'get',
                headers: {
                  Authorization: 'Bearer ' + token,
                }});
            const  listdata = await data.json();
            console.log('list',listdata);
            setlist(listdata)
        }
        getData();
    },[])
    return (
        <div>
            {list.map(val=><Link to={'chat/'+val._id}>
            
                    <div>
                <If condition={val.profile_image}>
              <Then>
              <img alt='profileImage' src={'data:image/jpg;base64,'+val.profile_image}/>
              </Then>
              <Else>
          <Avatar name={val.first_name + ' ' + val.last_name} maxInitials={2}/>
              </Else>
            </If>
            <div>{val.first_name + ' ' + val.last_name}</div>
            </div>
            </Link>)}
            
        </div>
    )
}

export default Chatlist
