import cn from 'classnames';

interface SectionSeparatorProps {
  color?: 'light' | 'dark';
}

export function SectionSeparator({ color = 'light' }: SectionSeparatorProps) {
  return (
    <div
      className={cn('flex w-full p-5', {
        'bg-light': color === 'light',
        'bg-dark': color === 'dark',
      })}
    >
      <div
        className={cn('h-[31px] w-full rounded', {
          'bg-black': color === 'light',
          'bg-white': color === 'dark',
        })}
      />
    </div>
  );
}
