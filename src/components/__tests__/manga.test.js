import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import MangaCard from '../MangaCard/MangaCard'; 

test('renders manga card with title and image', () => {
  const image = 'https://example.com/manga.jpg';
  const title = 'manga-title';
  const { getByTestId } = render(
    <MangaCard image={image} title={title} />
  );
  const titleElement = getByTestId(title);
  expect(titleElement).toBeDefined();
});
