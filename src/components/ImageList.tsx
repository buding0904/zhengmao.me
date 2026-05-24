import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ImgHTMLAttributes,
} from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type ImageItem = {
  src: string;
  title?: string;
  alt?: string;
};

type Props = {
  images: ImageItem[];
  assetDir?: string;
  assetBase?: string;
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
};

type ContentImage = string | { src: string };

const imageModules = import.meta.glob(
  [
    "/src/assets/**/*.{avif,gif,jpeg,jpg,png,webp}",
    "/src/content/{blog,notes,projects}/**/assets/**/*.{avif,gif,jpeg,jpg,png,webp}",
  ],
  {
    eager: true,
    import: "default",
  },
) as Record<string, ContentImage>;

function getPageAssetBase() {
  if (typeof window === "undefined") return undefined;

  const segments = window.location.pathname.split("/").filter(Boolean);
  const collectionIndex = segments.findIndex((segment) =>
    ["blog", "notes", "projects"].includes(segment),
  );

  if (collectionIndex === -1) return undefined;

  const collection = segments[collectionIndex];
  const slug = segments[collectionIndex + 1];
  if (!slug) return undefined;

  return "/src/content/" + collection + "/" + slug + "/assets";
}

function normalizeAssetDir(assetDir?: string) {
  return assetDir?.replace(/^\/+|\/+$/g, "");
}

function readImageModule(image: ContentImage) {
  return typeof image === "string" ? image : image.src;
}

function resolveImageSrc(src: string, assetDir?: string, assetBase?: string) {
  if (
    /^(https?:)?\/\//.test(src) ||
    src.startsWith("/") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  const normalizedAssetDir = normalizeAssetDir(assetDir);
  const pageAssetBase = assetBase ?? getPageAssetBase();
  const candidates = [
    normalizedAssetDir &&
      "/src/content/blog/" + normalizedAssetDir + "/assets/" + src,
    normalizedAssetDir &&
      "/src/content/notes/" + normalizedAssetDir + "/assets/" + src,
    normalizedAssetDir &&
      "/src/content/projects/" + normalizedAssetDir + "/assets/" + src,
    pageAssetBase && pageAssetBase + "/" + src,
    "/src/assets/" + src,
  ].filter(Boolean) as string[];

  const image = candidates
    .map((candidate) => imageModules[candidate])
    .find((candidate): candidate is ContentImage => Boolean(candidate));
  if (!image) return src;

  return readImageModule(image);
}

export default function ImageList({
  images,
  assetDir,
  assetBase: explicitAssetBase,
  imageProps,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [assetBase, setAssetBase] = useState(
    () => explicitAssetBase ?? getPageAssetBase(),
  );

  useEffect(() => {
    if (explicitAssetBase) return;

    const article = containerRef.current?.closest(
      "article[data-content-assets]",
    );
    if (article instanceof HTMLElement) {
      setAssetBase(article.dataset.contentAssets);
    }
  }, [explicitAssetBase]);
  const resolvedImages = useMemo(
    () =>
      images.map((image) => ({
        ...image,
        src: resolveImageSrc(image.src, assetDir, assetBase),
      })),
    [assetBase, assetDir, images],
  );

  if (!images.length) return null;

  return (
    <>
      <div
        ref={containerRef}
        className="not-prose relative left-1/2 w-fit min-w-full max-w-[calc(100vw-64px)] -translate-x-1/2 overflow-x-auto overscroll-x-contain"
        aria-label="Image list"
      >
        <div className="flex w-max min-w-full items-start gap-3">
          {resolvedImages.map((image, index) => (
            <figure
              className="group m-0 min-w-0"
              key={`${image.title ?? image.src}-${image.src}`}
            >
              <button
                className="block cursor-zoom-in appearance-none overflow-hidden rounded border border-black/10 bg-white/40 p-1 transition-colors duration-200 group-hover:border-accent group-hover:bg-accent/10 dark:border-white/10 dark:bg-white/[0.04] dark:group-hover:border-accent dark:group-hover:bg-accent/15"
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <img
                  {...imageProps}
                  alt={image.alt ?? image.title ?? ""}
                  className="m-0 h-[180px] w-auto max-w-[280px] rounded-sm object-contain"
                  loading={imageProps?.loading ?? "lazy"}
                  src={image.src}
                />
              </button>
              {image.title && (
                <figcaption className="px-3 py-2 text-center font-sans text-sm font-medium text-black/70 transition-colors duration-200 group-hover:text-accent dark:text-white/75 dark:group-hover:text-accent">
                  {image.title}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      <Lightbox
        className="image-list-lightbox"
        close={() => setActiveIndex(-1)}
        index={activeIndex}
        noScroll={{ disabled: true }}
        open={activeIndex >= 0}
        plugins={[Zoom]}
        slides={resolvedImages.map((image) => ({
          src: image.src,
          alt: image.alt ?? image.title,
          title: image.title,
        }))}
        styles={{
          button: {
            "--yarl__button_filter": "none",
            "--yarl__button_padding": "0",
          },
          container: {
            "--yarl__container_background_color": "rgba(28, 25, 23, 0.92)",
          },
          icon: {
            "--yarl__icon_size": "22px",
          },
          navigationNext: {
            "--yarl__navigation_button_padding": "0",
          },
          navigationPrev: {
            "--yarl__navigation_button_padding": "0",
          },
          toolbar: {
            "--yarl__toolbar_padding": "16px",
          },
        }}
      />
    </>
  );
}
