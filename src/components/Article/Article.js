import React, { useState } from 'react';
import './Article.css';
import { Link } from 'react-router-dom';

const bufferToBase64 = (buffer) => {
    if (buffer.type === 'Buffer' && Array.isArray(buffer.data)) {
        const binary = String.fromCharCode.apply(null, new Uint8Array(buffer.data));
        return `data:image/jpeg;base64,${window.btoa(binary)}`;
    } else {
        console.error('Unexpected buffer type:', typeof buffer);
        return '';
    }
};

function Articles({ blogs }) {
    console.log(blogs,'blogs');
    
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (id) => {
        setSelectedCard(id);
    };

    const nextCard = () => {
        setSelectedCard((prev) => (prev === blogs.length ? 1 : prev + 1));
    };

    const prevCard = () => {
        setSelectedCard((prev) => (prev === 1 ? blogs.length : prev - 1));
    };

    const getBase = (data) => {
        return bufferToBase64(data.data);
    };

    return (
        <div className='main-article'>
            <div className='container article-area'>
                <div className='background'>
                    <h1 className='articles-doctor'>Articles</h1>
                    <div className="card-align">
                        {blogs?.map((card) => (
                            <div className="card-align-gap" key={card._id} onClick={() => handleCardClick(card._id)}>
                                <div className={`card-article ${selectedCard === card._id ? 'selected' : ''}`}>
                                    <img src={getBase(card.image)} className="card-img-top" alt="..." />
                                    {selectedCard === card._id && (
                                        <img src={getBase(card.image)} className="overlay-img" alt="..." />
                                    )}
                                    <div className="card-content">
                                        <img src={card.logo} className={`card-logo ${selectedCard === card._id ? 'hidden' : ''}`} alt="..." />
                                        <h5 className="Telemedicine">TELEMEDICINE</h5>
                                        <h2 className='date'>5 Jun 2024 . <span className='time text-muted'>2 min read</span></h2>
                                        <h5 className="Maintitle">{card.title}</h5>
                                        <p className="description">{card.description}</p>
                                        <Link className='Learnmore'>Learn More</Link>
                                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.21795 11L11.8333 6M11.8333 6L7.21795 1M11.8333 6H1" stroke="#272848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='articles-navigation'>
                        <div className='next' onClick={nextCard}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='right-arrow'>
                                <rect y="40" width="40" height="40" rx="20" transform="rotate(-90 0 40)" fill="#0167FF" />
                                <path d="M18 24L23 20L18 16" stroke="white" strokeWidth="1.725" strokeLinecap="square" />
                            </svg>
                        </div>
                        <div className='previous' onClick={prevCard}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='left-arrow'>
                                <rect x="0.5" y="39.5" width="39" height="39" rx="19.5" transform="rotate(-90 0.5 39.5)" stroke="#272848" />
                                <path d="M22 16L17 20L22 24" stroke="#272848" strokeWidth="1.725" strokeLinecap="square" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Articles;
