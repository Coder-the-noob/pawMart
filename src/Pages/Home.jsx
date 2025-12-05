import React from 'react';
import Slider from '../Components/Slider';
import PopularCare from '../Components/PopularCare';
import ExpertVets from '../Components/ExpertVets';
import WinterCareTips from '../Components/WinterCareTips';
import TestimonialsSection from '../Components/TestimonialsSection';
import CategorySection from '../Components/CategorySection';

const Home = () => {
    return (
        <div>
            <title>Home</title>
            <Slider></Slider>
            <CategorySection></CategorySection>
            <PopularCare></PopularCare>
            <ExpertVets></ExpertVets>
            <WinterCareTips></WinterCareTips>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;
<CategorySection></CategorySection>