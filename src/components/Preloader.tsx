import React from 'react';

const Preloader: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/95 z-[9999] flex items-center justify-center" style={{ marginTop: 0 }}>
        <div className="loader">
          <div className="loader__circle"></div>
          <div className="loader__circle"></div>
          <div className="loader__circle"></div>
          <div className="loader__circle"></div>
          <div className="loader__circle"></div>
        </div>
      </div>

      <style jsx>{`
        .loader {
          position: relative;
          display: flex;
          gap: 0.3em;
        }

        .loader::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 2em;
          filter: blur(45px);
          background-color: #1DB954;
          background-image: radial-gradient(at 52% 57%, #1A8C43 0px, transparent 50%), 
                          radial-gradient(at 37% 57%, #A0FFC4 0px, transparent 50%); 
        }

        .loader__circle {
          --size__loader: 0.6em;
          width: var(--size__loader);
          height: var(--size__loader);
          border-radius: 50%;
          animation: loader__circle__jumping 2s infinite;
          background-color: #1DB954;
        }

        .loader__circle:nth-child(2n) {
          animation-delay: 300ms;
          background-color: #2EDC71;
        }

        .loader__circle:nth-child(3n) {
          animation-delay: 600ms;
        }

        @keyframes loader__circle__jumping {
          0%, 100% {
            transform: translateY(0px);
          }
          25% {
            transform: translateY(-15px) scale(0.5);
          }
          50% {
            transform: translateY(0px);
          }
          75% {
            transform: translateY(5px) scale(0.9);
          }
        }
      `}</style>
    </>
  );
};

export default Preloader;