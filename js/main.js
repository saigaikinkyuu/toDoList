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

    console.log("描画-Frame1");

    const menueFuncToday = React.useCallback(() => {
        setPage("today");
    },[]);
    const menueFuncTomorrow = React.useCallback(() => {
        setPage("tomorrow");
    },[]);
    const menueFuncCalendar = React.useCallback(() => {
        setPage("calendar");
    },[]);

    const BOTTOM_MENUE = () => {
        return (
            <div>
                <button onClick={menueFuncToday}>TODAY</button>
                <button onClick={menueFuncTomorrow}>TOMORROW</button>
                <button onClick={menueFuncCalendar}>CALENDAR</button>
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