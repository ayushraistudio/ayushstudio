
import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; 
import './Contact.css';


const Contact = () => {
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (!name || !email || !message) {
      setMsg('Please fill all fields.');
      return;
    }

    emailjs.send(
      'service_o8mz9f4',        // your Service ID
      'template_izxdijg',       // your Template ID
      {
        from_name: name,        // matches {{from_name}} in template
        from_email: email,      // matches {{from_email}} in template
        message: message,       // matches {{message}} in template
      },
      'yfIHQQcLKJLB7ZzbU'       // your Public Key
    )
    .then((result) => {
      console.log('EmailJS success:', result.text);
      setMsg('✅ Message sent successfully!');
      form.reset();
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      setMsg('❌ Failed to send message. Try again.');
    });
  };

  return (
    <section id="contact">
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="contact-row">
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Your Name" required />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@domain.com" required />
          </div>
        </div>
        <div className="field">
          <label>Message</label>
          <textarea name="message" placeholder="Write a short message..." required></textarea>
        </div>
        <button type="submit" className="btn">Send Message</button>
        <p className="note">{msg}</p>
      </form>
      <p>Or email me directly: <a href="mailto:info@ayushraistudio.com">info@ayushraistudio.com</a></p>
    </section>
  );
};

export default Contact;
