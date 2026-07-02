// Mock database for Traveling Billboards
// This file simulates database data - replace these functions with real DB calls later
// The data shape is designed to be directly compatible with a real database

import * as v from 'valibot';
import { SignDataSchema, LinkDataSchema, ThoughtSchema, SectionSchema } from '@/lib/schemas';
// ===========================================
// TYPE DEFINITIONS and MOODS
// ===========================================

// export type MoodType = 'reflective' | 'excited' | 'curious' | 'peaceful';

// ===========================================
// MOCK DATA - Synchronized with mock-data.json and types.ts
// NOTE: Thoughts are now extracted from signs.thoughts (SignData.thoughts field)
// ===========================================
export const signs: v.InferOutput<typeof SignDataSchema>[] = [
  {
    id: "1",
    title: "Hollywood Sign",
    img_key: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1",
    img_alt: "The iconic Hollywood sign in Los Angeles",
    description: "American landmark and cultural icon overlooking Hollywood, Los Angeles.",
   
    web_hits: 4500,
    qr_hits: 1200
  },
  {
    id: "2",
    title: "Welcome to Fabulous Las Vegas",
    img_key: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    img_alt: "Neon Las Vegas welcome sign",
    description: "Historic neon sign funded in May 1959 and erected soon after by Western Neon.",
    
    web_hits: 8900,
    qr_hits: 3400
  },
  {
    id: "3",
    title: "Route 66 Marker",
    img_key: "https://images.unsplash.com/photo-1596701035508-3ab96d66e771",
    img_alt: "Painted Route 66 shield on the highway",
    description: "Historic marker for the Main Street of America.",
 
    web_hits: 2100,
    qr_hits: 560
  },
  {
    id: "4",
    title: "Abbey Road Street Sign",
    img_key: "https://images.unsplash.com/photo-1621252179022-d069e2c4501a",
    img_alt: "Abbey Road NW8 street sign",
    description: "Famous street sign in London, known worldwide due to the Beatles.",
    
    web_hits: 6700,
    qr_hits: 150
  },
  {
    id: "5",
    title: "Wall Street Sign",
    img_key: "https://images.unsplash.com/photo-1611914757303-34e8dd6ee0a7",
    img_alt: "Green Wall Street sign in NYC",
    description: "The eight-block-long street in the Financial District of Lower Manhattan.",
    
    web_hits: 3400,
    qr_hits: 890
  },
  {
    id: "6",
    title: "Penny Lane",
    img_key: "https://images.unsplash.com/photo-1554104707-a7ea08d24b61",
    img_alt: "Penny Lane brick wall sign",
    description: "A street in south Liverpool, England.",
    
    web_hits: 1200,
    qr_hits: 45
  },
  {
    id: "7",
    title: "Platform 9 3/4",
    img_key: "https://images.unsplash.com/photo-1618944837862-581335cdb1ea",
    img_alt: "Platform 9 3/4 sign at King's Cross",
    description: "Fictional train platform at King's Cross Station in London.",
   
    web_hits: 9999,
    qr_hits: 5000
  },
  {
    id: "8",
    title: "Pacific Coast Highway",
    img_key: "https://images.unsplash.com/photo-1506059612708-99d6c258160e",
    img_alt: "Highway 1 sign along the coast",
    description: "Major state highway running along most of the Pacific coastline of California.",
    
    web_hits: 4300,
    qr_hits: 210
  },
  {
    id: "9",
    title: "Bourbon Street",
    img_key: "https://images.unsplash.com/photo-1574169208507-84376144848b",
    img_alt: "Bourbon street lamp sign in New Orleans",
    description: "Historic street in the heart of the French Quarter of New Orleans.",
    
    web_hits: 5100,
    qr_hits: 780
  },
  {
    id: "10",
    title: "Central Park Entrance",
    img_key: "https://images.unsplash.com/photo-1555109307-f7d9a1118b76",
    img_alt: "Cast iron sign at Central Park",
    description: "Urban park in New York City located between the Upper West and Upper East Sides.",
    
    web_hits: 8800,
    qr_hits: 1400
  }
];

export const links: v.InferOutput<typeof LinkDataSchema>[] = [
  {
    id: "1",
    title: "Bible Gateway",
    link: "https://www.biblegateway.com",
    img_key: "https://images.unsplash.com/photo-1504052442141-c990d2ec7585",
    img_alt: "Open Bible on a rustic table",
    description: "A searchable online Bible in over 150 versions and 50 languages.",
    section: "Bible Text and Translations",
    hits: 125400
  },
  {
    id: "2",
    title: "YouVersion Bible App",
    link: "https://www.bible.com",
    img_key: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    img_alt: "Person reading a smartphone app",
    description: "An online and mobile Bible platform featuring daily reading plans and community features.",
    section: "Bible Text and Translations",
    hits: 342000
  },
  {
    id: "3",
    title: "The Gospel Coalition (TGC)",
    link: "https://www.thegospelcoalition.org",
    img_key: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94",
    img_alt: "Sun shining through trees",
    description: "Articles, essays, and multi-media resources tracking the implications of the Gospel in everyday life.",
    section: "Gospel Resources and Commentaries",
    hits: 88500
  },
  {
    id: "4",
    title: "Desiring God",
    link: "https://www.desiringgod.org",
    img_key: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    img_alt: "Stack of vintage study books",
    description: "Find resources centered around the truth that God is most glorified in us when we are most satisfied in him.",
    section: "Gospel Resources and Commentaries",
    hits: 91200
  },
  {
    id: "5",
    title: "Blue Letter Bible",
    link: "https://www.blueletterbible.org",
    img_key: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    img_alt: "Close up of book pages with highlighters",
    description: "Free access to study tools, lexicons, interlinear tools, and original Greek/Hebrew root words.",
    section: "Study Tools and Academics",
    hits: 145000
  },
  {
    id: "6",
    title: "Enduring Word",
    link: "https://enduringword.com",
    img_key: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    img_alt: "Clear view of open scripture pages",
    description: "Comprehensive, verse-by-verse commentary across the entire Bible by David Guzik.",
    section: "Study Tools and Academics",
    hits: 79000
  },
  {
    id: "7",
    title: "StepBible",
    link: "https://www.stepbible.org",
    img_key: "https://images.unsplash.com/photo-1517842645767-c639042777db",
    img_alt: "Notebook and open browser layout",
    description: "Tyndale House project providing detailed historical, contextual, and word-by-word biblical analysis.",
    section: "Study Tools and Academics",
    hits: 21000
  },
  {
    id: "8",
    title: "The Bible Project",
    link: "https://bibleproject.com",
    img_key: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    img_alt: "Abstract digital canvas art",
    description: "Short, beautifully animated videos explaining the literary structure and overarching narrative of every book.",
    section: "Video and Visual Education",
    hits: 227500
  },
  {
    id: "9",
    title: "The Chosen TV",
    link: "https://thechosen.tv",
    img_key: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    img_alt: "Movie projector beams in a dark room",
    description: "Multi-season historical drama series based on the life of Jesus and those who knew him.",
    section: "Video and Visual Education",
    hits: 195000
  },
  {
    id: "10",
    title: "Got Questions",
    link: "https://www.gotquestions.org",
    img_key: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    img_alt: "Group of people talking inside an office space",
    description: "An expansive database answering difficult questions about faith, theology, and the Bible.",
    section: "Apologetics and Theology",
    hits: 118900
  }
];
export const sections: v.InferOutput<typeof SectionSchema>[] = [
  {
    id: "Bible Text and Translations",
    name: "Bible Text and Translations",
    description: "Bible study resources, translations, and searchable scripture text.",
    icon_key: "link",
    img_key: "https://images.unsplash.com/photo-1519410280451-146429a310fc",
    img_alt: "Bible open to scripture under soft light",
  },
  {
    id: "Gospel Resources and Commentaries",
    name: "Gospel Resources and Commentaries",
    description: "In-depth Gospel articles, commentaries, and discipleship resources.",
    icon_key: "thought",
    img_key: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    img_alt: "Stack of devotional books and notes",
  },
  {
    id: "Study Tools and Academics",
    name: "Study Tools and Academics",
    description: "Reference tools, lexicons, and academic resources for Bible study.",
    icon_key: "backpack",
    img_key: "https://images.unsplash.com/photo-1517842645767-c639042777db",
    img_alt: "Academic study materials on a desk",
  },
  {
    id: "Video and Visual Education",
    name: "Video and Visual Education",
    description: "Video lessons, animated guides, and visual teaching resources.",
    icon_key: "sparkle",
    img_key: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    img_alt: "Video content displayed on a screen",
  },
  {
    id: "Apologetics and Theology",
    name: "Apologetics and Theology",
    description: "Resources for defending the faith and understanding theology.",
    icon_key: "users",
    img_key: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    img_alt: "Group conversation around a table",
  },
];

// ===========================================
// DATA ACCESS FUNCTIONS
// ===========================================

