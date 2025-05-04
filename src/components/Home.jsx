import React from 'react'
import '../index.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from '../pages/Header'
import Footer from '../pages/Footer';
import { Image } from 'react-bootstrap';
import Collaborate from './Collaborate';
import JoinOurTeam from './JoinOurTeam';


function Home() {
    return (
        <>
            <Header />
            <div className="container-fluid   w-100 vh-100  pt-1" style={{ marginTop: "150px" }}>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-11">
                        <div className="row">
                            <div className="col-md-6 mt-sm-4 mt-0 ">
                                <h1 className='text-center'>Unleash Your Creativity with Collaborative Storytelling - <span className='text-primary'>"Story<span style={{color:"orange"}}>S</span>ync"</span>
                                </h1>
                            </div>

                            <div className="col-md-6 text-justify mt-sm-4 mt-0 ">
                                <p > Join StorySync, the ultimate platform for writers to collaborate in real time. Create, edit, and refine your stories together with fellow creatives and explore a world of imagination.</p>
                                <div className='d-flex  gap-sm-4 gap-2 '>
                                    <Link to={"/register"}>
                                        <Button variant="outline-warning">Sign Up</Button>
                                    </Link>

                                    <Link to={"/login"}>
                                        <Button variant="outline-dark">Sign In</Button>
                                    </Link>


                                </div>

                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            
                            <Image src="https://www.shutterstock.com/image-vector/open-book-magic-fairy-tale-600nw-2514912831.jpg" fluid />

                        </div>
                        
                    </div>
                    
                </div>
            </div>



            <div className='container'>

                <div>
                    <h1 style={{ fontFamily: "inherit" }}>Explore Trending Stories</h1>
                    <div className='d-flex justify-content-between'>
                        <p>
                            Discover the latest uploads from our talented writers.
                        </p>

                        <Link to={'/trendingStories'}>
                            <Button variant="outline-dark rounded-0">View All</Button></Link>

                    </div>
                </div>
                
            </div>
            <Collaborate/>
            
            <JoinOurTeam/>
            <Footer />

        </>
    )
}

export default Home