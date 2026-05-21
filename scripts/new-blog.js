import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const blogDir = path.join(rootDir, "src", "content", "blog");

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

async function askLang() {
  let answer = "";

  while (answer !== "en" && answer !== "zh") {
    answer =
      (await rl.question("Language (en/zh) [en]: ")).trim().toLowerCase() ||
      "en";

    if (answer !== "en" && answer !== "zh") {
      console.log("Please enter en or zh.");
    }
  }

  return answer;
}

async function askBoolean(question, defaultValue = false) {
  const suffix = defaultValue ? "Y/n" : "y/N";
  let answer;

  while (answer === undefined) {
    const inputValue = (await rl.question(`${question} (${suffix}): `))
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

function buildPost({ title, description, date, lang, canonicalSlug, draft }) {
  const frontmatter = [
    "---",
    `title: "${escapeYaml(title)}"`,
    `description: "${escapeYaml(description)}"`,
    `date: "${escapeYaml(date)}"`,
  ];

  if (lang !== "en") {
    frontmatter.push(`lang: "${lang}"`);
  }

  frontmatter.push(`canonicalSlug: "${escapeYaml(canonicalSlug)}"`);

  if (draft) {
    frontmatter.push("draft: true");
  }

  frontmatter.push("---", "", "Start writing here.", "");

  return frontmatter.join("\n");
}

async function main() {
  console.log("Create a new blog post\n");

  const title = await askRequired("Title: ");
  const description = await askRequired("Description: ");
  const lang = await askLang();
  const suggestedSlug = slugify(title);
  const slugAnswer = await rl.question(`Slug [${suggestedSlug}]: `);
  const canonicalSlug = slugify(slugAnswer || suggestedSlug);

  if (!canonicalSlug) {
    throw new Error(
      "Could not create a valid slug. Please use letters or numbers.",
    );
  }

  const defaultDate = formatDate(new Date());
  const date =
    (await rl.question(`Date [${defaultDate}]: `)).trim() || defaultDate;
  const draft = await askBoolean("Create as draft", false);
  const fileName =
    lang === "zh" ? `${canonicalSlug}-zh.md` : `${canonicalSlug}.md`;
  const filePath = path.join(blogDir, fileName);

  if (existsSync(filePath)) {
    throw new Error(
      `Blog post already exists: ${path.relative(rootDir, filePath)}`,
    );
  }

  await mkdir(blogDir, { recursive: true });
  await writeFile(
    filePath,
    buildPost({ title, description, date, lang, canonicalSlug, draft }),
    "utf8",
  );

  console.log(`\nCreated ${path.relative(rootDir, filePath)}`);
}

main()
  .catch((error) => {
    console.error(`\n${error.message}`);
    process.exitCode = 1;
  })
  .finally(() => {
    rl.close();
  });
