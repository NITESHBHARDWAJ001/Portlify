import { Link } from 'react-router-dom';
import { cn } from '../../utils/helpers';

export default function BrandLogo({ compact = false, className = '', linkTo = '/' }) {
  const imageSrc = compact ? '/Icon_logo.png' : '/FullLogo.png';
  const imageAlt = compact ? 'Portlify icon logo' : 'Portlify full logo';

  return (
    <Link to={linkTo} className={cn('inline-flex items-center gap-3', className)}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={cn('block object-contain', compact ? 'h-11 w-11' : 'h-10 sm:h-12')}
      />
    </Link>
  );
}