/* global hexo */
// 服务端 KaTeX 渲染 $...$ 与 $$...$$ 数学公式
// 参考 hexo-renderer-marked 官方文档的 marked:extensions 用法
const katex = require('katex');

const katexRender = (math, displayMode) =>
  katex.renderToString(math, { displayMode, throwOnError: false });

hexo.extend.filter.register('marked:extensions', function (extensions) {
  // 块级公式：$$ ... $$（可跨多行）
  extensions.push({
    name: 'blockMath',
    level: 'block',
    tokenizer(src) {
      const cap = /^\s{0,3}\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/.exec(src);
      return cap ? { type: 'blockMath', raw: cap[0], math: cap[1] } : undefined;
    },
    renderer(token) {
      return `<p>${katexRender(token.math, true)}\n</p>\n`;
    }
  });

  // 行内公式：$ ... $
  // start() 告诉 marked 在 $ 处停下，否则整段会被 inlineText 当作文本吞掉
  extensions.push({
    name: 'inlineMath',
    level: 'inline',
    start(src) {
      return src.indexOf('$');
    },
    tokenizer(src) {
      // (?!\$) 避免误匹配 $$...$$ 的开头
      const cap = /^\$(?!\$)([^$\n]+?)\$/.exec(src);
      return cap ? { type: 'inlineMath', raw: cap[0], math: cap[1] } : undefined;
    },
    renderer(token) {
      return katexRender(token.math, false);
    }
  });

  // 引用块内的块级公式 $$ ... $$（块级 tokenizer 不会进入引用块内层，按行内规则处理）
  extensions.push({
    name: 'blockMathInline',
    level: 'inline',
    start(src) {
      return src.indexOf('$$');
    },
    tokenizer(src) {
      const cap = /^\$\$([\s\S]+?)\$\$/.exec(src);
      return cap ? { type: 'blockMathInline', raw: cap[0], math: cap[1] } : undefined;
    },
    renderer(token) {
      return katexRender(token.math, true);
    }
  });
});