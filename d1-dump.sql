PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE sections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_key TEXT,
  img_key TEXT,
  img_alt TEXT,
  link_count INTEGER
  
);
INSERT INTO "sections" ("id","name","description","icon_key","img_key","img_alt","link_count") VALUES('Bible Text and Translations','Bible Text and Translations','Bible study resources, translations, and searchable scripture .','link','https://images.unsplash.com/photo-1519410280451-146429a310fc','Bible open to scripture under soft light',4);
INSERT INTO "sections" ("id","name","description","icon_key","img_key","img_alt","link_count") VALUES('Gospel Resources and Commentaries','Gospel Resources and Commentaries','In-depth Gospel articles, commentaries, and discipleship resources.','thought','https://images.unsplash.com/photo-1516979187457-637abb4f9353','Helpful  devotional books and notes',5);
INSERT INTO "sections" ("id","name","description","icon_key","img_key","img_alt","link_count") VALUES('Study Tools and Academics','Study Tools and Academics','Reference tools, lexicons, and academic resources for Bible study.','backpack','https://images.unsplash.com/photo-1517842645767-c639042777db','Academic study materials on a desk',5);
INSERT INTO "sections" ("id","name","description","icon_key","img_key","img_alt","link_count") VALUES('Video and Visual Education','Video and Visual Education','Video lessons, animated guides, and visual teaching resources.','sparkle','https://images.unsplash.com/photo-1536440136628-849c177e76a1','Video content displayed on a screen',6);
INSERT INTO "sections" ("id","name","description","icon_key","img_key","img_alt","link_count") VALUES('Apologetics and Theology','Apologetics and Theology','Resources for defending the faith and understanding theology.','users','https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c','Group conversation around a table',9);
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
INSERT INTO "links" ("id","title","link","img_key","img_alt","description","section","hits","metadata") VALUES('1','Bible Gateway','https://www.biblegateway.com','https://images.unsplash.com/photo-1504052442141-c990d2ec7585','Open Bible on a rustic table','A searchable online Bible in over 150 versions and 50 languages.','Bible Text and Translations',0,NULL);
INSERT INTO "links" ("id","title","link","img_key","img_alt","description","section","hits","metadata") VALUES('2','YouVersion Bible App','https://www.bible.com','https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c','Person reading a smartphone app','An online and mobile Bible platform featuring daily reading plans and community features.','Bible Text and Translations',0,NULL);
INSERT INTO "links" ("id","title","link","img_key","img_alt","description","section","hits","metadata") VALUES('3','The Gospel Coalition (TGC)','https://www.thegospelcoalition.org','https://images.unsplash.com/photo-1490730141103-6cac27aaab94','Sun shining through trees','Articles, essays, and multi-media resources tracking the implications of the Gospel in everyday life.','Gospel Resources and Commentaries',0,NULL);
INSERT INTO "links" ("id","title","link","img_key","img_alt","description","section","hits","metadata") VALUES('4','Desiring God','https://www.desiringgod.org','https://images.unsplash.com/photo-1516979187457-637abb4f9353','Stack of vintage study books','Find resources centered around the truth that God is most glorified in us when we are most satisfied in him.','Gospel Resources and Commentaries',0,NULL);
INSERT INTO "links" ("id","title","link","img_key","img_alt","description","section","hits","metadata") VALUES('5','Blue Letter Bible','https://www.blueletterbible.org','https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8','Close up of book pages with highlighters','Free access to study tools, lexicons, interlinear tools, and original Greek/Hebrew root words.','Study Tools and Academics',0,NULL);
INSERT INTO "links" ("id","title","link","img_key","img_alt","description","section","hits","metadata") VALUES('6','Enduring Word','https://enduringword.com','https://images.unsplash.com/photo-1519681393784-d120267933ba','Clear view of open scripture pages','Comprehensive, verse-by-verse commentary across the entire Bible by David Guzik.','Study Tools and Academics',0,NULL);
INSERT INTO "links" ("id","title","link","img_key","img_alt","description","section","hits","metadata") VALUES('7','StepBible','https://www.stepbible.org','https://images.unsplash.com/photo-1517842645767-c639042777db','Notebook and open browser layout','Tyndale House project providing detailed historical, contextual, and word-by-word biblical analysis.','Study Tools and Academics',0,NULL);
INSERT INTO "links" ("id","title","link","img_key","img_alt","description","section","hits","metadata") VALUES('8','The Bible Project','https://bibleproject.com','https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe','Abstract digital canvas art','Short, beautifully animated videos explaining the literary structure and overarching narrative of every book.','Video and Visual Education',0,NULL);
INSERT INTO "links" ("id","title","link","img_key","img_alt","description","section","hits","metadata") VALUES('9','The Chosen TV','https://thechosen.tv','https://images.unsplash.com/photo-1536440136628-849c177e76a1','Movie projector beams in a dark room','Multi-season historical drama series based on the life of Jesus and those who knew him.','Video and Visual Education',0,NULL);
INSERT INTO "links" ("id","title","link","img_key","img_alt","description","section","hits","metadata") VALUES('10','Got Questions','https://www.gotquestions.org','https://images.unsplash.com/photo-1529156069898-49953e39b3ac','Group of people talking inside an office space','An expansive database answering difficult questions about faith, theology, and the Bible.','Apologetics and Theology',0,NULL);
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
INSERT INTO "signs" ("id","title","img_key","img_alt","description","web_hits","qr_hits","metadata") VALUES('1','John 3:18','https://assets.tailgates4Jesus.com/images/John-3-18.png','Two signs, one pointing toward the path of unbelief, the other towrds belief.','Which path will you choose?',0,6,'{}');
INSERT INTO "signs" ("id","title","img_key","img_alt","description","web_hits","qr_hits","metadata") VALUES('2','Names of Jesus','https://assets.tailgates4Jesus.com/images/Names-of-JESUS.png','Names of Jesus','How would you describe Jesus?',0,0,NULL);
INSERT INTO "signs" ("id","title","img_key","img_alt","description","web_hits","qr_hits","metadata") VALUES('4','No Hope?','https://assets.tailgates4Jesus.com/images/No-Hope_-2.png','A person walking toward a bright sunlit path next to text reading ''NO HOPE? NO PURPOSE? JESUS SAYS Come to me!''"','Hope is only found in Jesus',0,0,NULL);
INSERT INTO "signs" ("id","title","img_key","img_alt","description","web_hits","qr_hits","metadata") VALUES('3','Maser Design','https://assets.tailgates4jesus.com/images/tailgate-1-image.png',NULL,'God created YOU.',0,1,NULL);
INSERT INTO "signs" ("id","title","img_key","img_alt","description","web_hits","qr_hits","metadata") VALUES('5','What can you find?','https://assets.tailgates4Jesus.com/images/What-Can-You-FInd.png','Words at the top display "What can you find in Jesus?". The name JESUS is displayed with huge letters and has of Him inside the letters. With the site "tailgates4Jesus listed below.','Who is Jesus to YOU? What can YOU find in Him?',0,0,NULL);
INSERT INTO "signs" ("id","title","img_key","img_alt","description","web_hits","qr_hits","metadata") VALUES('6','Dare to take Jesus SERIOUSLY?','https://assets.tailgates4Jesus.com/images/tailgate-3-image.png','A truck with a sign attached and  the words, "Dare to take Jesus SERIOUSLY?"','WIll you dare to take Jesus for who He really is, the only truth.',0,0,NULL);
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
