import { Command } from 'commander';

const BASH_SCRIPT = `
_xpress() {
  local cur prev words cword
  _init_completion 2>/dev/null || {
    COMPREPLY=()
    cur="\${COMP_WORDS[COMP_CWORD]}"
    prev="\${COMP_WORDS[COMP_CWORD-1]}"
    words=("\${COMP_WORDS[@]}")
    cword=\$COMP_CWORD
  }

  local global_opts="-s --site -t --token -u --url -l --lang -j --json -q --quiet -v --verbose"
  local cmds="login logout config list get create update delete completion"

  # Walk words to find main command and subcommand, skipping options and their values
  local cmd="" subcmd="" i word
  for (( i=1; i<cword; i++ )); do
    word="\${words[i]}"
    case "\$word" in
      -s|--site|-t|--token|-u|--url|-l|--lang) (( i++ )); continue ;;
      -*) continue ;;
      *)
        if [[ -z "\$cmd" ]]; then cmd="\$word"
        elif [[ -z "\$subcmd" ]]; then subcmd="\$word"
        fi
        ;;
    esac
  done

  if [[ -z "\$cmd" ]]; then
    COMPREPLY=( \$(compgen -W "\$cmds \$global_opts" -- "\$cur") )
    return
  fi

  case "\$cmd" in
    list)
      if [[ -z "\$subcmd" ]]; then
        COMPREPLY=( \$(compgen -W "pages articles article-categories products product-categories product-attributes attribute-values product-variations product-options product-raw-attrs orders strings indexed-urls \$global_opts" -- "\$cur") )
      else
        case "\$subcmd" in
          pages)              COMPREPLY=( \$(compgen -W "--limit --offset --parent \$global_opts" -- "\$cur") ) ;;
          articles)           COMPREPLY=( \$(compgen -W "--limit --offset --category-id --active --top \$global_opts" -- "\$cur") ) ;;
          article-categories) COMPREPLY=( \$(compgen -W "\$global_opts" -- "\$cur") ) ;;
          products)           COMPREPLY=( \$(compgen -W "--limit --offset --category --active --sku \$global_opts" -- "\$cur") ) ;;
          product-categories) COMPREPLY=( \$(compgen -W "--flat \$global_opts" -- "\$cur") ) ;;
          product-attributes) COMPREPLY=( \$(compgen -W "--all \$global_opts" -- "\$cur") ) ;;
          attribute-values)   COMPREPLY=( \$(compgen -W "\$global_opts" -- "\$cur") ) ;;
          product-variations) COMPREPLY=( \$(compgen -W "\$global_opts" -- "\$cur") ) ;;
          product-options)    COMPREPLY=( \$(compgen -W "\$global_opts" -- "\$cur") ) ;;
          product-raw-attrs)  COMPREPLY=( \$(compgen -W "\$global_opts" -- "\$cur") ) ;;
          orders)             COMPREPLY=( \$(compgen -W "--limit --offset --status --customer-id --email \$global_opts" -- "\$cur") ) ;;
          strings)            COMPREPLY=( \$(compgen -W "--group --limit --offset \$global_opts" -- "\$cur") ) ;;
          indexed-urls)       COMPREPLY=( \$(compgen -W "--limit --offset --resource-type --active \$global_opts" -- "\$cur") ) ;;
        esac
      fi
      ;;

    get)
      if [[ -z "\$subcmd" ]]; then
        COMPREPLY=( \$(compgen -W "page article article-category product product-category product-attribute product-variation product-option order indexed-url \$global_opts" -- "\$cur") )
      else
        case "\$subcmd" in
          page|product) COMPREPLY=( \$(compgen -W "--raw --md \$global_opts" -- "\$cur") ) ;;
          *)            COMPREPLY=( \$(compgen -W "\$global_opts" -- "\$cur") ) ;;
        esac
      fi
      ;;

    create)
      if [[ -z "\$subcmd" ]]; then
        COMPREPLY=( \$(compgen -W "page article article-category product product-category product-attribute attribute-value product-variation product-option order \$global_opts" -- "\$cur") )
      else
        case "\$subcmd" in
          page)              COMPREPLY=( \$(compgen -W "--slug --title --template --parent --body --meta-title --meta-description --public --no-public \$global_opts" -- "\$cur") ) ;;
          article)           COMPREPLY=( \$(compgen -W "--slug --title --body --meta-title --meta-description --image --category-id --active --no-active --top --private \$global_opts" -- "\$cur") ) ;;
          article-category)  COMPREPLY=( \$(compgen -W "--slug --title --parent --sort \$global_opts" -- "\$cur") ) ;;
          product)           COMPREPLY=( \$(compgen -W "--slug --name --price --discount --discount-type --sku --barcode --quantity --weight --product-type --active --no-active --category-id --description \$global_opts" -- "\$cur") ) ;;
          product-category)  COMPREPLY=( \$(compgen -W "--slug --title --parent --sort --public --no-public --image \$global_opts" -- "\$cur") ) ;;
          product-attribute) COMPREPLY=( \$(compgen -W "--name --type --filter --active --no-active --prefix --suffix --show-on-card \$global_opts" -- "\$cur") ) ;;
          attribute-value)   COMPREPLY=( \$(compgen -W "--name \$global_opts" -- "\$cur") ) ;;
          product-variation) COMPREPLY=( \$(compgen -W "--name --value-type --layout --sort \$global_opts" -- "\$cur") ) ;;
          product-option)    COMPREPLY=( \$(compgen -W "--name --type --required \$global_opts" -- "\$cur") ) ;;
          order)             COMPREPLY=( \$(compgen -W "--email --items --first-name --last-name --phone --city --address --comment --delivery --payment --office --currency --payment-type \$global_opts" -- "\$cur") ) ;;
        esac
      fi
      ;;

    update)
      if [[ -z "\$subcmd" ]]; then
        COMPREPLY=( \$(compgen -W "page article article-category product product-category product-attribute attribute-value product-raw-attr product-variation product-option order \$global_opts" -- "\$cur") )
      else
        case "\$subcmd" in
          page)              COMPREPLY=( \$(compgen -W "--slug --title --template --parent --body --meta-title --meta-description --public --no-public \$global_opts" -- "\$cur") ) ;;
          article)           COMPREPLY=( \$(compgen -W "--slug --title --body --meta-title --meta-description --image --category-id --active --no-active --top --no-top --private --no-private \$global_opts" -- "\$cur") ) ;;
          article-category)  COMPREPLY=( \$(compgen -W "--title --parent --sort \$global_opts" -- "\$cur") ) ;;
          product)           COMPREPLY=( \$(compgen -W "--name --price --discount --discount-type --sku --barcode --quantity --weight --product-type --active --no-active --category-id --description \$global_opts" -- "\$cur") ) ;;
          product-category)  COMPREPLY=( \$(compgen -W "--title --parent --sort --public --no-public --image \$global_opts" -- "\$cur") ) ;;
          product-attribute) COMPREPLY=( \$(compgen -W "--name --type --filter --no-filter --active --no-active --prefix --suffix --show-on-card --no-show-on-card \$global_opts" -- "\$cur") ) ;;
          attribute-value)   COMPREPLY=( \$(compgen -W "--name \$global_opts" -- "\$cur") ) ;;
          product-raw-attr)  COMPREPLY=( \$(compgen -W "--text --numeric --date \$global_opts" -- "\$cur") ) ;;
          product-variation) COMPREPLY=( \$(compgen -W "--name --value-type --layout --sort \$global_opts" -- "\$cur") ) ;;
          product-option)    COMPREPLY=( \$(compgen -W "--name --type --required --no-required \$global_opts" -- "\$cur") ) ;;
          order)             COMPREPLY=( \$(compgen -W "--status --payment-status --payment-type --comment --metadata \$global_opts" -- "\$cur") ) ;;
        esac
      fi
      ;;

    delete)
      if [[ -z "\$subcmd" ]]; then
        COMPREPLY=( \$(compgen -W "page article article-category product product-category product-attribute attribute-value product-raw-attr product-variation product-option order indexed-url \$global_opts" -- "\$cur") )
      fi
      ;;

    config)
      if [[ -z "\$subcmd" ]]; then
        COMPREPLY=( \$(compgen -W "list show use remove set-lang" -- "\$cur") )
      else
        case "\$subcmd" in
          set-lang) COMPREPLY=( \$(compgen -W "--site" -- "\$cur") ) ;;
        esac
      fi
      ;;

    completion)
      [[ -z "\$subcmd" ]] && COMPREPLY=( \$(compgen -W "bash zsh" -- "\$cur") )
      ;;
  esac
}

complete -F _xpress xpress
`.trimStart();

const ZSH_SCRIPT = `
# Wrap the bash completion function via bashcompinit
autoload -U +X bashcompinit && bashcompinit

${BASH_SCRIPT}`.trimStart();

export function register(program: Command): void {
  const completion = program
    .command('completion')
    .description('Output shell completion script');

  completion
    .command('bash')
    .description('Output bash completion script')
    .action(() => {
      process.stdout.write(BASH_SCRIPT);
      process.stderr.write(
        '\n# To enable, add this to your ~/.bashrc or ~/.bash_profile:\n' +
        '#   eval "$(xpress completion bash)"\n' +
        '# Or write it to a file:\n' +
        '#   xpress completion bash > /etc/bash_completion.d/xpress\n',
      );
    });

  completion
    .command('zsh')
    .description('Output zsh completion script')
    .action(() => {
      process.stdout.write(ZSH_SCRIPT);
      process.stderr.write(
        '\n# To enable, add this to your ~/.zshrc:\n' +
        '#   eval "$(xpress completion zsh)"\n',
      );
    });
}
