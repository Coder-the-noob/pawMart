import React from 'react';
import Slider from '../Components/Slider';
import PopularCare from '../Components/PopularCare';
import ExpertVets from '../Components/ExpertVets';
import WinterCareTips from '../Components/WinterCareTips';
import TestimonialsSection from '../Components/TestimonialsSection';
import CategorySection from '../Components/CategorySection';
import RecentListing from '../Components/RecentListing';
import WhyAdopt from '../Components/WhyAdopt';

const Home = () => {
    return (
        <div>
            <title>Home</title>
            <Slider></Slider>
            <CategorySection></CategorySection>
            <RecentListing></RecentListing>
            
            <WinterCareTips></WinterCareTips>
            <WhyAdopt></WhyAdopt>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;
<CategorySection></CategorySection>