import { Node, Actions } from "gatsby"

declare global {

  type GatsbyFile = {
    absolutePath: string;
  };

  type PluginOptions = {
    staticFolderName: string;
    include: string[];
    exclude: string[];
  };

  type GatsbyPluginArgs = {
    node: Node;
    getNodesByType: (type: string) => GatsbyFile[];
    actions: Actions;
    reporter: {
      info: (msg: string, error?: Error) => void;
    };
  };
}

export { }