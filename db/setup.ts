import Database from "better-sqlite3";

const db=Database("./db/data.db",{verbose:console.log})

const museums=[
    {
        name:"German Museum of Technology",
        city: "Berlin"
    },
    {
        name:"Reina Sofia",
        city: "Madrid"
    },
    {
        name:"National Museum",
        city: "Bangkok"
    }
]

const works=[
    {
        name:"Bioscop",
        picture:"https://technikmuseum.berlin/assets/_processed_/0/8/csm_technikmuseum-filmtechnik-mutoskop_aa14c905ea.jpg",
        museumId:1
    },
    {
        name:"Ernemann I film projector",
        picture:"https://technikmuseum.berlin/assets/_processed_/0/9/csm_technikmuseum-filmtechnik-kinoprojektor-ernemann_e5d168888f.jpg",
        museumId:1
    },
    {
        name:"Laterne Riche",
        picture:"https://technikmuseum.berlin/assets/_processed_/4/9/csm_technikmuseum-filmtechnik-laterne-riche-01_aac11f96d6.jpg",
        museumId:1
    },
    {
        name:"Guernica",
        picture:"https://upload.wikimedia.org/wikipedia/commons/6/6f/Mural_del_Gernika.jpg",
        museumId:2
    },
    {
        name:"Guitar and Newspaper",
        picture:"https://render.fineartamerica.com/images/rendered/default/canvas-print/8/6.5/mirror/break/images/artworkimages/medium/2/guitar-and-newspaper-1925-juan-gris-canvas-print.jpg",
        museumId:2
    },
    {
        name:"Sukhothai Inscription",
        picture:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/%E0%B8%88%E0%B8%B2%E0%B8%A3%E0%B8%B6%E0%B8%81%E0%B8%9E%E0%B9%88%E0%B8%AD%E0%B8%82%E0%B8%B8%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%B3%E0%B9%81%E0%B8%AB%E0%B8%87_Ram_Khamhaeng_Inscription_03.jpg/360px-%E0%B8%88%E0%B8%B2%E0%B8%A3%E0%B8%B6%E0%B8%81%E0%B8%9E%E0%B9%88%E0%B8%AD%E0%B8%82%E0%B8%B8%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%B3%E0%B9%81%E0%B8%AB%E0%B8%87_Ram_Khamhaeng_Inscription_03.jpg",
        museumId:3
    },
]

const createMuseumsTable=db.prepare(`
CREATE TABLE IF NOT EXISTS museums (
    id INTEGER,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    PRIMARY KEY(id)
);
`)
createMuseumsTable.run()


const ceateMuseum=db.prepare(`
INSERT INTO museums (name,city) VALUES (@name,@city)
`)

for(let museum of museums) ceateMuseum.run(museum)

const createWorksTable=db.prepare(`
  CREATE TABLE IF NOT EXISTS works (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    picture TEXT NOT NULL,
    museumId INTEGER NOT NULL,
    FOREIGN KEY (museumId) REFERENCES museums(id)
  );
`)
createWorksTable.run()


const creatework=db.prepare(`
INSERT INTO works(name,picture,museumId) VALUES(@name,@picture,@museumId)
`)
for(let work of works) creatework.run(work)
