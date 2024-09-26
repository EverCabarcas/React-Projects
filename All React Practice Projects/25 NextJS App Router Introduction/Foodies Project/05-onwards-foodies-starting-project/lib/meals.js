import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  //   throw new Error('Failed to fetch meals.');
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title + meal.image.name, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extention = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extention}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedIamge = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedIamge), (error) => {
    if (error) {
      throw new Error("Failed to save image.");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug)
    VALUES (@title, @summary, @instructions, @image, @creator, @creator_email, @slug)
  `
  ).run(meal);
}
