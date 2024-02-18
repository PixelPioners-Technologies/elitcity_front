import './Footer.css'
import instagram_logo from '../icons/instagram_logo.jpg'
import facebook_logo from '../icons/facebook_logo.png'
import gmail_logo from '../icons/gmail_logo.png'

export default function Footer() {

  return (
    <div className="footer_container">

      <div className="footer_settings_container">
        <div className="footer_stting">
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
        </div>
        <div className="footer_stting">
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
        </div>
        <div className="footer_stting">
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
        </div>
        <div className="footer_stting">
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
        </div>
        <div className="footer_stting">
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
          <p className="each_setting">Lorem Ipsum is simply dummy text</p>
        </div>
      </div>


      <div className="name_and_facebook">
        <p className="website_name">Storkhome.ge</p>
        <div className="website_links_container">

          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src={instagram_logo} alt="instagram logo"  className='instagram_logo' />
          </a>

          <a href="https://www.facebook.com/profile.php?id=61556389625811" target="_blank" rel="noopener noreferrer">
            <img src={facebook_logo} alt="facebook logo" className='facebook_logo' />
          </a>

          <a href="https://mail.google.com/mail/" target="_blank" rel="noopener noreferrer">
            <img src={gmail_logo} alt="gmail logo"  className='gmail_logo' />
          </a>

        </div>
      </div>

    </div>
  )
} 