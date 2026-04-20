import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Facebook,
  Globe,
  Heart,
  Instagram,
  Leaf,
  Menu,
  ShieldCheck,
  ShoppingBag,
  Star,
  Users,
  X,
  Youtube,
} from "lucide-react";

type Route = "home" | "products" | "about" | "impact" | "contact";

interface Product {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  benefits: string[];
  amazonLink: string;
  isBestSeller?: boolean;
  colorClass: string;
}

const AMAZON_LINKS = {
  soursop: "https://a.co/d/09jTinH3",
  blackseedSoursop: "https://a.co/d/0hNNgONU",
  advanced: "https://a.co/d/04SMyxuU",
  bundle: "https://a.co/d/0iqTy0Ek",
};

const PRODUCTS: Product[] = [
  {
    id: "soursop-bitters",
    name: "Soursop Bitters",
    tagline:
      "A powerful all-in-one herbal tonic for detox, digestion, and immune support.",
    description:
      "A powerful herbal blend made from soursop and natural ingredients to support detoxification, digestion, and immune health.",
    benefits: [
      "Supports detox",
      "Boosts immunity",
      "Aids digestion",
      "Promotes natural energy",
    ],
    amazonLink: AMAZON_LINKS.soursop,
    isBestSeller: true,
    colorClass: "from-green-100 to-green-200",
  },
  {
    id: "blackseed-soursop",
    name: "Blackseed + Soursop Bitters",
    tagline:
      "A stronger formula combining two powerful herbs for deeper wellness support.",
    description:
      "A dual-action formula combining black seed and soursop for deeper internal cleansing and immune support.",
    benefits: [
      "Strong immune support",
      "Anti-inflammatory properties",
      "Gut health support",
      "Enhanced detox",
    ],
    amazonLink: AMAZON_LINKS.blackseedSoursop,
    colorClass: "from-stone-200 to-stone-300",
  },
  {
    id: "advanced-herbal",
    name: "Advanced Herbal Bitters",
    tagline:
      "A balanced herbal blend designed to cleanse and restore your system.",
    description:
      "A carefully crafted blend of herbs designed to cleanse the body and restore balance.",
    benefits: [
      "Supports internal cleansing",
      "Promotes digestion",
      "Maintains body balance",
    ],
    amazonLink: AMAZON_LINKS.advanced,
    colorClass: "from-amber-100 to-amber-200",
  },
  {
    id: "wellness-bundle",
    name: "Immune, Digestive & Antioxidant Pack",
    tagline:
      "The complete wellness bundle featuring Blackseed, Soursop, and Sea Moss bitters.",
    description:
      "A complete wellness bundle featuring Blackseed, Soursop, and Sea Moss bitters for total body support.",
    benefits: [
      "Full-spectrum immune support",
      "Digestive health support",
      "Rich antioxidant content",
      "Best value for long-term use",
    ],
    amazonLink: AMAZON_LINKS.bundle,
    colorClass: "from-emerald-100 to-teal-200",
  },
];

const NAV_LINKS: { label: string; route: Route }[] = [
  { label: "Home", route: "home" },
  { label: "Products", route: "products" },
  { label: "About", route: "about" },
  { label: "Impact", route: "impact" },
  { label: "Contact", route: "contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/gennaio_naturals/",
    handle: "@gennaio_naturals",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@GennaioNaturals/videos",
    handle: "@GennaioNaturals",
    icon: Youtube,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/452957757906864",
    handle: "Gennaio Naturals",
    icon: Facebook,
  },
] as const;

const RevealOnScroll = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  external = false,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "amazon";
  className?: string;
  external?: boolean;
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "bg-green-900 text-white shadow-lg hover:bg-green-800 hover:shadow-xl focus:ring-green-900",
    secondary:
      "bg-stone-800 text-white shadow-md hover:bg-stone-700 focus:ring-stone-800",
    outline:
      "border-2 border-green-900 text-green-900 hover:bg-green-50 focus:ring-green-900",
    amazon:
      "bg-[#FF9900] text-black shadow-md hover:bg-[#FF9900]/90 hover:shadow-lg focus:ring-[#FF9900]",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {
              onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                onClick?.();
              },
            })}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

const SocialIconLinks = ({
  className = "",
  iconClassName = "",
}: {
  className?: string;
  iconClassName?: string;
}) => (
  <div className={className}>
    {SOCIAL_LINKS.map((social) => {
      const Icon = social.icon;

      return (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={iconClassName}
        >
          <Icon size={18} />
        </a>
      );
    })}
  </div>
);

const AnnouncementBar = () => (
  <div className="flex items-center justify-center gap-2 bg-green-900 px-4 py-2 text-center text-sm font-medium text-green-50">
    <span>Fast fulfillment:</span> All orders are currently fulfilled securely
    via Amazon.
  </div>
);

const Navbar = ({
  currentRoute,
  setRoute,
}: {
  currentRoute: Route;
  setRoute: (r: Route) => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white py-3 shadow-md"
          : "bg-white/95 py-5 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div
            className="group flex cursor-pointer items-center gap-2"
            onClick={() => setRoute("home")}
          >
            <div className="rounded-lg bg-green-900 p-2 text-white transition-colors group-hover:bg-green-800">
              <Leaf size={24} />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
              GENNAIO NATURALS
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.route}
                onClick={() => setRoute(link.route)}
                className={`text-sm font-medium transition-colors hover:text-green-800 ${
                  currentRoute === link.route
                    ? "border-b-2 border-green-900 pb-1 text-green-900"
                    : "text-stone-600"
                }`}
              >
                {link.label}
              </button>
            ))}
            <SocialIconLinks
              className="flex items-center gap-2"
              iconClassName="rounded-full p-2 text-stone-600 transition-colors hover:bg-green-50 hover:text-green-900"
            />
            <Button
              href={AMAZON_LINKS.soursop}
              external
              variant="primary"
              className="px-5 py-2 text-sm"
            >
              Shop Now
            </Button>
          </nav>

          <button
            className="p-2 text-stone-600 transition-colors hover:text-green-900 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute left-0 top-full flex w-full flex-col gap-4 border-t border-stone-100 bg-white px-4 py-4 shadow-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <button
              key={link.route}
              onClick={() => {
                setRoute(link.route);
                setMobileMenuOpen(false);
              }}
              className={`translate-y-0 text-left text-lg font-medium transition-opacity duration-200 ${
                currentRoute === link.route ? "text-green-900" : "text-stone-600"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            href={AMAZON_LINKS.soursop}
            external
            variant="primary"
            className="mt-4 w-full"
          >
            Shop on Amazon
          </Button>
          <SocialIconLinks
            className="mt-2 flex items-center gap-3"
            iconClassName="rounded-full border border-stone-200 p-2 text-stone-600 transition-colors hover:border-green-200 hover:text-green-900"
          />
        </div>
      )}
    </header>
  );
};

const Footer = ({ setRoute }: { setRoute: (r: Route) => void }) => (
  <footer className="bg-stone-950 py-16 text-stone-300">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        <div className="col-span-1 md:col-span-2">
          <div className="mb-6 flex items-center gap-2">
            <div className="rounded-lg bg-stone-800 p-2 text-green-400">
              <Leaf size={24} />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              GENNAIO NATURALS
            </span>
          </div>
          <p className="max-w-sm leading-relaxed text-stone-400">
            Premium herbal blends crafted from authentic African ingredients to
            support your body naturally.
          </p>
        </div>

        <div>
          <h4 className="mb-6 font-semibold text-white">Explore</h4>
          <ul className="space-y-4">
            {NAV_LINKS.map((link) => (
              <li key={link.route}>
                <button
                  onClick={() => setRoute(link.route)}
                  className="transition-colors hover:text-green-400"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-semibold text-white">Connect</h4>
          <ul className="space-y-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;

              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-green-400"
                  >
                    <Icon size={18} /> {social.handle}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center justify-between border-t border-stone-800 pt-8 text-sm text-stone-500 md:flex-row">
        <p>(c) {new Date().getFullYear()} Gennaio Naturals. All Rights Reserved.</p>
        <p className="mt-2 md:mt-0">Natural Wellness That Works</p>
      </div>
    </div>
  </footer>
);

const HomeView = ({ setRoute }: { setRoute: (r: Route) => void }) => {
  return (
    <div className="w-full overflow-hidden">
      <section className="relative overflow-hidden bg-stone-50 pb-32 pt-20 lg:pb-40 lg:pt-32">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
            alt="Natural leaves"
            className="h-full w-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 to-stone-50" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <RevealOnScroll>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-900">
                <Leaf size={16} />
                <span>African Herbal Tradition</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <h1 className="mb-6 font-serif text-5xl font-bold leading-[1.1] tracking-tight text-stone-900 md:text-7xl">
                Natural Wellness <br />
                <span className="italic text-green-900">That Works.</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <p className="mb-10 text-lg leading-relaxed text-stone-600 md:text-xl">
                Premium herbal blends crafted from authentic African ingredients
                to support your body naturally.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  href={AMAZON_LINKS.soursop}
                  external
                  variant="amazon"
                  className="w-full px-8 text-lg sm:w-auto"
                >
                  <ShoppingBag className="mr-2" size={20} />
                  Shop on Amazon
                </Button>
                <Button
                  onClick={() => setRoute("products")}
                  variant="outline"
                  className="w-full px-8 text-lg sm:w-auto"
                >
                  Explore Products
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-4 -mt-12 rounded-2xl bg-green-950 py-10 shadow-2xl sm:mx-6 lg:mx-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4 lg:divide-x lg:divide-green-800">
            {[
              { icon: Users, text: "100,000+ Customers Served" },
              { icon: Globe, text: "Rooted in African Herbal Tradition" },
              { icon: ShieldCheck, text: "Trusted Natural Formulas" },
              { icon: Heart, text: "Supporting Destiny Helpers NGO" },
            ].map((item, i) => (
              <RevealOnScroll
                key={item.text}
                delay={i * 100}
                className="flex flex-col items-center justify-center p-4"
              >
                <item.icon className="mb-3 text-green-400" size={32} />
                <p className="text-sm font-medium leading-snug text-white md:text-base">
                  {item.text}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <RevealOnScroll>
              <h2 className="mb-4 font-serif text-3xl font-bold text-stone-900 md:text-4xl">
                Featured Products
              </h2>
              <p className="mx-auto max-w-2xl text-stone-600">
                Discover our most trusted natural formulas, designed for real
                results.
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product, i) => (
              <RevealOnScroll key={product.id} delay={i * 100}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-stone-100 bg-stone-50 p-6 transition-all duration-300 hover:border-green-200 hover:shadow-xl">
                  {product.isBestSeller && (
                    <div className="absolute -right-3 -top-3 z-10 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-stone-900 shadow-sm">
                      <Star size={12} className="fill-stone-900" /> Best Seller
                    </div>
                  )}
                  <div
                    className={`relative mb-6 flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${product.colorClass} transition-transform duration-500 group-hover:scale-[1.02]`}
                  >
                    <div className="relative flex h-2/3 w-1/2 flex-col items-center justify-center rounded-lg bg-stone-900 p-4 shadow-2xl">
                      <div className="absolute -top-4 h-6 w-1/3 rounded-t-sm bg-stone-800" />
                      <div className="flex h-full w-full flex-col items-center justify-center rounded bg-white p-2 text-center shadow-inner">
                        <Leaf className="mb-2 text-green-900" size={20} />
                        <span className="text-[10px] font-bold leading-tight text-stone-900">
                          {product.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-stone-900">
                    {product.name}
                  </h3>
                  <p className="mb-6 flex-grow text-sm text-stone-600">
                    {product.tagline}
                  </p>
                  <Button
                    href={product.amazonLink}
                    external
                    variant="amazon"
                    className="w-full text-sm font-semibold"
                  >
                    Buy on Amazon <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-stone-900 py-24 text-white">
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 opacity-10">
          <Leaf size={400} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <RevealOnScroll>
              <div>
                <h2 className="mb-8 font-serif text-4xl font-bold leading-tight md:text-5xl">
                  Real ingredients.
                  <br />
                  Real knowledge.
                  <br />
                  <span className="text-green-400">Real results.</span>
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-stone-300">
                  At Gennaio Naturals, we combine traditional African herbal
                  wisdom with modern wellness practices to create products that
                  actually work.
                </p>
                <Button
                  onClick={() => setRoute("about")}
                  variant="outline"
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-stone-900"
                >
                  Read Our Story
                </Button>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="rounded-3xl bg-stone-800 p-8">
                <h3 className="mb-8 text-center text-2xl font-bold">
                  How It Works
                </h3>
                <div className="space-y-8">
                  {[
                    {
                      title: "1. Choose Your Product",
                      desc: "Select the herbal solution that fits your needs.",
                    },
                    {
                      title: "2. Order on Amazon",
                      desc: "Secure checkout and trusted delivery to your door.",
                    },
                    {
                      title: "3. Get Results Naturally",
                      desc: "Support your body with consistent, daily use.",
                    },
                  ].map((step, i) => (
                    <div key={step.title} className="flex items-start gap-4">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-900 font-bold text-white shadow-lg">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="mb-1 text-lg font-bold">{step.title}</h4>
                        <p className="text-stone-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900">
              <Star size={16} className="fill-amber-900" />
              <span>Special Offer</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-stone-900 md:text-5xl">
              Complete Wellness System
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-stone-600">
              Experience full-body support with our 3-pack bundle combining
              Blackseed, Soursop, and Sea Moss for maximum impact.
            </p>
            <Button
              href={AMAZON_LINKS.bundle}
              external
              variant="primary"
              className="px-10 py-4 text-lg shadow-xl"
            >
              Shop the Bundle Now
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};

const ProductsView = () => {
  return (
    <div className="w-full bg-white pb-24">
      <div className="border-b border-stone-200 bg-stone-50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <RevealOnScroll>
            <h1 className="mb-6 font-serif text-5xl font-bold text-stone-900">
              Our Natural Solutions
            </h1>
            <p className="text-xl text-stone-600">
              Discover our full range of authentic herbal formulas, designed to
              support your wellness journey.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-24 px-4 py-16 sm:px-6 lg:px-8">
        {PRODUCTS.map((product, index) => (
          <RevealOnScroll
            key={product.id}
            className="grid items-center gap-12 md:grid-cols-2"
          >
            <div className={`order-1 ${index % 2 === 1 ? "md:order-2" : ""}`}>
              <div
                className={`group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${product.colorClass} p-12 shadow-inner`}
              >
                <Leaf className="absolute -bottom-12 -right-12 h-64 w-64 rotate-45 text-white/20 transition-transform duration-700 group-hover:rotate-12" />
                <div className="z-10 flex h-4/5 w-2/3 transform flex-col items-center justify-center rounded-2xl border border-stone-800 bg-[#2A2A2A] shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <div className="absolute -top-6 h-8 w-1/3 rounded-t-md bg-black shadow-md" />
                  <div className="absolute -top-7 h-2 w-1/4 rounded-t-sm bg-stone-800" />
                  <div className="relative flex h-[75%] w-[85%] flex-col items-center justify-between overflow-hidden rounded bg-[#FDFBF7] p-4 text-center shadow-md">
                    <div className="absolute left-0 top-0 h-2 w-full bg-green-900" />
                    <div className="mt-4 flex flex-col items-center">
                      <Leaf className="mb-2 text-green-900" size={24} />
                      <span className="font-serif text-lg font-bold leading-tight text-stone-900">
                        {product.name}
                      </span>
                      <span className="mt-2 text-[10px] uppercase tracking-widest text-stone-500">
                        Herbal Supplement
                      </span>
                    </div>
                    <div className="w-full border-t border-stone-200 pt-2 text-[8px] text-stone-400">
                      Made with authentic ingredients
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`order-2 ${index % 2 === 1 ? "md:order-1" : ""}`}>
              {product.isBestSeller && (
                <div className="mb-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  Best Seller
                </div>
              )}
              <h2 className="mb-4 font-serif text-4xl font-bold text-stone-900">
                {product.name}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-stone-600">
                {product.description}
              </p>

              <div className="mb-8">
                <h4 className="mb-4 border-b border-stone-200 pb-2 text-sm font-bold uppercase tracking-wider text-stone-900">
                  Key Benefits
                </h4>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {product.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-stone-700"
                    >
                      <CheckCircle
                        className="mt-0.5 shrink-0 text-green-600"
                        size={18}
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                href={product.amazonLink}
                external
                variant="amazon"
                className="w-full px-8 sm:w-auto"
              >
                <ShoppingBag className="mr-2" size={20} />
                Buy on Amazon
              </Button>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-4xl px-4">
        <RevealOnScroll>
          <div className="rounded-xl border border-stone-200 bg-stone-100 p-6 text-center">
            <p className="text-sm font-medium italic text-stone-500">
              <strong>IMPORTANT:</strong> Results may vary. This product is not
              intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

const AboutView = () => {
  return (
    <div className="w-full bg-white">
      <div className="relative flex h-[50vh] min-h-[400px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80"
            alt="Nature backdrop"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60" />
        </div>
        <div className="relative z-10 px-4 text-center">
          <RevealOnScroll>
            <h1 className="mb-6 font-serif text-5xl font-bold text-white md:text-7xl">
              Rooted in Nature.
              <br />
              Built for Impact.
            </h1>
          </RevealOnScroll>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-24">
        <RevealOnScroll>
          <div className="mx-auto mb-24 max-w-3xl text-center text-stone-600">
            <p className="mb-8 font-serif text-2xl leading-relaxed text-stone-900">
              Gennaio Naturals is a wellness brand dedicated to delivering
              high-quality herbal solutions inspired by traditional African
              medicine.
            </p>
            <p className="text-lg leading-relaxed">
              Our products are made from carefully selected natural ingredients
              and trusted by thousands of customers for real results. We believe
              wellness should be simple, natural, and effective without
              compromise.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-16 md:grid-cols-2">
          <RevealOnScroll delay={100}>
            <div className="h-full rounded-3xl border border-green-100 bg-green-50 p-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-900 text-white shadow-lg">
                <Globe size={24} />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-stone-900">
                Our Mission
              </h3>
              <p className="text-stone-700">
                To make natural wellness accessible, reliable, and rooted in
                authenticity.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="h-full rounded-3xl border border-stone-200 bg-stone-50 p-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-white shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-stone-900">
                Our Approach
              </h3>
              <ul className="space-y-4 text-stone-700">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                  Inspired by traditional herbal knowledge
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                  Built with modern quality standards
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                  Focused on real-world results
                </li>
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

const ImpactView = () => {
  return (
    <div className="w-full bg-stone-50 pb-24">
      <div className="bg-green-900 px-4 py-24 text-center text-white">
        <RevealOnScroll>
          <Heart size={48} className="mx-auto mb-6 text-green-300" />
          <h1 className="mb-6 font-serif text-5xl font-bold">
            Wellness Beyond Products
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-green-100">
            At Gennaio Naturals, every purchase supports something bigger.
          </p>
        </RevealOnScroll>
      </div>

      <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-4">
        <RevealOnScroll>
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
            <div className="flex flex-col justify-center p-12 md:p-16">
              <h2 className="mb-2 text-3xl font-bold text-stone-900">
                Destiny Helpers
              </h2>
              <p className="mb-8 text-sm font-medium uppercase tracking-widest text-stone-500">
                NGO Partnership
              </p>

              <p className="mb-8 text-lg leading-relaxed text-stone-700">
                Our commitment goes beyond health. Through our partnership with
                Destiny Helpers, we are dedicated to making a tangible
                difference in communities.
              </p>

              <h4 className="mb-4 font-bold text-stone-900">We support:</h4>
              <ul className="mb-8 space-y-4">
                {[
                  "Community development initiatives",
                  "Youth empowerment programs",
                  "Health outreach and support",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-stone-100 bg-stone-50 p-3 text-stone-700"
                  >
                    <Heart className="shrink-0 text-green-600" size={18} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-64 bg-stone-200 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
                alt="Community Impact"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h3 className="mb-4 font-serif text-2xl font-bold text-stone-900">
              Why It Matters
            </h3>
            <p className="rounded-2xl border border-stone-100 bg-white p-8 text-lg text-stone-600 shadow-sm">
              When you choose Gennaio Naturals, you&apos;re not just supporting
              your health.{" "}
              <strong className="text-green-900">
                You&apos;re helping improve lives.
              </strong>
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

const ContactView = () => {
  return (
    <div className="w-full bg-white py-24">
      <div className="mx-auto max-w-4xl px-4">
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <h1 className="mb-6 font-serif text-5xl font-bold text-stone-900">
              Get in Touch
            </h1>
            <p className="text-xl text-stone-600">
              We&apos;re here to help with questions, support, or inquiries.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-12 md:grid-cols-2">
          <RevealOnScroll delay={100}>
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-10">
              <h3 className="mb-8 text-2xl font-bold text-stone-900">
                Direct Contact
              </h3>

              <div className="space-y-6">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="rounded-full bg-green-100 p-3 text-green-700 transition-colors group-hover:bg-green-600 group-hover:text-white">
                        <Icon size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-500">
                          {social.label}
                        </p>
                        <p className="font-bold text-stone-900">
                          {social.handle}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-amber-200 bg-amber-50 p-10 text-center">
              <ShieldCheck size={48} className="mx-auto mb-6 text-amber-600" />
              <h3 className="mb-4 text-2xl font-bold text-stone-900">
                Business Note
              </h3>
              <p className="text-lg leading-relaxed text-stone-700">
                All product purchases are currently handled through{" "}
                <strong className="text-stone-900">Amazon</strong> for secure
                checkout and reliable delivery.
              </p>
              <div className="mt-8">
                <Button href={AMAZON_LINKS.soursop} external variant="amazon">
                  Visit Amazon Store
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  const renderView = () => {
    switch (currentRoute) {
      case "home":
        return <HomeView setRoute={setCurrentRoute} />;
      case "products":
        return <ProductsView />;
      case "about":
        return <AboutView />;
      case "impact":
        return <ImpactView />;
      case "contact":
        return <ContactView />;
      default:
        return <HomeView setRoute={setCurrentRoute} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 selection:bg-green-200 selection:text-green-900">
      <AnnouncementBar />
      <Navbar currentRoute={currentRoute} setRoute={setCurrentRoute} />

      <main className="flex-grow">{renderView()}</main>

      <Footer setRoute={setCurrentRoute} />
    </div>
  );
}
