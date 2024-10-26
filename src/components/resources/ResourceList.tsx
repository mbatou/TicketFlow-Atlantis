import React from 'react';
import { Download, Edit2, Trash2, FileText, Image, Video, File } from 'lucide-react';
import { useResources } from '../../context/ResourceContext';
import { useAuth } from '../../context/AuthContext';
import { Resource, ResourceCategory } from '../../types/resource';
import { formatFileSize } from '../../utils/formatters';

interface ResourceListProps {
  brandId: string | null;
  searchQuery: string;
  categoryFilter: ResourceCategory | 'all';
}

export default function ResourceList({ brandId, searchQuery, categoryFilter }: ResourceListProps) {
  const { resources, downloadResource, deleteResource } = useResources();
  const { user } = useAuth();

  const canModify = user?.role === 'admin' || user?.role === 'super_admin';

  const filteredResources = resources.filter(resource => {
    if (brandId && resource.brandId !== brandId) return false;
    if (categoryFilter !== 'all' && resource.category !== categoryFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const getFileIcon = (fileType: Resource['fileType']) => {
    if (['jpg', 'jpeg', 'png', 'svg'].includes(fileType)) return <Image className="h-6 w-6" />;
    if (['mp4', 'mov', 'avi'].includes(fileType)) return <Video className="h-6 w-6" />;
    if (['pdf', 'doc', 'docx'].includes(fileType)) return <FileText className="h-6 w-6" />;
    return <File className="h-6 w-6" />;
  };

  if (!brandId) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-gray-500">
          Veuillez sélectionner une marque pour voir ses ressources
        </p>
      </div>
    );
  }

  if (filteredResources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-gray-500">
          Aucune ressource trouvée
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {filteredResources.map((resource) => (
          <li key={resource.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getFileIcon(resource.fileType)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {resource.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {resource.description}
                </p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <span>{formatFileSize(resource.fileSize)}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(resource.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => downloadResource(resource.id)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                  title="Télécharger"
                >
                  <Download className="h-5 w-5" />
                </button>
                {canModify && (
                  <>
                    <button
                      onClick={() => {/* Handle edit */}}
                      className="p-2 text-gray-400 hover:text-gray-500"
                      title="Modifier"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteResource(resource.id)}
                      className="p-2 text-red-400 hover:text-red-500"
                      title="Supprimer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}