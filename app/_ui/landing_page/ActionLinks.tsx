import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Button } from '../global/components/Button';
import cn from 'classnames';

export function ActionLinks(): JSX.Element {
  return (
    <div className="flex flex-col min-h-fit w-full bg-light text-dark items-center justify-between gap-20 py-20">
      <div className="flex flex-col w-full gap-20 px-5">
        <p className="text-[96px] text-center font-extrabold leading-[100%] tracking-tight">
          Diseñando el futuro,
          <br />
          una impresión a la vez
        </p>

        <div className="flex items-start justify-center gap-10">
          <div className="flex flex-col justify-between gap-2.5">
            <p className="min-w-[500px] w-1/2 text-[16px] font-regular normal-case leading-[120%]">
              En Translate 3D, la calidad es nuestra máxima prioridad. Nos esforzamos por garantizar que cada producto y
              servicio cumpla con los más altos estándares.
            </p>
            <Button icon={faArrowRight} variant="action" className="w-fit">
              Cotiza tus ideas
            </Button>
          </div>
          <div className="flex flex-col w-full font-extrabold">
            {[
              { href: '/', text: 'Servicios' },
              { href: '/', text: 'Blog' },
              { href: '/', text: 'Nuestras impresiones' },
              { href: '/', text: 'Refacciones' },
              { href: '/', text: 'Resinas' },
              { href: '/', text: 'Filamentos' },
            ].map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className={cn(
                  'relative flex w-full border-t border-dark text-dark py-2 px-5 gap-20 group/link transition-all duration-300 hover:text-light hover:border-transparent'
                )}
              >
                <span className="relative z-[5] flex items-center gap-20">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                  <p className="text-[16px] font-regular leading-[120%]">{link.text}</p>
                </span>
                <span className="absolute inset-0 bg-black transform scale-y-0 origin-bottom transition-all duration-300 ease-out rounded group-hover/link:scale-y-100 z-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
