import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const WidgetCard = () => {
  const widgetData = [
    {
      id: 1,
      imageUrl: "https://s3-alpha-sig.figma.com/img/4575/18c4/caea4d9e6da616048af279345be73770?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c22YIQhWQlE04yv~t1rg3VvGxr1hr9bJSswcZwQrfnaKwhCYdpHjKYt0x83FqARjBMzj8sETxD3U6ha39cgMRJsfyvI5Ew4a9o5vKH6hiljGyevGuG7Mu~u6QYloz3JR~hwOGzjJBGRrpug7XKTtA~sDbNTRut~ggKV8DLGd0I7SdEFg2EaqYWtBoLfZ926FSJf88Uoy~GooZjNI3-JlCpJavC4x4eo6THQLCKKGzqLk~o554K4B3o4pYSkUqj~uHa8smmiejwP1kdvGtfNWSWPrAExwLL8Zm8c~hiPlMgB5OgrUSMS40u96d3mu10lAPvMXvLQi6fy9Qrq3xXiGww__",
      tag: "Health",
      date: "15 Jun 2023",
      title: "Lorem ipsum dolor sit amet, consectetur",
      readTime: 8,
    },
    {
      id: 2,
      imageUrl: "https://s3-alpha-sig.figma.com/img/4575/18c4/caea4d9e6da616048af279345be73770?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c22YIQhWQlE04yv~t1rg3VvGxr1hr9bJSswcZwQrfnaKwhCYdpHjKYt0x83FqARjBMzj8sETxD3U6ha39cgMRJsfyvI5Ew4a9o5vKH6hiljGyevGuG7Mu~u6QYloz3JR~hwOGzjJBGRrpug7XKTtA~sDbNTRut~ggKV8DLGd0I7SdEFg2EaqYWtBoLfZ926FSJf88Uoy~GooZjNI3-JlCpJavC4x4eo6THQLCKKGzqLk~o554K4B3o4pYSkUqj~uHa8smmiejwP1kdvGtfNWSWPrAExwLL8Zm8c~hiPlMgB5OgrUSMS40u96d3mu10lAPvMXvLQi6fy9Qrq3xXiGww__",
      tag: "Health",
      date: "15 Jun 2023",
      title: "Lorem ipsum dolor sit amet, consectetur",
      readTime: 8,
    },
    {
      id: 3,
      imageUrl: "https://s3-alpha-sig.figma.com/img/4575/18c4/caea4d9e6da616048af279345be73770?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c22YIQhWQlE04yv~t1rg3VvGxr1hr9bJSswcZwQrfnaKwhCYdpHjKYt0x83FqARjBMzj8sETxD3U6ha39cgMRJsfyvI5Ew4a9o5vKH6hiljGyevGuG7Mu~u6QYloz3JR~hwOGzjJBGRrpug7XKTtA~sDbNTRut~ggKV8DLGd0I7SdEFg2EaqYWtBoLfZ926FSJf88Uoy~GooZjNI3-JlCpJavC4x4eo6THQLCKKGzqLk~o554K4B3o4pYSkUqj~uHa8smmiejwP1kdvGtfNWSWPrAExwLL8Zm8c~hiPlMgB5OgrUSMS40u96d3mu10lAPvMXvLQi6fy9Qrq3xXiGww__",
      tag: "Health",
      date: "15 Jun 2023",
      title: "Lorem ipsum dolor sit amet, consectetur",
      readTime: 8,
    },
    {
      id: 4,
      imageUrl: "https://s3-alpha-sig.figma.com/img/4575/18c4/caea4d9e6da616048af279345be73770?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c22YIQhWQlE04yv~t1rg3VvGxr1hr9bJSswcZwQrfnaKwhCYdpHjKYt0x83FqARjBMzj8sETxD3U6ha39cgMRJsfyvI5Ew4a9o5vKH6hiljGyevGuG7Mu~u6QYloz3JR~hwOGzjJBGRrpug7XKTtA~sDbNTRut~ggKV8DLGd0I7SdEFg2EaqYWtBoLfZ926FSJf88Uoy~GooZjNI3-JlCpJavC4x4eo6THQLCKKGzqLk~o554K4B3o4pYSkUqj~uHa8smmiejwP1kdvGtfNWSWPrAExwLL8Zm8c~hiPlMgB5OgrUSMS40u96d3mu10lAPvMXvLQi6fy9Qrq3xXiGww__",
      tag: "Health",
      date: "15 Jun 2023",
      title: "Lorem ipsum dolor sit amet, consectetur",
      readTime: 8,
    }
    
  ];

  return (
    <div className="widget-cards-container">
      {widgetData.map((item) => (
        <div className="widget-card" key={item.id}>
          <img src={item.imageUrl} alt="post-img" className="widget-img-preview" />
          <div className="post-details-cnt">
            <div className="card-tag-time">
              <p className="post-preview-tag">{item.tag}</p>
              <p className="post-preview-date">{item.date}</p>
            </div>
            <h4>{item.title}</h4>
            <div className="widget-card-readMore-cnt">
              <h4>Read more in {item.readTime} Minutes</h4>
              <FaLongArrowAltRight size="1rem" className="readMore-cnt-icon" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WidgetCard;
