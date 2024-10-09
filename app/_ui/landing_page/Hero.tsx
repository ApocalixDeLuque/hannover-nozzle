import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Hero(): JSX.Element {
  return (
    <div className="flex relative min-h-screen flex-col text-light font-extrabold items-center justify-between">
      <div></div>
      <p className="w-full px-5 text-[96px] leading-[100%] tracking-tight font-extrabold">
        Tu visión,
        <br />
        nuestra impresión
      </p>
      <div className="flex flex-col w-full px-5 pb-10 gap-20">
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
          <div className="flex w-full justify-between items-end gap-4">
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero.webp"
        alt="Translate3D"
        className="absolute top-0 left-0 w-full h-full object-cover -z-50 scale-x-[-1] select-none"
      />
    </div>
  );
}
