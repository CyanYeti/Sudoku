import Command from "./Commands/Command"
import RedoCommand from "./Commands/RedoCommand"
import UndoCommand from "./Commands/UndoCommand"

class Invoker {
    // Singleton? consult birds
    private UndoStack: Command[]
    private RedoStack: Command[]
    constructor () {
        this.UndoStack = []
        this.RedoStack = []
    }

    public do(command: Command) {
        if(command instanceof UndoCommand){
            let lastCmd = this.UndoStack.pop()
            if (lastCmd === undefined) return
            lastCmd.Undo()
            this.RedoStack.push(lastCmd)
            return
        }
        if(command instanceof RedoCommand){
            let lastCmd = this.RedoStack.pop()
            if (lastCmd === undefined) return
            lastCmd.Redo()
            this.UndoStack.push(lastCmd)
            return
        }
        
        command.Execute()
        this.UndoStack.push(command)
        this.RedoStack.splice(0)
    }
}

export default Invoker;