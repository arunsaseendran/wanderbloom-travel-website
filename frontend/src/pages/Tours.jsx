import React, { useEffect, useState } from 'react'
import CommonSection from '../shared/CommonSection'
import "../styles/tour.css"

import { Col, Container, Row } from 'reactstrap'
import SearchBar from '../shared/SearchBar'
import TourCard from '../shared/TourCard'
import Newsletter from '../shared/ff'

// injected: Filter & Sort
import FilterSortBar from '../shared/FilterSortBar';


import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'

const Tours = () => {
 const [query, setQuery] = useState({});

const [pageCount, setPageCount]=useState(0);
const [page,setPage]=useState(0);

const {data:tours,loading,error}= useFetch(`${BASE_URL}/tours?page=${page}`)
const {data:tourCount}= useFetch(`${BASE_URL}/tours/search/getTourCount`)

useEffect(()=>{
  const pages =Math.ceil(tourCount / 8) //later we will use backend data count
  setPageCount(pages);
  window.scrollTo(0,0)
},[page,tourCount,tours])

  return (
<>
<div className='t1'>
{/* <CommonSection title={"All Tours"}/> */}
<h1 align='center'>
  <br/>
<span className="gradient-text">
            All Tours</span>
            </h1>
<section>
  <Container>
    <Row>
{/* <FilterSortBar onChange={(q)=>setQuery(q)} /> */}
     <SearchBar/>
    </Row>
  </Container>
</section>
<section className='pt-0'>
  <Container>
    {loading && <h4 className='text-center pt-5'>Loading.....</h4>}
    {error && <h4 className='text-center pt-5'>{error}</h4>}
{
  !loading && !error  && <Row>
{/* <FilterSortBar onChange={(q)=>setQuery(q)} /> */}
  {
   tours?.map(tour => (
   <Col lg="3" md="6" sm="12" className="mb-4" key={tour._id}>
     <TourCard tour={tour}/>
     </Col>
     ))
  }

  <Col lg="12" md="12" sm="12">
  <div className="pagination d-flex align-items-center
  justify-content-center mt-4 gap-3">
   {[...Array(pageCount).keys()].map(number=>(
     <span key={number} onClick={() => setPage(number)}
     className={page === number ? 'active__page': ""}
     >
       {number + 1}
     </span>
   ))}

  </div>
  </Col>
 </Row>
}
  </Container>
</section>
{/* <Newsletter/> */}
</div>
</>
  )
}

export default Tours
