interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'default' | 'white' | 'green';
}

export default function Logo({ 
  className = "", 
  width = 28, 
  height = 30, 
  variant = 'default' 
}: LogoProps) {
  const getColor = () => {
    switch (variant) {
      case 'white':
        return '#FFFFFF';
      case 'green':
        return '#22c55e';
      default:
        return 'currentColor';
    }
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 28 30"
      className={className}
      role="img"
      aria-label="Manulife Logo"
    >
      <g fill={getColor()} fillRule="evenodd">
        <path d="M28 24l-6 6V6l6-6zM6 24l-6 6V6l6-6zM17 24l-6 6V6l6-6z"/>
      </g>
    </svg>
  );
}
