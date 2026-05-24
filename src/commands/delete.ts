import { Command } from 'commander';
import { getClientFromCmd, getGlobalOpts } from './_shared';
import { success } from '../output/print';

export function register(program: Command): void {
  const del = program.command('delete').description('Delete a resource');

  del
    .command('page <id>')
    .description('Delete a page')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/pages/${id}`);
      success(`Page #${id} deleted.`, globalOpts);
    });

  del
    .command('article <id>')
    .description('Delete an article')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/articles/${id}`);
      success(`Article #${id} deleted.`, globalOpts);
    });

  del
    .command('article-category <id>')
    .description('Delete an article category')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/article-categories/${id}`);
      success(`Article category #${id} deleted.`, globalOpts);
    });

  del
    .command('product <id>')
    .description('Delete a product')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/products/${id}`);
      success(`Product #${id} deleted.`, globalOpts);
    });

  del
    .command('product-category <id>')
    .description('Delete a product category')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/product-categories/${id}`);
      success(`Product category #${id} deleted.`, globalOpts);
    });

  del
    .command('product-attribute <id>')
    .description('Delete a product attribute')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/product-attributes/${id}`);
      success(`Product attribute #${id} deleted.`, globalOpts);
    });

  del
    .command('attribute-value <attributeId> <valueId>')
    .description('Delete a predefined attribute value')
    .action(async (attributeId, valueId, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/product-attributes/${attributeId}/values/${valueId}`);
      success(`Attribute value #${valueId} deleted.`, globalOpts);
    });

  del
    .command('product-raw-attr <productId> <attrId>')
    .description('Delete a raw attribute value from a product')
    .action(async (productId, attrId, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/products/${productId}/raw-attribute-values/${attrId}`);
      success(`Raw attribute deleted from product #${productId}.`, globalOpts);
    });

  del
    .command('product-variation <id>')
    .description('Delete a variation category')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/product-variation-categories/${id}`);
      success(`Variation category #${id} deleted.`, globalOpts);
    });

  del
    .command('product-option <id>')
    .description('Delete an option category')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/product-options/${id}`);
      success(`Option category #${id} deleted.`, globalOpts);
    });

  del
    .command('order <id>')
    .description('Delete an order')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/orders/${id}`);
      success(`Order #${id} deleted.`, globalOpts);
    });

  del
    .command('indexed-url <id>')
    .description('Delete an indexed URL record')
    .action(async (id, opts, cmd) => {
      const client = getClientFromCmd(cmd);
      const globalOpts = getGlobalOpts(cmd);
      await client.delete(`/indexed-urls/${id}`);
      success(`Indexed URL #${id} deleted.`, globalOpts);
    });
}
