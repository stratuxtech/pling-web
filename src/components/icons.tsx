import { siFacebook, siInstagram, siTiktok, siWhatsapp } from "simple-icons";

/* Iconos de marca: rutas oficiales de simple-icons (CC0). */

type IconProps = { className?: string; title?: string };

function Brand({ path, className, title }: IconProps & { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <path d={path} />
    </svg>
  );
}

export const IconTiktok = (p: IconProps) => <Brand path={siTiktok.path} {...p} />;
export const IconWhatsapp = (p: IconProps) => <Brand path={siWhatsapp.path} {...p} />;
export const IconInstagram = (p: IconProps) => <Brand path={siInstagram.path} {...p} />;
export const IconFacebook = (p: IconProps) => <Brand path={siFacebook.path} {...p} />;

export const socialIcons = { tiktok: IconTiktok, instagram: IconInstagram, facebook: IconFacebook } as const;

/* Iconos de interfaz: trazo 1.75, extremos redondeados (un solo sistema). */

function Line({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const IconArrowUpRight = (p: IconProps) => (
  <Line {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Line>
);
export const IconArrowRight = (p: IconProps) => (
  <Line {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Line>
);
export const IconChevronLeft = (p: IconProps) => (
  <Line {...p}>
    <path d="m15 6-6 6 6 6" />
  </Line>
);
export const IconChevronRight = (p: IconProps) => (
  <Line {...p}>
    <path d="m9 6 6 6-6 6" />
  </Line>
);
export const IconClose = (p: IconProps) => (
  <Line {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Line>
);
export const IconMenu = (p: IconProps) => (
  <Line {...p}>
    <path d="M4 8h16M4 16h16" />
  </Line>
);
export const IconCheck = (p: IconProps) => (
  <Line {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Line>
);
export const IconPause = (p: IconProps) => (
  <Line {...p}>
    <path d="M9 6v12M15 6v12" />
  </Line>
);
export const IconPlay = (p: IconProps) => (
  <Line {...p}>
    <path d="M8 5.5v13l10.5-6.5z" />
  </Line>
);
export const IconBox = (p: IconProps) => (
  <Line {...p}>
    <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
    <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
  </Line>
);
export const IconMail = (p: IconProps) => (
  <Line {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </Line>
);
export const IconPin = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Line>
);
export const IconQr = (p: IconProps) => (
  <Line {...p}>
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <path d="M14 14h2v2h-2zM18 18h2v2M14 20h2M20 14v2" />
  </Line>
);
export const IconTruck = (p: IconProps) => (
  <Line {...p}>
    <path d="M3 6.5h11v9H3zM14 9.5h3.5l3 3v3H14" />
    <circle cx="7" cy="17.5" r="1.75" />
    <circle cx="17" cy="17.5" r="1.75" />
  </Line>
);
export const IconStore = (p: IconProps) => (
  <Line {...p}>
    <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5c0 1.4 1.1 2.5 2.7 2.5s2.6-1.1 2.6-2.5c0 1.4 1.1 2.5 2.7 2.5s2.7-1.1 2.7-2.5c0 1.4 1 2.5 2.6 2.5S20 10.9 20 9.5M4 9.5h16M5.5 12v8h13v-8M10 20v-4.5h4V20" />
  </Line>
);
export const IconBank = (p: IconProps) => (
  <Line {...p}>
    <path d="M3.5 9 12 4l8.5 5zM5.5 9v8M10 9v8M14 9v8M18.5 9v8M3.5 20h17" />
  </Line>
);
export const IconBag = (p: IconProps) => (
  <Line {...p}>
    <path d="M5 8h14l-1 12H6z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </Line>
);
export const IconSpark = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 3.5 13.9 10l6.6 2-6.6 2L12 20.5 10.1 14l-6.6-2 6.6-2z" />
  </Line>
);
export const IconPlus = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 5v14M5 12h14" />
  </Line>
);
export const IconShield = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 3.5 19 6v5.5c0 4.3-3 7.7-7 9-4-1.3-7-4.7-7-9V6z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Line>
);
export const IconCalculator = (p: IconProps) => (
  <Line {...p}>
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
  </Line>
);
export const IconLayers = (p: IconProps) => (
  <Line {...p}>
    <path d="m12 4 8.5 4.5L12 13 3.5 8.5z" />
    <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
  </Line>
);
export const IconLink = (p: IconProps) => (
  <Line {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Line>
);
export const IconHeart = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />
  </Line>
);
export const IconAlert = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 4 21 19.5H3z" />
    <path d="M12 10v4.5M12 17.2h.01" />
  </Line>
);
export const IconTrendUp = (p: IconProps) => (
  <Line {...p}>
    <path d="m4 16.5 5.5-5.5 4 4L20 8.5" />
    <path d="M14.5 8.5H20V14" />
  </Line>
);
export const IconUsers = (p: IconProps) => (
  <Line {...p}>
    <circle cx="9" cy="8.5" r="3.5" />
    <path d="M3 19.5c.8-3.2 3.2-5 6-5s5.2 1.8 6 5M15.5 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c1.6.7 2.6 2.4 3 4.7" />
  </Line>
);
export const IconPhone = (p: IconProps) => (
  <Line {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
    <path d="M10.5 18.5h3" />
  </Line>
);
export const IconBolt = (p: IconProps) => (
  <Line {...p}>
    <path d="M13 3 5 13.5h6L10 21l8-10.5h-6z" />
  </Line>
);
