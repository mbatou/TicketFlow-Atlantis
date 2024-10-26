import React from 'react';
import { TicketCategory, TicketType } from '../../types/ticket';
import { 
  PenTool, 
  Palette, 
  Share2, 
  Target, 
  Search, 
  Code, 
  Mail, 
  PieChart,
  Briefcase,
  Globe,
  Video,
  BarChart2,
  ClipboardList
} from 'lucide-react';

const categoryConfig: Record<TicketCategory, { 
  label: string; 
  className: string;
  icon: React.ReactElement;
}> = {
  content_creation: {
    label: 'Contenu',
    className: 'bg-blue-100 text-blue-800',
    icon: <PenTool className="h-3 w-3" />,
  },
  graphic_design: {
    label: 'Design',
    className: 'bg-purple-100 text-purple-800',
    icon: <Palette className="h-3 w-3" />,
  },
  social_media: {
    label: 'Social',
    className: 'bg-pink-100 text-pink-800',
    icon: <Share2 className="h-3 w-3" />,
  },
  digital_advertising: {
    label: 'Pub',
    className: 'bg-red-100 text-red-800',
    icon: <Target className="h-3 w-3" />,
  },
  seo: {
    label: 'SEO',
    className: 'bg-green-100 text-green-800',
    icon: <Search className="h-3 w-3" />,
  },
  web_development: {
    label: 'Web',
    className: 'bg-indigo-100 text-indigo-800',
    icon: <Code className="h-3 w-3" />,
  },
  email_marketing: {
    label: 'Email',
    className: 'bg-yellow-100 text-yellow-800',
    icon: <Mail className="h-3 w-3" />,
  },
  market_research: {
    label: 'Recherche',
    className: 'bg-cyan-100 text-cyan-800',
    icon: <PieChart className="h-3 w-3" />,
  },
  brand_strategy: {
    label: 'Marque',
    className: 'bg-orange-100 text-orange-800',
    icon: <Briefcase className="h-3 w-3" />,
  },
  pr_outreach: {
    label: 'PR',
    className: 'bg-teal-100 text-teal-800',
    icon: <Globe className="h-3 w-3" />,
  },
  video_production: {
    label: 'Vidéo',
    className: 'bg-rose-100 text-rose-800',
    icon: <Video className="h-3 w-3" />,
  },
  data_analysis: {
    label: 'Data',
    className: 'bg-lime-100 text-lime-800',
    icon: <BarChart2 className="h-3 w-3" />,
  },
  project_management: {
    label: 'Projet',
    className: 'bg-gray-100 text-gray-800',
    icon: <ClipboardList className="h-3 w-3" />,
  },
};

interface TicketCategoryBadgeProps {
  category: TicketCategory;
  type: TicketType[TicketCategory];
}

export default function TicketCategoryBadge({ category, type }: TicketCategoryBadgeProps) {
  const config = categoryConfig[category];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.icon}
      {config.label}
    </span>
  );
}