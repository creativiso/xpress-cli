import { Command } from 'commander';
import * as loginCmd from '../commands/login';
import * as logoutCmd from '../commands/logout';
import * as configCmd from '../commands/config';
import * as listCmd from '../commands/list';
import * as getCmd from '../commands/get';
import * as createCmd from '../commands/create';
import * as updateCmd from '../commands/update';
import * as deleteCmd from '../commands/delete';
import * as completionCmd from '../commands/completion';

const program = new Command();

program
  .name('xpress')
  .description('Official CLI for the Creativiso Xpress public REST API')
  .version('0.1.0')
  .option('-s, --site <site>', 'Named site to use (overrides default)')
  .option('-t, --token <token>', 'API bearer token (overrides config)')
  .option('-u, --url <url>', 'API base URL (overrides config)')
  .option('-l, --lang <lang>', 'Language code (overrides config defaultLang)')
  .option('-j, --json', 'Output raw JSON')
  .option('-q, --quiet', 'Suppress non-data output')
  .option('-v, --verbose', 'Print HTTP request details to stderr');

loginCmd.register(program);
logoutCmd.register(program);
configCmd.register(program);
listCmd.register(program);
getCmd.register(program);
createCmd.register(program);
updateCmd.register(program);
deleteCmd.register(program);
completionCmd.register(program);

program.addHelpText('after', `
Resources:
  list     pages, articles, article-categories, products, product-categories,
           product-attributes, attribute-values, product-variations,
           product-options, product-raw-attrs, orders, strings, indexed-urls

  get      page, article, article-category, product, product-category,
           product-attribute, product-variation, product-option, order, indexed-url

  create   page, article, article-category, product, product-category,
           product-attribute, attribute-value, product-variation, product-option, order

  update   page, article, article-category, product, product-category,
           product-attribute, attribute-value, product-raw-attr,
           product-variation, product-option, order

  delete   page, article, article-category, product, product-category,
           product-attribute, attribute-value, product-raw-attr,
           product-variation, product-option, order, indexed-url

Examples:
  xpress list pages
  xpress list orders --status shipped
  xpress get page 5
  xpress get product 12 --raw
  xpress create article --slug my-post --title "My Post"
  xpress update order 100 --status completed
  xpress delete product 5
  xpress list pages -s staging -j`);

program.parseAsync(process.argv).catch((err: Error) => {
  process.stderr.write(`Fatal: ${err.message}\n`);
  process.exit(1);
});
