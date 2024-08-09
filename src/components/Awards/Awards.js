import React from 'react';
import './Awards.css';
import { BiSolidTrophy } from "react-icons/bi";



const AwardsRecognition = ({Awards}) => {
    const awards=Awards?.map((data)=>{
        const year = data?.slice(data.length-4).trim();
        const title=data?.slice(0, data.length-4).trim();
return {year,title}
    })

    return (
        <div className='award-section'>
        <div className="container main-area ">
            <div className='award-area'>
            <h2>Awards and Recognition</h2>
            <div className="doctor-cards-awards">
                {awards?.map((award, index) => (
                    <div  className='card-award-container' key={index} >
                        <div className="  card-award">
                            <div className="award-body">
                                <div className="awardimg my-3">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className='award-image1'>
<path d="M25 50C21.5417 50 18.2917 49.3433 15.25 48.03C12.2083 46.7167 9.5625 44.9358 7.3125 42.6875C5.0625 40.4392 3.28167 37.7933 1.97 34.75C0.658336 31.7067 0.00166983 28.4567 3.16455e-06 25C-0.0016635 21.5433 0.655003 18.2933 1.97 15.25C3.285 12.2067 5.06583 9.56083 7.3125 7.3125C9.55916 5.06417 12.205 3.28333 15.25 1.97C18.295 0.656667 21.545 0 25 0C28.455 0 31.705 0.656667 34.75 1.97C37.795 3.28333 40.4408 5.06417 42.6875 7.3125C44.9341 9.56083 46.7158 12.2067 48.0325 15.25C49.3491 18.2933 50.005 21.5433 50 25C49.995 28.4567 49.3383 31.7067 48.03 34.75C46.7216 37.7933 44.9408 40.4392 42.6875 42.6875C40.4341 44.9358 37.7883 46.7175 34.75 48.0325C31.7116 49.3475 28.4617 50.0033 25 50Z" fill="#E4EDFF"/>
</svg>

<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className='award-image2'>
<path d="M4.22222 19V16.8889H8.44444V13.6167C7.58241 13.4231 6.81291 13.0583 6.13594 12.5221C5.45898 11.9858 4.96181 11.3127 4.64444 10.5028C3.325 10.3444 2.22124 9.76846 1.33317 8.77483C0.445093 7.7812 0.000703704 6.61552 0 5.27778V4.22222C0 3.64167 0.206889 3.14485 0.620667 2.73178C1.03444 2.3187 1.53126 2.11181 2.11111 2.11111H4.22222V0H14.7778V2.11111H16.8889C17.4694 2.11111 17.9666 2.318 18.3804 2.73178C18.7942 3.14556 19.0007 3.64237 19 4.22222V5.27778C19 6.61481 18.5556 7.7805 17.6668 8.77483C16.7781 9.76917 15.6743 10.3451 14.3556 10.5028C14.0389 11.312 13.5421 11.9851 12.8651 12.5221C12.1881 13.059 11.4183 13.4239 10.5556 13.6167V16.8889H14.7778V19H4.22222ZM4.22222 8.23333V4.22222H2.11111V5.27778C2.11111 5.9463 2.30463 6.54902 2.69167 7.08595C3.0787 7.62287 3.58889 8.00533 4.22222 8.23333ZM14.7778 8.23333C15.4111 8.00463 15.9213 7.62181 16.3083 7.08489C16.6954 6.54796 16.8889 5.94559 16.8889 5.27778V4.22222H14.7778V8.23333Z" fill="#0067FF"/>
</svg>




                                </div>
                                <h5 className="award-title">{award.title}</h5>
                                <p className="award-description">({award.year})</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>
    );
}

export default AwardsRecognition;
