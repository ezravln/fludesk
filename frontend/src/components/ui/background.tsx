
export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background putih */}
        <rect width="1440" height="900" fill="#ffffff" />

        {/* Wave hijau */}
        <path
          d="
            M0,620
            C280,700 620,610 900,380
            C1120,200 1280,120 1440,90
            L1440,900
            L0,900
            Z
          "
          fill="#79AC78"
        />
      </svg>
    </div>
  )
}
