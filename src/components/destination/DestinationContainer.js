import { useState } from "react"
import { DestinationList } from "./DestinationList"
import { DestinationSearch } from "./DestinationSearch"

export const DestinationContainer = () => {

    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <DestinationSearch setterFunction={setSearchTerms}/>
        <DestinationList searchTermState={searchTerms}/>
    </>
}