import Link from 'next/link';
import { Tag, TagType } from '../../global/Tag';
import { Button } from '../../global/components/Button';

export function StoreItem({
  title,
  price,
  image,
  tags,
}: {
  title: string;
  price: number;
  image: string;
  tags: Array<{ type: TagType; value?: string }>;
}): JSX.Element {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="relative group overflow-clip">
      <Link href={'/'} className="flex flex-col w-[450px] items-center p-4 gap-20 group">
        <div className="flex w-full justify-between items-start">
          <p className="text-xl font-extrabold line-clamp-2 overflow-hidden min-h-[calc(2*1.25*1em)] leading-tight">
            {title}
          </p>
          <p className="text-gray-400 text-base font-normal text-nowrap ml-4">{formatPrice(price)}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-3/5 aspect-square group-hover:scale-[102.5%] transition-all" src={image} alt={title} />
        <div className="flex w-full justify-start items-center gap-2.5">
          {tags.map((tag, index) => (
            <Tag key={index} type={tag.type} value={tag.value} />
          ))}
        </div>
      </Link>
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full transition-transform group-hover:translate-y-0 duration-300">
        <Button variant="action" className="w-full" tabIndex={-1}>
          Ver artículo
        </Button>
      </div>
    </div>
  );
}
