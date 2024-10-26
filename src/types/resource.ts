export type ResourceCategory = 
  | 'documentation'
  | 'visuals'
  | 'brand_guidelines'
  | 'presentations'
  | 'social_media'
  | 'videos'
  | 'reports'
  | 'templates';

export type ResourceFileType = 
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'xls'
  | 'xlsx'
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'svg'
  | 'mp4'
  | 'mov'
  | 'avi';

export interface Resource {
  id: string;
  brandId: string;
  title: string;
  description: string;
  category: ResourceCategory;
  fileType: ResourceFileType;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  lastAccessedBy?: string;
  lastAccessedAt?: string;
}

export interface ResourceActivity {
  id: string;
  resourceId: string;
  brandId: string;
  action: 'upload' | 'update' | 'delete' | 'download';
  performedBy: string;
  timestamp: string;
  details?: string;
}

export const resourceCategories: { id: ResourceCategory; label: string }[] = [
  { id: 'documentation', label: 'Documentation' },
  { id: 'visuals', label: 'Visuels' },
  { id: 'brand_guidelines', label: 'Guide de Marque' },
  { id: 'presentations', label: 'Présentations' },
  { id: 'social_media', label: 'Réseaux Sociaux' },
  { id: 'videos', label: 'Vidéos' },
  { id: 'reports', label: 'Rapports' },
  { id: 'templates', label: 'Templates' },
];