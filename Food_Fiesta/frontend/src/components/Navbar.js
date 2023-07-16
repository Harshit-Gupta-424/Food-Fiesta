import React ,{useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import Cart from '../Screens/Cart'
import { useCart } from './contextreducer'
 
export default function Navbar() {
  let data = useCart();
  const [cartview,setcartview] = useState(false)
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic fw-bold" to="/">Food-Fiesta</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
              </li>
            </ul>
            {
              !localStorage.getItem("authToken") ?
                <div className="d-flex">
                  <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                  <Link className="btn bg-white text-success mx-1" to="/Signup">SignUp</Link>
                </div>
                :
                <div>
                  <div className='btn bg-white text-success mx-1' onClick={()=>{setcartview(true)}}>
                    My cart{" "}
                    <Badge pill bg='danger'> {data.length} </Badge>
                  </div>
                  {cartview? <Modal onClose={()=>{setcartview(false)}}> <Cart></Cart> </Modal>:null}
                  <div className='btn bg-white text-danger mx-1' onClick={handlelogout}>
                    LogOut
                  </div>
                </div>
            }

          </div>
        </div>
      </nav>
    </div>
  )
}
