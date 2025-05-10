import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
    return (
        <div id="about" className='flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden'>
            <h1 className='text-2xl sm:text-4xl font-bold mb-2 '>
                About <span className='underline underline-offset-4 decoration-1 font-light'>Our Consultancy</span>
            </h1>
            <p className='text-gray max-w-80 text-center mb-8'>
                Welcome to MedVision — where care meets expertise. 🩺
            </p>
            <div className='flex flex-col md:flex-row items-center md:items-start md:gap-20'>
                <img src={assets.main1} className='w-full sm:w-1/2 max-w-lg' alt="Medical Consultancy" />
                <div className='flex flex-col items-center md:items-start mt-10 text-gray-600'>
                    <div className='grid grid-cols-2 gap-6 md:gap-10 w-full'>
                        <div>
                            <p className='font-medium text-4xl text-gray-600'>10+</p>
                            <p>Years of Trusted Healthcare</p>
                        </div>
                        <div>
                            <p className='font-medium text-4xl text-gray-600'>5000+</p>
                            <p>Patients Guided</p>
                        </div>
                        <div>
                            <p className='font-medium text-4xl text-gray-600'>100+</p>
                            <p>Partnered Specialists</p>
                        </div>
                        <div>
                            <p className='font-medium text-4xl text-gray-600'>24/7</p>
                            <p>Consultation Support</p>
                        </div>
                    </div>
                    <p className='my-10 max-w-lg'>
                        At MedVision, we empower individuals with timely, expert medical advice. Our mission is to bridge the gap between patients and quality healthcare by offering personalized consultancy, reliable second opinions, and continuous health monitoring support.
                    </p>
                   
                </div>
            </div>
        </div>
    );
};

export default About;
