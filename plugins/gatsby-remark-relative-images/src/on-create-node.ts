import path from 'node:path';
// import fs from 'node:fs'
import { defaults, isString } from 'lodash';
import traverse from 'traverse';
import { slash, findMatchingFile } from './utils'

export const defaultPluginOptions = {
  staticFolderName: 'static',
  include: [],
  exclude: [],
};

export const onCreateNode = (
  { node, getNodesByType, reporter }: GatsbyPluginArgs,
  pluginOptions: PluginOptions,
) => {
  // const { createNodeField, createNode } = actions
  const options = defaults(pluginOptions, defaultPluginOptions);

  if (/* node.internal.type === `MarkdownRemark` || */ node.internal.type === `Mdx`) {    
    const files = getNodesByType(`File`).filter(node => node.internal.mediaType?.includes('image'));
    //debug
    // console.log(`TCL>>> ~ files`, files)    
    // const filesList = JSON.stringify(files)
    // const NodeObj = JSON.stringify(node)
    // fs.writeFileSync('logNode.json', NodeObj, { flag: 'a' })

    try {
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
    } catch (error) {
      if (error instanceof Error) reporter.panic('gatsby-remark-relative-images Error', error)      
    }

  }
};
