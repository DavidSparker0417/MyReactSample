import "@progress/kendo-theme-material/dist/all.css";
import "./App.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useMemo, useState } from 'react';
import ActiveJobs from './components/ActiveJobs';
import TotalJobViews from './components/TotalJobView';
import MostPopularJob from './components/MostPopularJob';
import JobCredits from './components/JobCredits';
import LineChartView from './components/LineChartView';
import { Switch } from '@progress/kendo-react-inputs';

const WidgetOne = () => <div>Widget One</div>;
const WidgetTwo = () => <div>Widget Two</div>;

const initialPositions = [
    { 
        widgetId: "1",
        col: 1,
        colSpan : 2,
        rowSpan : 2,
    },
    { 
        widgetId: "2",
        col: 3,
        colSpan : 1,
        rowSpan : 1,
    },
    {
        widgetId: "3",
        col: 4,
        colSpan: 1,
        rowSpan: 1,
    },
    {
        widgetId: "4",
        col: 3,
        colSpan: 2,
        rowSpan: 2,
    },
    {
        widgetId: "5",
        col: 1,
        colSpan: 2,
        rowSpan: 2,
    },
];

const widgetConfig = [
    {
        id: "1",
        header: "Total job views",
        body: <TotalJobViews />,
        active: true,
    },
    { 
        id: "2",
        header: "Active jobs",
        body: <ActiveJobs />,
        active: true,
    },
    {
        id: "3",
        header: "Job Credits",
        body: <JobCredits />,
        active: true,
    },
    {
        id: "4",
        header: "Most popular job",
        body: <MostPopularJob />,
        active: true,
    },
    {
        id: "5",
        header: "Line Chart view",
        body: <LineChartView />,
        active: true,
    }
];

const getPositions = initialPositions => {
    return(
        JSON.parse(localStorage.getItem("dashboard-positions")) 
        || initialPositions
    );
};

function KendoApp() {
    const [positions, setPositions] = useState(initialPositions);
    const [widgets, setWidgets] = useState(widgetConfig);
    const activeWidgets = useMemo(() => {
        return widgets.reduce((acc, widget) => {
            if (!widget.active) return acc;
            acc.push(widget);
            return acc;
        }, []);
    }, [widgets]);
    const filteredPositions = useMemo(() => {
        return positions.filter(position => {
            return activeWidgets.find(widget => widget.id === position.widgetId)?.active;
        });
    }, [activeWidgets, positions]);

    const handleReposition = e => {
        setPositions(e.value);
        localStorage.setItem("dashboard-positions", JSON.stringify(e.value));
    };

    const onResetLayout = () => {
        setPositions(initialPositions);
        localStorage.setItem("dashboard-positions", JSON.stringify(initialPositions));
    };
    
    const onToggleWidget = e => {
        const { id } = e.target.props;
        const { value } = e.target;
        const updWidgets = widgets.map(widget => {
            if (widget.id === id) {
                return {
                    ...widget,
                    active: value,
                };
            }
            return widget;
        });
        setWidgets(updWidgets);
    }
    return (
        <div>
            <h1 className="text-center">Jobs dashboard</h1>
            <TileLayout
                className="tileLayout"
                columns={4}
                rowHeight={255}
                gap={{rows: 10, columns: 10}}
                positions={filteredPositions}
                items={activeWidgets}
                onReposition={handleReposition}
            />
            <aside className="k-ml-4 dashboardAside">
                <div className="k-mb-6">
                    <button className="k-button" onClick={onResetLayout}>
                        Reset layout
                    </button>
                </div>
                <div>
                    <h2 className="k-mb-4">Toggle Widgets</h2>
                    <div>
                    {
                        widgets.map(widget => 
                            (<div className="k-mb-2" key={widget.id}>
                                <Switch 
                                    checked={widget.active}
                                    onChange={onToggleWidget}
                                    id={widget.id}/>
                                <label className="k-ml-3">{widget.header}</label>
                            </div>))
                    }   
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default KendoApp;