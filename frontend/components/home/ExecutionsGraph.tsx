import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useDispatch } from 'react-redux';

import classes from '../../styles/pages/home.module.scss';
import Modal from '../UI/Modal/Modal';
import { dateToString } from '../../utils/dates/dateToString';
import axiosInstance from '../../utils/axios/axiosInstance';
import { handleAxiosError } from '../../utils/errors/handleRequestErrors';

type D3Select = null | d3.Selection<
  SVGSVGElement | null,
  unknown,
  null,
  undefined
>;

type d3Graph = null | d3.Selection<SVGGElement, unknown, null, undefined>;

type Execution = { rate: number; date: Date };

const colors = ['#D9EFE0', '#B4E0C1', '#8ED0A2', '#68C083', '#30A954'];

const ExecutionsGraph: React.FC<{
  weeklyExecutions: Execution[];
}> = ({ weeklyExecutions }) => {
  const dispatch = useDispatch();
  const [executionsData, setExecutionsData] = useState(weeklyExecutions);
  const [hasExecutions, setHasExecutions] = useState(!!weeklyExecutions.length);
  const [selectElActive, setSelectElActive] = useState(false);
  const [graphToDisplay, setGraphToDisplay] = useState<'pie' | 'bar'>('bar');
  const [showModal, setShowModal] = useState(false);

  const dimensions = {
    height: 320,
    width: (executionsData.length > 7 ? 10 : 40) * executionsData.length + 20,
    marginLeft: 40,
    marginTop: 10,
    marginRight: 25,
    marginBottom: 40,
  };
  const pieDimensions = {
    height: 320,
    width: 310,
    radius: 105,
  };

  const graphWidth =
    dimensions.width - dimensions.marginLeft - dimensions.marginRight;
  const graphHeight =
    dimensions.height - dimensions.marginTop - dimensions.marginBottom;

  const barRef = useRef<SVGSVGElement>(null);
  const pieRef = useRef<SVGSVGElement>(null);

  const [date, setDate] = useState(getScaleTimeDomain());
  const [selectedBarChart, setSelectedBarChart] = useState<D3Select>(null);
  const [selectedPieChart, setSelectedPieChart] = useState<D3Select>(null);
  const [barGraph, setBarGraph] = useState<d3Graph>(null);
  const [pieGraph, setPieGraph] = useState<d3Graph>(null);
  const [avg, setAvg] = useState<number | null>(null);

  function getScaleTimeDomain() {
    let domain = d3.extent(executionsData.map((item) => new Date(item.date)));
    if (domain[0] === domain[1]) {
      const date = new Date(domain[0]!);
      const date2 = new Date(date.setDate(date.getDate() + 1));
      domain = d3.extent([date, date2]);
    }
    return domain;
  }

  const arcPath = d3
    .arc()
    .outerRadius(pieDimensions.radius)
    .innerRadius(pieDimensions.radius / 2);

  const pieTweenEnter = (d: { startAngle: number; endAngle: number }) => {
    const i = d3.interpolate(d.endAngle, d.startAngle);

    return function (t: number) {
      d.startAngle = i(t);
      return arcPath(d as any);
    };
  };

  const pieTweenExit = (d: { startAngle: number; endAngle: number }) => {
    const i = d3.interpolate(d.startAngle, d.endAngle);

    return function (t: number) {
      d.startAngle = i(t);
      return arcPath(d as any);
    };
  };

  useEffect(() => {
    setAvg(
      +(
        executionsData.reduce((prev, curr) => (prev += curr.rate), 0) /
        executionsData.length
      ).toFixed(2)
    );

    //dates title
    setDate(getScaleTimeDomain());
  }, [executionsData]);

  useEffect(() => {
    if (graphToDisplay !== 'bar') return;
    if (!selectedBarChart) {
      setSelectedBarChart(d3.select(barRef.current));
    } else {
      if (!barGraph) {
        const graph = selectedBarChart
          .append('g')
          .attr(
            'transform',
            `translate(${dimensions.marginLeft},${dimensions.marginTop})`
          );
        setBarGraph(graph);
      } else {
        //scales
        const y = d3.scaleLinear().domain([0, 100]).range([graphHeight, 0]);
        const x = d3
          .scaleTime()
          .range([0, graphWidth])
          .domain(getScaleTimeDomain() as [Date, Date]);

        //axis
        const xAxis = d3
          .axisBottom<Date>(x)
          .ticks(executionsData.length > 7 ? 7 : executionsData.length)
          .tickFormat(d3.timeFormat('%b %d'));

        const yAxis = d3
          .axisLeft(y)
          .ticks(4)
          .tickFormat((d) => `${d}%`);

        selectedBarChart.select('.xAxis').remove();
        selectedBarChart.select('.yAxis').remove();

        // Refactor translate x
        selectedBarChart
          .append('g')
          .attr('class', 'xAxis')
          .attr(
            'transform',
            `translate(${
              dimensions.marginLeft +
              (dimensions.width - 100) / executionsData.length / 2
            },${graphHeight + dimensions.marginTop + 3})`
          )
          .call(xAxis)
          .selectAll('text')
          .attr('transform', 'rotate(-40)')
          .attr('text-anchor', 'end')
          .attr('font-size', '10px');

        selectedBarChart
          .append('g')
          .attr('class', 'yAxis')
          .attr(
            'transform',
            `translate(${dimensions.marginLeft - 3},${dimensions.marginTop})`
          )
          .call(yAxis);

        //update graph (enter,remove and update)

        const rects = barGraph.selectAll('rect').data(executionsData);

        rects
          .exit()
          .transition()
          .duration(300)
          .attr('height', 0)
          .attr('y', graphHeight)
          .remove();

        const updatedRects = rects
          .attr('height', 0)
          .attr('y', graphHeight)
          .attr('x', (d) => x(new Date(d.date)))
          .attr('width', dimensions.width / 2 / executionsData.length)
          .attr(
            'fill',
            (d) =>
              `${d.rate === 100 ? 'var(--primary-color)' : 'var(--text-color)'}`
          );

        updatedRects
          .transition()
          .duration(700)
          .delay((_, i) => (i + 1) * 70)
          .ease(d3.easeElastic)
          .attr('y', (d) => y(d.rate))
          .attr('height', (d) => graphHeight - y(d.rate));

        updatedRects.on('click', (e, d) => {
          console.log(d);
          setShowModal(true);
        });

        const enterRects = rects
          .enter()
          .append('rect')
          .attr('width', dimensions.width / 2 / executionsData.length)
          .attr(
            'fill',
            (d) =>
              `${d.rate === 100 ? 'var(--primary-color)' : 'var(--text-color)'}`
          )
          .attr('x', (d) => x(new Date(d.date)))
          .attr('height', 0)
          .attr('y', graphHeight);

        enterRects
          .transition()
          .duration(700)
          .delay((_, i) => (i + 1) * 70)
          .ease(d3.easeElastic)
          .attr('y', (d) => y(d.rate))
          .attr('height', (d) => graphHeight - y(d.rate));
      }
    }
  }, [selectedBarChart, executionsData, barGraph, graphToDisplay]);

  useEffect(() => {
    if (graphToDisplay !== 'pie') return;

    if (!selectedPieChart) {
      setSelectedPieChart(d3.select(pieRef.current));
    } else {
      if (!pieGraph) {
        const graph = selectedPieChart
          .append('g')
          .attr(
            'transform',
            `translate(${pieDimensions.radius + 3},${
              2 * pieDimensions.radius + dimensions.marginTop - 5
            })`
          );
        setPieGraph(graph);
      } else {
        const rates: number[] = executionsData.map((item) => item.rate);
        const dataForPieGraph = [
          { amount: 0, name: 'under 25%' },
          { amount: 0, name: 'under 50%' },
          { amount: 0, name: 'under 75%' },
          { amount: 0, name: 'under 100%' },
          { amount: 0, name: '100%' },
        ];
        rates.forEach((rate) => {
          if (rate < 25) {
            dataForPieGraph[0].amount++;
          } else if (rate < 50) {
            dataForPieGraph[1].amount++;
          } else if (rate < 75) {
            dataForPieGraph[2].amount++;
          } else if (rate < 100) {
            dataForPieGraph[3].amount++;
          } else {
            dataForPieGraph[4].amount++;
          }
        });
        const pie = d3.pie().value((d: any) => d.amount);

        const colorsScale = d3
          .scaleOrdinal()
          .domain(['under 25%', 'under 50%', 'under 75%', 'under 100%', '100%'])
          .range(colors);

        //update graph (enter,remove and update)

        const paths = pieGraph
          .selectAll('path')
          .data(pie(dataForPieGraph as any))
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('d', arcPath as any)
          .attr('fill', (d: any) => colorsScale(d.data.name) as string);

        paths
          .transition()
          .duration(2700)
          .ease(d3.easeElastic.amplitude(0.5))
          .attrTween('d', pieTweenEnter as any);

        paths
          .exit()
          .transition()
          .duration(450)
          .attrTween('d', pieTweenExit as any)
          .remove();

        paths
          .enter()
          .append('path')
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('d', arcPath as any)
          .attr('fill', (d: any) => colorsScale(d.data.name) as string)
          .transition()
          .duration(2700)
          .ease(d3.easeElastic.amplitude(0.5))
          .attrTween('d', pieTweenEnter as any);

        //legend

        const pieLegend = selectedPieChart
          .selectAll('.legend')
          .data(pie(dataForPieGraph as any))
          .enter()
          .append('g')
          .attr(
            'transform',
            (_, i) =>
              `translate(${pieDimensions.radius * 2 - 20},${i * 25 + 10})`
          )
          .attr('class', 'legend');

        pieLegend
          .append('rect')
          .attr('width', 15)
          .attr('height', 15)
          .attr('fill', (d: any) => colorsScale(d.data.name) as string);

        pieLegend
          .append('text')
          .text((d: any) => d.data.name)
          .style('font-size', 10)
          .style('font-weight', 1)
          .style('stroke', 'var(--text-color)')
          .style('stroke-width', 1)
          .attr('y', 11)
          .attr('x', 20);
      }
    }
  }, [selectedPieChart, executionsData, pieGraph, graphToDisplay]);

  function changeGraphHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.checked) setGraphToDisplay('bar');
    if (e.target.checked) setGraphToDisplay('pie');
  }

  function getDateForWeek(weeksNumber: number) {
    const currentDate = new Date();

    return new Date(
      currentDate.setDate(currentDate.getDate() - 7 * weeksNumber)
    );
  }

  async function selectWeekHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;

    const isMonthSelected = +value === 5;

    setSelectElActive(value !== '');

    try {
      const range = isMonthSelected ? 'month' : 'week';
      const date = isMonthSelected
        ? dateToString(new Date())
        : dateToString(getDateForWeek(+value));

      const { data, status } = await axiosInstance.get(
        `/program-exec/by-range/${range}/${date}`
      );

      if (status === 204) {
        setHasExecutions(false);
        return;
      }
      setHasExecutions(true);
      console.log(data);
      setExecutionsData(
        data.map((item: { date: Date; executionRate: number }) => ({
          date: item.date,
          rate: item.executionRate,
        }))
      );
    } catch (err) {
      handleAxiosError(err, dispatch, 'Fetching Executions Failed');
    }
  }

  return (
    <div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2></h2>
          <p></p>
        </Modal>
      )}
      <h3>
        Your weekly Executions:
        <br /> (<time>{dateToString(date[0]!)}</time> to{' '}
        <time>{dateToString(date[1]!)}</time>)
      </h3>
      {avg && <p>Average:{avg}</p>}

      <label htmlFor='changeGraph'>{graphToDisplay}</label>
      <input type='checkbox' id='changeGraph' onChange={changeGraphHandler} />

      {hasExecutions ? (
        <>
          <svg
            display={graphToDisplay === 'bar' ? 'block' : 'none'}
            height={dimensions.height}
            width={dimensions.width}
            ref={barRef}
          ></svg>
          <svg
            display={graphToDisplay === 'pie' ? 'block' : 'none'}
            height={pieDimensions.height}
            width={pieDimensions.width}
            ref={pieRef}
          ></svg>
        </>
      ) : (
        <p>
          No Executions found in this dates, You should declare about workouts
          more often.
        </p>
      )}
      <div className='input-container'>
        <select onChange={selectWeekHandler} id='weekSelect'>
          <option value='' style={{ display: 'none' }}></option>
          <option value={0}>this week</option>
          <option value={1}>1 week ago</option>
          <option value={2}>2 weeks ago</option>
          <option value={3}>3 weeks ago</option>
          <option value={4}>4 weeks ago</option>
          <option value={5}>last month</option>
        </select>
        <label className={selectElActive ? 'Active' : ''} htmlFor='weekSelect'>
          Select week
        </label>
      </div>
    </div>
  );
};

export default ExecutionsGraph;
