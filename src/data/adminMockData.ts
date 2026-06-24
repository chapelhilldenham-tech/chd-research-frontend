export type AdminReportStatus = 'needs_review' | 'approved' | 'needs_rework' | 'internal';

export interface AdminReportDraft {
  id: string;
  title: string;
  category: string;
  documentType: string;
  analyst: string;
  reportDate: string;
  reviewStatus: AdminReportStatus;
  publishStatus: 'internal' | 'review' | 'draft';
  visibility: 'internal' | 'subscriber' | 'public';
  fileUploadStatus: 'pending_manual_upload' | 'uploaded' | 'missing';
  summary: string;
  tags: string[];
}

export const adminReportDrafts: AdminReportDraft[] = [
  {
    id: 'legacy-review-001',
    title: 'Legacy Equity Research Metadata Review',
    category: 'Equity Research',
    documentType: 'Research report',
    analyst: 'House View',
    reportDate: 'Pending review',
    reviewStatus: 'needs_review',
    publishStatus: 'internal',
    visibility: 'internal',
    fileUploadStatus: 'pending_manual_upload',
    summary: 'Placeholder staging record for validating the admin review workflow before importing legacy reports.',
    tags: ['legacy import', 'metadata review'],
  },
  {
    id: 'legacy-review-002',
    title: 'Market Strategy Import Candidate',
    category: 'Strategy',
    documentType: 'Market commentary',
    analyst: 'House View',
    reportDate: 'Pending review',
    reviewStatus: 'needs_rework',
    publishStatus: 'review',
    visibility: 'internal',
    fileUploadStatus: 'pending_manual_upload',
    summary: 'Placeholder record showing a report that needs title, date, category, and file upload review.',
    tags: ['strategy', 'needs metadata'],
  },
  {
    id: 'legacy-review-003',
    title: 'Fixed Income Staging Record',
    category: 'Fixed Income',
    documentType: 'Reference note',
    analyst: 'House View',
    reportDate: 'Pending review',
    reviewStatus: 'approved',
    publishStatus: 'internal',
    visibility: 'internal',
    fileUploadStatus: 'missing',
    summary: 'Placeholder record for approved metadata that still requires manual file upload before release decisions.',
    tags: ['fixed income', 'manual upload'],
  },
];

export const adminMarketFields = {
  macro: ['GDP (%)', 'GDP Change', 'Inflation (%)', 'Inflation Change', 'MPR (%)', 'USD/NGN', 'Debt/GDP (%)'],
  ngx: ['NGX ASI', 'Change', '% Change', 'Market Cap', 'Volume'],
  yields: ['91D', '182D', '364D', '2YR', '5YR', '10YR'],
  paramount: ['Index Value', '1D', '1W', '1M', 'YTD', 'Methodology'],
  sectors: ['Banking', 'Consumer Goods', 'Industrial Goods', 'Oil & Gas', 'Telecommunications'],
};
