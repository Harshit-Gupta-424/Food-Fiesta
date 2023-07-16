import React,{useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'

export default function Signup() {

    const [credentials, setcredentials] = useState({name:"" , email:"" , password:"" , geolocation:""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch ("http://localhost:5000/api/createuser",{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({name : credentials.name.toString() , email:credentials.email.toString() , password:credentials.password.toString() ,location:credentials.geolocation.toString()})
        });
 
        const json = await response.json();
        console.log(json);

        if(!json.success)
        {
            alert("Enter Valid Credentials");
        }
        else{
            navigate("/");
        }
    } 

    const onChange = (event)=>{
        setcredentials({...credentials,[event.target.name] : [event.target.value]})
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label HTMLfor="name" class="form-label">Username</label>
                        <input type="text" class="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div class="mb-3">
                        <label HTMLfor="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" name='email' value={credentials.email} onChange={onChange}  id="exampleInputEmail1"  />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label HTMLfor="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" name='password' value={credentials.password} onChange={onChange}  id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label HTMLfor="location" class="form-label">Location</label>
                        <input type="text" class="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange}   />
                    </div>
                    <button type="submit" class="btn btn-success m-3">Submit</button>
                    <Link to='/Login' className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    )
}
