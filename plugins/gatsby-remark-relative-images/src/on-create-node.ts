import path from 'node:path';
import { defaults, isString } from 'lodash';
import traverse from 'traverse';
import { slash, findMatchingFile } from './utils'
import { Node, Actions } from "gatsby"

export const defaultPluginOptions = {
  staticFolderName: 'static',
  include: [],
  exclude: [],
};

export type GatsbyPluginArgs = {
  node: Node;
  getNodesByType: (type: string) => GatsbyFile[];
  actions: Actions;
  reporter: {
    info: (msg: string, error?: Error) => void;
  };
};

export const onCreateNode = (
  { node, getNodesByType, actions }: GatsbyPluginArgs,
  pluginOptions: PluginOptions,
) => {
  const { createNodeField, createNode } = actions
  const options = defaults(pluginOptions, defaultPluginOptions);

  if (/* node.internal.type === `MarkdownRemark` || */ node.internal.type === `Mdx`) {
    const files = getNodesByType(`File`);

    const directory = node.internal.contentFilePath ? path.dirname(node.internal.contentFilePath) : '';

    // Deeply iterate through frontmatter data for absolute paths
    traverse(node.frontmatter).forEach(function (value) {
      if (!isString(value)) return;
      if (!path.isAbsolute(value) || !path.extname(value)) return;

      const paths = this.path.reduce<string[]>((acc, current) => {
        acc.push(acc.length > 0 ? [acc, current].join('.') : current);
        return acc;
      }, []);

      let shouldTransform = options.include.length < 1;

      if (options.include.some((a) => paths.includes(a))) {
        shouldTransform = true;
      }

      if (options.exclude.some((a) => paths.includes(a))) {
        shouldTransform = false;
      }

      if (!shouldTransform) return;

      const file = findMatchingFile(value, files, options);

      if (!directory) return
      const newValue = slash(path.relative(directory, file.absolutePath));

      this.update(newValue);
    });
    // createNodeField({ node, value: null })
  }
};
