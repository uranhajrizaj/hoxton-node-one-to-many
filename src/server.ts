import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const db = Database("./db/data.db", { verbose: console.log });
const app = express();
const port = 4444;
app.use(cors());
app.use(express.json());

const getAllMuseums = db.prepare(`
SELECT * FROM museums
`);

const getAMuseum = db.prepare(`
SELECT * FROM museums WHERE id=@id
`);

const getAllWorks = db.prepare(`
SELECT * FROM works
`);

const getAWork = db.prepare(`
SELECT * FROM works WHERE id=@id
`);

const getALLWorksofMuseum = db.prepare(`
SELECT * FROM works WHERE museumId=@museumId
`);

const getMuseumOfWork = db.prepare(`
SELECT * FROM museums WHERE id=@id
`);

app.get("/museums", (req, res) => {
  const museums = getAllMuseums.all();
  for (let museum of museums) {
    const work = getALLWorksofMuseum.all({ museumId: museum.id });
    museum.works = work;
  }
  res.send(museums);
});

app.get("/museums/:id", (req, res) => {
  const museum = getAMuseum.get(req.params);
  if (museum) {
    const work = getALLWorksofMuseum.all({ museumId: museum.id });
    museum.works = work;
    res.send(museum);
  } else res.status(404).send({ error: "Museum not found" });
});

app.get("/works", (req, res) => {
  const works = getAllWorks.all();
  for (let work of works) {
    const museum = getMuseumOfWork.get({ id: work.museumId });
    work.museum = museum;
  }

  res.send(works);
});

app.get("/works/:id", (req, res) => {
  const work = getAWork.get(req.params);
  if (work) {
    const museum = getMuseumOfWork.get({ id: work.museumId });
    work.museum = museum;
    res.send(work);
  } else res.status(404).send({ error: "Work not found" });
});

app.listen(port, () => {
  console.log(`SErver is running in: http://localhost:${port}/museums`);
});
