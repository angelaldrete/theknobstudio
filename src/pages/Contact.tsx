import ContactForm from '../components/ContactForm'
import '@styles/contact.css'

const Contact = () => {
  return (
    <div className="contact">
      <h1>
        Contact
      </h1>
      <p>
        If you liked what you've <strong>listened</strong>, feel free to send me a message. Fill out the form below and I'll get back to you as soon as possible.
      </p>
      <ContactForm/>
    </div>
  )
}

export default Contact
