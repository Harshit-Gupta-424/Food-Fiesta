import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card';
export default function Home() {

  const [search, setsearch] = useState([]);
  const [foodCat, setfoodCat] = useState([]);
  const [fooditem, setfooditem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    response = await response.json();
    setfooditem(response[0]);
    setfoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div><Navbar /></div>
      <div>
        <div>
          <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">

            <div class="carousel-inner" id='carousel' style={{ objectFit: "contain !imortant" }}>
              <div class="carousel-caption" style={{ zIndex: "10" }}>
                <div class="d-flex justify-content-centre">
                  <input class="form-control me-2" type="search" placeholder="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                </div>
              </div>
              <div class="carousel-item active">
                <img src="https://source.unsplash.com/random/900x500/?burger" class="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
              </div>
              <div class="carousel-item">
                <img src="https://source.unsplash.com/random/900x500/?pizza" class="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
              </div>
              <div class="carousel-item">
                <img src="https://source.unsplash.com/random/900x500/?noodles" class="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className='container'>
        {
          foodCat !== [] ?

            foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    fooditem !== [] ?
                      fooditem.filter((item) =>
                        (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toString().toLocaleLowerCase()))).map((filterItems) => {
                          return (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                              <Card fooditems={filterItems}
                                options={filterItems.options[0]}
                                >
                              </Card>
                            </div>
                          )

                        }) : <div>No such data found</div>}
                </div>
              )
            }) : ""
        }
      </div>
      <div><Footer /></div>
    </>
  )
}
