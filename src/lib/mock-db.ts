// Mock database for Traveling Billboards
// This file simulates database data - replace these functions with real DB calls later
// The data shape is designed to be directly compatible with a real database

import { getLinkCache } from '@/services/cacher';
import type { SignData, LinkData, Thought } from '@/types';

// ===========================================
// TYPE DEFINITIONS & MOODS
// ===========================================

export type MoodType = 'reflective' | 'excited' | 'curious' | 'peaceful';

// ===========================================
// MOCK DATA - Synchronized with mock-data.json & types.ts
// ===========================================

export const thoughts: Thought[] = [
  {
    id: '1',
    content: 'The horizon stretches endlessly ahead. Every mile brings a new perspective, a fresh canvas painted by time and weather.',
    location: 'Route 66, Arizona',
    date: '2024-03-15',
  },
  {
    id: '2',
    content: 'Cities pulse with their own rhythm. Stand still long enough and you become part of the symphony.',
    location: 'Downtown Chicago',
    date: '2024-03-12',
  },
  {
    id: '3',
    content: 'What stories do these old highways hold? Every crack in the asphalt is a chapter written by countless journeys.',
    location: 'Pacific Coast Highway',
    date: '2024-03-08',
  },
  {
    id: '4',
    content: 'Sometimes the best conversations happen in silence, with only the hum of tires and passing landscapes.',
    location: 'Montana Backroads',
    date: '2024-03-01',
  },
  {
    id: '5',
    content: 'A stranger waved today. Such a simple gesture, yet it reminded me why I travel - to connect, however briefly.',
    location: 'Small Town, Nebraska',
    date: '2024-02-28',
  },
  {
    id: '6',
    content: 'The desert teaches patience. Nothing rushed here - not the sun, not the wind, not the ancient rocks.',
    location: 'Death Valley, California',
    date: '2024-02-20',
  },
];

export const signs: SignData[] = [
  {
    id: "sign_1",
    title: "Hollywood Sign",
    img_key: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1",
    img_alt: "The iconic Hollywood sign in Los Angeles",
    discription: "American landmark and cultural icon overlooking Hollywood, Los Angeles.",
    comments: [
      {
        id: "comment_1",
        content: "The view from behind the letters is amazing.",
        location: "Hollywood Hills, CA",
        date: "2024-04-24" // Converted from 1713967200000 timestamp
      }
    ],
    web_hits: 4500,
    qr_hits: 1200
  },
  {
    id: "sign_2",
    title: "Welcome to Fabulous Las Vegas",
    img_key: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    img_alt: "Neon Las Vegas welcome sign",
    discription: "Historic neon sign funded in May 1959 and erected soon after by Western Neon.",
    comments: [],
    web_hits: 8900,
    qr_hits: 3400
  },
  {
    id: "sign_3",
    title: "Route 66 Marker",
    img_key: "https://images.unsplash.com/photo-1596701035508-3ab96d66e771",
    img_alt: "Painted Route 66 shield on the highway",
    discription: "Historic marker for the Main Street of America.",
    comments: [
      {
        id: "comment_2",
        content: "Loved driving this stretch.",
        location: "Route 66",
        date: "2024-04-23" // Converted from 1713880800000 timestamp
      }
    ],
    web_hits: 2100,
    qr_hits: 560
  },
  {
    id: "sign_4",
    title: "Abbey Road Street Sign",
    img_key: "https://images.unsplash.com/photo-1621252179022-d069e2c4501a",
    img_alt: "Abbey Road NW8 street sign",
    discription: "Famous street sign in London, known worldwide due to the Beatles.",
    comments: [],
    web_hits: 6700,
    qr_hits: 150
  },
  {
    id: "sign_5",
    title: "Wall Street Sign",
    img_key: "https://images.unsplash.com/photo-1611914757303-34e8dd6ee0a7",
    img_alt: "Green Wall Street sign in NYC",
    discription: "The eight-block-long street in the Financial District of Lower Manhattan.",
    comments: [],
    web_hits: 3400,
    qr_hits: 890
  },
  {
    id: "sign_6",
    title: "Penny Lane",
    img_key: "https://images.unsplash.com/photo-1554104707-a7ea08d24b61",
    img_alt: "Penny Lane brick wall sign",
    discription: "A street in south Liverpool, England.",
    comments: [],
    web_hits: 1200,
    qr_hits: 45
  },
  {
    id: "sign_7",
    title: "Platform 9 3/4",
    img_key: "https://images.unsplash.com/photo-1618944837862-581335cdb1ea",
    img_alt: "Platform 9 3/4 sign at King's Cross",
    discription: "Fictional train platform at King's Cross Station in London.",
    comments: [
      {
        id: "comment_3",
        content: "Great photo op location.",
        location: "King's Cross, London",
        date: "2024-04-22" // Converted from 1713794400000 timestamp
      }
    ],
    web_hits: 9999,
    qr_hits: 5000
  },
  {
    id: "sign_8",
    title: "Pacific Coast Highway",
    img_key: "https://images.unsplash.com/photo-1506059612708-99d6c258160e",
    img_alt: "Highway 1 sign along the coast",
    discription: "Major state highway running along most of the Pacific coastline of California.",
    comments: [],
    web_hits: 4300,
    qr_hits: 210
  },
  {
    id: "sign_9",
    title: "Bourbon Street",
    img_key: "https://images.unsplash.com/photo-1574169208507-84376144848b",
    img_alt: "Bourbon street lamp sign in New Orleans",
    discription: "Historic street in the heart of the French Quarter of New Orleans.",
    comments: [],
    web_hits: 5100,
    qr_hits: 780
  },
  {
    id: "sign_10",
    title: "Central Park Entrance",
    img_key: "https://images.unsplash.com/photo-1555109307-f7d9a1118b76",
    img_alt: "Cast iron sign at Central Park",
    discription: "Urban park in New York City located between the Upper West and Upper East Sides.",
    comments: [],
    web_hits: 8800,
    qr_hits: 1400
  }
];

export const links: LinkData[] = [
  {
    id: "link_1",
    title: "Bible Gateway",
    link: "https://www.biblegateway.com",
    img_key: "https://images.unsplash.com/photo-1504052442141-c990d2ec7585",
    img_alt: "Open Bible on a rustic table",
    discription: "A searchable online Bible in over 150 versions and 50 languages.",
    section: "Bible Text & Translations",
    hits: 125400
  },
  {
    id: "link_2",
    title: "YouVersion Bible App",
    link: "https://www.bible.com",
    img_key: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    img_alt: "Person reading a smartphone app",
    discription: "An online and mobile Bible platform featuring daily reading plans and community features.",
    section: "Bible Text & Translations",
    hits: 342000
  },
  {
    id: "link_3",
    title: "The Gospel Coalition (TGC)",
    link: "https://www.thegospelcoalition.org",
    img_key: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94",
    img_alt: "Sun shining through trees",
    discription: "Articles, essays, and multi-media resources tracking the implications of the Gospel in everyday life.",
    section: "Gospel Resources & Commentaries",
    hits: 88500
  },
  {
    id: "link_4",
    title: "Desiring God",
    link: "https://www.desiringgod.org",
    img_key: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    img_alt: "Stack of vintage study books",
    discription: "Find resources centered around the truth that God is most glorified in us when we are most satisfied in him.",
    section: "Gospel Resources & Commentaries",
    hits: 91200
  },
  {
    id: "link_5",
    title: "Blue Letter Bible",
    link: "https://www.blueletterbible.org",
    img_key: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    img_alt: "Close up of book pages with highlighters",
    discription: "Free access to study tools, lexicons, interlinear tools, and original Greek/Hebrew root words.",
    section: "Study Tools & Academics",
    hits: 145000
  },
  {
    id: "link_6",
    title: "Enduring Word",
    link: "https://enduringword.com",
    img_key: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    img_alt: "Clear view of open scripture pages",
    discription: "Comprehensive, verse-by-verse commentary across the entire Bible by David Guzik.",
    section: "Study Tools & Academics",
    hits: 79000
  },
  {
    id: "link_7",
    title: "StepBible",
    link: "https://www.stepbible.org",
    img_key: "https://images.unsplash.com/photo-1517842645767-c639042777db",
    img_alt: "Notebook and open browser layout",
    discription: "Tyndale House project providing detailed historical, contextual, and word-by-word biblical analysis.",
    section: "Study Tools & Academics",
    hits: 21000
  },
  {
    id: "link_8",
    title: "The Bible Project",
    link: "https://bibleproject.com",
    img_key: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    img_alt: "Abstract digital canvas art",
    discription: "Short, beautifully animated videos explaining the literary structure and overarching narrative of every book.",
    section: "Video & Visual Education",
    hits: 227500
  },
  {
    id: "link_9",
    title: "The Chosen TV",
    link: "https://thechosen.tv",
    img_key: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    img_alt: "Movie projector beams in a dark room",
    discription: "Multi-season historical drama series based on the life of Jesus and those who knew him.",
    section: "Video & Visual Education",
    hits: 195000
  },
  {
    id: "link_10",
    title: "Got Questions",
    link: "https://www.gotquestions.org",
    img_key: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    img_alt: "Group of people talking inside an office space",
    discription: "An expansive database answering difficult questions about faith, theology, and the Bible.",
    section: "Apologetics & Theology",
    hits: 118900
  }
];

// ===========================================
// DATA ACCESS FUNCTIONS
// ===========================================

