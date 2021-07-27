import React,{useState,useEffect} from 'react';
import { If,Then,Else } from 'react-if';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies'
import '../design/chatList.css';

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
            <aside class="aside">
              <header>
			      <input type="text" placeholder="search"/>
		       </header>
               <ul>
                  {list.map(val=><Link to={'/chat/'+val._id}>            
                    <li>
                      <If condition={val.profile_image}>
                         <Then>
                           <img alt='profileImage' src={'data:image/jpg;base64,'+val.profile_image}/>
                         </Then>
                      {/* <Else>
                        <div class="avatar">
                           <Avatar name={val.first_name + ' ' + val.last_name} maxInitials={2}/>
                        </div>
                      </Else> */}
                      </If>
                           <div>
                               <h2>{val.first_name + ' ' + val.last_name}</h2>
                               {((val.first_name.length+val.last_name.length)%2)?
                               <h3><span class="status orange"></span>offline</h3>:
                               <h3><span class="status green"></span>online</h3>   
					            }
                           </div>
                     </li>
                  </Link>)}
               </ul>
            </aside>
    )
}

export default Chatlist
