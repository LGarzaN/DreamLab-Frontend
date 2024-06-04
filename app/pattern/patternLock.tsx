import { useState } from 'react';

interface PatternLockProps {
    onPatternComplete: (pattern: string) => void;
}

const PatternLock: React.FC<PatternLockProps> = ({ onPatternComplete }) => {
    const [pattern, setPattern] = useState<number[]>([]);
    const [drawing, setDrawing] = useState(false);

    const handleMouseDown = (index: number) => {
        setPattern([index]);
        setDrawing(true);
    };

    const handleMouseEnter = (index: number) => {
        if (drawing && !pattern.includes(index)) {
            setPattern([...pattern, index]);
        }
    };

    const handleMouseUp = () => {
        setDrawing(false);
        const patternString = pattern.join('');
        onPatternComplete(patternString);
        setPattern([]);
    };

    return (
        <div className="relative flex items-center justify-center w-[400px] h-[300px] ml-27" onMouseUp={handleMouseUp}>
            <div className="grid grid-cols-3 gap-20">
                {[...Array(9)].map((_, index) => (
                    <div
                        key={index}
                        className={`w-8 h-8 flex items-center justify-center rounded-full border-4 ${
                            pattern.includes(index) ? 'border-purple-500' : 'border-purple-300'
                        }`}
                        onMouseDown={() => handleMouseDown(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <div className={`w-4 h-4 rounded-full ${pattern.includes(index) ? 'bg-purple-500' : ''}`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatternLock;