import { useState } from 'react';
import { Button } from '../components/button';
import { Badge } from '../components/badge';
import { Card } from '../components/card';
import { TextField } from '../components/text-field';
import './details-page.css';

const initial = {
  title: "The North Face Ventrix Active Trail Hybrid Hoodie - Men's",
  description:
    'The M60-A represents the benchmark and equilibrium between function and design for us at Rama Works. The gently exaggerated design of the frame is not understated, but rather provocative. Inspiration and evolution from previous models are evident in the beautifully articulated design and the well defined aesthetic.',
  productType: 'Keyboard',
  vendor: '',
  tags: '',
};
const navigation = [
  'Home',
  'Orders',
  'Products',
  'Customers',
  'Content',
  'Analytics',
  'Marketing',
  'Discounts',
];

export function DetailsPage() {
  const [saved, setSaved] = useState(initial);
  const [product, setProduct] = useState(initial);
  const [files, setFiles] = useState<string[]>([]);
  const [savedFiles, setSavedFiles] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState('');
  const dirty =
    JSON.stringify(product) !== JSON.stringify(saved) ||
    JSON.stringify(files) !== JSON.stringify(savedFiles);
  const update = (key: keyof typeof initial, value: string) => {
    setProduct((current) => ({ ...current, [key]: value }));
    setNotice('');
  };
  const save = () => {
    if (!product.title.trim()) {
      setNotice('Enter a product title before saving.');
      return;
    }
    setSaved(product);
    setSavedFiles(files);
    setNotice('Changes saved');
  };
  return (
    <div className="details-demo">
      <a className="details-skip" href="#product-details">
        Skip to content
      </a>
      <header className="details-topbar">
        <button
          className="details-menu"
          aria-label="Toggle navigation"
          aria-expanded={mobileNav}
          onClick={() => setMobileNav(!mobileNav)}
        >
          ☰
        </button>
        <span className="details-brand">
          <span className="details-store-icon" aria-hidden>
            S
          </span>{' '}
          Spectrally yours
        </span>
        <div className="details-search">
          <TextField
            label="Search admin"
            labelHidden
            placeholder="Search"
            value={search}
            onChange={setSearch}
          />
          {search && (
            <div className="details-search-results">
              <a
                href="https://help.shopify.com"
                target="_blank"
                rel="noreferrer"
              >
                Shopify help center ↗
              </a>
              <a
                href="https://community.shopify.dev"
                target="_blank"
                rel="noreferrer"
              >
                Community forums ↗
              </a>
            </div>
          )}
        </div>
        <span className="details-user">
          <span aria-hidden>D</span> Dharma
        </span>
      </header>
      <div className="details-shell">
        <aside className={`details-sidebar ${mobileNav ? 'is-open' : ''}`}>
          <nav aria-label="Main navigation">
            {navigation.map((label, index) => (
              <button
                key={label}
                className={label === 'Products' ? 'is-selected' : ''}
                aria-current={label === 'Products' ? 'page' : undefined}
                onClick={() => {
                  setNotice(
                    `${label} navigation is a demo. Product details remain open.`,
                  );
                  setMobileNav(false);
                }}
              >
                <span aria-hidden>
                  {['⌂', '▤', '◇', '♙', '▧', '▥', '◎', '◈'][index]}
                </span>
                {label}
              </button>
            ))}
            <p>Sales channels</p>
            <button
              onClick={() => setNotice('Online Store is a demo channel.')}
            >
              <span aria-hidden>◉</span>Online Store
            </button>
            <button
              onClick={() => setNotice('Point of Sale is a demo channel.')}
            >
              <span aria-hidden>▣</span>Point of Sale
            </button>
            <p>Apps</p>
            <a href="https://apps.shopify.com" target="_blank" rel="noreferrer">
              Add apps ↗
            </a>
          </nav>
        </aside>
        <main id="product-details" className="details-main">
          {dirty && (
            <div className="details-savebar">
              <strong>Unsaved changes</strong>
              <div>
                <Button
                  onClick={() => {
                    setProduct(saved);
                    setFiles(savedFiles);
                    setNotice('Changes discarded');
                  }}
                >
                  Discard
                </Button>
                <Button variant="primary" onClick={save}>
                  Save
                </Button>
              </div>
            </div>
          )}
          <div className="details-heading">
            <div>
              <p className="details-breadcrumb">Products / Product details</p>
              <div className="details-title">
                <h1>{product.title || 'Untitled product'}</h1>
                <Badge tone="success">Success badge</Badge>
              </div>
              <p className="details-muted">
                Created May 8, 2020 at 7:31 am from Developer Tools (via import)
              </p>
            </div>
            <Button variant="primary" onClick={save}>
              Save this page
            </Button>
          </div>
          <div className="details-actions">
            <Button
              variant="tertiary"
              onClick={() => {
                update('title', `${product.title} (Copy)`);
                setNotice('Product duplicated as an unsaved copy');
              }}
            >
              Duplicate
            </Button>
            <Button variant="tertiary" onClick={() => window.print()}>
              Print
            </Button>
            <Button
              variant="tertiary"
              onClick={() => setNotice(product.description)}
            >
              View description
            </Button>
          </div>
          {notice && (
            <div className="details-notice" role="status">
              {notice}
              <button
                aria-label="Dismiss notification"
                onClick={() => setNotice('')}
              >
                ×
              </button>
            </div>
          )}
          <div className="details-columns">
            <div className="details-stack">
              <Card>
                <div className="details-stack">
                  <TextField
                    label="Title"
                    value={product.title}
                    onChange={(value) => update('title', value)}
                    error={
                      !product.title.trim() ? 'Title is required' : undefined
                    }
                  />
                  <TextField
                    label="Description"
                    multiline={7}
                    value={product.description}
                    onChange={(value) => update('description', value)}
                  />
                </div>
              </Card>
              <Card>
                <div className="details-stack">
                  <h2>Media</h2>
                  <label className="details-upload">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(event) => {
                        setFiles((current) => [
                          ...current,
                          ...Array.from(event.target.files ?? []).map(
                            (file) => file.name,
                          ),
                        ]);
                        event.target.value = '';
                      }}
                    />
                    <span className="details-upload-button">Add files</span>
                    <span className="details-muted">Upload product images</span>
                  </label>
                  {files.length > 0 && (
                    <ul className="details-files">
                      {files.map((name, index) => (
                        <li key={`${name}-${index}`}>
                          <span>{name}</span>
                          <Button
                            variant="plain"
                            onClick={() =>
                              setFiles((current) =>
                                current.filter((_, i) => i !== index),
                              )
                            }
                            aria-label={`Remove ${name}`}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            </div>
            <div className="details-stack">
              <Card>
                <div className="details-stack">
                  <h2>Organization</h2>
                  <label className="details-select">
                    Product type
                    <select
                      value={product.productType}
                      onChange={(event) =>
                        update('productType', event.target.value)
                      }
                    >
                      {['Keyboard', 'Accessories', 'Last 7 days'].map(
                        (type) => (
                          <option key={type}>{type}</option>
                        ),
                      )}
                    </select>
                  </label>
                  <TextField
                    label="Tags"
                    value={product.tags}
                    placeholder="None selected"
                    helpText="Separate tags with commas"
                    onChange={(value) => update('tags', value)}
                  />
                  <TextField
                    label="Vendor"
                    value={product.vendor}
                    placeholder="None selected"
                    onChange={(value) => update('vendor', value)}
                  />
                  <hr />
                  <h2>Collections</h2>
                  <p className="details-muted">No collections selected</p>
                  <hr />
                  <h2>Tags</h2>
                  <div className="details-tags">
                    {product.tags
                      .split(',')
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                      .map((tag, i) => (
                        <Badge key={`${tag}-${i}`}>{tag}</Badge>
                      ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <footer className="details-footer">
            Learn more about{' '}
            <a
              href="https://help.shopify.com/manual/products"
              target="_blank"
              rel="noreferrer"
            >
              managing products ↗
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
