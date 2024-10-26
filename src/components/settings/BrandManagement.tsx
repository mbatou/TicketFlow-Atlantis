import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Globe, Phone, Mail } from 'lucide-react';
import { useBrands } from '../../context/BrandContext';
import { sectors } from '../../types/brand';
import Modal from '../shared/Modal';

export default function BrandManagement() {
  const { brands, addBrand, updateBrand, deleteBrand } = useBrands();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    sector: sectors[0].id,
    website: '',
    description: '',
    primaryContact: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBrand) {
      updateBrand(editingBrand, formData);
      setEditingBrand(null);
    } else {
      addBrand(formData);
    }
    setFormData({
      name: '',
      sector: sectors[0].id,
      website: '',
      description: '',
      primaryContact: {
        name: '',
        email: '',
        phone: '',
      },
    });
    setIsAddModalOpen(false);
  };

  const handleEdit = (brandId: string) => {
    const brand = brands.find(b => b.id === brandId);
    if (brand) {
      setFormData({
        name: brand.name,
        sector: brand.sector,
        website: brand.website,
        description: brand.description,
        primaryContact: { ...brand.primaryContact },
      });
      setEditingBrand(brandId);
      setIsAddModalOpen(true);
    }
  };

  const handleDelete = (brandId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette marque ?')) {
      deleteBrand(brandId);
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une marque..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Ajouter une marque
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {filteredBrands.map((brand) => (
            <li key={brand.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{brand.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{brand.description}</p>
                    </div>
                    <div className="ml-4 flex items-center space-x-4">
                      <button
                        onClick={() => handleEdit(brand.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      {brand.website}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {brand.primaryContact.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {brand.primaryContact.phone}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingBrand(null);
          setFormData({
            name: '',
            sector: sectors[0].id,
            website: '',
            description: '',
            primaryContact: {
              name: '',
              email: '',
              phone: '',
            },
          });
        }}
        title={editingBrand ? "Modifier la marque" : "Ajouter une marque"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom de la marque
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
              Secteur
            </label>
            <select
              id="sector"
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Site web
            </label>
            <input
              type="text"
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Contact Principal</h4>
            
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="contact-name"
                value={formData.primaryContact.name}
                onChange={(e) => setFormData({
                  ...formData,
                  primaryContact: { ...formData.primaryContact, name: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                value={formData.primaryContact.email}
                onChange={(e) => setFormData({
                  ...formData,
                  primaryContact: { ...formData.primaryContact, email: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                id="contact-phone"
                value={formData.primaryContact.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  primaryContact: { ...formData.primaryContact, phone: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingBrand(null);
              }}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {editingBrand ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}