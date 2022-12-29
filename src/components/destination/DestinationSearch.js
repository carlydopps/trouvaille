export const DestinationSearch = ({setterFunction}) => {
    return <div className="search-dest">
        <input onChange={(event) => {
            setterFunction(event.target.value)
        }}
        type="text" placeholder="Enter city" className="input-search"/>
    </div>
}