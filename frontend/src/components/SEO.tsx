import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  page?: string;
  image?: string;
  noIndex?: boolean;
};

export default function SEO({
  title,
  description,
  keywords = "electronics, gadgets, online store, mobile accessories, Electro Mart",
  page = "",
  image = "https://yourdomain.com/preview.jpg",
  noIndex = false,
}: SEOProps) {
  const cleanPage = page?.replace(/^\/+/, "") || "";
  const url = `${window.location.origin}/${cleanPage}`;
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Robots */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph (Facebook, WhatsApp) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
