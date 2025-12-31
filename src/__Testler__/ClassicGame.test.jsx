import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ClassicGame from '../components/ClassicGame';

const mockData = [{
  id: 1,
  images: [
    { id: "1a", url: "/img/AI/a1.jpg", isAi: true },
    { id: "1b", url: "/img/REEL/r1.jpg", isAi: false }
  ],
  hint: "Test ipucu"
}];

test('Klasik modda 2 adet görsel render ediliyor', () => {
  render(<ClassicGame data={mockData} username="Ahmet" onFinish={() => {}} />);
  const images = screen.getAllByAltText(/Seçenek/i);
  expect(images).toHaveLength(2);
});