import banner1 from './assests/img/image-48.png'
import './assests/MidPartTwo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const MidPartTwo = () => {

  return (
    <>
      <div className='section-7'>
        <div className="container">
          <div className="row main-content">
            <div className="col-12 mt-5 pt-lg-5 d-flex flex-column align-items-center">
              <div className="heading">LOREM ISPUM</div>
              <div className="main-heading">Time to <span>Change Your Life</span></div>
              <img src={banner1} alt="banner" className='banner-img1' />
              {/* <div className="mail-form d-flex flex-row">
                <div>
                  <h4>Be notified when our beta launches</h4>
                  <p>We want to keep you up to date once we launch our beta version so that you are the first to experience this platform</p>
                </div>
                <form>
                  <input type="email" placeholder="Email Address" />
                  <button type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </form>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MidPartTwo;


