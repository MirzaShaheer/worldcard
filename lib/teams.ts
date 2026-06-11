/* =========================================================================
   WORLD CARD — the 48-nation collection
   One typed array is the single source of truth for every card on the site.

   NOTE: captain names and oddsPct are best-effort / illustrative and are meant
   to be edited freely before launch. `worldCupsWon` is historically accurate.
   `code` is a flagcdn code (https://flagcdn.com/{code}.svg) — England/Scotland
   use the gb-eng / gb-sct subdivision codes, which flagcdn supports.
   `oddsPct` ("% favor to win") is the single input that drives rarity tier
   (see lib/tiers.ts → tierFor).
   ========================================================================= */

export type Confederation =
  | "UEFA"
  | "CONMEBOL"
  | "CONCACAF"
  | "CAF"
  | "AFC"
  | "OFC";

export type Team = {
  name: string;
  /** flagcdn country code, e.g. "br", "gb-eng". */
  code: string;
  captain: string;
  worldCupsWon: number;
  /** % favor to win the World Cup — drives the rarity tier. */
  oddsPct: number;
  confederation: Confederation;
  /** optional flavor nickname shown on the card back. */
  nickname?: string;
};

export const TEAMS: Team[] = [
  // ---- CONMEBOL ----------------------------------------------------------
  { name: "Brazil", code: "br", captain: "Marquinhos", worldCupsWon: 5, oddsPct: 12.5, confederation: "CONMEBOL", nickname: "Seleção" },
  { name: "Argentina", code: "ar", captain: "Lionel Messi", worldCupsWon: 3, oddsPct: 11.0, confederation: "CONMEBOL", nickname: "La Albiceleste" },
  { name: "Uruguay", code: "uy", captain: "Federico Valverde", worldCupsWon: 2, oddsPct: 4.0, confederation: "CONMEBOL", nickname: "La Celeste" },
  { name: "Colombia", code: "co", captain: "James Rodríguez", worldCupsWon: 0, oddsPct: 3.5, confederation: "CONMEBOL", nickname: "Los Cafeteros" },
  { name: "Ecuador", code: "ec", captain: "Enner Valencia", worldCupsWon: 0, oddsPct: 1.7, confederation: "CONMEBOL", nickname: "La Tri" },
  { name: "Paraguay", code: "py", captain: "Gustavo Gómez", worldCupsWon: 0, oddsPct: 0.7, confederation: "CONMEBOL", nickname: "La Albirroja" },
  { name: "Venezuela", code: "ve", captain: "Salomón Rondón", worldCupsWon: 0, oddsPct: 0.5, confederation: "CONMEBOL", nickname: "La Vinotinto" },

  // ---- UEFA --------------------------------------------------------------
  { name: "France", code: "fr", captain: "Kylian Mbappé", worldCupsWon: 2, oddsPct: 10.5, confederation: "UEFA", nickname: "Les Bleus" },
  { name: "Spain", code: "es", captain: "Álvaro Morata", worldCupsWon: 1, oddsPct: 9.5, confederation: "UEFA", nickname: "La Roja" },
  { name: "England", code: "gb-eng", captain: "Harry Kane", worldCupsWon: 1, oddsPct: 9.0, confederation: "UEFA", nickname: "Three Lions" },
  { name: "Germany", code: "de", captain: "Joshua Kimmich", worldCupsWon: 4, oddsPct: 9.0, confederation: "UEFA", nickname: "Die Mannschaft" },
  { name: "Portugal", code: "pt", captain: "Cristiano Ronaldo", worldCupsWon: 0, oddsPct: 7.5, confederation: "UEFA", nickname: "A Seleção" },
  { name: "Netherlands", code: "nl", captain: "Virgil van Dijk", worldCupsWon: 0, oddsPct: 6.0, confederation: "UEFA", nickname: "Oranje" },
  { name: "Italy", code: "it", captain: "Gianluigi Donnarumma", worldCupsWon: 4, oddsPct: 5.0, confederation: "UEFA", nickname: "Azzurri" },
  { name: "Belgium", code: "be", captain: "Kevin De Bruyne", worldCupsWon: 0, oddsPct: 4.5, confederation: "UEFA", nickname: "Red Devils" },
  { name: "Croatia", code: "hr", captain: "Luka Modrić", worldCupsWon: 0, oddsPct: 4.0, confederation: "UEFA", nickname: "Vatreni" },
  { name: "Denmark", code: "dk", captain: "Pierre-Emile Højbjerg", worldCupsWon: 0, oddsPct: 2.2, confederation: "UEFA", nickname: "Danish Dynamite" },
  { name: "Switzerland", code: "ch", captain: "Granit Xhaka", worldCupsWon: 0, oddsPct: 2.0, confederation: "UEFA", nickname: "Nati" },
  { name: "Serbia", code: "rs", captain: "Dušan Tadić", worldCupsWon: 0, oddsPct: 1.8, confederation: "UEFA", nickname: "Orlovi" },
  { name: "Austria", code: "at", captain: "Marcel Sabitzer", worldCupsWon: 0, oddsPct: 1.5, confederation: "UEFA", nickname: "Das Team" },
  { name: "Poland", code: "pl", captain: "Robert Lewandowski", worldCupsWon: 0, oddsPct: 1.5, confederation: "UEFA", nickname: "Biało-czerwoni" },
  { name: "Norway", code: "no", captain: "Martin Ødegaard", worldCupsWon: 0, oddsPct: 1.4, confederation: "UEFA", nickname: "Løvene" },
  { name: "Turkey", code: "tr", captain: "Hakan Çalhanoğlu", worldCupsWon: 0, oddsPct: 1.3, confederation: "UEFA", nickname: "Ay-Yıldızlılar" },

  // ---- CAF ---------------------------------------------------------------
  { name: "Morocco", code: "ma", captain: "Achraf Hakimi", worldCupsWon: 0, oddsPct: 4.0, confederation: "CAF", nickname: "Atlas Lions" },
  { name: "Senegal", code: "sn", captain: "Kalidou Koulibaly", worldCupsWon: 0, oddsPct: 2.2, confederation: "CAF", nickname: "Teranga Lions" },
  { name: "Nigeria", code: "ng", captain: "William Troost-Ekong", worldCupsWon: 0, oddsPct: 1.8, confederation: "CAF", nickname: "Super Eagles" },
  { name: "Egypt", code: "eg", captain: "Mohamed Salah", worldCupsWon: 0, oddsPct: 1.6, confederation: "CAF", nickname: "The Pharaohs" },
  { name: "Algeria", code: "dz", captain: "Riyad Mahrez", worldCupsWon: 0, oddsPct: 1.2, confederation: "CAF", nickname: "Desert Foxes" },
  { name: "Ghana", code: "gh", captain: "Thomas Partey", worldCupsWon: 0, oddsPct: 1.1, confederation: "CAF", nickname: "Black Stars" },
  { name: "Côte d'Ivoire", code: "ci", captain: "Franck Kessié", worldCupsWon: 0, oddsPct: 1.1, confederation: "CAF", nickname: "Les Éléphants" },
  { name: "Cameroon", code: "cm", captain: "Vincent Aboubakar", worldCupsWon: 0, oddsPct: 1.0, confederation: "CAF", nickname: "Indomitable Lions" },
  { name: "Tunisia", code: "tn", captain: "Youssef Msakni", worldCupsWon: 0, oddsPct: 0.7, confederation: "CAF", nickname: "Eagles of Carthage" },

  // ---- CONCACAF (USA / Mexico / Canada are hosts) ------------------------
  { name: "United States", code: "us", captain: "Christian Pulisic", worldCupsWon: 0, oddsPct: 3.0, confederation: "CONCACAF", nickname: "The Stars & Stripes" },
  { name: "Mexico", code: "mx", captain: "Edson Álvarez", worldCupsWon: 0, oddsPct: 2.8, confederation: "CONCACAF", nickname: "El Tri" },
  { name: "Canada", code: "ca", captain: "Alphonso Davies", worldCupsWon: 0, oddsPct: 1.6, confederation: "CONCACAF", nickname: "Les Rouges" },
  { name: "Costa Rica", code: "cr", captain: "Keylor Navas", worldCupsWon: 0, oddsPct: 0.6, confederation: "CONCACAF", nickname: "Los Ticos" },
  { name: "Panama", code: "pa", captain: "Aníbal Godoy", worldCupsWon: 0, oddsPct: 0.5, confederation: "CONCACAF", nickname: "La Marea Roja" },
  { name: "Jamaica", code: "jm", captain: "Michael Antonio", worldCupsWon: 0, oddsPct: 0.45, confederation: "CONCACAF", nickname: "Reggae Boyz" },

  // ---- AFC ---------------------------------------------------------------
  { name: "Japan", code: "jp", captain: "Wataru Endō", worldCupsWon: 0, oddsPct: 2.5, confederation: "AFC", nickname: "Samurai Blue" },
  { name: "South Korea", code: "kr", captain: "Son Heung-min", worldCupsWon: 0, oddsPct: 1.7, confederation: "AFC", nickname: "Taegeuk Warriors" },
  { name: "Australia", code: "au", captain: "Mathew Ryan", worldCupsWon: 0, oddsPct: 1.0, confederation: "AFC", nickname: "Socceroos" },
  { name: "Saudi Arabia", code: "sa", captain: "Salem Al-Dawsari", worldCupsWon: 0, oddsPct: 0.8, confederation: "AFC", nickname: "Green Falcons" },
  { name: "Iran", code: "ir", captain: "Ehsan Hajsafi", worldCupsWon: 0, oddsPct: 0.8, confederation: "AFC", nickname: "Team Melli" },
  { name: "Qatar", code: "qa", captain: "Hassan Al-Haydos", worldCupsWon: 0, oddsPct: 0.7, confederation: "AFC", nickname: "The Maroon" },
  { name: "Uzbekistan", code: "uz", captain: "Eldor Shomurodov", worldCupsWon: 0, oddsPct: 0.4, confederation: "AFC", nickname: "White Wolves" },
  { name: "Jordan", code: "jo", captain: "Mousa Al-Tamari", worldCupsWon: 0, oddsPct: 0.35, confederation: "AFC", nickname: "Al-Nashama" },
  { name: "Iraq", code: "iq", captain: "Aymen Hussein", worldCupsWon: 0, oddsPct: 0.35, confederation: "AFC", nickname: "Lions of Mesopotamia" },

  // ---- OFC ---------------------------------------------------------------
  { name: "New Zealand", code: "nz", captain: "Chris Wood", worldCupsWon: 0, oddsPct: 0.3, confederation: "OFC", nickname: "All Whites" },
];
