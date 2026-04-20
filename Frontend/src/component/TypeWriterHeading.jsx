import { Typewriter } from 'react-simple-typewriter';

const TypewriterHeading = ({ text, className }) => {
  return (
    <h2 className={`xl:text-2xl text-xl font-extrabold text-white text-center uppercase tracking-wider drop-shadow-xl ${className}`}>
      <Typewriter 
        words={[text]}
        loop={false}
        cursor
        cursorStyle="|"
        typeSpeed={100}
        deleteSpeed={50}
      />
    </h2>
  );
};

export default TypewriterHeading;
