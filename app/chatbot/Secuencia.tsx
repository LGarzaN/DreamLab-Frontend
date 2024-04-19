import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import Run from './Run.json';
import Wave from './Wave.json';

const ReproducirAnimaciones = () => {
    const lottieRef = useRef<any>();
    const [currentAnimation, setCurrentAnimation] = useState(Run);
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        if (lottieRef.current){
            lottieRef.current.play();
        }
        
    }, []);

    useEffect(() => {
        if (animationFinished) {
            setCurrentAnimation(Wave as any);
        }
    }, [animationFinished]);

    const handleAnimationComplete = () => {
        setAnimationFinished(true);
    };

    return (
        <Lottie
            lottieRef={lottieRef}
            animationData={currentAnimation}
            loop={currentAnimation === Run ? 2 : true}
            autoplay={true}
            onComplete={handleAnimationComplete}
        />
    );
};

export default ReproducirAnimaciones;
