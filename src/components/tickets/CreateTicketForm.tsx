import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useTickets } from '../../context/TicketContext';
import { useBrands } from '../../context/BrandContext';
import { useAuth } from '../../context/AuthContext';
import { TicketPriority, TicketStatus, TicketCategory, TicketType } from '../../types/ticket';

interface CreateTicketFormProps {
  onClose: () => void;
}

export default function CreateTicketForm({ onClose }: CreateTicketFormProps) {
  const { createTicket } = useTickets();
  const { brands } = useBrands();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('moyenne');
  const [status, setStatus] = useState<TicketStatus>('nouveau');
  const [category, setCategory] = useState<TicketCategory>('content_creation');
  const [type, setType] = useState('blog_post');
  const [brandId, setBrandId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim() || !brandId) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    createTicket({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      category,
      type: type as TicketType[TicketCategory],
      brandId,
      assignedTo: null,
      attachments: [],
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
          Marque *
        </label>
        <select
          id="brand"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        >
          <option value="">Sélectionner une marque</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre *
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Catégorie
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              const newCategory = e.target.value as TicketCategory;
              setCategory(newCategory);
              // Reset type to first option of new category
              setType(Object.keys(typeOptions[newCategory])[0]);
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="content_creation">Création de Contenu</option>
            <option value="graphic_design">Design Graphique</option>
            <option value="social_media">Médias Sociaux</option>
            <option value="digital_advertising">Publicité Digitale</option>
            <option value="seo">SEO</option>
            <option value="web_development">Développement Web</option>
            <option value="email_marketing">Email Marketing</option>
            <option value="market_research">Étude de Marché</option>
            <option value="brand_strategy">Stratégie de Marque</option>
            <option value="pr_outreach">Relations Publiques</option>
            <option value="video_production">Production Vidéo</option>
            <option value="data_analysis">Analyse de Données</option>
            <option value="project_management">Gestion de Projet</option>
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            {Object.entries(typeOptions[category]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priorité
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Statut
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TicketStatus)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="nouveau">Nouveau</option>
            <option value="en_cours">En cours</option>
            <option value="en_revue">En revue</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Créer
        </button>
      </div>
    </form>
  );
}

const typeOptions = {
  content_creation: {
    blog_post: 'Article de Blog',
    social_media_content: 'Contenu Réseaux Sociaux',
    email_content: 'Contenu Email',
    infographic: 'Infographie',
    ad_copy: 'Texte Publicitaire',
    product_description: 'Description Produit',
    case_study: 'Étude de Cas',
    landing_page: 'Page de Destination',
    ebook: 'E-book',
  },
  graphic_design: {
    logo_design: 'Design de Logo',
    banner_ads: 'Bannières Publicitaires',
    social_media_graphics: 'Visuels Réseaux Sociaux',
    presentation: 'Présentation',
    brochure: 'Brochure',
    website_graphics: 'Graphiques Web',
    print_design: 'Design Print',
    video_thumbnails: 'Miniatures Vidéo',
  },
  social_media: {
    content_calendar: 'Calendrier de Contenu',
    scheduling: 'Planification',
    community_engagement: 'Engagement Communautaire',
    influencer_collab: 'Collaboration Influenceurs',
    reporting: 'Reporting',
    growth_strategy: 'Stratégie de Croissance',
    audit: 'Audit',
  },
  digital_advertising: {
    search_ads: 'Publicités Search',
    social_ads: 'Publicités Social Media',
    display_ads: 'Publicités Display',
    ad_creative: 'Créatifs Publicitaires',
    ab_testing: 'Tests A/B',
    optimization: 'Optimisation',
    performance_analysis: 'Analyse de Performance',
  },
  seo: {
    keyword_research: 'Recherche de Mots-clés',
    onpage_optimization: 'Optimisation On-page',
    link_building: 'Link Building',
    content_optimization: 'Optimisation de Contenu',
    technical_audit: 'Audit Technique',
    competitor_analysis: 'Analyse Concurrentielle',
    local_seo: 'SEO Local',
  },
  web_development: {
    website_design: 'Design de Site Web',
    landing_page: 'Page de Destination',
    maintenance: 'Maintenance',
    ecommerce: 'E-commerce',
    speed_optimization: 'Optimisation de Vitesse',
    custom_code: 'Code Personnalisé',
    seo_structure: 'Structure SEO',
  },
  email_marketing: {
    newsletter: 'Newsletter',
    drip_campaign: 'Campagne Drip',
    automation: 'Automatisation',
    lead_nurturing: 'Nurturing de Leads',
    email_design: 'Design Email',
    segmentation: 'Segmentation',
    ab_testing: 'Tests A/B',
    reporting: 'Reporting',
  },
  market_research: {
    competitor_analysis: 'Analyse Concurrentielle',
    persona_development: 'Développement de Personas',
    trend_report: 'Rapport de Tendances',
    social_listening: 'Social Listening',
    audience_analysis: "Analyse d'Audience",
    brand_positioning: 'Positionnement de Marque',
    survey_analysis: "Analyse d'Enquêtes",
  },
  brand_strategy: {
    identity_development: "Développement d'Identité",
    market_analysis: 'Analyse de Marché',
    messaging_guidelines: 'Guidelines de Message',
    campaign_strategy: 'Stratégie de Campagne',
    rebranding: 'Rebranding',
    brand_audit: 'Audit de Marque',
  },
  pr_outreach: {
    press_release: 'Communiqué de Presse',
    media_outreach: 'Relations Médias',
    event_promotion: "Promotion d'Événements",
    influencer_management: "Gestion d'Influenceurs",
    press_kit: 'Kit Presse',
    crisis_communication: 'Communication de Crise',
  },
  video_production: {
    script_writing: 'Écriture de Script',
    video_editing: 'Montage Vidéo',
    animation: 'Animation',
    video_ads: 'Publicités Vidéo',
    webinar_production: 'Production de Webinaire',
    podcast_editing: 'Édition de Podcast',
    storyboarding: 'Storyboarding',
  },
  data_analysis: {
    performance_analysis: 'Analyse de Performance',
    kpi_dashboard: 'Dashboard KPI',
    conversion_analysis: 'Analyse de Conversion',
    roi_analysis: 'Analyse ROI',
    traffic_analytics: 'Analytique de Trafic',
    segmentation: 'Segmentation',
    funnel_analysis: 'Analyse de Funnel',
  },
  project_management: {
    campaign_planning: 'Planification de Campagne',
    milestone_tracking: 'Suivi de Jalons',
    resource_allocation: 'Allocation de Ressources',
    team_coordination: "Coordination d'Équipe",
    post_mortem: 'Post-Mortem',
    client_meetings: 'Réunions Client',
    budget_management: 'Gestion de Budget',
  },
};