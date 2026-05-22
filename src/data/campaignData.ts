export interface Commander {
  id: string;
  name: string;
  title: string;
  legion: string;
  allegiance: "Imperium" | "Chaos" | "Traitor" | "Unknown";
  status: string;
  sector: string;
  specialty: string;
  loyalty: string;
  aura: string;
  threatLevel: string;
  currentOrder: string;
  stats: {
    commandPower: number;
    fleetControl: number;
    warpResistance: number;
    corruptionRisk: number;
    moraleImpact: number;
  };
  portrait: string;
  portraitAlt: string;
}

export interface Planet {
  id: string;
  name: string;
  type: string;
  controllingFaction: "Imperium" | "Chaos" | "Contested" | "Adeptus Mechanicus";
  status: string;
  threatLevel: "Low" | "Medium" | "High" | "Extreme" | "Exterminatus Risk";
  corruptionLevel: number;
  siegeStatus: string;
  exterminatusRisk: "None" | "Low" | "Under Review" | "Extreme";
  assignedCommanderId: string;
  x: number; // percentage coordinate
  y: number;
  color: string;
  size: number;
}

export interface Order {
  id: string;
  title: string;
  faction: string;
  status: string;
  priority: "High" | "Extreme";
  progress: number;
  assignedCommanderId: string;
  target: string;
}

export interface Fleet {
  id: string;
  name: string;
  ships: number;
  status: string;
  x: number;
  y: number;
  color: string;
}

export interface Relic {
  id: string;
  label: string;
  type: "Archeotech Signal" | "Lost Beacon" | "Forbidden Archive";
  x: number;
  y: number;
}

export const commanders: Commander[] = [
  {
    id: "primarch-01",
    name: "Roboute Guilliman",
    title: "Lord Commander of the Imperium",
    legion: "Ultramarines",
    allegiance: "Imperium",
    status: "Active",
    sector: "Segmentum Solar",
    specialty: "Strategic Command",
    loyalty: "Absolute",
    aura: "blue-gold",
    threatLevel: "Controlled",
    currentOrder: "Coordinate Imperial defense lines across multiple sectors.",
    portrait: "/warhammer/portraits/roboute-guilliman.jpg",
    portraitAlt: "Roboute Guilliman portrait",
    stats: { commandPower: 98, fleetControl: 95, warpResistance: 78, corruptionRisk: 2, moraleImpact: 96 }
  },
  {
    id: "primarch-02",
    name: "Lion El'Jonson",
    title: "Primarch of the Dark Angels",
    legion: "Dark Angels",
    allegiance: "Imperium",
    status: "Active",
    sector: "Imperium Nihilus",
    specialty: "Hunter-Killer Campaigns",
    loyalty: "Absolute",
    aura: "forest-green-gold",
    threatLevel: "High",
    currentOrder: "Eliminate traitor fleets near the warp corridor.",
    portrait: "/warhammer/portraits/lion-el-jonson.jpg",
    portraitAlt: "Lion El'Jonson portrait",
    stats: { commandPower: 92, fleetControl: 88, warpResistance: 90, corruptionRisk: 5, moraleImpact: 85 }
  },
  {
    id: "primarch-03",
    name: "Sanguinius",
    title: "Great Angel",
    legion: "Blood Angels",
    allegiance: "Imperium",
    status: "Fallen / Honored Memory",
    sector: "Terra Prime",
    specialty: "Icon of Sacrifice",
    loyalty: "Eternal",
    aura: "gold-red",
    threatLevel: "Sacred",
    currentOrder: "Inspire nearby Imperial forces with legacy aura.",
    portrait: "/warhammer/portraits/sanguinius.jpg",
    portraitAlt: "Sanguinius portrait",
    stats: { commandPower: 95, fleetControl: 80, warpResistance: 95, corruptionRisk: 0, moraleImpact: 100 }
  },
  {
    id: "primarch-04",
    name: "Leman Russ",
    title: "Wolf King",
    legion: "Space Wolves",
    allegiance: "Imperium",
    status: "Missing",
    sector: "Fenrisian Expanse",
    specialty: "Shock Assault",
    loyalty: "Legendary",
    aura: "ice-blue",
    threatLevel: "Unknown",
    currentOrder: "Awaiting return signal from deep void.",
    portrait: "/warhammer/portraits/leman-russ.jpg",
    portraitAlt: "Leman Russ portrait",
    stats: { commandPower: 88, fleetControl: 75, warpResistance: 85, corruptionRisk: 8, moraleImpact: 90 }
  },
  {
    id: "primarch-05",
    name: "Rogal Dorn",
    title: "Praetorian of Terra",
    legion: "Imperial Fists",
    allegiance: "Imperium",
    status: "Missing / Presumed Fallen",
    sector: "Terra Defense Grid",
    specialty: "Fortification",
    loyalty: "Absolute",
    aura: "yellow-gold",
    threatLevel: "Fortified",
    currentOrder: "Maintain orbital bastion protocols.",
    portrait: "/warhammer/portraits/rogal-dorn.jpg",
    portraitAlt: "Rogal Dorn portrait",
    stats: { commandPower: 90, fleetControl: 85, warpResistance: 80, corruptionRisk: 1, moraleImpact: 92 }
  },
  {
    id: "primarch-06",
    name: "Vulkan",
    title: "The Perpetual",
    legion: "Salamanders",
    allegiance: "Imperium",
    status: "Missing",
    sector: "Nocturne",
    specialty: "Relic Forging",
    loyalty: "Unbreakable",
    aura: "green-fire",
    threatLevel: "Stable",
    currentOrder: "Recover ancient forge relics.",
    portrait: "/warhammer/portraits/vulkan.jpg",
    portraitAlt: "Vulkan portrait",
    stats: { commandPower: 86, fleetControl: 70, warpResistance: 88, corruptionRisk: 2, moraleImpact: 89 }
  },
  {
    id: "primarch-07",
    name: "Jaghatai Khan",
    title: "Great Khan",
    legion: "White Scars",
    allegiance: "Imperium",
    status: "Missing",
    sector: "Webway Fringe",
    specialty: "Rapid Strike",
    loyalty: "Free but Loyal",
    aura: "white-red",
    threatLevel: "Mobile",
    currentOrder: "Conduct high-speed void raids.",
    portrait: "/warhammer/portraits/jaghatai-khan.jpg",
    portraitAlt: "Jaghatai Khan portrait",
    stats: { commandPower: 85, fleetControl: 80, warpResistance: 76, corruptionRisk: 10, moraleImpact: 87 }
  },
  {
    id: "primarch-08",
    name: "Corvus Corax",
    title: "Shadowed Primarch",
    legion: "Raven Guard",
    allegiance: "Imperium",
    status: "Unknown",
    sector: "Eye of Terror Fringe",
    specialty: "Stealth Warfare",
    loyalty: "Vengeful",
    aura: "shadow-purple",
    threatLevel: "Classified",
    currentOrder: "Hunt traitor entities in the warp.",
    portrait: "/warhammer/portraits/corvus-corax.jpg",
    portraitAlt: "Corvus Corax portrait",
    stats: { commandPower: 87, fleetControl: 74, warpResistance: 86, corruptionRisk: 15, moraleImpact: 80 }
  },
  {
    id: "primarch-09",
    name: "Ferrus Manus",
    title: "The Gorgon",
    legion: "Iron Hands",
    allegiance: "Imperium",
    status: "Fallen",
    sector: "Medusan Archive",
    specialty: "Machine Warfare",
    loyalty: "Eternal",
    aura: "steel-cyan",
    threatLevel: "Memorial",
    currentOrder: "Boost Iron Hands machine doctrine.",
    portrait: "/warhammer/portraits/ferrus-manus.jpg",
    portraitAlt: "Ferrus Manus portrait",
    stats: { commandPower: 82, fleetControl: 80, warpResistance: 70, corruptionRisk: 5, moraleImpact: 78 }
  },
  {
    id: "traitor-01",
    name: "Horus Lupercal",
    title: "The Warmaster",
    legion: "Sons of Horus",
    allegiance: "Traitor",
    status: "Fallen",
    sector: "Heresy Echo",
    specialty: "Total War",
    loyalty: "Corrupted",
    aura: "black-red",
    threatLevel: "Mythic",
    currentOrder: "Manifest as historical threat simulation.",
    portrait: "/warhammer/portraits/horus-lupercal.jpg",
    portraitAlt: "Horus Lupercal portrait",
    stats: { commandPower: 99, fleetControl: 98, warpResistance: 12, corruptionRisk: 100, moraleImpact: 95 }
  },
  {
    id: "traitor-02",
    name: "Abaddon the Despoiler",
    title: "Warmaster of Chaos",
    legion: "Black Legion",
    allegiance: "Chaos",
    status: "Active",
    sector: "Eye of Terror",
    specialty: "Black Crusade",
    loyalty: "Chaos Undivided",
    aura: "black-gold-red",
    threatLevel: "Extreme",
    currentOrder: "Launch Black Crusade pressure against Imperial sectors.",
    portrait: "/warhammer/portraits/abaddon-the-despoiler.jpg",
    portraitAlt: "Abaddon the Despoiler portrait",
    stats: { commandPower: 97, fleetControl: 94, warpResistance: 25, corruptionRisk: 95, moraleImpact: 90 }
  },
  {
    id: "traitor-03",
    name: "Magnus the Red",
    title: "Daemon Primarch of Tzeentch",
    legion: "Thousand Sons",
    allegiance: "Chaos",
    status: "Active",
    sector: "Prospero Rift",
    specialty: "Sorcery / Warp Manipulation",
    loyalty: "Tzeentch",
    aura: "crimson-purple",
    threatLevel: "Extreme",
    currentOrder: "Destabilize Astronomican signal with warp sorcery.",
    portrait: "/warhammer/portraits/magnus-the-red.jpg",
    portraitAlt: "Magnus the Red portrait",
    stats: { commandPower: 94, fleetControl: 70, warpResistance: 10, corruptionRisk: 98, moraleImpact: 85 }
  },
  {
    id: "traitor-04",
    name: "Mortarion",
    title: "Daemon Primarch of Nurgle",
    legion: "Death Guard",
    allegiance: "Chaos",
    status: "Active",
    sector: "Plague Zone",
    specialty: "Attrition Warfare",
    loyalty: "Nurgle",
    aura: "sickly-green",
    threatLevel: "Extreme",
    currentOrder: "Spread plague corruption across contested worlds.",
    portrait: "/warhammer/portraits/mortarion.jpg",
    portraitAlt: "Mortarion portrait",
    stats: { commandPower: 90, fleetControl: 78, warpResistance: 22, corruptionRisk: 99, moraleImpact: 80 }
  },
  {
    id: "traitor-05",
    name: "Angron",
    title: "Daemon Primarch of Khorne",
    legion: "World Eaters",
    allegiance: "Chaos",
    status: "Active",
    sector: "Blood Rift",
    specialty: "Berserker Assault",
    loyalty: "Khorne",
    aura: "blood-red",
    threatLevel: "Catastrophic",
    currentOrder: "Break Imperial siege lines through direct assault.",
    portrait: "/warhammer/portraits/angron.jpg",
    portraitAlt: "Angron portrait",
    stats: { commandPower: 92, fleetControl: 60, warpResistance: 5, corruptionRisk: 100, moraleImpact: 92 }
  },
  {
    id: "traitor-06",
    name: "Fulgrim",
    title: "Daemon Primarch of Slaanesh",
    legion: "Emperor's Children",
    allegiance: "Chaos",
    status: "Active",
    sector: "Excess Veil",
    specialty: "Perfection / Corruption",
    loyalty: "Slaanesh",
    aura: "pink-purple",
    threatLevel: "High",
    currentOrder: "Corrupt noble houses and command channels.",
    portrait: "/warhammer/portraits/fulgrim.jpg",
    portraitAlt: "Fulgrim portrait",
    stats: { commandPower: 88, fleetControl: 75, warpResistance: 15, corruptionRisk: 96, moraleImpact: 84 }
  },
  {
    id: "traitor-07",
    name: "Perturabo",
    title: "Daemon Primarch of the Iron Warriors",
    legion: "Iron Warriors",
    allegiance: "Chaos",
    status: "Active",
    sector: "Iron Cage Front",
    specialty: "Siege Warfare",
    loyalty: "Chaos Undivided",
    aura: "iron-orange",
    threatLevel: "Extreme",
    currentOrder: "Conduct planetary siege and fortress breach operations.",
    portrait: "/warhammer/portraits/perturabo.jpg",
    portraitAlt: "Perturabo portrait",
    stats: { commandPower: 91, fleetControl: 85, warpResistance: 30, corruptionRisk: 90, moraleImpact: 82 }
  },
  {
    id: "traitor-08",
    name: "Lorgar Aurelian",
    title: "Bearer of the Word",
    legion: "Word Bearers",
    allegiance: "Chaos",
    status: "Active / Hidden",
    sector: "Dark Creed Nebula",
    specialty: "Cult Corruption",
    loyalty: "Chaos Undivided",
    aura: "dark-red-purple",
    threatLevel: "High",
    currentOrder: "Seed cult uprisings across hive worlds.",
    portrait: "/warhammer/portraits/lorgar-aurelian.jpg",
    portraitAlt: "Lorgar Aurelian portrait",
    stats: { commandPower: 86, fleetControl: 65, warpResistance: 20, corruptionRisk: 92, moraleImpact: 88 }
  },
  {
    id: "traitor-09",
    name: "Konrad Curze",
    title: "Night Haunter",
    legion: "Night Lords",
    allegiance: "Traitor",
    status: "Fallen",
    sector: "Nostramo Echo",
    specialty: "Terror Warfare",
    loyalty: "None",
    aura: "midnight-blue",
    threatLevel: "Legacy Terror",
    currentOrder: "Manifest fear effect in historical simulation.",
    portrait: "/warhammer/portraits/konrad-curze.jpg",
    portraitAlt: "Konrad Curze portrait",
    stats: { commandPower: 83, fleetControl: 58, warpResistance: 40, corruptionRisk: 80, moraleImpact: 75 }
  },
  {
    id: "traitor-10",
    name: "Alpharius Omegon",
    title: "The Hydra",
    legion: "Alpha Legion",
    allegiance: "Unknown",
    status: "Unknown",
    sector: "Classified",
    specialty: "Infiltration / Deception",
    loyalty: "Unknown",
    aura: "teal-green",
    threatLevel: "Unclear",
    currentOrder: "Obfuscate command intelligence.",
    portrait: "/warhammer/portraits/alpharius-omegon.jpg",
    portraitAlt: "Alpharius Omegon portrait",
    stats: { commandPower: 85, fleetControl: 82, warpResistance: 60, corruptionRisk: 45, moraleImpact: 80 }
  }
];

export const planets: Planet[] = [
  {
    id: "terra",
    name: "Terra Prime",
    type: "Throne World",
    controllingFaction: "Imperium",
    status: "Fortified",
    threatLevel: "High",
    corruptionLevel: 3,
    siegeStatus: "Orbital Defense Active",
    exterminatusRisk: "None",
    assignedCommanderId: "primarch-01",
    x: 52,
    y: 28,
    color: "from-blue-700 to-slate-900 border-yellow-500/40",
    size: 56
  },
  {
    id: "voss",
    name: "Voss-IX",
    type: "Forge World",
    controllingFaction: "Contested",
    status: "Under Siege",
    threatLevel: "Extreme",
    corruptionLevel: 44,
    siegeStatus: "Chaos Fleet Engaged",
    exterminatusRisk: "Under Review",
    assignedCommanderId: "traitor-07",
    x: 24,
    y: 52,
    color: "from-red-800 to-zinc-950 border-red-500/40",
    size: 48
  },
  {
    id: "nocturne",
    name: "Nocturne Gate",
    type: "Death World",
    controllingFaction: "Imperium",
    status: "Warp Distortion",
    threatLevel: "High",
    corruptionLevel: 18,
    siegeStatus: "Signal Unstable",
    exterminatusRisk: "Low",
    assignedCommanderId: "primarch-06",
    x: 78,
    y: 66,
    color: "from-purple-900 to-indigo-950 border-purple-500/40",
    size: 42
  },
  {
    id: "prospero",
    name: "Prospero Rift",
    type: "Warp-Touched World",
    controllingFaction: "Chaos",
    status: "Sorcerous Distortion",
    threatLevel: "Extreme",
    corruptionLevel: 91,
    siegeStatus: "Warp Breach",
    exterminatusRisk: "Extreme",
    assignedCommanderId: "traitor-03",
    x: 82,
    y: 22,
    color: "from-purple-950 to-pink-950 border-pink-500/40",
    size: 44
  }
];

export const strategicOrders: Order[] = [
  {
    id: "order-01",
    title: "Secure Terra Prime Orbit",
    faction: "Imperium",
    status: "Active",
    priority: "High",
    progress: 68,
    assignedCommanderId: "primarch-01",
    target: "Terra Prime",
  },
  {
    id: "order-02",
    title: "Stabilize the Astronomican",
    faction: "Imperium",
    status: "Critical",
    priority: "Extreme",
    progress: 41,
    assignedCommanderId: "primarch-01",
    target: "Golden Throne",
  },
  {
    id: "order-03",
    title: "Repel Black Crusade Fleet",
    faction: "Imperium",
    status: "Active",
    priority: "Extreme",
    progress: 36,
    assignedCommanderId: "primarch-02",
    target: "Terra Prime",
  },
  {
    id: "order-04",
    title: "Contain Warp Storm",
    faction: "Inquisition",
    status: "Critical",
    priority: "Extreme",
    progress: 28,
    assignedCommanderId: "traitor-03",
    target: "Prospero Rift",
  },
  {
    id: "order-05",
    title: "Authorize Exterminatus Review",
    faction: "Inquisition",
    status: "Pending",
    priority: "High",
    progress: 12,
    assignedCommanderId: "primarch-05",
    target: "Voss-IX",
  },
  {
    id: "order-06",
    title: "Recover STC Relic Fragment",
    faction: "Adeptus Mechanicus",
    status: "Active",
    priority: "High",
    progress: 52,
    assignedCommanderId: "primarch-06",
    target: "Nocturne Gate",
  }
];

export const fleets: Fleet[] = [
  {
    id: "fleet-alpha",
    name: "Iron Vanguard Crusade",
    ships: 12,
    status: "Orbital Blockade",
    x: 16,
    y: 44,
    color: "text-amber-500 border-amber-500/30"
  },
  {
    id: "fleet-beta",
    name: "Chaos Despoiler Pack",
    ships: 9,
    status: "Engaged",
    x: 32,
    y: 58,
    color: "text-red-500 border-red-500/30"
  },
  {
    id: "fleet-gamma",
    name: "Ultramarine Spearhead",
    ships: 6,
    status: "Patrolling",
    x: 58,
    y: 18,
    color: "text-cyan-500 border-cyan-500/30"
  }
];

export const relics: Relic[] = [
  {
    id: "relic-01",
    label: "Ancient STC Fragment",
    type: "Archeotech Signal",
    x: 88,
    y: 16
  },
  {
    id: "relic-02",
    label: "Dark Age Distress Beacon",
    type: "Lost Beacon",
    x: 12,
    y: 76
  },
  {
    id: "relic-03",
    label: "Locked Vault Core",
    type: "Forbidden Archive",
    x: 48,
    y: 86
  }
];
