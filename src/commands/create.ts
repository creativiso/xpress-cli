import { Command } from 'commander';
import { getClientFromCmd, getGlobalOpts, buildParams, parseJson } from './_shared';
import { printData, success } from '../output/print';
import {
  PageNormalized,
  Article,
  ArticleCategory,
  ProductNormalized,
  ProductAttributeFull,
  ProductVariationCategoryFull,
  ProductOptionCategory,
  Order,
  AttributeValue,
} from '../types/api';

interface OrderItemInput {
  product: number;
  qty: number;
  price?: number;
  orig_price?: number;
  discount?: number;
  variation?: number | null;
  options?: { optionCategory: number; option: number }[];
}

export function register(program: Command): void {
  const create = program.command('create').description('Create a resource');

  create
    .command('page')
    .description('Create a page')
    .requiredOption('--slug <slug>', 'URL slug')
    .requiredOption('--title <title>', 'Title')
    .option('--template <name>', 'Page template')
    .option('--parent <id>', 'Parent page ID', '0')
    .option('--sort <n>', 'Sort order')
    .option('--body <html>', 'Body HTML')
    .option('--extra-description <text>', 'Extra description')
    .option('--meta-title <title>', 'SEO meta title')
    .option('--meta-description <desc>', 'SEO meta description')
    .option('--og-description <desc>', 'Open Graph description')
    .option('--title-suffix <text>', 'Title suffix')
    .option('--page-image <url>', 'Page image URL')
    .option('--page-background-image <url>', 'Page background image URL')
    .option('--public', 'Public (default true)')
    .option('--no-public', 'Private')
    .option('--noindex', 'Add noindex meta tag')
    .option('--nofollow', 'Add nofollow meta tag')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({
        url: opts.slug,
        title: opts.title,
        template: opts.template,
        parent: opts.parent !== undefined ? Number(opts.parent) : undefined,
        sort: opts.sort !== undefined ? Number(opts.sort) : undefined,
        body: opts.body,
        extra_description: opts.extraDescription,
        meta_title: opts.metaTitle,
        meta_description: opts.metaDescription,
        og_description: opts.ogDescription,
        title_suffix: opts.titleSuffix,
        page_image: opts.pageImage,
        page_background_image: opts.pageBackgroundImage,
        public: opts.public,
        noindex: opts.noindex,
        nofollow: opts.nofollow
      });
      const { data } = await client.post<PageNormalized>('/pages', body);
      printData(data, globalOpts);
      success(`Page #${data.id} created.`, globalOpts);
    });

  create
    .command('article')
    .description('Create an article')
    .requiredOption('--slug <slug>', 'URL slug')
    .requiredOption('--title <title>', 'Title')
    .option('--body <html>', 'Body HTML')
    .option('--meta-title <title>', 'Meta title')
    .option('--meta-description <desc>', 'Meta description')
    .option('--image <url>', 'Image URL')
    .option('--category-id <id>', 'Category ID')
    .option('--active', 'Active (default true)')
    .option('--no-active', 'Inactive')
    .option('--top', 'Mark as top')
    .option('--private', 'Mark as private')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({
        url: opts.slug,
        title: opts.title,
        body: opts.body,
        meta_title: opts.metaTitle,
        meta_description: opts.metaDescription,
        image: opts.image,
        category: opts.categoryId !== undefined ? Number(opts.categoryId) : undefined,
        active: opts.active,
        top: opts.top ?? false,
        private: opts.private ?? false
      });
      const { data } = await client.post<Article>('/articles', body);
      printData(data, globalOpts);
      success(`Article #${data.id} created.`, globalOpts);
    });

  create
    .command('article-category')
    .description('Create an article category')
    .requiredOption('--slug <slug>', 'URL slug')
    .requiredOption('--title <title>', 'Title')
    .option('--parent <id>', 'Parent category ID', '0')
    .option('--sort <n>', 'Sort order', '0')
    .option('--meta-title <title>', 'SEO meta title')
    .option('--meta-description <desc>', 'SEO meta description')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({
        url: opts.slug,
        title: opts.title,
        parent: Number(opts.parent),
        sort: Number(opts.sort),
        meta_title: opts.metaTitle,
        meta_description: opts.metaDescription
      });
      const { data } = await client.post<ArticleCategory>('/article-categories', body);
      printData(data, globalOpts);
      success(`Article category #${data.id} created.`, globalOpts);
    });

  create
    .command('product')
    .description('Create a product')
    .requiredOption('--slug <slug>', 'URL slug')
    .requiredOption('--name <name>', 'Product name')
    .requiredOption('--price <price>', 'Price')
    .option('--discount <n>', 'Discount value')
    .option('--discount-type <type>', 'Discount type (percent|fixed)')
    .option('--sku <sku>', 'SKU')
    .option('--barcode <code>', 'Barcode')
    .option('--quantity <n>', 'Stock quantity', '0')
    .option('--weight <n>', 'Weight', '0')
    .option('--product-type <type>', 'Product type (physical|digital|service)', 'physical')
    .option('--template <name>', 'Product template')
    .option('--active', 'Active (default true)')
    .option('--no-active', 'Inactive')
    .option('--noindex', 'Add noindex meta tag')
    .option('--nofollow', 'Add nofollow meta tag')
    .option('--hidden', 'Hide from listing')
    .option('--category-id <id>', 'Category ID')
    .option('--description <html>', 'Description HTML')
    .option('--meta-title <title>', 'SEO meta title')
    .option('--meta-description <desc>', 'SEO meta description')
    .option('--og-description <desc>', 'Open Graph description')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({
        url: opts.slug,
        name: opts.name,
        price: Number(opts.price),
        discount: opts.discount !== undefined ? Number(opts.discount) : undefined,
        discountType: opts.discountType,
        sku: opts.sku,
        barcode: opts.barcode,
        quantity: Number(opts.quantity),
        weight: Number(opts.weight),
        productType: opts.productType,
        template: opts.template,
        active: opts.active,
        noindex: opts.noindex,
        nofollow: opts.nofollow,
        hidden: opts.hidden,
        category: opts.categoryId !== undefined ? Number(opts.categoryId) : undefined,
        description: opts.description,
        meta_title: opts.metaTitle,
        meta_description: opts.metaDescription,
        og_description: opts.ogDescription
      });
      const { data } = await client.post<ProductNormalized>('/products', body);
      printData(data, globalOpts);
      success(`Product #${data.id} created.`, globalOpts);
    });

  create
    .command('product-category')
    .description('Create a product category')
    .requiredOption('--slug <slug>', 'URL slug')
    .requiredOption('--title <title>', 'Title')
    .option('--parent <id>', 'Parent category ID', '0')
    .option('--sort <n>', 'Sort order', '0')
    .option('--public', 'Public (default true)')
    .option('--no-public', 'Private')
    .option('--image <url>', 'Image URL')
    .option('--meta-title <title>', 'SEO meta title')
    .option('--meta-description <desc>', 'SEO meta description')
    .option('--og-description <desc>', 'Open Graph description')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({
        url: opts.slug,
        title: opts.title,
        parent: Number(opts.parent),
        sort: Number(opts.sort),
        public: opts.public,
        image: opts.image,
        meta_title: opts.metaTitle,
        meta_description: opts.metaDescription,
        og_description: opts.ogDescription
      });
      const { data } = await client.post<object>('/product-categories', body);
      printData(data, globalOpts);
      success(`Product category created.`, globalOpts);
    });

  create
    .command('product-attribute')
    .description('Create a product attribute')
    .requiredOption('--name <name>', 'Attribute name')
    .requiredOption('--type <type>', 'Type: predefined|number|date|text')
    .option('--filter', 'Enable filter')
    .option('--active', 'Active (default true)')
    .option('--no-active', 'Inactive')
    .option('--prefix <prefix>', 'Display prefix')
    .option('--suffix <suffix>', 'Display suffix')
    .option('--show-on-card', 'Show on product card')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({ name: opts.name, type: opts.type, filter: opts.filter ?? false, active: opts.active, prefix: opts.prefix, suffix: opts.suffix, show_on_card: opts.showOnCard ?? false });
      const { data } = await client.post<ProductAttributeFull>('/product-attributes', body);
      printData(data, globalOpts);
      success(`Product attribute #${data.id} created.`, globalOpts);
    });

  create
    .command('attribute-value <attributeId>')
    .description('Add a predefined value to an attribute')
    .requiredOption('--name <name>', 'Value name')
    .action(async (attributeId, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.post<{ id: number }>(`/product-attributes/${attributeId}/values`, { name: opts.name });
      printData(data, globalOpts);
      success(`Attribute value #${data.id} added.`, globalOpts);
    });

  create
    .command('product-variation')
    .description('Create a variation category')
    .requiredOption('--name <name>', 'Category name')
    .requiredOption('--value-type <type>', 'Value type: simple|color|image')
    .option('--layout <layout>', 'Display layout', 'buttons')
    .option('--sort <n>', 'Sort order', '0')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = { name: opts.name, value_type: opts.valueType, layout: opts.layout, sort: Number(opts.sort) };
      const { data } = await client.post<ProductVariationCategoryFull>('/product-variation-categories', body);
      printData(data, globalOpts);
      success(`Variation category #${data.id} created.`, globalOpts);
    });

  create
    .command('product-option')
    .description('Create an option category')
    .requiredOption('--name <name>', 'Category name')
    .option('--type <type>', 'Category type', 'default')
    .option('--required', 'Make required')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = { name: opts.name, type: opts.type, required: opts.required ?? false };
      const { data } = await client.post<ProductOptionCategory>('/product-options', body);
      printData(data, globalOpts);
      success(`Option category #${data.id} created.`, globalOpts);
    });

  create
    .command('order')
    .description('Create an order')
    .requiredOption('--email <email>', 'Customer email')
    .requiredOption('--items <json>', 'Order items as JSON array')
    .option('--first-name <name>', 'First name')
    .option('--last-name <name>', 'Last name')
    .option('--phone <phone>', 'Phone number')
    .option('--city <city>', 'City')
    .option('--address <address>', 'Address')
    .option('--comment <comment>', 'Comment')
    .option('--delivery <method>', 'Delivery method')
    .option('--payment <method>', 'Payment method')
    .option('--office <office>', 'Office/branch')
    .option('--currency <code>', 'Currency code', 'EUR')
    .option('--payment-type <type>', 'Payment type', 'other')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const items = parseJson<OrderItemInput[]>(opts.items, '--items');
      const body = buildParams({ email: opts.email, items, first_name: opts.firstName, last_name: opts.lastName, phone: opts.phone, city: opts.city, address: opts.address, comment: opts.comment, delivery: opts.delivery, payment: opts.payment, office: opts.office, currency: opts.currency, payment_type: opts.paymentType });
      const { data } = await client.post<Order>('/orders', body);
      printData(data, globalOpts);
      success(`Order #${data.id} created.`, globalOpts);
    });
}
