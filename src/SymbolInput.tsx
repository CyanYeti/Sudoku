import { useEffect, useState } from "react"

const SymbolInput = (props: any) => {
    const [guesses, setGuesses] = useState(props.board)
    return (
        <div key="GuessesInput">
            Potential Symbols Used {guesses.GetPotentialGuesses()}
            <input type="text" defaultValue={guesses.GetPotentialGuesses()} onChange={(e) => {
                guesses.SetPotentialGuesses(e.target.value.replaceAll(" ", "").replaceAll(",","").split(""))
                props.update(guesses.Clone())                
            }}/>
        </div>
    )
}

export default SymbolInput