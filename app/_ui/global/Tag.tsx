import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

export type TagType =
  | 'availability'
  | 'discount'
  | 'popular'
  | 'freeDownload'
  | 'new'
  | 'tienda'
  | 'blog'
  | 'servicios';

interface TagProps {
  type: TagType;
  value?: string;
}

export function Tag({ type, value }: TagProps): JSX.Element {
  const getTagContent = () => {
    switch (type) {
      case 'availability':
        return (
          <>
            <FontAwesomeIcon
              icon={faCircle}
              className={cn('w-1.5 h-1.5', {
                'text-green-500': value === 'Con inventario',
                'text-yellow-500': value === 'Poca disponibilidad',
                'text-red-500': value === 'Sin inventario',
              })}
            />
            {value}
          </>
        );
      case 'discount':
        return 'DESCUENTO';
      case 'popular':
        return 'POPULAR';
      case 'freeDownload':
        return 'DESCARGA GRATUITA';
      case 'new':
        return 'NUEVO';
      case 'tienda':
        return 'TIENDA';
      case 'blog':
        return 'BLOG';
      case 'servicios':
        return 'SERVICIOS';
    }
  };

  const tagClass = cn(
    'px-3 py-0.5 bg-light rounded-full border justify-center items-center text-sm font-extrabold text-dark gap-2 flex border-gray-400'
  );

  return <div className={tagClass}>{getTagContent()}</div>;
}
