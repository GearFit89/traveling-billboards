
--This is the seed of my project. This is the mock data, but this is not to be used in production 
--only in local development;
PRAGMA foreign_keys = OFF;
-- 1. Drop child tables first to avoid foreign key violations
DROP TABLE IF EXISTS thoughts;
DROP TABLE IF EXISTS links;
DROP TABLE IF EXISTS comments;

-- 2. Now it's safe to drop the parent tables
DROP TABLE IF EXISTS signs;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS messages;

CREATE TABLE sections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_key TEXT,
  img_key TEXT,
  img_alt TEXT
);

CREATE TABLE links (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  img_key TEXT,
  img_alt TEXT,
  description TEXT, -- Fixed typo
  section TEXT NOT NULL,
  
  hits INTEGER,
  metadata TEXT
 
);

CREATE TABLE signs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  img_key TEXT,
  img_alt TEXT,
  description TEXT, -- Fixed typo
  web_hits INTEGER,
  qr_hits INTEGER,
  metadata TEXT
);

CREATE TABLE thoughts (
  id TEXT PRIMARY KEY,
  sign_id TEXT NOT NULL,
  content TEXT,
  location TEXT,
  date TEXT,
  FOREIGN KEY(sign_id) REFERENCES signs(id)
);
 
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  date TEXT,
  sender_id TEXT,
  type TEXT,
  had_reply BOOLEAN,
  unread BOOLEAN

);

CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT,
  user_id TEXT
 
  
);
PRAGMA foreign_keys = ON;
-- Insert statements for 'signs' table
INSERT INTO signs (id, title, img_key, img_alt, description, web_hits, qr_hits) VALUES
('1', 'Hollywood Sign', 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1', 'The iconic Hollywood sign in Los Angeles', 'American landmark and cultural icon overlooking Hollywood, Los Angeles.', 4500, 1200),
('2', 'Welcome to Fabulous Las Vegas', 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81', 'Neon Las Vegas welcome sign', 'Historic neon sign funded in May 1959 and erected soon after by Western Neon.', 8900, 3400),
('3', 'Route 66 Marker', 'https://images.unsplash.com/photo-1596701035508-3ab96d66e771', 'Painted Route 66 shield on the highway', 'Historic marker for the Main Street of America.', 2100, 560),
('4', 'Abbey Road Street Sign', 'https://images.unsplash.com/photo-1621252179022-d069e2c4501a', 'Abbey Road NW8 street sign', 'Famous street sign in London, known worldwide due to the Beatles.', 6700, 150),
('5', 'Wall Street Sign', 'https://images.unsplash.com/photo-1611914757303-34e8dd6ee0a7', 'Green Wall Street sign in NYC', 'The eight-block-long street in the Financial District of Lower Manhattan.', 3400, 890),
('6', 'Penny Lane', 'https://images.unsplash.com/photo-1554104707-a7ea08d24b61', 'Penny Lane brick wall sign', 'A street in south Liverpool, England.', 1200, 45),
('7', 'Platform 9 3/4', 'https://images.unsplash.com/photo-1618944837862-581335cdb1ea', 'Platform 9 3/4 sign at King''s Cross', 'Fictional train platform at King''s Cross Station in London.', 9999, 5000),
('8', 'Pacific Coast Highway', 'https://images.unsplash.com/photo-1506059612708-99d6c258160e', 'Highway 1 sign along the coast', 'Major state highway running along most of the Pacific coastline of California.', 4300, 210),
('9', 'Bourbon Street', 'https://images.unsplash.com/photo-1574169208507-84376144848b', 'Bourbon street lamp sign in New Orleans', 'Historic street in the heart of the French Quarter of New Orleans.', 5100, 780),
('10', 'Central Park Entrance', 'https://images.unsplash.com/photo-1555109307-f7d9a1118b76', 'Cast iron sign at Central Park', 'Urban park in New York City located between the Upper West and Upper East Sides.', 8800, 1400);

-- Relational Insert statements for the nested 'thoughts' field
INSERT INTO thoughts (id, sign_id, content, location, date) VALUES
('1', '1', 'The view from behind the letters is amazing.', 'Hollywood Hills, CA', '2024-04-24'),
('2', '3', 'Loved driving this stretch.', 'Route 66', '2024-04-23'),
('3', '7', 'Great photo op location.', 'King''s Cross, London', '2024-04-22');


INSERT INTO links (id, title, link, img_key, img_alt, description, section, hits) VALUES
('1', 'Bible Gateway', 'https://www.biblegateway.com', 'https://images.unsplash.com/photo-1504052442141-c990d2ec7585', 'Open Bible on a rustic table', 'A searchable online Bible in over 150 versions and 50 languages.', 'Bible Text and Translations', 125400),
('2', 'YouVersion Bible App', 'https://www.bible.com', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c', 'Person reading a smartphone app', 'An online and mobile Bible platform featuring daily reading plans and community features.', 'Bible Text and Translations', 342000),
('3', 'The Gospel Coalition (TGC)', 'https://www.thegospelcoalition.org', 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94', 'Sun shining through trees', 'Articles, essays, and multi-media resources tracking the implications of the Gospel in everyday life.', 'Gospel Resources and Commentaries', 88500),
('4', 'Desiring God', 'https://www.desiringgod.org', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353', 'Stack of vintage study books', 'Find resources centered around the truth that God is most glorified in us when we are most satisfied in him.', 'Gospel Resources and Commentaries', 91200),
('5', 'Blue Letter Bible', 'https://www.blueletterbible.org', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8', 'Close up of book pages with highlighters', 'Free access to study tools, lexicons, interlinear tools, and original Greek/Hebrew root words.', 'Study Tools and Academics', 145000),
('6', 'Enduring Word', 'https://enduringword.com', 'https://images.unsplash.com/photo-1519681393784-d120267933ba', 'Clear view of open scripture pages', 'Comprehensive, verse-by-verse commentary across the entire Bible by David Guzik.', 'Study Tools and Academics', 79000),
('7', 'StepBible', 'https://www.stepbible.org', 'https://images.unsplash.com/photo-1517842645767-c639042777db', 'Notebook and open browser layout', 'Tyndale House project providing detailed historical, contextual, and word-by-word biblical analysis.', 'Study Tools and Academics', 21000),
('8', 'The Bible Project', 'https://bibleproject.com', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe', 'Abstract digital canvas art', 'Short, beautifully animated videos explaining the literary structure and overarching narrative of every book.', 'Video and Visual Education', 227500),
('9', 'The Chosen TV', 'https://thechosen.tv', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1', 'Movie projector beams in a dark room', 'Multi-season historical drama series based on the life of Jesus and those who knew him.', 'Video and Visual Education', 195000),
('10', 'Got Questions', 'https://www.gotquestions.org', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac', 'Group of people talking inside an office space', 'An expansive database answering difficult questions about faith, theology, and the Bible.', 'Apologetics and Theology', 118900);

INSERT INTO sections (id, name, description, icon_key, img_key, img_alt) VALUES
('Bible Text and Translations', 'Bible Text and Translations', 'Bible study resources, translations, and searchable scripture text.', 'link', 'https://images.unsplash.com/photo-1519410280451-146429a310fc', 'Bible open to scripture under soft light'),
('Gospel Resources and Commentaries', 'Gospel Resources and Commentaries', 'In-depth Gospel articles, commentaries, and discipleship resources.', 'thought', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353', 'Stack of devotional books and notes'),
('Study Tools and Academics', 'Study Tools and Academics', 'Reference tools, lexicons, and academic resources for Bible study.', 'backpack', 'https://images.unsplash.com/photo-1517842645767-c639042777db', 'Academic study materials on a desk'),
('Video and Visual Education', 'Video and Visual Education', 'Video lessons, animated guides, and visual teaching resources.', 'sparkle', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1', 'Video content displayed on a screen'),
('Apologetics and Theology', 'Apologetics and Theology', 'Resources for defending the faith and understanding theology.', 'users', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c', 'Group conversation around a table');

