'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { faShoppingCart, faSearch, faRightFromBracket, faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Button } from './components/Button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from './components/Dialog';
import { Input } from './components/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from './components/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './components/Form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './components/InputOTP';
import { useAuth } from './components/hooks/use-auth';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoIcon from './components/LogoIcon';

// Types
type NavbarProps = {
  type?: 'default' | 'light';
};

type NavLink = {
  href: string;
  label: string;
  subLinks?: { href: string; label: string }[];
};

// Constants
const navLinks: NavLink[] = [
  {
    href: '/tienda',
    label: 'Tienda',
    subLinks: [
      { href: '/tienda/modelos-3d', label: 'Modelos 3D' },
      { href: '/tienda/filamentos', label: 'Filamentos' },
      { href: '/tienda/resinas', label: 'Resinas' },
      { href: '/tienda/refacciones', label: 'Refacciones' },
    ],
  },
  {
    href: '/servicios',
    label: 'Servicios',
    subLinks: [
      { href: '/servicios/modelado', label: 'Modelado 3D' },
      { href: '/servicios/impresion', label: 'Impresion' },
    ],
  },
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
];

// Zod Schemas
const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const signupSchema = loginSchema
  .extend({
    username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

const otpSchema = z.object({
  pin: z.string().length(6, 'El código de verificación debe tener 6 caracteres'),
});

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;
type OTPData = z.infer<typeof otpSchema>;

// Sub-components
const NavLinks = ({ type, isScrolled }: { type: string; isScrolled: boolean }) => (
  <nav className="hidden md:flex items-center justify-center font-medium uppercase gap-4">
    {navLinks.map((link) => (
      <React.Fragment key={link.href}>
        {link.subLinks ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`py-0.5 px-1 rounded transition-colors duration-300 !text-base uppercase gap-2 ${
                type === 'light' || isScrolled ? 'link-dark' : 'link-light'
              }`}
            >
              <div className="flex gap-2 items-center">
                {link.label} <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="!rounded-md">
              {link.subLinks.map((subLink) => (
                <DropdownMenuItem className="!text-base !font-medium" key={subLink.href}>
                  <Link href={subLink.href} className="w-full">
                    {subLink.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href={link.href}
            className={`py-0.5 px-1 rounded transition-colors duration-300 ${
              type === 'light' || isScrolled ? 'link-dark' : 'link-light'
            }`}
          >
            {link.label}
          </Link>
        )}
      </React.Fragment>
    ))}
  </nav>
);

const SearchBar = ({
  searchValue,
  handleSearchChange,
  toggleSearch,
  isScrolled,
  type,
}: {
  searchValue: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSearch: () => void;
  isScrolled: boolean;
  type: string;
}) => (
  <div className="flex gap-0.5">
    <AnimatePresence>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 'auto', opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Input
          type="search"
          placeholder="Buscar"
          value={searchValue}
          onChange={handleSearchChange}
          className={`px-3 py-1 text-black ${isScrolled ? 'bg-black/10' : 'bg-white/10'}`}
          autoComplete="off"
        />
      </motion.div>
    </AnimatePresence>
    <Button
      onClick={toggleSearch}
      className={`transition-colors duration-300 ${
        (isScrolled && type !== 'light') || type === 'light' ? 'bg-black/10 text-black' : 'bg-white/10 text-white'
      }`}
      variant="primary"
      focusTheme="action"
      icon={faSearch}
    />
  </div>
);

const LoginForm = ({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-[550px] flex-col gap-2 uppercase p-10">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  autoComplete="email"
                  placeholder="Ingresa tu correo"
                  type="email"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Link href="/" className="w-fit hover:text-primary text-gray-400 text-sm font-extrabold transition-colors">
          Olvidaste tu contraseña?
        </Link> */}
        <Button type="submit" variant="action" disabled={isLoading} className="mt-4">
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>

        <Button
          onClick={() => {
            console.log('ola');
          }}
          className="w-full"
          variant="secondary"
        >
          <Image src="/icons/google-icon.webp" alt="Google Logo" width={20} height={20} />
          Iniciar sesión con Google
        </Button>
      </form>
    </Form>
  );
};

const SignupForm = ({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-[550px] flex-col gap-2 uppercase p-10">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  autoComplete="username"
                  placeholder="Ingresa tu nombre de usuario"
                  type="text"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  autoComplete="email"
                  placeholder="Ingresa tu correo"
                  type="email"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  autoComplete="new-password"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  autoComplete="new-password"
                  placeholder="Confirma tu contraseña"
                  type="password"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="action" disabled={isLoading} className="mt-4">
          {isLoading ? 'Cargando...' : 'Crear cuenta'}
        </Button>
      </form>
    </Form>
  );
};

const OTPForm = ({
  onSubmit,
  isLoading,
  email,
}: {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  email: string;
}) => {
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-[550px] flex-col gap-2 uppercase p-10">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de un solo uso</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Por favor ingresa el código de un solo uso que fue enviado a tu correo ({email}).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="action" className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? 'Verificando...' : 'Verificar'}
        </Button>
      </form>
    </Form>
  );
};

// Main Navbar Component
export default function Navbar({ type = 'default' }: NavbarProps) {
  const { isLoggedIn, login, signup, verify, logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  const toggleSearch = () => {
    console.log('Search is:', searchValue);
  };

  const handleAuth = async (data: LoginData | SignupData) => {
    setIsLoading(true);
    try {
      if ('username' in data) {
        // This is signup data
        await signup(data.username, data.email, data.password);
        setShowOTP(true);
        setVerificationEmail(data.email);
        toast({
          title: 'Verificación requerida',
          description: 'Por favor revisa tu correo para el código de verificación.',
        });
      } else {
        // This is login data
        await login(data.email, data.password);
        toast({ title: 'Inicio de sesión exitoso', description: 'Has iniciado sesión correctamente.' });
        setOpen(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Error', description: 'Ha ocurrido un error desconocido', variant: 'destructive' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (data: OTPData) => {
    setIsLoading(true);
    try {
      await verify(verificationEmail, data.pin);
      setOpen(false);
      setShowOTP(false);
      toast({ title: 'Cuenta creada', description: 'Tu cuenta ha sido creada y verificada exitosamente.' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({ title: 'Error de verificación', description: error.message, variant: 'destructive' });
      } else {
        toast({
          title: 'Error de verificación',
          description: 'Ha ocurrido un error desconocido',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navbarAnimation = useMemo(
    () => ({
      initial: {
        backgroundColor: type === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        backdropFilter: type === 'light' ? 'blur(10px)' : 'none',
        color: type === 'light' ? '#0B0604' : '#FBF6F4',
        padding: '20px 20px',
      },
      animate: {
        backgroundColor: type === 'light' || isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        backdropFilter: type === 'light' || isScrolled ? 'blur(10px)' : 'none',
        padding: isScrolled ? '10px 20px' : '20px 20px',
      },
      transition: { duration: 0.3 },
    }),
    [type, isScrolled]
  );

  return (
    <motion.nav {...navbarAnimation} className="fixed top-0 left-0 right-0 z-[40] px-5 lg:px-5">
      <div className="flex w-full items-center justify-between">
        <div className={`flex items-center gap-10 ${type === 'light' || isScrolled ? 'text-dark' : 'text-light'}`}>
          <Link href="/" className="flex items-center justify-center rounded-md gap-2.5">
            <LogoIcon className={`transition-all duration-300 ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'}`} />
            <motion.h1
              initial={{ fontSize: isScrolled ? '1.25rem' : '1.5rem' }}
              animate={{ fontSize: isScrolled ? '1.25rem' : '1.5rem' }}
              className="font-extrabold normal-case"
            >
              Translate3D
            </motion.h1>
          </Link>
          <NavLinks type={type} isScrolled={isScrolled} />
        </div>
        <div className={`flex items-center transition-all duration-300 ${isScrolled ? 'gap-2' : 'gap-4'}`}>
          <SearchBar
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
            toggleSearch={toggleSearch}
            isScrolled={isScrolled}
            type={type}
          />
          <Button
            className={`transition-colors duration-300 ${
              (isScrolled && type !== 'light') || type === 'light' ? 'bg-black/10 text-black' : 'bg-white/10 text-white'
            }`}
            variant="primary"
            focusTheme="action"
            icon={faShoppingCart}
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-[130px]"
                variant="action"
                focusTheme="action"
                size="sm"
                icon={isLoggedIn ? faUser : undefined}
              >
                {isLoggedIn ? 'Mi Cuenta' : 'Iniciar sesión'}
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col bg-light items-center dialog-content uppercase overflow-x-clip">
              <DialogTitle className="px-10 pt-10">
                <div className="flex items-center gap-2.5">
                  <LogoIcon color="#0b0604" className="w-14 h-14" />
                  <div className="text-[40px] font-extrabold">
                    {isLoggedIn
                      ? 'Bienvenido'
                      : showOTP
                      ? 'Verificación'
                      : isLogin
                      ? 'Inicia sesión'
                      : 'Crea una cuenta'}
                  </div>
                </div>
              </DialogTitle>
              {isLoggedIn ? (
                <div className="flex flex-col w-[550px] gap-2 p-10">
                  <p>
                    Nombre de usuario: <span className="text-primary">{user?.username}</span>
                  </p>
                  <p>
                    Correo: <span className="text-primary">{user?.email}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Tu cuenta ha sido iniciada correctamente. Ahora puedes acceder a tus productos y servicios.
                  </p>
                  <Button className="w-full mt-4" onClick={logout} icon={faRightFromBracket} variant="action">
                    Cerrar sesión
                  </Button>
                </div>
              ) : showOTP ? (
                <OTPForm onSubmit={handleOTPSubmit} isLoading={isLoading} email={verificationEmail} />
              ) : (
                <>
                  {isLogin ? (
                    <LoginForm onSubmit={handleAuth} isLoading={isLoading} />
                  ) : (
                    <SignupForm onSubmit={handleAuth} isLoading={isLoading} />
                  )}
                  <div className="flex flex-col w-full gap-2 p-10 pt-0">
                    <div className="items-center gap-2.5 inline-flex">
                      <div className="grow shrink basis-0 h-px bg-gray-400" />
                      <div className="text-gray-400 text-sm font-extrabold uppercase">
                        {isLogin ? 'aún No tienes cuenta?' : 'ya tienes una cuenta?'}
                      </div>
                      <div className="grow shrink basis-0 h-px bg-gray-400" />
                    </div>
                    <Button onClick={() => setIsLogin(!isLogin)} className="w-full mt-4" variant="secondary">
                      {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.nav>
  );
}
