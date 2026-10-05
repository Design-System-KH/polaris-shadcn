import { useState } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  within,
  cleanup,
  userEvent,
} from '@repo/testing/render';
import {
  Checkbox,
  ChoiceList,
  Combobox,
  DataTable,
  IndexTable,
  Modal,
  Tabs,
  Button,
  DatePicker,
  DropZone,
  ScrollLock,
  Portal,
  KeypressListener,
} from '../../index';

afterEach(cleanup);
describe('Component interactions', () => {
  it('changes a checkbox and reports group values', async () => {
    const user = userEvent.setup();
    const checkboxChanged = vi.fn(),
      groupChanged = vi.fn();
    render(
      <>
        <Checkbox label="Taxable" onChange={checkboxChanged} />
        <ChoiceList
          label="Channels"
          choices={[
            { label: 'Online', value: 'online' },
            { label: 'Retail', value: 'retail' },
          ]}
          allowMultiple
          onChange={groupChanged}
        />
      </>,
    );
    await user.click(screen.getByRole('checkbox', { name: 'Taxable' }));
    expect(checkboxChanged).toHaveBeenCalledWith(true);
    await user.click(screen.getByRole('checkbox', { name: 'Online' }));
    await user.click(screen.getByRole('checkbox', { name: 'Retail' }));
    expect(groupChanged).toHaveBeenLastCalledWith(['online', 'retail']);
  });
  it('filters combobox options, skips disabled choices, and selects with the keyboard', async () => {
    const user = userEvent.setup(),
      select = vi.fn();
    render(
      <Combobox
        label="Vendor"
        options={[
          { value: 'blocked', label: 'Apple', disabled: true },
          { value: 'active', label: 'Apricot' },
          { value: 'other', label: 'Banana' },
        ]}
        onSelect={select}
      />,
    );
    const input = screen.getByRole('combobox');
    await user.type(input, 'Ap');
    expect(
      screen.queryByRole('option', { name: 'Banana' }),
    ).not.toBeInTheDocument();
    await user.keyboard('{ArrowDown}{Enter}');
    expect(select).toHaveBeenCalledWith('active');
    expect(input).toHaveValue('Apricot');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });
  it('moves tab focus and selection with arrow keys', async () => {
    const user = userEvent.setup();
    render(
      <Tabs
        tabs={[
          { id: 'one', content: 'All' },
          { id: 'two', content: 'Unavailable', disabled: true },
          { id: 'three', content: 'Active' },
        ]}
      >
        <p>Products</p>
      </Tabs>,
    );
    screen.getByRole('tab', { name: 'All' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Active' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Active' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Active');
  });
  it('sorts numeric table data in both directions', async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        headings={['Product', 'Price']}
        rows={[
          ['Hoodie', 49],
          ['Tote', 25],
        ]}
        sortable={[false, true]}
        columnContentTypes={['text', 'numeric']}
      />,
    );
    const rowNames = () =>
      screen
        .getAllByRole('row')
        .slice(1)
        .map((row) => within(row).getAllByRole('cell')[0]?.textContent);
    expect(rowNames()).toEqual(['Hoodie', 'Tote']);
    await user.click(screen.getByRole('button', { name: /Price/ }));
    expect(rowNames()).toEqual(['Tote', 'Hoodie']);
    await user.click(screen.getByRole('button', { name: /Price/ }));
    expect(rowNames()).toEqual(['Hoodie', 'Tote']);
  });
  it('selects all table rows and then deselects one', async () => {
    const user = userEvent.setup();
    function Table() {
      const [selected, change] = useState<string[]>([]);
      return (
        <IndexTable
          headings={[{ title: 'Product' }]}
          selectable
          selectedItems={selected}
          onSelectionChange={change}
          items={[
            { id: 'hoodie', content: 'Hoodie' },
            { id: 'tote', content: 'Tote' },
          ]}
        />
      );
    }
    render(<Table />);
    await user.click(
      screen.getByRole('checkbox', { name: 'Select all items' }),
    );
    expect(
      screen.getByRole('checkbox', { name: 'Select hoodie' }),
    ).toBeChecked();
    await user.click(screen.getByRole('checkbox', { name: 'Select hoodie' }));
    expect(
      screen.getByRole('checkbox', { name: 'Select all items' }),
    ).toBePartiallyChecked();
    expect(screen.getByRole('checkbox', { name: 'Select tote' })).toBeChecked();
  });
  it('opens a modal, confines tab navigation, closes on Escape, and restores focus', async () => {
    const user = userEvent.setup();
    render(
      <Modal title="Edit product" activator={<Button>Open editor</Button>}>
        <Button>Save product</Button>
      </Modal>,
    );
    const trigger = screen.getByRole('button', { name: 'Open editor' });
    await user.click(trigger);
    expect(
      screen.getByRole('dialog', { name: 'Edit product' }),
    ).toBeInTheDocument();
    await user.tab();
    await user.tab();
    expect(screen.getByRole('dialog')).toContainElement(
      document.activeElement as HTMLElement,
    );
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  it('rejects files outside the accepted types', () => {
    const drop = vi.fn();
    render(<DropZone label="Product images" accept="image/*" onDrop={drop} />);
    const image = new File(['image'], 'hoodie.png', { type: 'image/png' }),
      rejected = new File(['pdf'], 'document.pdf', { type: 'application/pdf' });
    fireEvent.change(screen.getByLabelText('Product images'), {
      target: { files: [image, rejected] },
    });
    expect(drop).toHaveBeenCalledWith([image, rejected], [image], [rejected]);
  });
  it('selects a chronological date range', async () => {
    const user = userEvent.setup(),
      change = vi.fn();
    render(<DatePicker month={9} year={2026} allowRange onChange={change} />);
    await user.click(
      screen.getByRole('button', { name: 'Saturday, October 10, 2026' }),
    );
    await user.click(
      screen.getByRole('button', { name: 'Monday, October 5, 2026' }),
    );
    expect(change).toHaveBeenLastCalledWith({
      start: new Date(2026, 9, 5),
      end: new Date(2026, 9, 10),
    });
  });
  it('keeps scrolling locked until the last lock unmounts', () => {
    const original = document.body.style.overflow;
    const first = render(<ScrollLock />),
      second = render(<ScrollLock />);
    expect(document.body.style.overflow).toBe('hidden');
    first.unmount();
    expect(document.body.style.overflow).toBe('hidden');
    second.unmount();
    expect(document.body.style.overflow).toBe(original);
  });
  it('renders portals in a managed target and removes them on unmount', () => {
    const target = document.createElement('div');
    document.body.append(target);
    const result = render(<Portal container={target}>Portal content</Portal>);
    expect(target).toHaveTextContent('Portal content');
    result.unmount();
    expect(target).toBeEmptyDOMElement();
    target.remove();
  });
  it('runs shortcuts outside inputs and cleans up the listener', () => {
    const handler = vi.fn();
    const result = render(
      <>
        <KeypressListener keyName="k" handler={handler} />
        <input aria-label="Search" />
      </>,
    );
    fireEvent.keyDown(window, { key: 'k' });
    expect(handler).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'k' });
    expect(handler).toHaveBeenCalledTimes(1);
    result.unmount();
    fireEvent.keyDown(window, { key: 'k' });
    expect(handler).toHaveBeenCalledTimes(1);
  });
  it('renders an asChild button as a styled link without an extra button', () => {
    render(
      <Button asChild variant="primary">
        <a href="/products">Products</a>
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute(
      'href',
      '/products',
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('Polaris-Button');
  });
});
