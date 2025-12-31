import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ShootGame from '../components/ShootGame';

const mockData = [{ id: "1a", url: "test.jpg", isAi: true }];

test('Shooter modunda canlar ve skor tablosu mevcut', () => {
  render(<ShootGame data={mockData} username="Mehmet" onFinish={() => {}} />);
  expect(screen.getByText(/Can:/i)).toBeInTheDocument();
  expect(screen.getByText(/Skor:/i)).toBeInTheDocument();
});