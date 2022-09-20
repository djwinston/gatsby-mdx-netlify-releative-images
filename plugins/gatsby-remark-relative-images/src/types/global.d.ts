
import { Node, Actions, Reporter } from "gatsby";

declare global {

  type GatsbyFile = Node & {
    absolutePath: string;
    sourceInstanceName: string;
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
    reporter: Reporter
  };
}

export { }