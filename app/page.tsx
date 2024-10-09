'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './_ui/global/components/Button';
import { Input } from './_ui/global/components/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './_ui/global/components/Tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './_ui/global/components/Card';
import { Box, Cog, Mail, ChevronDown, PencilRuler, Zap, Phone } from 'lucide-react';
import SmoothScroll from './_ui/global/SmoothScroll';
import { useLenis } from '@studio-freight/react-lenis';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './_ui/global/components/Carousel';
import FeaturedCard from './_ui/landing_page/Featured';
import Link from 'next/link';
import LogoIcon from './_ui/global/components/LogoIcon';
import { useToast } from './_ui/global/components/hooks/use-toast';
import { ToastProvider } from './_ui/global/components/Toast';
import Autoplay from 'embla-carousel-autoplay';

export default function LandingPage() {
  const lenis = useLenis();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: 'Correo electrónico enviado',
          description: 'Gracias por suscribirte. Revisa tu correo electrónico para confirmación.',
        });
        setEmail('');
      } else {
        throw new Error('Error al enviar el correo electrónico');
      }
    } catch {
      toast({
        title: 'Error al enviar el correo electrónico',
        description: 'Error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const targets = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <ToastProvider>
      <SmoothScroll>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-light to-muted uppercase">
          <header className="fixed w-full z-50 bg-light/80 backdrop-blur-md">
            <div className="flex px-5 py-4 lg:px-10 items-center justify-between">
              <div
                onClick={() => lenis?.scrollTo(0)}
                className="flex items-center space-x-2 normal-case cursor-pointer"
              >
                <LogoIcon className="h-12 w-12 lg:h-16 lg:w-16 text-dark" />
                <span className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-dark">
                  Translate3D
                </span>
              </div>
              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  <li>
                    <a onClick={() => lenis?.scrollTo(0)} href="#" className="hover:text-primary transition-colors">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => lenis?.scrollTo('#services')}
                      href="#services"
                      className="hover:text-primary transition-colors"
                    >
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => lenis?.scrollTo('#products')}
                      href="#products"
                      className="hover:text-primary transition-colors"
                    >
                      Productos
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => lenis?.scrollTo('#subscribe')}
                      href="#subscribe"
                      className="hover:text-primary transition-colors"
                    >
                      Suscribir
                    </a>
                  </li>
                </ul>
              </nav>
              <button
                className="md:hidden text-dark"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
            {isMenuOpen && (
              <nav className="md:hidden bg-light/90 backdrop-blur-md">
                <ul className="flex flex-col items-center py-4">
                  <li className="py-2">
                    <a
                      onClick={() => {
                        lenis?.scrollTo(0);
                        setIsMenuOpen(false);
                      }}
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Inicio
                    </a>
                  </li>
                  <li className="py-2">
                    <a
                      onClick={() => {
                        lenis?.scrollTo('#services');
                        setIsMenuOpen(false);
                      }}
                      href="#services"
                      className="hover:text-primary transition-colors"
                    >
                      Servicios
                    </a>
                  </li>
                  <li className="py-2">
                    <a
                      onClick={() => {
                        lenis?.scrollTo('#products');
                        setIsMenuOpen(false);
                      }}
                      href="#products"
                      className="hover:text-primary transition-colors"
                    >
                      Productos
                    </a>
                  </li>
                  <li className="py-2">
                    <a
                      onClick={() => {
                        lenis?.scrollTo('#subscribe');
                        setIsMenuOpen(false);
                      }}
                      href="#subscribe"
                      className="hover:text-primary transition-colors"
                    >
                      Suscribir
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </header>

          <main className="flex-grow pt-16">
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
              <motion.div style={{ opacity, scale }} className="text-center z-10 px-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-light to-gray-200">
                  Tu visión, nuestra impresión
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-light normal-case leading-tight">
                  Transforma tus ideas en realidad con nuestra tecnología de impresión 3D de vanguardia. Personaliza tus
                  modelos y crea tus propios diseños.
                </p>
                <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-4">
                  <Button
                    onClick={() => lenis?.scrollTo('#subscribe')}
                    size="lg"
                    variant="action"
                    className="w-full sm:w-auto"
                  >
                    Contáctanos
                  </Button>
                  <Button
                    onClick={() => lenis?.scrollTo('#services')}
                    size="lg"
                    className="bg-transparent w-full sm:w-auto"
                    variant="darkSecondary"
                  >
                    Explorar servicios
                  </Button>
                </div>
              </motion.div>
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark"></div>
                <video autoPlay loop muted className="w-full h-full object-cover">
                  <source
                    src="https://videos.pexels.com/video-files/4198845/4198845-hd_1920_1080_25fps.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <a
                onClick={() => lenis?.scrollTo('#services')}
                href="#services"
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
                tabIndex={-1}
              >
                <ChevronDown className="h-8 w-8 text-primary" />
              </a>
            </section>

            <section id="services" className="py-20">
              <div className="flex flex-col px-5 gap-2 lg:gap-4 lg:px-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll">
                  Nuestros Servicios
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                  <ServiceCard
                    icon={<Cog className="h-6 w-6" />}
                    title="Impresión Bajo Demanda"
                    description="Crea y vende sin necesidad de inventario, optimizando tu flujo de trabajo y reduciendo costos."
                    imageUrl="https://images.unsplash.com/photo-1614086138082-8f9f4bed81e4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                  <ServiceCard
                    icon={<Box className="h-6 w-6" />}
                    title="Artículos Personalizados"
                    description="Desde artículos publicitarios hasta decoraciones para eventos, hacemos realidad tus ideas únicas."
                    imageUrl="https://images.unsplash.com/photo-1612886649938-6c57319cec43?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                  <ServiceCard
                    icon={<Zap className="h-6 w-6" />}
                    title="Prototipado Rápido"
                    description="Acelera tu proceso de desarrollo con prototipos precisos y funcionales en tiempo récord."
                    imageUrl="https://images.unsplash.com/photo-1679152411070-3d72d90e64f1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                  <ServiceCard
                    icon={<PencilRuler className="h-6 w-6" />}
                    title="Diseño CAD"
                    description="Nuestros expertos te ayudarán a crear y modificar objetos en 2D y 3D para cualquier proyecto."
                    imageUrl="https://images.unsplash.com/photo-1586868538513-51335a0c5337?q=80&w=2934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                </div>
              </div>
            </section>

            <section id="products" className="py-20 bg-muted">
              <div className="flex flex-col items-center px-5 gap-2 lg:gap-4 lg:px-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll">
                  Nuestros Productos
                </h2>
                <Tabs defaultValue="robotics" className="w-full max-w-4xl">
                  <TabsList className="grid w-full grid-cols-3 gap-2">
                    <TabsTrigger className="uppercase text-xs sm:text-sm" value="robotics">
                      Kits Robótica
                    </TabsTrigger>
                    <TabsTrigger className="uppercase text-xs sm:text-sm" value="supplies">
                      Insumos
                    </TabsTrigger>
                    <TabsTrigger className="uppercase text-xs sm:text-sm" value="parts">
                      Refacciones
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="robotics">
                    <Card>
                      <CardHeader>
                        <div className="relative w-full h-80 overflow-hidden">
                          <Carousel plugins={[Autoplay({ delay: 3000 })]} opts={{ align: 'start', loop: true }}>
                            <CarouselContent>
                              {Array.from({ length: 9 }).map((_, index) => (
                                <CarouselItem key={index} className="w-full h-64">
                                  <div className="aspect-square relative rounded border border-dark overflow-hidden w-full h-full">
                                    <Image
                                      src={`/kit_${index + 1}.jpeg`}
                                      alt={`Kit de Robótica ${index + 1}`}
                                      layout="fill"
                                      objectFit="cover"
                                      className="transition-transform hover:scale-105 duration-300"
                                    />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <div className="flex justify-end gap-2 mt-4">
                              <CarouselPrevious />
                              <CarouselNext />
                            </div>
                          </Carousel>
                        </div>
                        <CardTitle>Kits de Robótica</CardTitle>
                        <CardDescription>
                          Kits multifuncionales perfectos para adentrarse y experimentar en la robótica.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Experiencia práctica e innovadora</li>
                          <li>Diseño multifuncional para diversos proyectos</li>
                          <li>Ideal para principiantes y entusiastas</li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="action" className="w-full">
                          Ver todos los kits
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="supplies">
                    <Card>
                      <CardHeader>
                        <div className="relative w-full h-80 overflow-hidden">
                          <Carousel plugins={[Autoplay({ delay: 3000 })]} opts={{ align: 'start', loop: true }}>
                            <CarouselContent>
                              {Array.from({ length: 7 }).map((_, index) => (
                                <CarouselItem key={index} className="w-full h-64">
                                  <div className="aspect-square relative rounded border border-dark overflow-hidden w-full h-full">
                                    <Image
                                      src={index < 6 ? `/insumo_${index + 1}.webp` : '/insumo_7.jpg'}
                                      alt={`Insumo ${index + 1}`}
                                      layout="fill"
                                      objectFit="cover"
                                      className="transition-transform hover:scale-105 duration-300"
                                    />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <div className="flex justify-end gap-2 mt-4">
                              <CarouselPrevious />
                              <CarouselNext />
                            </div>
                          </Carousel>
                        </div>
                        <CardTitle>Insumos</CardTitle>
                        <CardDescription>Materiales de alta calidad para tus proyectos de impresión 3D</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Filamentos PLA, ABS, PETG y más</li>
                          <li>Resinas para impresión SLA</li>
                          <li>Materiales especiales: flexibles, conductivos, biodegradables</li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="action" className="w-full">
                          Explorar insumos
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="parts">
                    <Card>
                      <CardHeader>
                        <div className="relative w-full h-80 overflow-hidden">
                          <Carousel plugins={[Autoplay({ delay: 3000 })]} opts={{ align: 'start', loop: true }}>
                            <CarouselContent>
                              {Array.from({ length: 7 }).map((_, index) => (
                                <CarouselItem key={index} className="w-full h-64">
                                  <div className="aspect-square relative rounded border border-dark overflow-hidden w-full h-full">
                                    <Image
                                      src={index < 5 ? `/ref_${index + 1}.webp` : `/ref_${index + 1}.jpg`}
                                      alt={`Refacción ${index + 1}`}
                                      layout="fill"
                                      objectFit="cover"
                                      className="transition-transform hover:scale-105 duration-300"
                                    />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <div className="flex justify-end gap-2 mt-4">
                              <CarouselPrevious />
                              <CarouselNext />
                            </div>
                          </Carousel>
                        </div>
                        <CardTitle>Refacciones</CardTitle>
                        <CardDescription>
                          Piezas y componentes para mantener tu impresora en óptimas condiciones
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Boquillas de extrusión de diversos tamaños</li>
                          <li>Correas y poleas de precisión</li>
                          <li>Componentes electrónicos y sensores</li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="action" className="w-full">
                          Buscar refacciones
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </section>

            <section className="p-5 lg:p-10 bg-light text-dark">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll">
                Creado por nosotros
              </h2>
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
                opts={{ align: 'start', loop: true }}
              >
                <CarouselContent>
                  {[
                    { title: ['Stand para Audífonos'], image: '/pitch/product_1.jpg' },
                    { title: ['Llavero personzalizado'], image: '/pitch/product_3.jpg' },
                    { title: ['Llavero QR'], image: '/pitch/product_4.jpg' },
                    { title: ['Garra suave (Soft robot)'], image: '/pitch/product_5.jpg' },
                    { title: ['Llavero con Código QR'], image: '/pitch/product_6.jpg' },
                    { title: ['Llavero personalizado'], image: '/pitch/product_7.jpg' },
                    { title: ['LLavero personzalizado'], image: '/pitch/product_8.jpg' },
                    { title: ['Artículos personalizados'], image: '/pitch/product_9.jpg' },
                    { title: ['Fidget toy'], image: '/pitch/product_10.jpg' },
                    { title: ['Modelo personalizado'], image: '/pitch/product_11.jpg' },
                    { title: ['Figuras miniatura'], image: '/pitch/product_12.jpg' },
                  ].map((item, index) => (
                    <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-0">
                      <FeaturedCard title={item.title} image={item.image} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-4">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </section>

            <section className="py-20 bg-primary text-primary-foreground">
              <div className="flex flex-col items-center px-5 gap-2 lg:gap-4 lg:px-10">
                <h2 className="text-light text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll">
                  ¿Por qué elegirnos?
                </h2>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                  <FeatureCard
                    imageUrl="https://images.unsplash.com/photo-1563520240533-66480a3916fe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    title="Personalización"
                    description="Diseño hecho desde 0 para tus proyectos, tus clientes y tus ideas"
                  />
                  <FeatureCard
                    imageUrl="https://images.unsplash.com/photo-1680539208269-e7c8898c0713?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    title="Tecnología de punta"
                    description="Utilizamos las últimas tecnologías SLA y FDM"
                  />
                  <FeatureCard
                    imageUrl="https://images.unsplash.com/photo-1696861273647-92dfe8bb697c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    title="Soporte personalizado"
                    description="Asesoramiento de nuestros expertos en cada etapa de tu proyecto"
                  />
                </div>
              </div>
            </section>

            <section id="subscribe" className="py-20">
              <div className="flex flex-col items-center px-5 gap-2 lg:gap-4 lg:px-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-on-scroll">
                  ¡Suscríbete y Obtén un 10% de Descuento!
                </h2>
                <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto text-center normal-case leading-tight">
                  Sé uno de nuestros primeros suscriptores y recibe un cupón exclusivo del 10% de descuento en tu
                  primera compra. Además, mantente informado sobre las últimas novedades en impresión 3D y nuestros
                  próximos lanzamientos.
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row w-full gap-2 lg:gap-4 justify-center items-center"
                >
                  <Input
                    type="email"
                    placeholder="Tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full !max-w-80"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    variant={'primary'}
                    disabled={!email || isLoading}
                    loading={isLoading}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? 'Enviando...' : 'Obtener Descuento'} <Mail className="h-4 w-4 ml-2" />
                  </Button>
                </form>
                <p className="mt-4 text-sm text-muted-foreground">
                  Al suscribirte, aceptas recibir correos electrónicos de Translate3D y estás de acuerdo con nuestros
                  términos y condiciones.
                </p>
              </div>
            </section>
          </main>

          <footer className="bg-muted py-10 bg-dark text-light">
            <div className="flex flex-col items-center px-5 lg:px-10">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-gray-200">
                <div className="flex flex-col items-center gap-1">
                  <div
                    onClick={() => lenis?.scrollTo(0)}
                    className="flex items-center space-x-2 normal-case cursor-pointer"
                  >
                    <LogoIcon className="h-12 w-12 lg:h-16 lg:w-16 text-light" />
                    <span className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-light">
                      Translate3D
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Tu visión, nuestra impresión</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
                  <ul className="space-y-2">
                    <li>
                      <a onClick={() => lenis?.scrollTo(0)} href="#" className="text-sm hover:text-primary">
                        Inicio
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => lenis?.scrollTo('#services')}
                        href="#services"
                        className="text-sm hover:text-primary"
                      >
                        Servicios
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => lenis?.scrollTo('#products')}
                        href="#products"
                        className="text-sm hover:text-primary"
                      >
                        Productos
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => lenis?.scrollTo('#subscribe')}
                        href="#subscribe"
                        className="text-sm hover:text-primary"
                      >
                        Sobre nosotros
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Contacto</h4>
                  <ul className="space-y-2">
                    <li className="text-sm hover:text-primary">
                      <Link className="flex items-center gap-2" href="mailto:contacto@translate3d.tech">
                        <Mail className="h-4 w-4" />
                        contacto@translate3d.tech
                      </Link>
                    </li>
                    <li className="text-sm hover:text-primary">
                      <Link
                        className="flex items-center gap-2"
                        href="https://wa.me/524641231975?text=%C2%A1Hola%21%20Tengo%20inter%C3%A9s%20en%20Translate3D%2C%20%C2%BFPodr%C3%ADa%20darme%20m%C3%A1s%20info%3F"
                      >
                        <Phone className="h-4 w-4" />
                        +52 464 123 1975
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Síguenos</h4>
                  <div className="flex space-x-4">
                    <a
                      onClick={() => lenis?.scrollTo('#subscribe')}
                      href="#subscribe"
                      className="text-primary hover:text-primary/80"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      onClick={() => lenis?.scrollTo('#subscribe')}
                      href="#subscribe"
                      className="text-primary hover:text-primary/80"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06  4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      onClick={() => lenis?.scrollTo('#subscribe')}
                      href="#subscribe"
                      className="text-primary hover:text-primary/80"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 pt-10 text-center">
                <p className="text-sm text-muted-foreground">&copy; 2024 Translate3D. Todos los derechos reservados.</p>
                <Link
                  href="http://www.nightly.software"
                  className="font-semibold text-sm text-light hover:text-primary"
                >
                  Website by Nightly Software
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </SmoothScroll>
    </ToastProvider>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
}

function ServiceCard({ icon, title, description, imageUrl }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-card rounded border border-dark overflow-hidden animate-on-scroll"
    >
      <div className="relative h-40 w-full">
        <Image className="object-cover" src={imageUrl} alt={title} layout="fill" quality={20} />
      </div>
      <div className="p-6">
        <div className="flex mb-4">
          <div className="text-primary mr-3 -mt-px">{icon}</div>
          <h3 className="text-xl font-semibold min-h-10 leading-none">{title}</h3>
        </div>
        <p className="text-muted-foreground normal-case">{description}</p>
      </div>
    </motion.div>
  );
}

function FeatureCard({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) {
  return (
    <div className="bg-light text-dark p-6 rounded-lg border border-dark text-center animate-on-scroll group">
      <div className="relative !aspect-video rounde border border-dark w-full min-h-40 overflow-hidden mb-4">
        <div className="w-full h-full">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform group-hover:scale-110 duration-300"
          />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 pt-5">{title}</h3>
      <p className="pb-5">{description}</p>
    </div>
  );
}
