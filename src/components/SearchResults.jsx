import React from 'react';
import { Cart } from './Card'; // Предполагаем, что компонент Cart уже создан

export const SearchResults = ({ results }) => (
  <div className="results-container">
    {results.map((result) => (
      <Cart key={result.id} title={result.title} description={result.description} />
    ))}
  </div>
);

