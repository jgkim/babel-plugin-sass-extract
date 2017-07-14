const sassExtract = require('sass-extract');
const path = require('path');
const astify = require('babel-literal-to-ast');

const extensionsRegex = /(\.scss)|(\.sass)/;

function getRequiredFilePath(requiringPath, requiredPath) {
  return path.posix.resolve(path.posix.join(path.posix.dirname(requiringPath), requiredPath));
}

function extractVariables(absolutePath, compiledFiles, options) {
  let vars;
  if(compiledFiles[absolutePath]) {
    vars = compiledFiles[absolutePath];
  } else {
    vars = compiledFiles[absolutePath] = sassExtract.renderSync(Object.assign({}, options, { file: absolutePath })).vars;
  }

  return vars;
}

module.exports = exports = function extractSass({ options, types: t }) {
  return {
    pre(state) {
      this.compiledFiles = {};
    },
    visitor: {
      ImportDefaultSpecifier(path, { file, opts }) {
        const { value } = path.parentPath.node.source;
        const requiredPath = value;

        if(!extensionsRegex.test(requiredPath)) {
          return;
        }

        const absoluteRequired = getRequiredFilePath(file.opts.filename, requiredPath);
        const vars = extractVariables(absoluteRequired, this.compiledFiles, opts);
        const varsAst = astify(vars);
        const name = path.node.local.name;
        const declaration = t.variableDeclaration('const', [t.variableDeclarator(path.node.local, varsAst)]);
        path.parentPath.replaceWith(declaration);
      },
      CallExpression(path, { file, opts }) {
        const { callee: { name: calleeName }, arguments: args } = path.node;

        if(calleeName !== 'require' || !args.length || !t.isStringLiteral(args[0])) {
          return;
        }

        const [{ value: requiredPath }] = args;

        if(!extensionsRegex.test(requiredPath)) {
          return;
        }

        const absoluteRequired = getRequiredFilePath(file.opts.filename, requiredPath);
        const vars = extractVariables(absoluteRequired, this.compiledFiles, opts);
        const varsAst = astify(vars);
        path.replaceWith(varsAst);
      }
    }
  }
}
