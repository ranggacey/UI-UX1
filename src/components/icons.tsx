import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const base = (props: IconProps) => ({ width: props.size ?? 17, height: props.size ?? 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, ...props });

export function ArrowRight(props: IconProps) { return <svg {...base(props)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>; }
export function ArrowUpRight(props: IconProps) { return <svg {...base(props)}><path d="M7 17 17 7M7 7h10v10" /></svg>; }
export function Eye(props: IconProps) { return <svg {...base(props)}><path d="M2.5 12s3.2-5 9.5-5 9.5 5 9.5 5-3.2 5-9.5 5-9.5-5-9.5-5Z" /><circle cx="12" cy="12" r="2.2" /></svg>; }
export function EyeOff(props: IconProps) { return <svg {...base(props)}><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.6 10.6 0 0 1 12 5c6.3 0 9.5 5 9.5 5a16.8 16.8 0 0 1-3.1 3.7M6.2 6.2C3.8 7.6 2.5 10 2.5 10s3.2 5 9.5 5c.8 0 1.6-.1 2.3-.3" /></svg>; }
export function Check(props: IconProps) { return <svg {...base(props)}><path d="m5 12 4 4L19 6" /></svg>; }
export function Grid(props: IconProps) { return <svg {...base(props)}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>; }
export function Chart(props: IconProps) { return <svg {...base(props)}><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 5-7" /></svg>; }
export function Users(props: IconProps) { return <svg {...base(props)}><path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16 3.2a3.5 3.5 0 0 1 0 6.7M16.5 14a4.5 4.5 0 0 1 3.5 4.4V20" /></svg>; }
export function Folder(props: IconProps) { return <svg {...base(props)}><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" /></svg>; }
export function Settings(props: IconProps) { return <svg {...base(props)}><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" /><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 1 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3H4a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3L5 5.3a1.8 1.8 0 1 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0V2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 1 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-1.2 3Z" /></svg>; }
export function Bell(props: IconProps) { return <svg {...base(props)}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></svg>; }
export function LogOut(props: IconProps) { return <svg {...base(props)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>; }
export function Calendar(props: IconProps) { return <svg {...base(props)}><rect x="3" y="4.5" width="18" height="17" rx="2" /><path d="M16 2.5v4M8 2.5v4M3 10h18" /></svg>; }
export function ChevronDown(props: IconProps) { return <svg {...base(props)}><path d="m6 9 6 6 6-6" /></svg>; }
export function More(props: IconProps) { return <svg {...base(props)}><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></svg>; }
export function TrendingUp(props: IconProps) { return <svg {...base(props)}><path d="m4 16 5-5 4 3 7-8M15 6h5v5" /></svg>; }
export function CreditCard(props: IconProps) { return <svg {...base(props)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h3" /></svg>; }
