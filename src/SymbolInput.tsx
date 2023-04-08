import { useEffect, useState } from "react"

const SymbolInput = (props: any) => {
    const [guesses, setGuesses] = useState(props.board)
    return (
        <div key="GuessesInput">
            <div>
                Potential Symbols Used
                <input type="text" defaultValue={guesses.GetPotentialGuesses()} onChange={(e) => {
                    guesses.SetPotentialGuesses(e.target.value.replaceAll(" ", "").replaceAll(",","").split(""))
                    props.update(guesses.Clone())                
                }}/>
            </div>
            <div>
                <input type="text" defaultValue={guesses.size} onChange={(e) => {
                    if (e.target.value === "") return
                    guesses.size = Number(e.target.value)
                    guesses.ClearBoard()
                    console.log(guesses)
                    props.update(guesses.Clone())                
                }}/>
            </div>
        </div>
    )
}

export default SymbolInput