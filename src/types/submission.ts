export type SubmissionStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export interface Submission {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  documentType: DocumentType;
  brandId: string;
  status: SubmissionStatus;
  submittedBy: string;
  createdAt: string;
  deadline?: string;
  feedback?: Feedback[];
  links?: SubmissionLink[];
}

export interface SubmissionLink {
  id: string;
  url: string;
  title: string;
}

export type DocumentType = 'report' | 'graphic' | 'presentation' | 'document' | 'other';

export interface Feedback {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
}

export const submissionStatuses: Record<SubmissionStatus, {
  label: string;
  bgColor: string;
  color: string;
}> = {
  pending: {
    label: 'En attente',
    bgColor: 'bg-yellow-100',
    color: 'text-yellow-800'
  },
  in_review: {
    label: 'En cours de révision',
    bgColor: 'bg-blue-100',
    color: 'text-blue-800'
  },
  approved: {
    label: 'Approuvé',
    bgColor: 'bg-green-100',
    color: 'text-green-800'
  },
  rejected: {
    label: 'Rejeté',
    bgColor: 'bg-red-100',
    color: 'text-red-800'
  }
};

export const documentTypes: Record<DocumentType, string> = {
  report: 'Rapport',
  graphic: 'Graphique',
  presentation: 'Présentation',
  document: 'Document',
  other: 'Autre'
};