import type { ComponentType, SVGProps } from "react";
import {
  BottleIcon,
  CalendarIcon,
  ClockIcon,
  CowIcon,
  DiyaIcon,
  DropIcon,
  LeafIcon,
  MedalIcon,
  ShieldCheckIcon,
  SunriseIcon,
  WalletIcon,
} from "./index";

/** Lets data files refer to icons by name. */
export const iconMap = {
  bottle: BottleIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  cow: CowIcon,
  diya: DiyaIcon,
  drop: DropIcon,
  leaf: LeafIcon,
  medal: MedalIcon,
  shield: ShieldCheckIcon,
  sunrise: SunriseIcon,
  wallet: WalletIcon,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement> & { size?: number }>>;

export type IconName = keyof typeof iconMap;
