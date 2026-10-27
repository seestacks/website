import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocLayout } from "@/components/docs/doc-layout";
import { docs, getDoc } from "@/content/docs";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${doc.slug}` },
  };
}

export default async function DocPage({ params }: { params: Params }) {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) notFound();

  return <DocLayout doc={doc} />;
}
