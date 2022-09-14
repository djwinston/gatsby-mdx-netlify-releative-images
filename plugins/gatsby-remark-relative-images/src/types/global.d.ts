declare global {
  type GatsbyNodePluginArgs = {
    files: GatsbyFile[];
    markdownNode: MarkdownNode;
    markdownAST: any;
    reporter: {
      info: (msg: string, error?: Error) => void;
    };
  };

  type GatsbyFile = {
    absolutePath: string;
  };

  type PluginOptions = {
    staticFolderName: string;
    include: string[];
    exclude: string[];
  };

  type FrontMatterOptions = {
    staticFolderName: string;
    include: string[];
    exclude: string[];
  };

  type MarkdownNode = {
    id: string;
    parent: string;
    url: string;
    frontmatter?: object;
    internal: {
      type: string;
      contentFilePath
    };
    // fileAbsolutePath: string;
  };

  // type Node = {
  //   dir: string;
  // };

  type HtmlNode = {
    value: string;
  } & MarkdownNode;
}

export { }