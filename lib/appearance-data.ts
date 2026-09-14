import {
  Backpack,
  Brush,
  Crown,
  Droplet,
  Ear,
  Eye,
  Footprints,
  Gem,
  Glasses,
  Hand,
  Layers,
  Paintbrush,
  PersonStanding,
  RulerDimensionLine,
  Scissors,
  Shield,
  Shirt,
  ShoppingBag,
  SlidersHorizontal,
  Smile,
  Sparkles,
  SquareDashed,
  User,
  VenetianMask,
  Watch,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type PickerRow = {
  id: string
  label: string
  icon: LucideIcon
  type: "picker"
  drawables: number
  textures: number
}

export type OverlayRow = {
  id: string
  label: string
  icon: LucideIcon
  type: "overlay"
  styles: number
  colors?: boolean
}

export type SliderRow = {
  id: string
  label: string
  icon: LucideIcon
  type: "sliders"
  items: { id: string; label: string }[]
}

export type HairRow = {
  id: string
  label: string
  icon: LucideIcon
  type: "hair"
  styles: number
  textures: number
  fades: number
}

export type PedRow = {
  id: string
  label: string
  icon: LucideIcon
  type: "peds"
  models: string[]
}

export type Row = PickerRow | OverlayRow | SliderRow | HairRow | PedRow

export type TattooZone = { id: string; label: string; options: string[] }

export type Category = {
  id: string
  label: string
  icon: LucideIcon
  group: "edit" | "wear"
  rows?: Row[]
  tattoos?: TattooZone[]
}

const picker = (id: string, label: string, icon: LucideIcon, drawables: number, textures: number): PickerRow => ({
  id,
  label,
  icon,
  type: "picker",
  drawables,
  textures,
})

const overlay = (id: string, label: string, icon: LucideIcon, styles: number, colors = false): OverlayRow => ({
  id,
  label,
  icon,
  type: "overlay",
  styles,
  colors,
})

export const CATEGORIES: Category[] = [
  {
    id: "characters",
    label: "Characters",
    icon: User,
    group: "edit",
    rows: [
      {
        id: "ped",
        label: "Ped model",
        icon: PersonStanding,
        type: "peds",
        models: [
          "mp_m_freemode_01",
          "mp_f_freemode_01",
          "a_m_y_hipster_01",
          "a_m_m_business_01",
          "a_f_y_business_02",
          "s_m_y_cop_01",
          "a_m_y_skater_01",
          "a_f_y_tourist_01",
          "g_m_y_ballaeast_01",
        ],
      },
    ],
  },
  {
    id: "face",
    label: "Face",
    icon: Smile,
    group: "edit",
    rows: [
      {
        id: "heritage",
        label: "Heritage",
        icon: User,
        type: "sliders",
        items: [
          { id: "shape-mix", label: "Shape mix" },
          { id: "skin-mix", label: "Skin mix" },
          { id: "third-mix", label: "Third mix" },
        ],
      },
      {
        id: "structure",
        label: "Face structure",
        icon: RulerDimensionLine,
        type: "sliders",
        items: [
          { id: "nose-width", label: "Nose width" },
          { id: "nose-peak-height", label: "Nose peak height" },
          { id: "nose-peak-length", label: "Nose peak length" },
          { id: "nose-bone-height", label: "Nose bone height" },
          { id: "nose-peak-lower", label: "Nose peak lowering" },
          { id: "nose-bone-twist", label: "Nose bone twist" },
        ],
      },
      {
        id: "brow",
        label: "Brow & cheeks",
        icon: Eye,
        type: "sliders",
        items: [
          { id: "eyebrow-height", label: "Eyebrow height" },
          { id: "eyebrow-depth", label: "Eyebrow forward" },
          { id: "cheek-bone-height", label: "Cheekbone height" },
          { id: "cheek-bone-width", label: "Cheekbone width" },
          { id: "cheek-width", label: "Cheek width" },
        ],
      },
      {
        id: "mouth",
        label: "Jaw & mouth",
        icon: SlidersHorizontal,
        type: "sliders",
        items: [
          { id: "lip-thickness", label: "Lip thickness" },
          { id: "jaw-bone-width", label: "Jaw bone width" },
          { id: "jaw-bone-length", label: "Jaw bone length" },
          { id: "chin-height", label: "Chin height" },
          { id: "chin-width", label: "Chin width" },
          { id: "neck-thickness", label: "Neck thickness" },
        ],
      },
    ],
  },
  {
    id: "features",
    label: "Features",
    icon: SlidersHorizontal,
    group: "edit",
    rows: [
      {
        id: "eyes",
        label: "Eyes",
        icon: Eye,
        type: "sliders",
        items: [
          { id: "eye-opening", label: "Eye opening" },
          { id: "eye-colour", label: "Eye colour" },
        ],
      },
      {
        id: "hair-features",
        label: "Facial hair",
        icon: Scissors,
        type: "sliders",
        items: [
          { id: "beard-opacity", label: "Beard opacity" },
          { id: "chest-hair-opacity", label: "Chest hair opacity" },
        ],
      },
    ],
  },
  {
    id: "skin",
    label: "Skin",
    icon: Droplet,
    group: "edit",
    rows: [
      overlay("blemishes", "Blemishes", Sparkles, 23),
      overlay("ageing", "Ageing", Layers, 14),
      overlay("complexion", "Complexion", Droplet, 11),
      overlay("sun-damage", "Sun damage", Sparkles, 10),
      overlay("moles", "Mole and Freckles", Sparkles, 17),
      overlay("body-blemishes", "Body blemishes", PersonStanding, 11),
    ],
  },
  {
    id: "hair",
    label: "Hair",
    icon: Scissors,
    group: "edit",
    rows: [
      {
        id: "hair",
        label: "Hair",
        icon: Scissors,
        type: "hair",
        styles: 81,
        textures: 5,
        fades: 125,
      },
      overlay("beard", "Beard", Brush, 28, true),
      overlay("eyebrows", "Eyebrows", Eye, 33, true),
      overlay("chest-hair", "Chest hair", PersonStanding, 16, true),
    ],
  },
  {
    id: "makeup",
    label: "Makeup",
    icon: Paintbrush,
    group: "edit",
    rows: [
      overlay("makeup", "Makeup", Paintbrush, 74, true),
      overlay("blush", "Blush", Brush, 6, true),
      overlay("lipstick", "Lipstick", Brush, 9, true),
    ],
  },
  {
    id: "tattoos",
    label: "Tattoos",
    icon: Layers,
    group: "edit",
    tattoos: [
      {
        id: "head",
        label: "Head",
        options: ["None", "Pirate Skull", "Barbed Halo", "Ink Crown", "Bleeding Rose", "Static Lines"],
      },
      {
        id: "left-arm",
        label: "Left arm",
        options: ["None", "Toxic Trails", "Sleeve Geometry", "Anchor Chain", "Wolf Howl", "Kaos Script"],
      },
      {
        id: "right-arm",
        label: "Right arm",
        options: ["None", "Tribal Sun", "Coiled Serpent", "Compass Rose", "Broken Clock", "Wire Mesh"],
      },
      {
        id: "left-leg",
        label: "Left leg",
        options: ["None", "Tribal Star", "Moth Wings", "Ladder Script", "Static Bars"],
      },
      {
        id: "right-leg",
        label: "Right leg",
        options: ["None", "Barbed Wire", "Koi Sweep", "Dagger Line", "Circuit Trace"],
      },
      {
        id: "torso",
        label: "Torso",
        options: ["None", "Sacred Heart", "Cathedral", "Eagle Spread", "Kaos Monogram"],
      },
      {
        id: "back",
        label: "Back",
        options: ["None", "Full Spine", "Reaper", "City Skyline", "Storm Front"],
      },
    ],
  },
  {
    id: "clothing",
    label: "Clothing",
    icon: Shirt,
    group: "edit",
    rows: [
      picker("jackets", "Jackets", Shirt, 543, 15),
      picker("shirt", "Shirt", Shirt, 187, 12),
      picker("hands", "Hands", Hand, 176, 8),
      picker("legs", "Legs", PersonStanding, 148, 12),
      picker("shoes", "Shoes", Footprints, 132, 20),
      picker("decals", "Decals", SquareDashed, 96, 6),
      picker("mask", "Mask", VenetianMask, 210, 14),
      picker("body-armor", "Body armor", Shield, 28, 5),
      picker("bag", "Bag", Backpack, 96, 9),
    ],
  },
  {
    id: "accessories",
    label: "Accessories",
    icon: Gem,
    group: "edit",
    rows: [
      picker("hat", "Hat", Crown, 178, 20),
      picker("glasses", "Glasses", Glasses, 62, 18),
      picker("ear", "Ear", Ear, 34, 10),
      picker("watch", "Watch", Watch, 31, 12),
      picker("bracelet", "Bracelet", Gem, 18, 9),
    ],
  },
  {
    id: "wear-hat",
    label: "Hat",
    icon: Crown,
    group: "wear",
    rows: [picker("hat", "Hat", Crown, 178, 20)],
  },
  {
    id: "wear-torso",
    label: "Torso",
    icon: Shirt,
    group: "wear",
    rows: [picker("shirt", "Shirt", Shirt, 187, 12), picker("jackets", "Jackets", ShoppingBag, 543, 15)],
  },
  {
    id: "wear-pants",
    label: "Pants",
    icon: PersonStanding,
    group: "wear",
    rows: [picker("legs", "Legs", PersonStanding, 148, 12), picker("shoes", "Shoes", Footprints, 132, 20)],
  },
]

export const HAIR_COLORS: string[] = [
  "#0B0B0C",
  "#2B2119",
  "#4A3524",
  "#6B4A2C",
  "#8A5C31",
  "#A97142",
  "#C08B55",
  "#D4A373",
  "#E6C79C",
  "#F0DCC0",
  "#F7E9D2",
  "#C0392B",
  "#A93226",
  "#7B241C",
  "#D35400",
  "#E67E22",
  "#8E44AD",
  "#6C3483",
  "#2E86C1",
  "#1F618D",
  "#148F77",
  "#117A65",
  "#27AE60",
  "#1E8449",
  "#F1C40F",
  "#D4AC0D",
  "#EC7063",
  "#F5B7B1",
  "#BB8FCE",
  "#85C1E9",
  "#5D6D7E",
  "#808B96",
  "#ABB2B9",
  "#D5D8DC",
  "#EAECEE",
  "#FFFFFF",
]
