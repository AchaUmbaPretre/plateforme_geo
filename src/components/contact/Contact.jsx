import { LocationOn, Mail, Phone } from '@mui/icons-material'
import './contact.scss'
import { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [objectif, setObjectif] = useState('');
    const [tel, setTel] = useState('');
    const [message, setMessage] = useState('')


  return (
    <>
        <div className="contact" id='contact'>
            <div className="contact-wrapper">
                <div className="client-cont-title">
                    <h1 className="client-sous-title client-bg">Contact</h1>
                    <p className="apropos-barre"><span className="apropos-moov"></span></p>
                </div>

                <div className="contact-container">
                    <div className="contact-rows">
                        <div className="contact-left" data-aos="fade-down-right">
                            <div className="contact-left-rows">
                                <div className="contact-row">
                                    <div className="contact-row-icon">
                                        <LocationOn className='contact-icon'/>
                                    </div>
                                    <div className="contact-row-text">
                                        <h2 className="contact-text-h2">Location:</h2>
                                        <span className="contact-txt">10ieme rue N°20 Q/Industriel Commune de Limete RDC</span>
                                    </div>
                                </div>

                                <div className="contact-row">
                                    <div className="contact-row-icon">
                                        <Mail className='contact-icon'/>
                                    </div>
                                    <div className="contact-row-text">
                                        <h2 className="contact-text-h2">Email:</h2>
                                        <span className="contact-txt"><a href='https://lensgabriel1@gmail.com' className="contact-txt" >lensgabriel1@gmail.com</a></span>
                                    </div>
                                </div>

                                <div className="contact-row">
                                    <div className="contact-row-icon">
                                        <Phone className='contact-icon'/>
                                    </div>
                                    <div className="contact-row-text">
                                        <h2 className="contact-text-h2">Telephone:</h2>
                                        <span className="contact-txt">+243823956649</span>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-left-bottom">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.3070476026837!2d15.338767374761652!3d-4.353386386948027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a36e68eb1b839%3A0x968fdaae8c53fefc!2sInstitut%20du%20P%C3%A9trole%20et%20du%20Gaz!5e0!3m2!1sfr!2scd!4v1756638164218!5m2!1sfr!2scd" 
                                    width={"100%"}
                                    height="300" 
                                    style={{border:"0"}}
                                    allowfullscreen="" 
                                    loading={"lazy"} 
                                    referrerpolicy="no-referrer-when-downgrade" 
                                />
                            </div>
                        </div>

                        <div className="contact-right" data-aos="fade-down-left">
                            <form action="">
                                <div className="form-control">
                                    <input type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} className="input-controle" placeholder='Entrez votre nom...' />
                                    <input type="text" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input-controle" placeholder='Entrez votre email...' />
                                </div>
                                <div className="form-control">
                                    <input type="text" name="objectif" value={objectif} onChange={(e)=>{setObjectif(e.target.value)}} className="input-controle" placeholder='Objectif...' />
                                </div>
                                <div className="form-control">
                                    <input type="tel" name="tel" value={tel} onChange={(e)=>{setTel(e.target.value)}} className="input-controle" placeholder='Entez votre numero de téléphone...' />
                                </div>
                                <textarea name="message" value={message} onChange={(e)=>{setMessage(e.target.value)}} id="" rows="15" placeholder='message...'></textarea>
                                <button type='submit' className="contact-submit">Envoyer le message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Contact