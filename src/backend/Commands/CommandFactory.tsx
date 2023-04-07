import LoadCommand from "./LoadCommand"
import RedoCommand from "./RedoCommand"
import UndoCommand from "./UndoCommand"
import RunCommand from "./RunCommand"
import Command from "./Command"
import Invoker from "../Invoker"
import SetCellCommand from "./SetCellCommand"

class CommandFactory {
    // make singleton
    invoker = new Invoker()
    public CreateAndDo(command: string, commandParams: any[]){
        let newCommand: Command
        switch (command) {
            case "load":
                newCommand = new LoadCommand(commandParams)
                break
            case "undo":
                newCommand = new UndoCommand(commandParams)
                break
            case "redo":
                newCommand = new RedoCommand(commandParams)
                break
            case "run":
                newCommand = new RunCommand(commandParams)
                break
            case "setcell":
                newCommand = new SetCellCommand(commandParams)
                break
            default:
                return
        }
        this.invoker.do(newCommand);
    }
}

export default CommandFactory;