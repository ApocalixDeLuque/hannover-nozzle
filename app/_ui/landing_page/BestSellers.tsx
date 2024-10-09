import { Button } from '../global/components/Button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../global/components/Carousel';
import { StoreItem } from '../store/components/StoreItem';

export function BestSellers(): JSX.Element {
  return (
    <div className="flex flex-col min-h-fit w-full bg-light text-dark items-center justify-between gap-20 py-20">
      <div className="flex flex-col w-full gap-2.5 px-5">
        <div className="flex items-center gap-8">
          <p className="text-[64px] font-extrabold uppercase leading-[100%] tracking-tight">Productos más vendidos</p>
          <div className="flex gap-2">
            <Button variant="primary">Descuento</Button>
            <Button variant="secondary">Nuevo</Button>
            <Button variant="secondary">Disponible</Button>
            <Button variant="action">Test 1</Button>
          </div>
        </div>
        <Carousel className="border-t border-dark" opts={{ align: 'start', loop: false }}>
          <CarouselContent>
            {[
              {
                title: 'TRLT Builders - Kit de robótica',
                price: 600.0,
                image: '/items/kit.png',
              },
              {
                title:
                  'Cama de vidrio Carbonuro para impresoras Creality S3 Cama de vidrio Carbonuro para impresoras Creality S3',
                price: 600.0,
                image: '/items/bed.png',
              },
              {
                title: 'Resina Dental Model Green 1L',
                price: 600.0,
                image: '/items/resin.png',
              },
              {
                title: 'Torre Eiffel - Impresión 3D',
                price: 600.0,
                image: '/items/model.png',
              },
              {
                title: 'Torre Eiffel - Impresión 3D',
                price: 600.0,
                image: '/items/model.png',
              },
            ].map((item, index) => (
              <CarouselItem key={index} className="basis-1/4 pl-0 border-r border-dark last:border-r-0">
                <StoreItem
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  tags={[{ type: 'availability', value: 'Con inventario' }, { type: 'discount' }, { type: 'new' }]}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
