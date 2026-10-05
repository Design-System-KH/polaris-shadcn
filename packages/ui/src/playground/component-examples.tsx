import { useState, useRef, type ReactNode } from 'react';
import * as UI from '../index';
import type { Meta } from '@storybook/react-vite';

export type ExampleState =
  | 'default'
  | 'disabled'
  | 'error'
  | 'empty'
  | 'filtered'
  | 'loading'
  | 'overflow';
export interface ComponentExampleProps {
  name: string;
  state?: ExampleState;
}
const choices = [
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived', disabled: true },
];
const productRows = [
  ['Trail Hoodie', 'Active', 49],
  ['Canvas Tote', 'Draft', 25],
  ['Merino Socks', 'Active', 18],
];
const defaultTabs = [
  { id: 'all', content: 'All', badge: '12' },
  { id: 'active', content: 'Active', badge: '8' },
  { id: 'draft', content: 'Draft', badge: '4' },
];

export function ComponentExample({
  name,
  state = 'default',
}: ComponentExampleProps) {
  const [value, setValue] = useState(''),
    [checked, setChecked] = useState(false),
    [selected, setSelected] = useState<string[]>([]),
    [number, setNumber] = useState(30),
    [tab, setTab] = useState(0),
    [open, setOpen] = useState(false),
    [message, setMessage] = useState(''),
    [date, setDate] = useState<{ start: Date; end: Date }>(),
    [color, setColor] = useState('#008060');
  const anchor = useRef<HTMLButtonElement>(null);
  const disabled = state === 'disabled',
    error = state === 'error' ? 'Choose a value to continue.' : undefined;
  const field = {
    label: 'Product status',
    helpText: 'Controls where this product is available.',
    disabled,
    error,
  };
  const controlOptions = state === 'empty' ? [] : choices;
  const status = message && (
    <p role="status" style={{ marginTop: 16 }}>
      {message}
    </p>
  );
  const content = (
    <UI.Card>
      <UI.Text as="h2" variant="headingSm">
        Product information
      </UI.Text>
      <p>Manage your catalog and keep your store up to date.</p>
    </UI.Card>
  );
  const notify = (text: string) => () => setMessage(text);
  let example: ReactNode;
  switch (name) {
    case 'Select':
      example = (
        <UI.Select
          {...field}
          options={controlOptions}
          placeholder="Select status"
          value={value}
          onChange={setValue}
        />
      );
      break;
    case 'Checkbox':
      example = (
        <UI.Checkbox
          {...field}
          label="Charge tax on this product"
          checked={state === 'loading' ? 'indeterminate' : checked}
          onChange={setChecked}
        />
      );
      break;
    case 'RadioButton':
      example = (
        <UI.ChoiceList
          {...field}
          choices={choices}
          selected={selected}
          onChange={setSelected}
        />
      );
      break;
    case 'ChoiceList':
      example = (
        <UI.ChoiceList
          {...field}
          choices={choices}
          selected={selected}
          onChange={setSelected}
          allowMultiple
        />
      );
      break;
    case 'RangeSlider':
      example = (
        <UI.RangeSlider
          {...field}
          label="Discount percentage"
          value={number}
          onChange={setNumber}
          suffix="%"
        />
      );
      break;
    case 'ColorPicker':
      example = (
        <UI.ColorPicker
          {...field}
          label="Brand color"
          color={color}
          onChange={setColor}
        />
      );
      break;
    case 'DatePicker':
      example = (
        <>
          <UI.DatePicker
            label="Availability dates"
            month={9}
            year={2026}
            selected={date}
            onChange={setDate}
            allowRange
            disabled={disabled}
          />
          {date && (
            <p role="status">
              {date.start.toLocaleDateString()} –{' '}
              {date.end.toLocaleDateString()}
            </p>
          )}
        </>
      );
      break;
    case 'DropZone':
      example = (
        <UI.DropZone
          label="Upload product images"
          accept="image/*"
          disabled={disabled}
          error={error}
          onDrop={(_, accepted, rejected) =>
            setMessage(
              `${accepted.length} files accepted, ${rejected.length} rejected`,
            )
          }
        />
      );
      break;
    case 'Combobox':
    case 'Autocomplete':
    case 'Picker': {
      const Component =
        name === 'Combobox'
          ? UI.Combobox
          : name === 'Picker'
            ? UI.Picker
            : UI.Autocomplete;
      example = (
        <Component
          {...field}
          options={controlOptions}
          value={value}
          onChange={setValue}
          selected={selected}
          onSelect={(choice) => {
            setSelected([choice]);
            setMessage(`Selected ${choice}`);
          }}
          loading={state === 'loading'}
          placeholder="Search statuses"
        />
      );
      break;
    }
    case 'Listbox':
      example = (
        <UI.Listbox
          options={controlOptions}
          selected={selected}
          onSelect={(value) => setSelected([value])}
          loading={state === 'loading'}
        />
      );
      break;
    case 'OptionList':
      example = (
        <UI.OptionList
          title="Product statuses"
          options={controlOptions}
          selected={selected}
          onChange={setSelected}
          allowMultiple
        />
      );
      break;
    case 'Filters':
    case 'LegacyFilters':
    case 'IndexFilters': {
      const Component =
        name === 'IndexFilters'
          ? UI.IndexFilters
          : name === 'LegacyFilters'
            ? UI.LegacyFilters
            : UI.Filters;
      example = (
        <Component
          queryValue={value}
          onQueryChange={setValue}
          queryPlaceholder="Search products"
          onClearAll={() => {
            setValue('');
            setChecked(false);
          }}
          filters={[
            {
              key: 'status',
              label: 'Status',
              filter: (
                <UI.Checkbox
                  label="Active products"
                  checked={checked}
                  onChange={setChecked}
                />
              ),
            },
          ]}
          appliedFilters={
            checked
              ? [
                  {
                    key: 'status',
                    label: 'Active',
                    onRemove: () => setChecked(false),
                  },
                ]
              : []
          }
        />
      );
      break;
    }
    case 'Modal':
      example = (
        <UI.Modal
          title="Delete product?"
          open={open}
          onClose={() => setOpen(false)}
          onOpenChange={setOpen}
          activator={<UI.Button>Open modal</UI.Button>}
          primaryAction={{
            content: 'Delete',
            destructive: true,
            onAction: () => {
              setOpen(false);
              setMessage('Product deleted');
            },
          }}
          secondaryActions={[
            { content: 'Cancel', onAction: () => setOpen(false) },
          ]}
        >
          <p>This action will remove the product from your catalog.</p>
        </UI.Modal>
      );
      break;
    case 'Sheet':
      example = (
        <UI.Sheet
          title="Product details"
          open={open}
          onClose={() => setOpen(false)}
          onOpenChange={setOpen}
          activator={<UI.Button>Open side panel</UI.Button>}
        >
          {content}
        </UI.Sheet>
      );
      break;
    case 'Popover':
      example = (
        <UI.Popover activator={<UI.Button>Product actions</UI.Button>}>
          <UI.ActionList
            items={[
              { content: 'Duplicate', onAction: notify('Product duplicated') },
              { content: 'Archive', onAction: notify('Product archived') },
            ]}
          />
        </UI.Popover>
      );
      break;
    case 'Tooltip':
      example = (
        <UI.Tooltip content="Save your changes before leaving this page">
          <UI.Button>Hover or focus me</UI.Button>
        </UI.Tooltip>
      );
      break;
    case 'Collapsible':
      example = (
        <>
          <UI.Button
            aria-expanded={open}
            aria-controls="product-extra"
            onClick={() => setOpen(!open)}
          >
            Toggle details
          </UI.Button>
          <UI.Collapsible open={open} id="product-extra">
            {content}
          </UI.Collapsible>
        </>
      );
      break;
    case 'Backdrop':
      example = (
        <>
          <UI.Button onClick={() => setOpen(true)}>Show backdrop</UI.Button>
          {open && <UI.Backdrop onDismiss={() => setOpen(false)} />}
        </>
      );
      break;
    case 'DataTable':
      example = (
        <UI.DataTable
          caption="Products"
          headings={['Product', 'Status', 'Price']}
          rows={['empty', 'filtered'].includes(state) ? [] : productRows}
          columnContentTypes={['text', 'text', 'numeric']}
          sortable={[true, true, true]}
          totals={['Total', '', 92]}
          loading={state === 'loading'}
          isFiltered={state === 'filtered'}
        />
      );
      break;
    case 'IndexTable': {
      const rows = ['empty', 'filtered'].includes(state) ? [] : productRows;
      example = (
        <UI.IndexTable
          headings={[
            { title: 'Product' },
            { title: 'Status' },
            { title: 'Price', alignment: 'end' },
          ]}
          itemCount={rows.length}
          itemIds={rows.map((row) => String(row[0]))}
          resourceName={{ singular: 'product', plural: 'products' }}
          selectable
          selectedItems={selected}
          onSelectionChange={setSelected}
          loading={state === 'loading'}
          isFiltered={state === 'filtered'}
        >
          {rows.length
            ? rows.map((row, i) => (
                <UI.IndexTable.Row id={String(row[0])} key={i} position={i}>
                  <UI.IndexTable.Cell>{row[0]}</UI.IndexTable.Cell>
                  <UI.IndexTable.Cell>
                    <UI.Badge tone="success">{row[1]}</UI.Badge>
                  </UI.IndexTable.Cell>
                  <UI.IndexTable.Cell numeric>${row[2]}</UI.IndexTable.Cell>
                </UI.IndexTable.Row>
              ))
            : undefined}
        </UI.IndexTable>
      );
      break;
    }
    case 'ResourceList':
      example = (
        <UI.ResourceList
          items={
            ['empty', 'filtered'].includes(state)
              ? []
              : productRows.map((row, i) => ({
                  id: String(i),
                  content: (
                    <div>
                      <strong>{row[0]}</strong>
                      <p>${row[2]}</p>
                    </div>
                  ),
                }))
          }
          selectable
          selectedItems={selected}
          onSelectionChange={setSelected}
          resourceName={{ singular: 'product', plural: 'products' }}
          bulkActions={[
            {
              content: 'Archive selected',
              onAction: notify(`${selected.length} products archived`),
            },
          ]}
          loading={state === 'loading'}
          isFiltered={state === 'filtered'}
        />
      );
      break;
    case 'Tabs':
    case 'LegacyTabs': {
      const Component = name === 'Tabs' ? UI.Tabs : UI.LegacyTabs;
      const tabs =
        state === 'overflow'
          ? Array.from({ length: 12 }, (_, i) => ({
              id: `view-${i}`,
              content: `Saved view ${i + 1}`,
            }))
          : defaultTabs;
      example = (
        <Component tabs={tabs} selected={tab} onSelect={setTab}>
          <p>{tabs[tab]?.content} products</p>
        </Component>
      );
      break;
    }
    case 'Navigation':
      example = (
        <UI.Navigation
          items={[
            { id: 'home', label: 'Home', href: '#home' },
            {
              id: 'products',
              label: 'Products',
              selected: true,
              href: '#products',
              badge: <UI.Badge>12</UI.Badge>,
              subNavigationItems: [
                { label: 'Collections', href: '#collections' },
              ],
            },
            { id: 'orders', label: 'Orders', href: '#orders', disabled },
          ]}
        />
      );
      break;
    case 'TopBar':
      example = (
        <UI.TopBar
          showNavigationToggle
          onNavigationToggle={notify('Navigation toggled')}
          searchField={
            <UI.TopBar.SearchField value={value} onChange={setValue} />
          }
          userMenu={<UI.TopBar.UserMenu name="Dana" detail="My store" />}
        />
      );
      break;
    case 'Frame':
      example = (
        <UI.Frame
          topBar={
            <UI.TopBar
              showNavigationToggle
              onNavigationToggle={() => setOpen(!open)}
            />
          }
          navigation={
            <UI.Navigation
              items={[
                { label: 'Home', href: '#home' },
                { label: 'Products', href: '#products', selected: true },
              ]}
            />
          }
          showMobileNavigation={open}
          onNavigationDismiss={() => setOpen(false)}
        >
          <UI.Page title="Products">{content}</UI.Page>
        </UI.Frame>
      );
      break;
    case 'Page':
      example = (
        <UI.Page
          title="Trail Hoodie"
          subtitle="Manage your product"
          backAction={{ content: 'Products', url: '#products' }}
          titleMetadata={<UI.Badge tone="success">Active</UI.Badge>}
          primaryAction={{ content: 'Save', onAction: notify('Product saved') }}
          secondaryActions={[
            { content: 'Duplicate', onAction: notify('Product duplicated') },
          ]}
        >
          {content}
        </UI.Page>
      );
      break;
    case 'PageActions':
      example = (
        <UI.PageActions
          primaryAction={{ content: 'Save', onAction: notify('Saved') }}
          secondaryActions={[
            {
              content: 'Delete',
              destructive: true,
              onAction: notify('Deleted'),
            },
          ]}
        />
      );
      break;
    case 'Layout':
      example = (
        <UI.Layout>
          <UI.Layout.Section>{content}</UI.Layout.Section>
          <UI.Layout.Section variant="oneThird">
            <UI.Card>Product organization</UI.Card>
          </UI.Layout.Section>
        </UI.Layout>
      );
      break;
    case 'Grid':
      example = (
        <UI.Grid>
          <UI.Grid.Cell columnSpan={{ xs: 12, md: 8 }}>{content}</UI.Grid.Cell>
          <UI.Grid.Cell columnSpan={{ xs: 12, md: 4 }}>
            <UI.Card>Secondary content</UI.Card>
          </UI.Grid.Cell>
        </UI.Grid>
      );
      break;
    case 'ButtonGroup':
      example = (
        <UI.ButtonGroup segmented>
          <UI.Button onClick={notify('Edit selected')}>Edit</UI.Button>
          <UI.Button onClick={notify('Duplicate selected')}>
            Duplicate
          </UI.Button>
          <UI.Button disabled={disabled} onClick={notify('Archive selected')}>
            Archive
          </UI.Button>
        </UI.ButtonGroup>
      );
      break;
    case 'FullscreenBar':
      example = (
        <UI.FullscreenBar
          title="Edit product"
          onExit={notify('Exited editor')}
          primaryAction={
            <UI.Button variant="primary" onClick={notify('Saved')}>
              Save
            </UI.Button>
          }
        />
      );
      break;
    case 'ContextualSaveBar':
      example = (
        <UI.ContextualSaveBar
          saveAction={{ onAction: notify('Changes saved') }}
          discardAction={{ onAction: notify('Changes discarded') }}
        />
      );
      break;
    case 'Form':
      example = (
        <UI.Form onSubmit={notify('Form submitted')}>
          <UI.TextField
            label="Product title"
            value={value}
            onChange={setValue}
          />
          <UI.Button variant="primary" type="submit">
            Save product
          </UI.Button>
        </UI.Form>
      );
      break;
    case 'FormLayout':
      example = (
        <UI.FormLayout>
          <UI.TextField label="Title" value={value} onChange={setValue} />
          <UI.FormLayout.Group>
            <UI.TextField label="Price" prefix="$" />
            <UI.TextField label="Compare at price" prefix="$" />
          </UI.FormLayout.Group>
        </UI.FormLayout>
      );
      break;
    case 'LegacyStack':
      example = (
        <UI.LegacyStack>
          <UI.Badge tone="success">Active</UI.Badge>
          <UI.Button onClick={notify('Edited')}>Edit product</UI.Button>
        </UI.LegacyStack>
      );
      break;
    case 'TextContainer':
      example = (
        <UI.TextContainer>
          <UI.Text as="h2" variant="headingMd">
            Build your catalog
          </UI.Text>
          <p>Add products, organize collections, and start selling.</p>
          <UI.Link url="https://help.shopify.com/manual/products" external>
            Learn about products
          </UI.Link>
        </UI.TextContainer>
      );
      break;
    case 'Breadcrumbs':
      example = (
        <UI.Breadcrumbs
          items={[
            { label: 'Store', href: '#store' },
            { label: 'Products', href: '#products' },
            { label: 'Trail Hoodie', href: '#hoodie' },
          ]}
        />
      );
      break;
    case 'Pagination':
      example = (
        <UI.Pagination
          hasPrevious={number > 1}
          hasNext={number < 50}
          label={`Page ${number} of 50`}
          onPrevious={() => setNumber(number - 1)}
          onNext={() => setNumber(number + 1)}
        />
      );
      break;
    case 'Link':
      example = (
        <UI.Link url="https://help.shopify.com/manual/products" external>
          Learn about products
        </UI.Link>
      );
      break;
    case 'UnstyledLink':
      example = (
        <UI.UnstyledLink url="https://help.shopify.com" external>
          Visit the help center
        </UI.UnstyledLink>
      );
      break;
    case 'UnstyledButton':
      example = (
        <UI.UnstyledButton onClick={notify('Button activated')}>
          Activate action
        </UI.UnstyledButton>
      );
      break;
    case 'InlineCode':
      example = (
        <p>
          Install the package with <UI.InlineCode>bun install</UI.InlineCode>.
        </p>
      );
      break;
    case 'KeyboardKey':
      example = (
        <p>
          Press <UI.KeyboardKey>⌘</UI.KeyboardKey> +{' '}
          <UI.KeyboardKey>K</UI.KeyboardKey> to search.
        </p>
      );
      break;
    case 'Truncate':
      example = (
        <div style={{ maxWidth: 240 }}>
          <UI.Truncate>
            A very long product title that will be truncated to fit its
            container
          </UI.Truncate>
        </div>
      );
      break;
    case 'Icon':
      example = (
        <div className="ps-row">
          <UI.Icon accessibilityLabel="Information" />
          <UI.Icon tone="success" accessibilityLabel="Success" />
          <UI.Icon tone="critical" accessibilityLabel="Critical" />
        </div>
      );
      break;
    case 'Label':
      example = (
        <>
          <UI.Label htmlFor="label-example">Product title</UI.Label>
          <input id="label-example" className="ps-input" />
        </>
      );
      break;
    case 'Labelled':
      example = (
        <UI.Labelled
          id="labelled-example"
          label="Product title"
          helpText="Choose a descriptive title"
          error={error}
        >
          <input
            id="labelled-example"
            className="ps-input"
            aria-describedby={`labelled-example-help${error ? ' labelled-example-error' : ''}`}
          />
        </UI.Labelled>
      );
      break;
    case 'InlineError':
      example = (
        <UI.InlineError
          message="Enter a valid email address."
          fieldID="contact-email"
        />
      );
      break;
    case 'Connected':
      example = (
        <UI.Connected
          right={
            <UI.Button onClick={notify('Coupon applied')}>Apply</UI.Button>
          }
        >
          <UI.TextField
            label="Discount code"
            value={value}
            onChange={setValue}
          />
        </UI.Connected>
      );
      break;
    case 'AppProvider':
    case 'PolarisTestProvider':
      example = <UI.AppProvider>{content}</UI.AppProvider>;
      break;
    case 'ThemeProvider':
      example = (
        <>
          <UI.Button onClick={() => setChecked(!checked)}>
            Switch theme
          </UI.Button>
          <UI.ThemeProvider theme={checked ? 'dark' : 'light'}>
            <UI.Card>
              <UI.Select label="Status" options={choices} />
            </UI.Card>
          </UI.ThemeProvider>
        </>
      );
      break;
    case 'Portal':
    case 'PortalsManager':
      example = (
        <>
          <UI.Button onClick={() => setOpen(!open)}>
            Toggle portalled message
          </UI.Button>
          {open && (
            <UI.PortalsManager>
              <UI.Portal>
                <div
                  style={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 500,
                    background: 'var(--p-color-bg-surface)',
                    padding: 16,
                    boxShadow: 'var(--p-shadow-300)',
                    borderRadius: 12,
                  }}
                >
                  <p role="status">Rendered outside the component tree</p>
                  <UI.Button onClick={() => setOpen(false)}>Dismiss</UI.Button>
                </div>
              </UI.Portal>
            </UI.PortalsManager>
          )}
        </>
      );
      break;
    case 'EventListener':
      example = (
        <>
          <UI.EventListener
            event="click"
            handler={() => setNumber((n) => n + 1)}
          />
          <UI.Button>Click anywhere</UI.Button>
          <p role="status">Window clicks observed: {number - 30}</p>
        </>
      );
      break;
    case 'KeypressListener':
      example = (
        <>
          <UI.KeypressListener
            keyName="k"
            handler={notify('K shortcut activated')}
          />
          <p>Press K outside an input to activate the keyboard shortcut.</p>
        </>
      );
      break;
    case 'ScrollLock':
      example = (
        <>
          <UI.Button onClick={() => setOpen(!open)}>
            {open ? 'Unlock page scrolling' : 'Lock page scrolling'}
          </UI.Button>
          {open && <UI.ScrollLock />}
          <p>Body scrolling is {open ? 'locked' : 'unlocked'}.</p>
        </>
      );
      break;
    case 'Sticky':
      example = (
        <UI.Scrollable height={240}>
          <UI.Sticky>
            <UI.Card>Sticky product toolbar</UI.Card>
          </UI.Sticky>
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i}>Product information row {i + 1}</p>
          ))}
        </UI.Scrollable>
      );
      break;
    case 'Scrollable':
      example = (
        <UI.Scrollable height={240} padding="400">
          {Array.from({ length: 18 }, (_, i) => (
            <p key={i}>Product information row {i + 1}</p>
          ))}
        </UI.Scrollable>
      );
      break;
    case 'Focus':
      example = (
        <>
          <UI.Button onClick={() => setOpen(true)}>Focus the field</UI.Button>
          <UI.Focus active={open}>
            <UI.TextField label="Product title" />
          </UI.Focus>
        </>
      );
      break;
    case 'TrapFocus':
      example = (
        <>
          <UI.Button onClick={() => setOpen(!open)}>
            {open ? 'Release focus' : 'Activate focus trap'}
          </UI.Button>
          <UI.TrapFocus active={open}>
            <UI.TextField label="Product title" />
            <UI.Button onClick={() => setOpen(false)}>Release focus</UI.Button>
          </UI.TrapFocus>
        </>
      );
      break;
    case 'PositionedOverlay':
      example = (
        <>
          <UI.Button ref={anchor} onClick={() => setOpen(!open)}>
            Toggle positioned overlay
          </UI.Button>
          <UI.PositionedOverlay activator={anchor} active={open}>
            <p>Position follows the activator on scroll and resize.</p>
            <UI.Button onClick={() => setOpen(false)}>Dismiss</UI.Button>
          </UI.PositionedOverlay>
        </>
      );
      break;
    default:
      example = <p>No example registered for {name}</p>;
  }
  return (
    <div
      style={{
        maxWidth: [
          'Frame',
          'Page',
          'Layout',
          'Grid',
          'TopBar',
          'DataTable',
          'IndexTable',
          'ResourceList',
        ].includes(name)
          ? undefined
          : 640,
        padding: name === 'Frame' ? 0 : 8,
      }}
    >
      <div style={{ display: 'grid', gap: 16 }}>{example}</div>
      {status}
    </div>
  );
}
export const exampleParameters: Meta['parameters'] = {
  controls: { disable: true },
};
