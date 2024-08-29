import React from 'react';
import './BlogPage.css';
import { FaTag } from 'react-icons/fa'; // Import the FaTag icon
import { FaUser, FaCalendarAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";


const BlogPage = () => {
    const dummyData = [
        {
            imageUrl: 'https://via.placeholder.com/125x105',
            author: 'Dr. John Smith',
            date: 'August 20, 2024',
            title: 'New Advances in Heart Treatment',
            description: 'Explore the latest advancements in heart treatment, including new therapies and research breakthroughs. This article delves into how these advances are changing patient outcomes and improving quality of life.',
            readTime: '5 minutes'
        },
        {
            imageUrl: 'https://via.placeholder.com/125x105',
            author: 'Dr. Jane Doe',
            date: 'August 18, 2024',
            title: 'Managing High Blood Pressure Effectively',
            description: 'Learn about effective strategies for managing high blood pressure, including lifestyle changes, dietary adjustments, and medication options. This guide provides actionable tips for maintaining healthy blood pressure levels.',
            readTime: '6 minutes'
        },
        {
            imageUrl: 'https://via.placeholder.com/125x105',
            author: 'Dr. Emily Johnson',
            date: 'August 15, 2024',
            title: 'Understanding Cardiac Risk Factors',
            description: 'Understand the key risk factors for cardiac disease and how to mitigate them. This article covers genetics, lifestyle choices, and preventive measures that can reduce the risk of heart disease.',
            readTime: '4 minutes'
        }
    ];

    const relatedBlogsData = [
        {
            imageUrl: 'https://via.placeholder.com/75x55',
            chip: 'Health',
            date: 'Aug 28, 2024',
            title: 'Understanding Hypertension and Its Risks',
            readTime: '5 min'
        },
        {
            imageUrl: 'https://via.placeholder.com/75x55',
            chip: 'Wellness',
            date: 'Aug 25, 2024',
            title: 'The Impact of Diet on Blood Pressure',
            readTime: '4 min'
        },
        {
            imageUrl: 'https://via.placeholder.com/75x55',
            chip: 'Fitness',
            date: 'Aug 22, 2024',
            title: 'Exercises to Lower Blood Pressure',
            readTime: '6 min'
        },
        {
            imageUrl: 'https://via.placeholder.com/75x55',
            chip: 'Health',
            date: 'Aug 28, 2024',
            title: 'Understanding Hypertension and Its Risks',
            readTime: '5 min'
        }
    ];

    const heading = 'Latest Treatments for High Blood Pressure';

    return (
        <div className="blog-page-container">
            <div className="blog-content">
                <div className="blog-contents">
                    <h1 className="blog-title">Does Stress Cause High Blood Pressure? What to Know</h1>
                    <p className="blog-paragraph">
                        In some cases, <span className="highlight">stress</span> may contribute to <span className="highlight">high blood pressure</span>. Stress alone, however, is not known to cause high blood pressure on its own but may impact other risk factors.
                    </p>
                    <p className="blog-paragraph">
                        This article discusses how stress can cause high blood pressure, according to research. It also explains treatment and the outlook for <span className="highlight">high blood pressure</span> and stress. Finally, it answers some frequently asked questions about stress and high blood pressure.
                    </p>
                    <img src="https://s3-alpha-sig.figma.com/img/1dd5/0922/248c43b2fc63fb91c28274bbb9ce3a7f?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LxS06Ur7YBjYjmmFNKbQwnc-hQcykzqY2TBlJCZPtapDFgT~6ZyU6aHBmEsBgCdICDn9YCv7mWq8sO2ifv8wV8BViiCG~cqaHd5hzqdR7UE~TlG864doj3BOmYpHyNGZnNNA5wq1i0pTffuslBdFd4rmbjlf0hMp2ek1~~2wrtOlsz9CxEkWzS2E-7YS2uNQfzcQEUH8GEac2JvERFtoHel18eaDexKUCrNG-0Qm6SUXaRg6XpjYXcBbGIrhOfwNJB~iyzZPLsWCqjpowaGWyyLFSw1w9A9JBvhn8FDgMqaoFxi~43Bb-UHaN889hn8s2-7fvFDybNGG-kgz2rq5rw__" alt="Stress and Blood Pressure" className="blog-image" />

                    <h2 className="blog-heading">Can stress cause high blood pressure?</h2>
                    <p className="blog-paragraph">
                        In some cases, stress may cause blood pressure to increase. Stress can trigger the release of <span className="highlight">adrenaline</span>, a hormone that helps the body respond to a perceived threat. This is known as the <span className="highlight">fight-or-flight response</span>, and it has many physical effects on the body. These effects include temporarily causing your blood vessels to constrict and your heart rate to increase. This combination can lead to an increase in blood pressure.
                    </p>
                    <p className="blog-paragraph">
                        However, this increase in blood pressure may not necessarily be chronic or clinical. Stress may cause blood pressure to rise. However, these rises may not be high or long lasting enough to meet diagnostic thresholds of <span className="highlight">hypertension</span>. They may also not require clinical treatment.
                    </p>
                    <p className="blog-paragraph">
                        Learn more about blood pressure, including levels and diagnosis.
                    </p>

                    <h2 className="blog-heading">Acute stress and blood pressure</h2>
                    <p className="blog-paragraph">
                        Acute stress is your body’s short-term reaction to distressing input. This kind of stress may be a reaction to everyday, temporary stressors, like getting stuck in traffic.
                    </p>
                    <p className="blog-paragraph">
                        Acute or situational stress can trigger your fight-or-flight response and increase blood pressure. However, according to the <span className="highlight">American Heart Association (AHA)</span> charity, this increase is temporary. The blood pressure can return to what it was before once the stress is over. This differs from clinical cases of <span className="highlight">hypertension</span>.
                    </p>

                    <h2 className="blog-heading">Chronic stress and blood pressure</h2>
                    <p className="blog-paragraph">
                        The links between clinical hypertension and chronic stress are still being investigated. Currently, there is no definitive evidence to suggest that stress alone causes clinical cases of <span className="highlight">high blood pressure</span>.
                    </p>
                    <p className="blog-paragraph">
                        Instead, researchers from a 2019 review suggest that stress may be one of many contributing factors to developing high blood pressure.
                    </p>
                    <p className="blog-paragraph">
                        A 2021 study suggests that having high levels of stress hormones in the urine was linked with an increased risk of hypertension. This is supported by a 2019 study that observed that people with higher perceived stress levels had an increased chance of developing high blood pressure over the course of 13 years.
                    </p>
                    <p className="blog-paragraph">
                        Researchers from the 2019 review also suggest that stress may be a risk for other cardiovascular conditions. These conditions could include:
                    </p>
                    <ul className="blog-list">
                        <li>stroke</li>
                        <li>arrhythmia</li>
                        <li>atrial fibrillation</li>
                        <li>heart failure</li>
                    </ul>
                    <p className="blog-paragraph">
                        However, the researchers note that in many cases, additional health factors may have contributed to these conditions.
                    </p>
                    <p className="blog-paragraph">
                        As a result, further research is necessary to confirm the exact effects of stress on high blood pressure. Stress alone may not cause hypertension. However, it may be particularly important to manage stress if you experience other risk factors for heart disease.
                    </p>
                    

                                    </div>
                                    <div className="author-info-container">
      <div className="author-info-details">
        <FaUser className="info-icon" />
        <span className="info-text">By Tessa Cooper</span>
        <FaCalendarAlt className="info-icon" />
        <span className="info-text">January 12, 2023</span>
      </div>
      <div className="author-social-icons">
        <FaFacebookF className="social-icon" />
        <FaTwitter className="social-icon" />
        <FaInstagram className="social-icon" />
      </div>
    </div>

               
                <div className="treatment-card-container">
      <div className="treatment-section-title">{heading}</div>
      <div className="treatment-card-grid">
        {dummyData.map((card, index) => (
          <div key={index} className="treatment-card">
            <div className="treatment-card-left">
              <img
                src={card.imageUrl}
                alt="Card thumbnail"
                className="treatment-card-image"
              />
              <div className="treatment-card-author-container">
                <div className="treatment-card-author">{card.author}</div>
                <div className="treatment-card-date">{card.date}</div>
              </div>
            </div>
            <div className="treatment-card-right">
              <div className="treatment-card-title">{card.title}</div>
              <p className="treatment-card-description">
                {card.description}
              </p>
             
                <div className="treatment-card-readmore">
                Medically reviewed by Alisha D. Sellers, BS Pharmacy, PharmD
                </div>
           
            </div>
            
          </div>
        ))}
      </div>

    </div>
            </div>

            <div className="blog-sidebar">
                <div className="blog-search-bar">
                    <input type="text" className="blog-search-input" placeholder="Search for related blogs..." />
                    <button className="blog-search-button">Search</button>
                </div>
                <div className="blog-categories">
                    <h3 className="blog-categories-title">Categories</h3>
                    <ul className="blog-categories-list">
                    <li className='spacing'><FaTag className="category-icon" /> Heart Health</li>
                        <li className='spacing'><FaTag className="category-icon" /> Hypertension</li>
                        <li className='spacing'><FaTag className="category-icon" /> Cardiology</li>
                        <li className='spacing'><FaTag className="category-icon" /> Wellness</li>
                    </ul>
                </div>
                <div className="blog-related-blogs">
                    <h3 className="blog-heading">Related Blogs</h3>
                    <div className="related-blog-card-grid">
                        {relatedBlogsData.map((relatedBlog, index) => (
                            <div key={index} className="related-blog-card">
                                <div className="related-blog-image">
                                    <img src={relatedBlog.imageUrl} alt={relatedBlog.title} />
                                </div>
                                <div className="related-blog-content">
                                    <div className="related-blog-chip">{relatedBlog.chip}</div>
                                    <div className="related-blog-date">{relatedBlog.date}</div>
                                    <h3 className="related-blog-title">{relatedBlog.title}</h3>
                                    <div className="related-blog-read-time">Read more in {relatedBlog.readTime}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
