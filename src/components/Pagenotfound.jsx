import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'

function Pagenotfound() {

    const handleType = (count) => {

        console.log(count);
    };

    const handleDone = () => {
        console.log(`Done after 5 loops!`);
    };
    return (
        <>
            <div className="container-fluid">

                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="https://cdn.svgator.com/images/2024/04/detective-animation-404-error-page.gif"
                        alt="No Image"
                        className="img-fluidmt-4"
                        style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <h1 style={{ paddingTop: '5rem', margin: 'auto 0', fontWeight: 'normal' }} className='text-center '>
                        {' '}
                        <span style={{ color: 'purple', fontWeight: 'bold' }}>

                            <Typewriter
                                words={['Something', 'Went', 'Wrong', 'Please', 'Go', 'Back', 'to', 'Home']}
                                loop={5}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                                onLoopDone={handleDone}
                                onType={handleType}
                            />
                            <Link to={'/'}>
                                <FontAwesomeIcon icon={faHouse} fade style={{ color: "#4c1515", }} className='ms-3' />
                            </Link>
                        </span>

                    </h1>
                </div>
            </div>
        </>
    )
}

export default Pagenotfound