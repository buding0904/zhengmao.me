import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "src", "content", "notes");

const rl = readline.createInterface({ input, output });

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeYaml(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}

async function askRequired(question) {
  let answer = "";

  while (!answer) {
    answer = (await rl.question(question)).trim();
    if (answer) continue;
    console.log("This field is required.");
  }

  return answer;
}

async function askFileType() {
  let answer = "";

  while (answer !== "mdx" && answer !== "md") {
    answer =
      (await rl.question("File type (mdx/md) [mdx]: ")).trim().toLowerCase() ||
      "mdx";

    if (answer !== "mdx" && answer !== "md") {
      console.log("Please enter mdx or md.");
    }
  }

  return answer;
}

async function askBoolean(question, defaultValue = false) {
  const suffix = defaultValue ? "Y/n" : "y/N";
  let answer;

  while (answer === undefined) {
    const inputValue = (await rl.question(question + " (" + suffix + "): "))
      .trim()
      .toLowerCase();

    if (!inputValue) {
      answer = defaultValue;
    } else if (["y", "yes"].includes(inputValue)) {
      answer = true;
    } else if (["n", "no"].includes(inputValue)) {
      answer = false;
    } else {
      console.log("Please enter y or n.");
    }
  }

  return answer;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(date);
}

function buildNote({ title, description, date, draft }) {
  const frontmatter = [
    "---",
    "title: \"" + escapeYaml(title) + "\"",
    "description: \"" + escapeYaml(description) + "\"",
    "date: \"" + escapeYaml(date) + "\"",
  ];

  if (draft) {
    frontmatter.push("draft: true");
  }

  frontmatter.push("---", "", "Start writing here.", "");

  return frontmatter.join("\n");
}

async function main() {
  console.log("Create a new note\n");

  const enTitle = await askRequired("English title: ");
  const enDescription = await askRequired("English description: ");
  const zhTitle = await askRequired("Chinese title: ");
  const zhDescription = await askRequired("Chinese description: ");
  const suggestedSlug = slugify(enTitle);
  const slugAnswer = await rl.question("Slug [" + suggestedSlug + "]: ");
  const slug = slugify(slugAnswer || suggestedSlug);

  if (!slug) {
    throw new Error(
      "Could not create a valid slug. Please use letters or numbers.",
    );
  }

  const defaultDate = formatDate(new Date());
  const date =
    (await rl.question("Date [" + defaultDate + "]: ")).trim() || defaultDate;
  const fileType = await askFileType();
  const draft = await askBoolean("Create as draft", false);
  const entries = [
    {
      title: enTitle,
      description: enDescription,
      fileName: path.join(slug, "en." + fileType),
    },
    {
      title: zhTitle,
      description: zhDescription,
      fileName: path.join(slug, "zh." + fileType),
    },
  ];
  const existingEntry = entries.find((entry) =>
    existsSync(path.join(contentDir, entry.fileName)),
  );

  if (existingEntry) {
    throw new Error(
      "Note already exists: " +
        path.relative(rootDir, path.join(contentDir, existingEntry.fileName)),
    );
  }

  await mkdir(contentDir, { recursive: true });

  for (const entry of entries) {
    const filePath = path.join(contentDir, entry.fileName);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(
      filePath,
      buildNote({ ...entry, date, draft }),
      "utf8",
    );
  }

  console.log("\nCreated");
  for (const entry of entries) {
    console.log("- " + path.relative(rootDir, path.join(contentDir, entry.fileName)));
  }
}

main()
  .catch((error) => {
    console.error("\n" + error.message);
    process.exitCode = 1;
  })
  .finally(() => {
    rl.close();
  });
