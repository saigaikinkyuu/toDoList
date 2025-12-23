const TODOLIST = (props) => {
    return (
        <div>
            <h1>TO DO LIST FOR {props.name}</h1>
        </div>
    )
}

const CALENDAR = () => {
    return (
        <div>
            <h2>CALENDAR VIEW</h2>
        </div>
    )
}

const App = () => {
    const [page, setPage] = React.useState("today");

    const BOTTOM_MENUE = () => {
        return (
            <div>
                <button onclick={() => {setPage("today")}}>TODAY</button>
                <button onclick={() => {setPage("tomorrow")}}>TOMORROW</button>
                <button onclick={() => {setPage("calendar")}}>CALENDAR</button>
            </div>
        )
    }

    if (page === "today" || page === "tomorrow") {
        return (
            <div>
                <TODOLIST name={page}></TODOLIST>
                <BOTTOM_MENUE></BOTTOM_MENUE>
            </div>
        )
    } else if (page === "calendar") {
        return (
            <div>
                <CALENDAR></CALENDAR>
                <BOTTOM_MENUE></BOTTOM_MENUE>
            </div>
        )
    }
}

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)
root.render(<App />)