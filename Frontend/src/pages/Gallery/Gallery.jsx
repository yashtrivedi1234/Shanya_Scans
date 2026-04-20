import React, { useEffect } from 'react';
import BreadCrumbs from '../../component/BreadCums';
import Gallery2 from './Gallery2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGallery } from '../../Redux/slice/teamSlice';

const SkeletonLoader = () => (
	<div className="cursor-pointer animate-pulse">
	  <div className="bg-gray-300 h-64 w-full mx-auto"></div>
	  <div className="px-4 py-[1rem] xl:px-6 border bg-[#F7F7F7]">
		<div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
		<div className="h-6 bg-gray-300 rounded w-1/2"></div>
	  </div>
	</div>
  );



const Gallery = () => {
  const dispatch = useDispatch();

  // Accessing the data from Redux state
  const { galleryData, loading, error } = useSelector((state) => state.team);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Gallery' },
  ];

  // Fetch the data once when the component mounts
  useEffect(() => {
    if (!galleryData.length) {  // Check if data is already loaded
      dispatch(fetchGallery());
    }
  }, [dispatch, galleryData.length]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the page loads
  }, []);


  

  return (
    <div>
      <BreadCrumbs headText={"Visit Our Gallery"} items={breadcrumbItems} />
      {/* <Gallery2 data={galleryData} /> */}
      {loading ? Array.from({ length: 8 }).map((_, i) => (
                <div className="col-span-4 md:col-span-2 lg:col-span-1 max-w-7xl mx-auto" key={i}>
                  <SkeletonLoader />
                </div>
              )) : <Gallery2  data={galleryData}/>}
      {error && <div>Error loading data: {error}</div>}
    </div>
  );
};

export default Gallery;
