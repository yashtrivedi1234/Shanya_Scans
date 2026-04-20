import React from 'react'
import PackageCard from './PackageCard';
const articles = [
    {
      title: "Simplest Salad Recipe ever",
      description: "Lorem Ipsum is simply dummy text...",
      image: "https://example.com/image1.jpg",
      timeAgo: "6 mins ago",
      comments: "39",
      link: "/article-1",
    },
    {
      title: "Best FastFood Ideas (Yummy)",
      description: "Lorem Ipsum is simply dummy text...",
      image: "https://example.com/image2.jpg",
      timeAgo: "10 days ago",
      comments: "0",
      link: "/article-2",
    },
  ];

  
const Package = () => {
  return (
    <div>
          
  <PackageCard articles={articles} />;
    </div>
  )
}

export default Package