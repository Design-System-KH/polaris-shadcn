import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@repo/testing/render';
import { DetailsPage } from './details-page';

describe('Details page', () => {
  it('saves edits and discards subsequent changes back to the saved product', () => {
    render(<DetailsPage />);
    const title = screen.getByRole('textbox', { name: 'Title' });
    fireEvent.change(title, { target: { value: 'Trail hoodie' } });
    expect(screen.getByText('Unsaved changes')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /^Save$/ }));
    expect(screen.getByRole('status')).toHaveTextContent('Changes saved');
    fireEvent.change(title, { target: { value: 'Another title' } });
    fireEvent.click(screen.getByRole('button', { name: 'Discard' }));
    expect(title).toHaveValue('Trail hoodie');
    expect(screen.queryByText('Unsaved changes')).not.toBeInTheDocument();
  });
  it('associates title errors with the actual input and prevents saving a blank title', () => {
    render(<DetailsPage />);
    const title = screen.getByRole('textbox', { name: 'Title' });
    fireEvent.change(title, { target: { value: '' } });
    expect(title).toHaveAttribute('aria-invalid', 'true');
    expect(title).toHaveAccessibleDescription('Title is required');
    fireEvent.click(screen.getByRole('button', { name: /^Save$/ }));
    expect(screen.getByRole('status')).toHaveTextContent(
      'Enter a product title before saving.',
    );
    expect(screen.getByText('Unsaved changes')).toBeInTheDocument();
  });
});
