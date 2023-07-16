import React, { useState , useRef , useEffect} from 'react'
import { useDispatchcart, useCart } from './contextreducer';
export default function Card(props) {

let data = useCart();
const priceRef = useRef();
let dispatch = useDispatchcart();
const [qty,setqty] = useState(1);
const [size,setsize] = useState("");

let options = props.options;
let priceoptions = Object.keys(options);

const handlecart = async()=>{
    await dispatch({type:"Add" , id:props.fooditems._id, name:props.fooditems.name, price:finalPrice, qty:qty , size:size })
    console.log(data);
}
let finalPrice = qty* parseInt(options[size]);
useEffect(()=>{
    setsize(priceRef.current.value);
},[])
  return (
    <div>
        <div>
        <div className="card mt-3 " style={{ "width": "18rem", "maxHeight": "360px" }}>
          <img src={props.fooditems.img} className="card-img-top " style={{"height":"200px" }} alt="..." />
          <div className=" pb-2 card-body">
            <h5 class="card-title  ">{props.fooditems.name}</h5>
            <div className='container w-100'>
              <select className=' m-2 px-1 bg-success h-100 rounded' onChange={(e)=>{setqty(e.target.value)}}>
                {
                  Array.from(Array(8), (e, i) => {
                    return (
                      <option value={i + 1} key={i + 1}>{(i + 1)} </option>
                    )
                  })
                }
              </select>
              <select className=' m-1  bg-success h-100 rounded' ref={priceRef} onChange={(e)=>{setsize(e.target.value)}}>
                {
                  priceoptions.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                  })
                }
              </select>
              <span className='h-100 fs-5 d-inline price'>{finalPrice}Rs/-</span>
            </div>
          </div>
          <hr className='m-0 text-white mb-2'></hr>
          <button className='btn btn-success mx-2 mb-2 justify-centre' onClick={handlecart}>ADD To Cart</button>
        </div>
      </div>
    </div>
  )
}
