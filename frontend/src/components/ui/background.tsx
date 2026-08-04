
export default function BackgroundWave() {

    return (
        <div className="absolute w-full h-screen inset-[-100] -z-10 overflow-hidden">
        <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            className="absolute bottom-0 h-[120%] w-[200%] animate-[wave_16s_ease-in-out_infinite]"
        >
            <defs>
            <style>
                {`
                @keyframes wave {
                    0% {
                    transform: translateX(0);
                    }
                    50% {
                    transform: translateX(-18%);
                    }
                    100% {
                    transform: translateX(0);
                    }
                }
                `}
            </style>
            </defs>

            <path
            fill="#A8D5A2"
            d="M0,320L60,346.7C120,373,240,427,360,432C480,437,600,395,720,373.3C840,352,960,352,1080,373.3C1200,395,1320,437,1380,458.7L1440,480V900H0Z"
            />

            <path
            fill="#79AC78"
            fillOpacity="0.9"
            d="M0,420L80,394C160,368,320,316,480,326C640,336,800,410,960,437C1120,464,1280,442,1360,432L1440,420V900H0Z"
            />

            <path
            fill="#6B9C6A"
            fillOpacity="0.75"
            d="M0,520L120,490C240,460,480,400,720,432C960,464,1200,586,1320,640L1440,694V900H0Z"
            />
        </svg>
        </div>
    )
}