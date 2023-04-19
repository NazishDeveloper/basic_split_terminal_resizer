// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

const resizeAmount = 30;

function resizeTerminal(command) {
	vscode.commands.executeCommand(command);
	for (let i = 0; i < resizeAmount - 1; i++) {
		setTimeout(() => {
			vscode.commands.executeCommand(command);
		}, 50 * (i + 1));
	}
}


function activate(context) {

	const resizeAmountManual = 8;

	function resizeTerminalManual(command) {
		vscode.commands.executeCommand(command);
		for (let i = 0; i < resizeAmountManual - 1; i++) {
			setTimeout(() => {
				vscode.commands.executeCommand(command);
			}, 50 * (i + 1));
		}
	}

	// context.subscriptions.push(
	// 	vscode.commands.registerCommand('terminalResizer.resizeRight', () => {
	// 		resizeTerminal('workbench.action.terminal.resizePaneRight');
	// 	})
	// );

	// context.subscriptions.push(
	// 	vscode.commands.registerCommand('terminalResizer.resizeLeft', () => {
	// 		resizeTerminal('workbench.action.terminal.resizePaneLeft');
	// 	})
	// );


	vscode.window.onDidChangeActiveTerminal((terminal) => {
		if (terminal) {
			const terminals = vscode.window.terminals;
			console.log(terminals);
			const focusedTerminalIndex = terminals.findIndex((t) => t === terminal);

			if (focusedTerminalIndex !== -1) {
				// if (focusedTerminalIndex === 0) {
				if (focusedTerminalIndex % 2 === 0) {
					resizeTerminal('workbench.action.terminal.resizePaneRight');
				}
				//  else if (focusedTerminalIndex === terminals.length - 1) {
				// 	resizeTerminal('workbench.action.terminal.resizePaneLeft');
				// }
				else {
					resizeTerminal('workbench.action.terminal.resizePaneLeft');
					// setTimeout(() => {
					// 	resizeTerminal('workbench.action.terminal.resizePaneLeft');
					// }, 50 * resizeAmount);
				}
			}
		}
	});

	context.subscriptions.push(
		vscode.commands.registerCommand('terminalResizer.resizeRight', () => {
			resizeTerminalManual('workbench.action.terminal.resizePaneRight');
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('terminalResizer.resizeLeft', () => {
			resizeTerminalManual('workbench.action.terminal.resizePaneLeft');
		})
	);

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
