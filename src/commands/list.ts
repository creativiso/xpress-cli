import { Command } from 'commander';
import { getClientFromCmd, getGlobalOpts, buildParams, langParam } from './_shared';
import { printData, printPaginated } from '../output/print';
import {
  Paginated,
  PageSummary,
  ArticleSummary,
  ArticleCategory,
  ProductSummary,
  ProductCategory,
  ProductAttribute,
  ProductVariationCategory,
  ProductOptionCategory,
  OrderSummary,
  IndexedUrl,
  RawAttributeValue,
  AttributeValue,
} from '../types/api';

export function register(program: Command): void {
  const list = program.command('list').description('List resources');

  list
    .command('pages')
    .description('List pages')
    .option('--limit <n>', 'Items per page', '20')
    .option('--offset <n>', 'Items to skip', '0')
    .option('--parent <id>', 'Filter by parent page ID')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<Paginated<PageSummary>>('/pages', {
        params: buildParams({ ...langParam(globalOpts), limit: opts.limit, offset: opts.offset, parent: opts.parent }),
      });
      printPaginated(data, ['id', 'slug', 'title', 'parent', 'template', 'public'], globalOpts);
    });

  list
    .command('articles')
    .description('List articles')
    .option('--limit <n>', 'Items per page', '20')
    .option('--offset <n>', 'Items to skip', '0')
    .option('--category-id <id>', 'Filter by category ID')
    .option('--active <1|0>', 'Filter by active status')
    .option('--top <1|0>', 'Filter top articles')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<Paginated<ArticleSummary>>('/articles', {
        params: buildParams({ ...langParam(globalOpts), limit: opts.limit, offset: opts.offset, category_id: opts.categoryId, active: opts.active, top: opts.top }),
      });
      printPaginated(data, ['id', 'slug', 'title', 'active', 'top', 'created_at'], globalOpts);
    });

  list
    .command('article-categories')
    .description('List all article categories')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<ArticleCategory[]>('/article-categories', { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  list
    .command('products')
    .description('List products')
    .option('--limit <n>', 'Items per page', '20')
    .option('--offset <n>', 'Items to skip', '0')
    .option('--category <slug>', 'Filter by category slug')
    .option('--active <1|0>', 'Filter by active status')
    .option('--sku <sku>', 'Filter by SKU')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<Paginated<ProductSummary>>('/products', {
        params: buildParams({ ...langParam(globalOpts), limit: opts.limit, offset: opts.offset, category: opts.category, active: opts.active, sku: opts.sku }),
      });
      printPaginated(data, ['id', 'slug', 'name', 'price', 'effective_price', 'sku', 'active'], globalOpts);
    });

  list
    .command('product-categories')
    .description('List product categories (nested tree by default)')
    .option('--flat', 'Return flat array instead of nested tree')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<ProductCategory[]>('/product-categories', {
        params: buildParams({ ...langParam(globalOpts), flat: opts.flat ? '1' : undefined }),
      });
      printData(data, globalOpts);
    });

  list
    .command('product-attributes')
    .description('List product attributes')
    .option('--all', 'Include inactive attributes')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<ProductAttribute[]>('/product-attributes', {
        params: buildParams({ ...langParam(globalOpts), all: opts.all ? '1' : undefined }),
      });
      printData(data, globalOpts);
    });

  list
    .command('attribute-values <attributeId>')
    .description('List predefined values for an attribute')
    .action(async (attributeId, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<AttributeValue[]>(`/product-attributes/${attributeId}/values`, { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  list
    .command('product-variations')
    .description('List all variation categories')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<ProductVariationCategory[]>('/product-variation-categories', { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  list
    .command('product-options')
    .description('List all option categories')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<ProductOptionCategory[]>('/product-options', { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  list
    .command('orders')
    .description('List orders')
    .option('--limit <n>', 'Items per page', '20')
    .option('--offset <n>', 'Items to skip', '0')
    .option('--status <status>', 'Filter by status')
    .option('--customer-id <id>', 'Filter by customer ID')
    .option('--email <email>', 'Filter by email')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<Paginated<OrderSummary>>('/orders', {
        params: buildParams({ limit: opts.limit, offset: opts.offset, status: opts.status, customerId: opts.customerId, email: opts.email }),
      });
      printPaginated(data, ['id', 'status', 'payment_status', 'email', 'total', 'currency', 'created_at'], globalOpts);
    });

  list
    .command('strings')
    .description('List translation strings')
    .option('--group <prefix>', 'Filter by label prefix/group')
    .option('--limit <n>', 'Items per page', '20')
    .option('--offset <n>', 'Items to skip', '0')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<Paginated<{ key: string; value: string }>>('/strings', {
        params: buildParams({ ...langParam(globalOpts), group: opts.group, limit: opts.limit, offset: opts.offset }),
      });
      printPaginated(data, ['key', 'value'], globalOpts);
    });

  list
    .command('indexed-urls')
    .description('List indexed URL records')
    .option('--limit <n>', 'Items per page', '20')
    .option('--offset <n>', 'Items to skip', '0')
    .option('--resource-type <type>', 'Filter by resource type (Page, Product, Article)')
    .option('--active <1|0>', 'Filter by active status')
    .action(async (opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<Paginated<IndexedUrl>>('/indexed-urls', {
        params: buildParams({ limit: opts.limit, offset: opts.offset, resource_type: opts.resourceType, active: opts.active }),
      });
      printPaginated(data, ['id', 'url', 'resource_type', 'resource_id', 'active'], globalOpts);
    });

  list
    .command('product-raw-attrs <productId>')
    .description('List raw attribute values for a product')
    .action(async (productId, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<RawAttributeValue[]>(`/products/${productId}/raw-attribute-values`, { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });
}
