import React,{useState} from 'react';
import { Button,Modal,Form} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { When } from 'react-if';
import cookie from 'react-cookies';
const token = cookie.load('auth');

const UpdateRequest = (props) =>{
  console.log(props.Provider,'request that need to update');
  const category = ['Study Group', 'Gaming', 'Sports', 'Traveling', 'Cooking'];

  const [request,setUpdRequest] = useState({});
  const [redirect,setRedirect] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandle = e =>{
    setUpdRequest({...request,[e.target.name]:e.target.value})
  }

  const updRequest = e =>{
    e.preventDefault();
    fetchUpdRequest(request);
}

// Fetch Request to update it
const fetchUpdRequest = async (updReq) =>{
  console.log('click',updReq);
  let res = await fetch(`${process.env.REACT_APP_API_URL}/request/${props.Provider._id}`,{
    method: 'PUT',
    body: JSON.stringify(updReq),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })

        let result = await res.json();
        console.log(result, 'update request result');
        // setRedirect(`${props.Provider._id}`);
        setRedirect('/');
        return result;
      }

        return (
            <>
            <When condition={redirect}><Redirect to={redirect}></Redirect></When>
              <Button variant='primary' onClick={handleShow}>edit</Button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
              >
              <Modal.Header closeButton>
               <Modal.Title>Update Request</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form>
                  <Form.Group>
                      <Form.Label>Keyword</Form.Label>
                      <Form.Control name='keyword' type='text' defaultValue={props.Provider.keyword} onChange={changeHandle}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Control as="select" name='category' defaultValue={props.Provider.category} onChange={changeHandle}>
                        {category.map((category,idx)=><option key={idx} value={category}>{category}</option>)}
                      </Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control name='description' type='text' defaultValue={props.Provider.description} onChange={changeHandle}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Updated Date</Form.Label>
                  <Form.Control
                    name='created_date'
                    required
                    value={new Date().toLocaleString()}
                    onChange={changeHandle}
                  />
                  </Form.Group>
              </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='primary' onClick={updRequest}><Button onClick={handleClose}>Update</Button></Button>
              </Modal.Footer>
              </Modal>
            </>
        )
}




export default UpdateRequest;