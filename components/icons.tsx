import type { LucideIcon } from 'lucide-react'
import {
  Network,
  Ship,
  Landmark,
  GraduationCap,
  Stethoscope,
  HeartHandshake,
  Languages,
} from 'lucide-react'

/** Icons for the 7 sectors, in the dictionary order. */
export const sectorIcons: LucideIcon[] = [
  Network, // project matching
  Ship, // bulk trade
  Landmark, // financial services
  GraduationCap, // education & training
  Stethoscope, // medical assistance
  HeartHandshake, // culture & public good
  Languages, // digital infrastructure
]

/** Icons for the 5 platform modules, in the dictionary order. */
export const moduleIcons: LucideIcon[] = [
  Network, // project matching
  Ship, // bulk trade
  GraduationCap, // education exchange
  Landmark, // financial services
  Stethoscope, // medical assistance
]
