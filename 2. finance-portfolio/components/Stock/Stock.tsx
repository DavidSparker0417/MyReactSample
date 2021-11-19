import React, { 
    useMemo, 
    useState, 
    useEffect,
    useCallback,
 } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@progress/kendo-react-common';
import { MS_PER_DAY } from '@progress/kendo-date-math';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList, ListItemProps } from "@progress/kendo-react-dropdowns";
import styles from './stock.module.scss';
import { ReactComponent as candleIcon } from '../../icons/candle.svg';
import { ReactComponent as lineIcon } from '../../icons/line.svg';
import { ReactComponent as lineArea } from '../../icons/area.svg';
import {    Chart,
            ChartCategoryAxis,
            ChartCategoryAxisItem,
            ChartSeries,
            ChartSeriesItem,
            ChartValueAxis,
            ChartValueAxisItem}
    from '@progress/kendo-react-charts';
import { dataService } from '../../services/dataService';
import { useInternationalization } from '@progress/kendo-react-intl';

const DEFAULT_RANGE = {
    start: new Date(2019, 9, 28),
    end: new Date(2019, 10, 1)
}

const DEFAULT_INTERVAL = {
    unit:'hour',
    step:1,
    duration: MS_PER_DAY/24
}

enum CHART_TYPES {
    candle,
    line,
    area
}

const ChartRangePicker = (props) => {
    const [dateRange, setDateRange] = useState(props.value);
    const handleChange = e => {
        setDateRange(e.value);
        if (props.onChange) {
            props.onChange(e);
        }
    }
    return(
        <DateRangePicker
            calendarSettings = {{views:1}}
            startDateInputSettings = {{label:'', width:130}}
            endDateInputSettings = {{label:'', width:130}}
            value = {dateRange}
            onChange = {handleChange}
            min = {new Date("2019-10-1 00:00:00")}
            max = {new Date("2019-11-1 00:00:00")}
        />
    )
}

const options = [
    {name: '1H', duration: MS_PER_DAY / 24},
    {name: '4H', duration: MS_PER_DAY / 6},
    {name: '12H', duration: MS_PER_DAY / 2},
    {name: '1D', duration: MS_PER_DAY},
    {name: '4D', duration: MS_PER_DAY * 4},
    {name: '1W', duration: MS_PER_DAY * 7},
];

function ChartPredefinedRange(props) {
    const [selected, setSelected] = useState('4D');
    const handleClick = useCallback((e) => {
        e.preventDefault();
        const name = (e.target as HTMLElement).getAttribute('data-name');
        setSelected(name);
        if (!props.last) {return;}
        const end = props.last;
        const start = new Date(end.getTime() - Number((e.target as HTMLElement).getAttribute('data-duration')));
        const value = {start, end};
        if (props.onChange) {
            props.onChange.call(undefined, {value});
        }
    }, [props.last, props.onChange]);
    return(
        <div className="d-inline-block">
            <ul className="k-reset d-flex">
            {
                options.map(o => (
                    <li className="ml-3" key={o.name}>
                        <a
                            href = "#"
                            onClick = {handleClick}
                            data-name={o.name}
                            data-duration={o.duration}
                            className={classNames(
                                'list-item',
                                styles['list-item'],
                                { [styles['list-item-selected']]: o.name === selected },
                            )}
                        >
                            {o.name}
                        </a>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

const customIntervalValueRender = (el, value) => {
    return(
        <el.type
            {...el.props}
            className = {classNames(
                "pl-2",
                el.props.ClassName,
                styles['ddl-list-item'])}
        >
        { value
           ? <span>Interval {value.name} </span>
           : null
        }
        </el.type>
    );
}
const ChartIntervalPicker = (props) => {
    const intervalTimes = React.useMemo(() => [
        {name:"5M", interval: {unit:'minute', step:5, duration: (MS_PER_DAY/24/60)*5}},
        {name:"15M", interval: {unit:'minute', step:15, duration: (MS_PER_DAY/24/60)*15}},
        {name:"30M", interval: {unit:'minute', step:30, duration: (MS_PER_DAY/24/60)*30}},
        {name:"1H", interval: {unit:'hour', step:1, duration: MS_PER_DAY/24}},
        {name:"4H", interval: {unit:'hour', step:4, duration: (MS_PER_DAY/24)*4}},
        {name:"1D", interval: {unit:'day', step:1, duration:MS_PER_DAY}},
        {name:"1W", interval: {unit:'day', step:7, duration:MS_PER_DAY*7}}
    ], []);
    const handleChange = useCallback(
        (event) => {
            if (props.onChangeInterval) {
                props.onChangeInterval(event.target.value.interval)
            }
        }, [props.onChangeInterval]
    );
    return(
        <DropDownList
            data = {intervalTimes}
            style = {{width: 150}}
            valueRender = {customIntervalValueRender}
            value = {intervalTimes.find(i => i.interval.unit === props.value.unit && i.interval.step === props.value.step)}
            onChange = {handleChange}
            textField = {'name'}
        />
    )
}

const customChartTypeValueRender = (el, value) => {
    return(
        <el.type
            {...el.props}
            className = {classNames(
                "pl-2",
                el.props.className,
                styles['ddl-list-item'])}
        >
            {
                (<><value.icon />
                &nbsp;
                <span className="ml-3">{value.name}</span></>)
            }
        </el.type>
    )
}

const customChartTypeItemRender = (el, props:ListItemProps) => {
    return(
        <el.type
            {...el.props}
            className = {classNames(
                "pl-2",
                el.props.className,
                styles['ddl-list-item'],
                {
                    [styles['k-state-selected']] : props.selected
                }
            )}
        >
            {(<>
                <props.dataItem.icon />
                &nbsp;
                <span className="ml-3">{props.dataItem.name}</span>
            </>)
            }
        </el.type>
    )
}
const ChartTypePicker = (props:any) => {
    const data = React.useMemo(() => [
        {name: "Candle", icon: candleIcon, type: CHART_TYPES.candle},
        {name: "Line", icon: lineIcon, type: CHART_TYPES.line},
        {name: "Area", icon: lineArea, type: CHART_TYPES.area},
    ], []);

    const handleChange = (e) => {
        if (props.changeType) {
            props.changeType(e.value.type);
        }
    }
    return(
        <DropDownList
            data = {data}
            style = {{width: 130}}
            value = {data.find(ct => ct.type === props.chartType)}
            valueRender = {customChartTypeValueRender}
            itemRender = {customChartTypeItemRender}
            onChange = {handleChange}
            textField = {'name'}
        />
    )
}

const LineChart = (props) => {
    const intl = useInternationalization();
    return (
        <Chart 
            renderAs="canvas"
            zoomable={false}
        >
            <ChartSeries >
                <ChartSeriesItem
                    data = {props.data}
                    type="line"
                    field="close"
                    color="#007BFF"
                    style={"smooth"}
                    categoryAxis="close"
                    axis="valueCloseAxis"
                    categoryField="date"
                    markers={{visible:true, border:{color: '#007BFF'}}}
                    tooltip={{background:"#007BFF", visible:true, format:"{0:c}"}}
                />
            </ChartSeries>
            <ChartValueAxis>
                <ChartValueAxisItem 
                    name="valueCloseAxis"
                    labels = {{content: ({value}) => intl.formatNumber(value, 'c')}}
                />
            </ChartValueAxis>
            <ChartCategoryAxis>
                <ChartCategoryAxisItem 
                    type="date"
                    name="close"
                    baseUnit = {props.interval.unit}
                    baseUnitStep = {props.interval.step}
                    min = {props.range.start}
                    max = {props.range.end}
                />
            </ChartCategoryAxis>
        </Chart>
    )
}
export default function Stock() {
    const { symbol = "SNAP" } = useParams();
    const [data, setData] = useState([]);
    const [range, setRange] = useState(DEFAULT_RANGE);
    const [chartType, setChartType] = useState(CHART_TYPES.line);
    const [interval, setInterval] = useState(DEFAULT_INTERVAL)
    
    const handleRangeChange = React.useMemo(() => e => {
        setRange(e.value);
    }, [setRange]);

    const chartComp = useMemo(() => {
        return <LineChart data={data} interval={interval} range={range}/>;
    }, [data, interval, range]);

    const fetchData = useCallback(async () => {
      const newData = await dataService.getSymbol(symbol);
      setData(newData);
    }, [symbol])

    useEffect(() => {
        fetchData()
    }, [fetchData]);
    const handleChangeInterval = (i) => setInterval(i);
    const handleChangeChartType = (t) => setChartType(t);
    return(
        <>
        <div className="row">
            <div className="col-12 col-lg-4 mb-3 mt-lg-0 text-center text-lg-left">
                <ChartRangePicker
                    value={range}
                    onChange={handleRangeChange}
                />
            </div>
            <div className="col-12 col-lg-4 mb-3 text-center m-lg-auto">
                <ChartPredefinedRange 
                    last={(data && data.length) ? new Date(data[data.length-1].timestamp): null}
                    onChange = {handleRangeChange}
                />
            </div>
            <div className="col-12 col-lg-4 text-center text-lg-right">
                <ChartIntervalPicker
                    value={interval}
                    onChangeInterval= {handleChangeInterval}
                />
                <ChartTypePicker
                    chartType = {chartType}
                    changeType = {handleChangeChartType}
                />
            </div>
        </div>
        <div className="row mt-3">
            <div className="col">
                {chartComp}
            </div>
        </div>
        </>
    )
}
