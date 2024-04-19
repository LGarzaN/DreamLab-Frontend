import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import Run from './Run.json';
import Wave from './Wave.json';

const ReproducirAnimaciones = () => {
    const lottieRef = useRef();
    const [currentAnimation, setCurrentAnimation] = useState(Run);
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        lottieRef.current.play();
    }, []);

    useEffect(() => {
        if (animationFinished) {
            setCurrentAnimation(Wave);
            lottieRef.current.play();
        }
    }, [animationFinished]);

    return (
        <Lottie
            lottieRef={lottieRef}
            animationData={currentAnimation}
            loop={currentAnimation === Run ? 2 : true} // Establecer el bucle solo para la primera animación
            autoplay={false}
            onComplete={() => setAnimationFinished(true)}
        />
    );
};

export default ReproducirAnimaciones;
