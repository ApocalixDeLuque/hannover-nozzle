import { faFacebookSquare, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Button } from './components/Button';
import { SectionSeparator } from './SectionSeparator';

export function Footer(): JSX.Element {
  return (
    <div className="flex flex-col min-h-fit w-full bg-dark text-light items-center justify-between">
      <SectionSeparator color="dark" />
      <div className="flex w-full justify-between items-center gap-4 px-20 py-10">
        <p className="text-[96px] text-center font-extrabold leading-[100%] tracking-tight">
          De tu cabeza
          <br />a tu mesa
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work.webp" alt="Translate3D" className="w-[450px] aspect-[2/1] h-auto object-cover" loading="lazy" />
      </div>
      <div className="flex w-full justify-between items-center gap-4 px-4">
        <div className="flex flex-col w-full font-extrabold bg-primary rounded p-5 gap-20">
          <div className="flex justify-between">
            <p className="flex text-[10px] leading-[100%] font-normal gap-80">
              <span>RASTREADOR</span>
              <span>
                ¿YA
                <br /> HAS COMPRADO
                <br /> CON NOSOTROS?
              </span>
              <span>
                BUSCA
                <br /> RÁPIDAMENTE EL
                <br /> ESTATUS DE TU PEDIDO
              </span>
            </p>
            <FontAwesomeIcon icon={faArrowDown} className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex w-full justify-between items-end">
              <input
                type="text"
                placeholder="Numero de pedido"
                className="placeholder:text-white/60 placeholder:focus:text-white/40 text-[64px] bg-transparent focus:outline-none uppercase tracking-tight"
                style={{ width: 'calc(100% - 200px)' }}
              />
              <button className="text-center text-white text-[64px] uppercase tracking-tight">Buscar</button>
            </div>
            <div className="w-full h-4 bg-white rounded -mt-2" />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full p-10">
        <div className="flex border-b border-light">
          <div className="flex flex-col border-r border-light text-2xl leading-[100%] font-extrabold gap-2 w-1/4">
            <Link href={'/'} className="w-fit hover:text-light/60 transition-colors">
              SECTOR PROFESIONAL
            </Link>
            <Link href={'/'} className="w-fit hover:text-light/60 transition-colors">
              KITS DE ROBÓTICA
            </Link>
            <Link href={'/'} className="w-fit hover:text-light/60 transition-colors">
              SERVICIOS
            </Link>
          </div>
          <div className="flex flex-col border-r border-light leading-[100%] font-extrabold px-5 pb-10 gap-5 w-1/4">
            <p className="text-xl">BLOG</p>
            <div className="flex flex-col font-normal normal-case gap-1">
              <Link href={'/'} className="w-fit link-light font-thin">
                La impresión 3D en la medicina
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                Cambios de filamento
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                Reviews
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                Resinas
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                Mantenimiento
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                Todos los articulos
              </Link>
            </div>
          </div>
          <div className="flex flex-col border-r border-light leading-[100%] font-extrabold px-5 pb-10 gap-5 w-1/4">
            <p className="text-xl">NOSOTROS</p>
            <div className="flex flex-col font-normal normal-case gap-1">
              <Link href={'/'} className="w-fit link-light font-thin">
                Nuestra historia
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                Nuestro compromiso
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                Equipo
              </Link>
            </div>
          </div>
          <div className="flex flex-col leading-[100%] font-extrabold px-5 pb-10 gap-5 w-1/4">
            <p className="text-xl">SOPORTE</p>
            <div className="flex flex-col font-normal normal-case gap-1">
              <Link href={'/'} className="w-fit link-light font-thin">
                Opciones de contacto
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                Proceso de envíos
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                Devoluciones
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                Preguntas frecuentes
              </Link>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col justify-between leading-[100%] border-r border-light font-extrabold px-5 py-10 gap-5 w-2/4">
            <p className="text-xl">Nuestras redes oficiales</p>
            <div className="flex font-normal normal-case gap-3">
              <Link href={'/'} className="w-fit link-light font-thin">
                <FontAwesomeIcon icon={faFacebookSquare} className="w-6 h-6" />
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </Link>
              <Link href={'/'} className="w-fit link-light font-thin">
                <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-between h-[216px] leading-[100%] border-r border-b border-light font-extrabold px-5 py-10 gap-5 w-1/4">
            <p className="text-xl">Descubre nuestros productos</p>
            <Button variant="darkSecondary">Ver tienda</Button>
          </div>
          <div className="flex flex-col leading-[100%] normal-case text-base px-5 py-10 gap-5 w-1/4">
            <Link href={'/'} className="w-fit link-light font-thin">
              Website by Nightly Software
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
