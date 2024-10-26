import React from 'react';
import { Building2 } from 'lucide-react';
import { useBrands } from '../../context/BrandContext';

interface BrandSelectorProps {
  selectedBrand: string | null;
  onSelectBrand: (brandId: string | null) => void;
}

export default function BrandSelector({ selectedBrand, onSelectBrand }: BrandSelectorProps) {
  const { brands } = useBrands();

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Building2 className="h-5 w-5 text-gray-400" />
      </div>
      <select
        value={selectedBrand || ''}
        onChange={(e) => onSelectBrand(e.target.value || null)}
        className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Sélectionner une marque</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  );
}