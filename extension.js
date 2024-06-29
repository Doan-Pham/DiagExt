const vscode = require("vscode");
const { exec } = require("child_process");
const path = require("path");
const os = require("os");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "diagext" is now active!');
  const disposable = vscode.commands.registerCommand(
    "diagext.generateClassDiagramPlantUml",
    async (uri) => {
      console.log(uri.fsPath);

      const outputUri = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        canSelectMany: false,
        openLabel: "Select Output Folder",
      });

      if (!outputUri) {
        vscode.window.showErrorMessage("No output folder selected.");
        return;
      }

      const outputPath = outputUri[0].fsPath;
      console.log("Output Path:", outputPath);

      const diagramName = await vscode.window.showInputBox({
        prompt: "Enter the name of the diagram file",
        placeHolder: "DiagramName",
      });

      if (!diagramName) {
        vscode.window.showErrorMessage("No diagram name provided.");
        return;
      }

      console.log("Diagram Name:", diagramName);

      const downloadsPath = path.join(os.homedir(), "Downloads");
      const jarPath = path.join(downloadsPath, "diagext-java-parser.jar");
      const command = `java -jar "${jarPath}" "${uri.fsPath}" "${outputPath}" "${diagramName}"`;
      console.log("Executing command:", command);

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Error:", stderr);
          vscode.window.showErrorMessage(`Error: ${stderr}`);
          return;
        }
        vscode.window.showInformationMessage("Diagram generated successfully!");
        console.log("Output:", stdout);
      });
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
