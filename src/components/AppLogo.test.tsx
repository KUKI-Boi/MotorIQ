import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppLogo } from './AppLogo';

describe('AppLogo', () => {
  it('renders correctly', () => {
    render(<AppLogo />);
    const logoText = screen.getByText(/Motor/i);
    expect(logoText).toBeInTheDocument();
    const logoImg = screen.getByAltText('MotorIQ Logo');
    expect(logoImg).toBeInTheDocument();
  });
});
