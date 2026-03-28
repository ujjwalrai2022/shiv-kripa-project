import express from "express";
import cors from "cors";
import { pool } from "./db.js";
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;


app.get("/items", async (req, res) => {
  const result = await pool.query(`
   SELECT 
  public.items.id,
  public.items.title,
  public.items.description,
  public.items.image_url,
  public.items.category_id,
  public.categories.name AS category,
  public.categories.slug AS slug
FROM public.items
JOIN public.categories
ON public.items.category_id = public.categories.id
  `);

  res.json(result.rows);
});
app.get("/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const { title, description, image_url, category_id } = req.body;

    const result = await pool.query(
      `
      INSERT INTO items (title, description, image_url, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [title, description, image_url, category_id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params; // 👈 from URL
    const { title, description, image_url, category_id } = req.body; // 👈 from frontend

    const result = await pool.query(
      `
      UPDATE items
      SET title = $1,
          description = $2,
          image_url = $3,
          category_id = $4
      WHERE id = $5
      RETURNING *
      `,
      [title, description, image_url, category_id, id],
    );

    res.json(result.rows[0]); // 👈 send updated row
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM items WHERE id=$1 RETURNING *`,
      [id],
    );
    res.json({
      message: "Deleted Successfully",
      deleted: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

app.post("/categories", async (req, res) => {
  try {
    const { name, image_url } = req.body;

    const CapitalLetter =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const slug = slugify(name);

    const result = await pool.query(
      `INSERT INTO categories (name, image_url, slug)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [CapitalLetter, image_url, slug],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Category insert failed" });
  }
});

app.listen(port, async () => {
  try {
    await pool.query("SET search_path TO public"); // ✅ here
    console.log("Schema set to public");
    console.log(`Server running on port ${port}`);
  } catch (err) {
    console.error("Error setting schema:", err);
  }
});
