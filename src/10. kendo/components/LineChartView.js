import { useState } from 'react';
import {
    Chart, 
    ChartCategoryAxis, 
    ChartCategoryAxisItem, 
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartTooltip,
    ChartSeriesItemTooltip
} from '@progress/kendo-react-charts';

import { DropDownList } from "@progress/kendo-react-dropdowns";

const data = [
    {value: 3501, date: new Date(2021, 9, 6)},
    {value: 3594, date: new Date(2021, 9, 7)},
    {value: 3599, date: new Date(2021, 9, 8)},
    {value: 3565, date: new Date(2021, 9, 9)},
    {value: 3597, date: new Date(2021, 9, 10)},
    {value: 3608, date: new Date(2021, 9, 11)},
    {value: 3518, date: new Date(2021, 9, 12)},
    {value: 3521, date: new Date(2021, 9, 13)},
];

export default function LineChartView() {
    const [chartStyle, setChartStyle] = useState("normal");
    const categories = [];
    const currencies = [];
    data.map((item, i) => (categories.push(item.date), 
        currencies.push(item.value)));
    return(
    <div>
        <DropDownList
            data = {["step", "smooth"]}
            defaultItem = "normal"
            onChange = {(event) => setChartStyle(event.target.value)}
        />
        <Chart zoomable={{
            mousewheel: {
                lock:"y",
            },
        }}>
            <ChartTooltip  shared={true}/>
            <ChartCategoryAxis>
                <ChartCategoryAxisItem 
                    type="date" 
                    title = {{text:"date"}}
                    categories={categories}/>
            </ChartCategoryAxis>
            <ChartValueAxis>
                <ChartValueAxisItem
                    title= {{text:"currency"}}
                    color="blue"
                />
            </ChartValueAxis>
            <ChartSeries>
                <ChartSeriesItem
                    type="line"
                    data={currencies}
                    style={chartStyle}>
                        <ChartSeriesItemTooltip
                            format="currency: {0}" />
                </ChartSeriesItem>
            </ChartSeries>
        </Chart>
    </div>
    )
};