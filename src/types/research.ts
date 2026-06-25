export interface NormalizedAnalyst {
  id: string;
  name: string;
  title?: string;
}

export interface NormalizedReport {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  summary: string;
  synopsis: string;
  analysts: NormalizedAnalyst[];
  tags: string[];
  documentType: string;
  isFallback: boolean;
  downloadAvailable: boolean;
  file_url?: string;
}
