const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "diagext" is now active!');
  const disposable = vscode.commands.registerCommand(
    "diagext.generateClassDiagramPNG",
    (uri) => {
      console.log(uri.fsPath);
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
