import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect} from 'react'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import '@styles/contact-form.css'

const ContactForm = () => {
  const formRef = React.useRef<HTMLFormElement>(null)

  useEffect(() => {
    const formElement = document.querySelector('.contact-form') as HTMLFormElement
    if (formElement) {
      formElement.classList.remove('appear')
      void formElement.offsetWidth
      formElement.classList.add('appear')
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(formRef.current!)
    const data = Object.fromEntries(formData)
    const loading = document.querySelector('.loading') as HTMLDivElement
    const success = document.querySelector('.success') as HTMLDivElement
    const error = document.querySelector('.error') as HTMLDivElement
    // Attend each match case
    switch (true) {
      case !data.name:
        success.style.display = 'none'
        error.style.display = 'block'
        error.textContent = 'Please enter your name.'
        break
      case !data.email:
        success.style.display = 'none'
        error.style.display = 'block'
        error.textContent = 'Please enter your email.'
        break
      case !data.message:
        success.style.display = 'none'
        error.style.display = 'block'
        error.textContent = 'Please enter your message.'
        break
      default:
        success.style.display = 'block'
        error.style.display = 'none'
        success.textContent = 'Your message has been sent successfully!'
        break
    }

    loading.style.display = 'block'
    fetch('http://localhost:3000/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        loading.style.display = 'none'
        if (response.ok) {
          success.style.display = 'block'
          error.style.display = 'none'
          success.textContent = 'Your message has been sent successfully!'
          formRef.current!.reset()
        } else {
          success.style.display = 'none'
          error.style.display = 'block'
          error.textContent = 'Error sending message.'
        }
      })
      .catch(() => {
        success.style.display = 'none'
        error.style.display = 'block'
        error.textContent = 'Error sending message.'
      })
  }

  return (
    <form
      ref={formRef}
      className="contact-form appear"
      onSubmit={e => handleSubmit(e)}
    >
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          placeholder="Enter your name"
          required
          pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          placeholder="Enter your email"
          required
          pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="form-control"
          placeholder="Enter your message"
          required
          minLength={10}
          maxLength={1000}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Send <FontAwesomeIcon icon={faPaperPlane} />
      </button>
      <div className="form-message">
        <div className="loading">
        </div>
        <div className="success">Your message has been sent successfully!</div>
        <div className="error">Error sending message.</div>
      </div>
    </form>
  )
}

export default ContactForm
