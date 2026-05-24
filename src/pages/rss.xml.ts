import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { HOME } from "@consts";
import { contentLang, contentSlug } from "@lib/utils";

type Context = {
  site: string
}

export async function GET(context: Context) {
  const blog = (await getCollection("blog"))
  .filter(post => !post.data.draft && contentLang(post) === "en");

  const notes = (await getCollection("notes"))
    .filter(note => !note.data.draft && contentLang(note) === "en");

  const projects = (await getCollection("projects"))
    .filter(project => !project.data.draft && contentLang(project) === "en");

  const items = [...blog, ...notes, ...projects]
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  return rss({
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${contentSlug(item)}/`,
    })),
  });
}
