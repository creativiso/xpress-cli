import { Command } from 'commander';
import { getClientFromCmd, getGlobalOpts, langParam } from './_shared';
import { printData } from '../output/print';
import {
  PageNormalized,
  Article,
  ArticleCategory,
  ProductNormalized,
  ProductAttributeFull,
  ProductVariationCategoryFull,
  ProductOptionCategory,
  Order,
  IndexedUrl,
} from '../types/api';

export function register(program: Command): void {
  const get = program.command('get').description('Get a single resource');

  get
    .command('page <id>')
    .description('Get a page')
    .option('--raw', 'Return raw Sequelize tree')
    .option('--md', 'Return with md_body field')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const suffix = opts.raw ? '/raw' : opts.md ? '/md' : '';
      const { data } = await client.get<PageNormalized>(`/pages/${id}${suffix}`, { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  get
    .command('article <id>')
    .description('Get an article')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<Article>(`/articles/${id}`, { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  get
    .command('article-category <id>')
    .description('Get an article category')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<ArticleCategory>(`/article-categories/${id}`, { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  get
    .command('product <id>')
    .description('Get a product')
    .option('--raw', 'Return raw Sequelize tree')
    .option('--md', 'Return with md_body field')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const suffix = opts.raw ? '/raw' : opts.md ? '/md' : '';
      const { data } = await client.get<ProductNormalized>(`/products/${id}${suffix}`, { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  get
    .command('product-category <id>')
    .description('Get a product category')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<object>(`/product-categories/${id}`, { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  get
    .command('product-attribute <id>')
    .description('Get a product attribute with its predefined values')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<ProductAttributeFull>(`/product-attributes/${id}`, { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  get
    .command('product-variation <id>')
    .description('Get a variation category with all its values')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<ProductVariationCategoryFull>(`/product-variation-categories/${id}`, { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  get
    .command('product-option <id>')
    .description('Get an option category with all its items')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<ProductOptionCategory>(`/product-options/${id}`, { params: langParam(globalOpts) });
      printData(data, globalOpts);
    });

  get
    .command('order <id>')
    .description('Get an order')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<Order>(`/orders/${id}`);
      printData(data, globalOpts);
    });

  get
    .command('indexed-url <id>')
    .description('Get an indexed URL record')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      const { data } = await client.get<IndexedUrl>(`/indexed-urls/${id}`);
      printData(data, globalOpts);
    });
}
