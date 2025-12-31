import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from '../App';

test('Uygulama ana menü başlığı ile yükleniyor', () => {
  render(<App />);
  expect(screen.getByText(/AI Dedektif Oyun Dünyası/i)).toBeInTheDocument();
});

test('İsim yazılmadan başla butonuna basıldığında uyarı çıkıyor', () => {
  render(<App />);
  window.alert = vi.fn(); // Alert fonksiyonunu takip et
  const startButton = screen.getByText(/Klasik Mod/i);
  fireEvent.click(startButton);
  expect(window.alert).toHaveBeenCalledWith("Lütfen oyuna başlamak için isminizi giriniz!");
});