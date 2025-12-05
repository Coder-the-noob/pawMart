import React from 'react';
import Slider from '../Components/Slider';
import PopularCare from '../Components/PopularCare';
import ExpertVets from '../Components/ExpertVets';
import WinterCareTips from '../Components/WinterCareTips';
import TestimonialsSection from '../Components/TestimonialsSection';

const Home = () => {
    return (
        <div>
            <title>Home</title>
            <Slider></Slider>
            <PopularCare></PopularCare>
            <ExpertVets></ExpertVets>
            <WinterCareTips></WinterCareTips>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;