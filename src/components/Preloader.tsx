import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="preloader-container">
      <div className="loader">
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
      </div>

      <style jsx>{`
        .preloader-container {
          position: fixed;
          inset: 0;  /* This sets top, right, bottom, left all to 0 */
          width: 100dvw;  /* dynamic viewport width */
          height: 100dvh;  /* dynamic viewport height */
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.95);
          z-index: 99999;  /* Increased z-index to ensure it's above navbar */
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

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
          background-color: #e299ff;
          background-image: radial-gradient(at 52% 57%, hsla(11,83%,72%,1) 0px, transparent 50%),
          radial-gradient(at 37% 57%, hsla(175,78%,66%,1) 0px, transparent 50%);
        }

        .loader__circle {
          --size__loader: 0.6em;
          width: var(--size__loader);
          height: var(--size__loader);
          border-radius: 50%;
          animation: loader__circle__jumping 2s infinite;
          background-color: #b499ff;
        }

        .loader__circle:nth-child(2n) {
          animation-delay: 300ms;
          background-color: #e499ff;
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
    </div>
  );
};

export default Preloader;