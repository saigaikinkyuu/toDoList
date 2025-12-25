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

const BUTTOM_MENUE = React.memo(({onToday, onTomorrow, onCalendar}) => {
    return (
        <div>
            <button onClick={onToday}>TODAY</button>
            <button onClick={onTomorrow}>TOMORROW</button>
            <button onClick={onCalendar}>CALENDAR</button>
        </div>
    )
})

const App = () => {
    const [page, setPage] = React.useState("today");

    const menueFuncToday = React.useCallback(() => {
        setPage("today");
    }, []);
    const menueFuncTomorrow = React.useCallback(() => {
        setPage("tomorrow");
    }, []);
    const menueFuncCalendar = React.useCallback(() => {
        setPage("calendar");
    }, []);

    return (
        <div>{page === "calendar" ? (
            <CALENDAR />
        ) : (
            <TODOLIST name={page} />
        )}
            <BUTTOM_MENUE
            onToday={menueFuncToday}
            onTomorrow={menueFuncTomorrow}
            onCalendar={menueFuncCalendar} />
        </div>
    )
}

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)
root.render(<App />)