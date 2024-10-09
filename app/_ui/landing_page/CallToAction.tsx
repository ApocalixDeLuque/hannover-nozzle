import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Button } from '../global/components/Button';

export function CallToAction(): JSX.Element {
  return (
    <div className="flex flex-col min-h-fit w-full bg-light text-dark items-center justify-between gap-20 py-20 px-5">
      <p className="w-full text-[40px] font-extrabold leading-[100%] tracking-tight">
        Juntos haremos
        <br />
        el modelo perfecto
        <br />
        para ti
      </p>
      <div className="flex items-end justify-center gap-10 border-b border-dark">
        <div className="flex w-full gap-4 pb-4">
          <p className="min-w-[500px] w-1/2 text-[16px] font-regular normal-case leading-[120%]">
            En Translate3D nos apasiona la tecnología y la impresión 3D. Sabemos perfectamente lo importante que es
            contar con el equipo y material indicado para poder llevar tus ideas y proyectos a la realidad.
          </p>
        </div>
        <Link href={'/'} className="flex w-full gap-4 pb-4 border-l border-dark pl-4 group/btn">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/team.webp"
            alt="Translate3D"
            className="w-[450px] aspect-[2/1] h-auto object-cover"
            loading="lazy"
          />
          <div className="flex flex-col justify-between gap-2.5">
            <p className="text-lg font-extrabold leading-[100%] tracking-tight">
              Cuéntanos tus ideas y nosotros te ayudaremos a materializarlas.
            </p>
            <Button icon={faArrowRight} variant="action" className="w-fit">
              Cotización
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
