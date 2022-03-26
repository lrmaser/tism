import React from 'react';
import { Link } from "react-router-dom";

import './SplashPage.css';

const SplashPage = () => {
    return (
        <main className='splash-page'>
            <div className='splash-mission-container'>
                {/* image */}
                <h1>What is tism?</h1>
                <p>
                    Tism is a community forum for neurodivergent, primarily autistic, individuals to bond over shared special interests and stim aids.
                    As a neurodivergent person myself, I wanted to provide a safe space for people to freely share about those interests.
                    If you'd like to know more about me and my interests, please check out my <Link to='/profiles/4'>profile</Link>.
                </p>
            </div>
            <div className='splash-special-interests-container'>
                {/* image */}
                <div>
                    <h2>Share interesting things about your special interests</h2>
                    <p>
                        Colloquially known as "info dumping," this is where you can share about absolutely anything.
                        Have you been doing research lately and need to share your findings with someone?
                        Or maybe you learned a fun fact and no one wants to hear <i>another</i> fun fact. We do! <Link to='/posts/new'>Share</Link> it with us!</p>
                </div>
            </div>
            <div className='splash-stims-container'>
                <div>
                    <h2>Show us your favorite stim aids</h2>
                    <p>
                        <Link to='/stim_aids'>Find</Link> the right tools for your sensory needs and recommend to others what stim aids work best for you.
                        You can also include ratings for things such as if it's noisy or chewable.
                    </p>
                </div>
                {/* image */}
            </div>
        </main>
    );
};

export default SplashPage;
