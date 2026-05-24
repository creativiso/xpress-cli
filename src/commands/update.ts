import { Command } from 'commander';
import { getClientFromCmd, getGlobalOpts, buildParams, parseJson, langParam } from './_shared';
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
} from '../types/api';

export function register(program: Command): void {
  const update = program.command('update').description('Update a resource');

  update
    .command('page <id>')
    .description('Update a page')
    .option('--slug <slug>', 'URL slug')
    .option('--title <title>', 'Title')
    .option('--template <name>', 'Page template')
    .option('--parent <id>', 'Parent page ID')
    .option('--sort <n>', 'Sort order')
    .option('--body <html>', 'Body HTML')
    .option('--extra-description <text>', 'Extra description')
    .option('--meta-title <title>', 'SEO meta title')
    .option('--meta-description <desc>', 'SEO meta description')
    .option('--og-description <desc>', 'Open Graph description')
    .option('--title-suffix <text>', 'Title suffix')
    .option('--page-image <url>', 'Page image URL')
    .option('--page-background-image <url>', 'Page background image URL')
    .option('--public', 'Public')
    .option('--no-public', 'Private')
    .option('--noindex', 'Add noindex meta tag')
    .option('--no-noindex', 'Remove noindex meta tag')
    .option('--nofollow', 'Add nofollow meta tag')
    .option('--no-nofollow', 'Remove nofollow meta tag')
    .action(async (id, opts, cmd) => {
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
      const { data } = await client.patch<PageNormalized>(`/pages/${id}`, body);
      printData(data, globalOpts);
      success(`Page #${id} updated.`, globalOpts);
    });

  update
    .command('article <id>')
    .description('Update an article')
    .option('--slug <slug>', 'New slug')
    .option('--title <title>', 'Title')
    .option('--body <html>', 'Body HTML')
    .option('--meta-title <title>', 'Meta title')
    .option('--meta-description <desc>', 'Meta description')
    .option('--image <url>', 'Image URL')
    .option('--category-id <id>', 'Category ID')
    .option('--active', 'Active')
    .option('--no-active', 'Inactive')
    .option('--top', 'Top')
    .option('--no-top', 'Not top')
    .option('--private', 'Private')
    .option('--no-private', 'Not private')
    .action(async (id, opts, cmd) => {
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
        top: opts.top,
        private: opts.private,
        ...langParam(globalOpts)
      });
      const { data } = await client.patch<Article>(`/articles/${id}`, body);
      printData(data, globalOpts);
      success(`Article #${id} updated.`, globalOpts);
    });

  update
    .command('article-category <id>')
    .description('Update an article category')
    .option('--slug <slug>', 'URL slug')
    .option('--title <title>', 'Title')
    .option('--parent <id>', 'Parent category ID')
    .option('--sort <n>', 'Sort order')
    .option('--meta-title <title>', 'SEO meta title')
    .option('--meta-description <desc>', 'SEO meta description')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({
        url: opts.slug,
        title: opts.title,
        parent: opts.parent !== undefined ? Number(opts.parent) : undefined,
        sort: opts.sort !== undefined ? Number(opts.sort) : undefined,
        meta_title: opts.metaTitle,
        meta_description: opts.metaDescription
      });
      const { data } = await client.patch<ArticleCategory>(`/article-categories/${id}`, body);
      printData(data, globalOpts);
      success(`Article category #${id} updated.`, globalOpts);
    });

  update
    .command('product <id>')
    .description('Update a product')
    .option('--slug <slug>', 'URL slug')
    .option('--name <name>', 'Product name')
    .option('--price <price>', 'Price')
    .option('--discount <n>', 'Discount value')
    .option('--discount-type <type>', 'Discount type (percent|fixed)')
    .option('--sku <sku>', 'SKU')
    .option('--barcode <code>', 'Barcode')
    .option('--quantity <n>', 'Stock quantity')
    .option('--weight <n>', 'Weight')
    .option('--template <name>', 'Product template')
    .option('--product-type <type>', 'Product type (physical|digital|service)')
    .option('--active', 'Active')
    .option('--no-active', 'Inactive')
    .option('--noindex', 'Add noindex meta tag')
    .option('--no-noindex', 'Remove noindex meta tag')
    .option('--nofollow', 'Add nofollow meta tag')
    .option('--no-nofollow', 'Remove nofollow meta tag')
    .option('--hidden', 'Hide from listing')
    .option('--no-hidden', 'Show in listing')
    .option('--category-id <id>', 'Category ID')
    .option('--description <html>', 'Description HTML')
    .option('--meta-title <title>', 'SEO meta title')
    .option('--meta-description <desc>', 'SEO meta description')
    .option('--og-description <desc>', 'Open Graph description')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({
        url: opts.slug,
        name: opts.name,
        price: opts.price !== undefined ? Number(opts.price) : undefined,
        discount: opts.discount !== undefined ? Number(opts.discount) : undefined,
        discountType: opts.discountType,
        sku: opts.sku,
        barcode: opts.barcode,
        quantity: opts.quantity !== undefined ? Number(opts.quantity) : undefined,
        weight: opts.weight !== undefined ? Number(opts.weight) : undefined,
        template: opts.template,
        productType: opts.productType,
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
      const { data } = await client.patch<ProductNormalized>(`/products/${id}`, body);
      printData(data, globalOpts);
      success(`Product #${id} updated.`, globalOpts);
    });

  update
    .command('product-category <id>')
    .description('Update a product category')
    .option('--slug <slug>', 'URL slug')
    .option('--title <title>', 'Title')
    .option('--parent <id>', 'Parent category ID')
    .option('--sort <n>', 'Sort order')
    .option('--public', 'Public')
    .option('--no-public', 'Private')
    .option('--image <url>', 'Image URL')
    .option('--meta-title <title>', 'SEO meta title')
    .option('--meta-description <desc>', 'SEO meta description')
    .option('--og-description <desc>', 'Open Graph description')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({
        url: opts.slug,
        title: opts.title,
        parent: opts.parent !== undefined ? Number(opts.parent) : undefined,
        sort: opts.sort !== undefined ? Number(opts.sort) : undefined,
        public: opts.public,
        image: opts.image,
        meta_title: opts.metaTitle,
        meta_description: opts.metaDescription,
        og_description: opts.ogDescription
      });
      const { data } = await client.patch<object>(`/product-categories/${id}`, body);
      printData(data, globalOpts);
      success(`Product category #${id} updated.`, globalOpts);
    });

  update
    .command('product-attribute <id>')
    .description('Update a product attribute')
    .option('--name <name>', 'Attribute name')
    .option('--type <type>', 'Type')
    .option('--filter', 'Enable filter')
    .option('--no-filter', 'Disable filter')
    .option('--active', 'Active')
    .option('--no-active', 'Inactive')
    .option('--prefix <prefix>', 'Display prefix')
    .option('--suffix <suffix>', 'Display suffix')
    .option('--show-on-card', 'Show on card')
    .option('--no-show-on-card', 'Hide from card')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({ name: opts.name, type: opts.type, filter: opts.filter, active: opts.active, prefix: opts.prefix, suffix: opts.suffix, show_on_card: opts.showOnCard });
      const { data } = await client.patch<ProductAttributeFull>(`/product-attributes/${id}`, body);
      printData(data, globalOpts);
      success(`Product attribute #${id} updated.`, globalOpts);
    });

  update
    .command('attribute-value <attributeId> <valueId>')
    .description('Update a predefined attribute value')
    .requiredOption('--name <name>', 'New name')
    .action(async (attributeId, valueId, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.patch<{ id: number }>(`/product-attributes/${attributeId}/values/${valueId}`, { name: opts.name });
      printData(data, globalOpts);
      success(`Attribute value #${valueId} updated.`, globalOpts);
    });

  update
    .command('product-raw-attr <productId> <attrId>')
    .description('Upsert a raw attribute value on a product')
    .option('--text <value>', 'Text value')
    .option('--numeric <value>', 'Numeric value')
    .option('--date <value>', 'Date value (YYYY-MM-DD)')
    .action(async (productId, attrId, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const provided = [opts.text, opts.numeric, opts.date].filter((v) => v !== undefined);
      if (provided.length !== 1) {
        process.stderr.write('Error: Provide exactly one of --text, --numeric, or --date.\n');
        process.exit(1);
      }
      const body: Record<string, unknown> = {};
      if (opts.text !== undefined) body.textValue = opts.text;
      if (opts.numeric !== undefined) body.numericValue = Number(opts.numeric);
      if (opts.date !== undefined) body.dateValue = opts.date;
      const { data } = await client.patch<{ attribute_id: number }>(`/products/${productId}/raw-attribute-values/${attrId}`, body);
      printData(data, globalOpts);
      success(`Raw attribute set on product #${productId}.`, globalOpts);
    });

  update
    .command('product-variation <id>')
    .description('Update a variation category')
    .option('--name <name>', 'Category name')
    .option('--value-type <type>', 'Value type: simple|color|image')
    .option('--layout <layout>', 'Display layout')
    .option('--sort <n>', 'Sort order')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({ name: opts.name, value_type: opts.valueType, layout: opts.layout, sort: opts.sort !== undefined ? Number(opts.sort) : undefined });
      const { data } = await client.patch<ProductVariationCategoryFull>(`/product-variation-categories/${id}`, body);
      printData(data, globalOpts);
      success(`Variation category #${id} updated.`, globalOpts);
    });

  update
    .command('product-option <id>')
    .description('Update an option category')
    .option('--name <name>', 'Category name')
    .option('--type <type>', 'Category type')
    .option('--required', 'Required')
    .option('--no-required', 'Not required')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const body = buildParams({ name: opts.name, type: opts.type, required: opts.required });
      const { data } = await client.patch<ProductOptionCategory>(`/product-options/${id}`, body);
      printData(data, globalOpts);
      success(`Option category #${id} updated.`, globalOpts);
    });

  update
    .command('order <id>')
    .description('Update an order status / payment / metadata')
    .option('--status <status>', 'Order status')
    .option('--payment-status <status>', 'Payment status')
    .option('--payment-type <type>', 'Payment type')
    .option('--comment <comment>', 'Comment')
    .option('--metadata <json>', 'Metadata as JSON object')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const metadata = opts.metadata !== undefined ? parseJson<Record<string, unknown>>(opts.metadata, '--metadata') : undefined;
      const body = buildParams({ status: opts.status, payment_status: opts.paymentStatus, payment_type: opts.paymentType, comment: opts.comment, metadata });
      const { data } = await client.patch<Order>(`/orders/${id}`, body);
      printData(data, globalOpts);
      success(`Order #${id} updated.`, globalOpts);
    });
}
