
// Fix: Import React to resolve the 'React' namespace error for React.ReactNode
import React from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  image: string;
  stockStatus: 'disponible' | 'bajo' | 'agotado';
  weight: string;
}

export interface OrderRequest {
  id: string;
  date: string;
  status: 'pendiente' | 'aprobado' | 'en_camino' | 'entregado';
  items: number;
  totalWeight: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}
