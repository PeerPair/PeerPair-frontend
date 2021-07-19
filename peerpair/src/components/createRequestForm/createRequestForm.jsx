import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import './createRequestForm.scss'
import { When } from 'react-if';
import cookie from 'react-cookies'
import { Form,Button,Alert,Spinner} from 'react-bootstrap';
const RequestForm = (props) =>{
    const category = ['Study Group', 'Gaming', 'Sports', 'Traveling', 'Cooking'] 
    const [request,setReq] = useState({});
    const [okay,setStatus] = useState(true);
    const [redirect,setRedirect] = useState(null);
    const [loading,setloading] = useState(false);
    const createNewRequest = e =>{
        e.preventDefault();
        console.log(request)
        createRequest(request);
    }
    async function  createRequest(requestInfo){
        setloading(true);
        let token = cookie.load('auth');
        console.log(token);
        let data = await fetch(process.env.REACT_APP_API_URL+'/request',{ 
            method: 'post', 
            headers: new Headers({
              'Authorization': 'bearer '+token,
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(requestInfo) 
            })
            setloading(false);
            if(!data.ok) setStatus(false)
            else setRedirect('/')
        }



    const changeHandle = e =>{

        setReq({...request,[e.target.name]:e.target.value})
    }
    return (
        <>
        <When condition={redirect}><Redirect to={redirect}></Redirect></When>
          <h2>PeerPair</h2>
          <h4>Create Request</h4>
    <Form onSubmit={createNewRequest} className='form'>
              <Form.Group>

              <Form.Control style={{wordSpacing:'15px',fontWeight:'bold'}}  name='keyword' type="text" placeholder='Enter the Keywords '  onChange={changeHandle} />
              </Form.Group>
              <Form.Group>

              <select name='category' aria-label="Default select example" onChange={changeHandle} required>
              <option value=''>Open this select menu</option>
              {category.map((val,idx)=><option key={idx} value={val}>{val}</option>)}
              </select>
              </Form.Group>
              <Form.Group>

              <Form.Control onChange={changeHandle} placeholder='description' type='description' name="description" id="" cols="30" rows="10" required/>
              </Form.Group>
              <Button type="submit">Create Request</Button>
              <When condition={loading}><Spinner animation="border" role="status"></Spinner></When>
              <When condition={!okay}>  <Alert  variant='danger'>
    somthing went wrong
  </Alert></When>
    </Form>
        </>
    )
}

export default RequestForm;