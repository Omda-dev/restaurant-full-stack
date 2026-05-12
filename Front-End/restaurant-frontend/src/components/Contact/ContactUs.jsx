import './ContactUs.css'

const ContactUs = () => {
  return (
    <div className='contact-container'>
      <h1>Contact Us</h1>
      <p>
        We consider all the drivers of change to create the components you need
        to create a truly happens.
      </p>

      <form className='contact-form'>
        <div className='form-group header'>
          <div>
            <label>Name</label>
            <input type='text' placeholder='Enter your name' />
          </div>
          <div>
            <label>Email</label>
            <input type='email' placeholder='Enter email address' />
          </div>
        </div>

        <div className='form-group'>
          <label>Subject</label>
          <input type='text' placeholder='Write subject' />
        </div>

        <div className='form-group'>
          <label>Message</label>
          <textarea placeholder='Write your message'></textarea>
        </div>

        <button type='submit'>Send</button>
      </form>

      <div className='contact-info'>
        <div>
          <p>
            <strong>Call Us:</strong>
          </p>
          <p>+1-234-567-8900</p>
        </div>
        <div>
          <p>
            <strong>Hours:</strong>
          </p>
          <p>Monday - Friday: 9:00 AM - 10:00 PM</p>
          <p>Saturday: 10:00 AM - 11:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
        <div>
          <p>
            <strong>Our Location:</strong>
          </p>
          <p>123 Bridge Lane</p>
          <p>Nowhere Land, LA 12345</p>
          <p>United States</p>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
