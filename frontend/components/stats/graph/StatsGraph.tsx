import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import classes from '../../../styles/pages/stats.module.scss';
import { StatsObjType } from '../../../types/Stats';
import Modal from '../../UI/Modal/Modal';
import { dateToString } from '../../../utils/dates/dateToString';

type GraphSelector<T extends d3.BaseType | null> = d3.Selection<
  T,
  unknown,
  null,
  undefined
>;

interface StatsGraphProps {
  stats: StatsObjType[];
  dataToDisplay: 'weight' | 'fatPercentage' | 'musclesMass';
  basicGoal: string;
}

const StatsGraph: React.FC<StatsGraphProps> = ({
  stats,
  dataToDisplay,
  basicGoal,
}) => {
  const graphRef = useRef<SVGSVGElement>(null);
  const [selector, setSelector] =
    useState<GraphSelector<SVGSVGElement | null> | null>(null);
  const [graph, setGraph] = useState<GraphSelector<SVGGElement> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalHeight, setModalHeight] = useState('30vh');
  const [currentStatToDisplay, setCurrentStatToDisplay] =
    useState<StatsObjType | null>(null);

  const dimensions = {
    marginLeft: 40,
    marginBottom: 40,
    marginRight: 15,
  };

  useEffect(() => {
    if (!window) return;
    window.innerWidth > 768 ? setModalHeight('10vh') : setModalHeight('30vh');
  }, [window.innerWidth]);

  function getFillColor(d: StatsObjType, i: number) {
    let fillColor = 'var(--primary-color)';
    if (i === 0) return 'var(--text-color)';
    const theFormerBigger = stats[i - 1][dataToDisplay]! > d[dataToDisplay]!;
    const theFormerSmaller = stats[i - 1][dataToDisplay]! < d[dataToDisplay]!;
    if (basicGoal === 'lose fat') {
      if (dataToDisplay === 'musclesMass') {
        if (theFormerBigger) return 'red';
        else return fillColor;
      }
      theFormerSmaller && (fillColor = 'red');
    } else if (basicGoal === 'increase muscles mass') {
      switch (dataToDisplay) {
        case 'weight':
          theFormerSmaller && (fillColor = 'red');
          break;
        case 'fatPercentage':
          theFormerSmaller && (fillColor = 'red');
          break;
        case 'musclesMass':
          theFormerBigger && (fillColor = 'red');
          break;
      }
    }
    return fillColor;
  }

  useEffect(() => {
    if (!selector) {
      setSelector(d3.select(graphRef.current));
    } else {
      if (!graph) {
        setGraph(
          selector
            .append('g')
            .attr(
              'transform',
              `translate(${dimensions.marginLeft},-${dimensions.marginBottom})`
            )
        );
      } else {
        const sortedStats = stats.filter((stat) => stat[dataToDisplay]);

        const line = d3
          .line()
          .x((d: any) => x(new Date(d.date)))
          .y((d: any) => y(d[dataToDisplay]));

        graph.select('path').remove();

        const path = graph.append('path');

        const xDomain = d3.extent(
          sortedStats.map((stat) => new Date(stat.date))
        ) as [Date, Date];
        const yDomain = [
          d3.min(sortedStats.map((stat) => stat[dataToDisplay] as number))!,
          d3.max(sortedStats.map((stat) => stat[dataToDisplay] as number))! +
            15,
        ];

        const x = d3
          .scaleTime()
          .domain(xDomain)
          .range([0, 320 - dimensions.marginLeft - dimensions.marginRight - 4]);
        const y = d3.scaleLinear().domain(yDomain).range([355, 0]);

        const xAxis = d3
          .axisBottom<Date>(x)
          .ticks(sortedStats.length)
          .tickFormat(d3.timeFormat('%b %d'));

        const yAxis = d3
          .axisLeft(y)
          .ticks(sortedStats.length)
          .tickFormat((d) =>
            dataToDisplay === 'fatPercentage' ? `${d}%` : `${d}Kg`
          );

        graph.select('.xAxis').remove();
        graph.select('.yAxis').remove();

        graph
          .append('g')
          .attr('class', 'xAxis')
          .attr('transform', 'translate(0,400)')
          .call(xAxis)
          .selectAll('text')
          .attr('transform', 'rotate(-40)')
          .attr('text-anchor', 'end')
          .attr('font-size', '10px');

        graph
          .append('g')
          .attr('class', 'yAxis')
          .attr('transform', 'translate(0,45)')
          .call(yAxis);

        const graphPath = path.data([sortedStats]);

        graphPath.exit().remove();

        graphPath
          .enter()
          .attr('fill', 'none')
          .style('z-index', '1')
          .attr('stroke', 'var(--text-color)')
          .attr('stroke-width', '0.5')
          .attr('d', line as any);

        graphPath
          .attr('fill', 'none')
          .style('z-index', '1')
          .attr('stroke', 'var(--text-color)')
          .attr('stroke-width', '0.5')
          .attr('d', line as any);

        const circles = graph.selectAll('circle').data(sortedStats);

        circles.exit().remove();

        const updatedCircles = circles
          .attr('cx', (d: any, i) => {
            if (i === 0) return x(new Date(d.date));
            return x(new Date(sortedStats[i - 1].date));
          })
          .attr('cy', (d: any, i) => {
            if (i === 0) return y(d[dataToDisplay]);
            return y(sortedStats[i - 1][dataToDisplay]!);
          })
          .attr('r', 0)
          .style('cursor', 'pointer');

        updatedCircles
          .transition()
          .duration(450)
          .ease(d3.easeLinear)
          .attr('r', (d, i) => (getFillColor(d, i) === 'red' ? 3 : 5))
          .attr('cx', (d: any) => x(new Date(d.date)))
          .attr('cy', (d: any) => y(d[dataToDisplay]))
          .attr('fill', (d, i) => getFillColor(d, i))
          .style('z-index', '2');

        updatedCircles.on('click', (e, d) => {
          setCurrentStatToDisplay(d);
          setShowModal(true);
        });

        const enterCircles = circles
          .enter()
          .append('circle')
          .attr('cx', (d: any, i) => {
            if (i === 0) return x(new Date(d.date));
            return x(new Date(sortedStats[i - 1].date));
          })
          .attr('cy', (d: any, i) => {
            if (i === 0) return y(d[dataToDisplay]);
            return y(sortedStats[i - 1][dataToDisplay]!);
          })
          .attr('r', 0)
          .style('cursor', 'pointer');

        enterCircles
          .transition()
          .duration(450)
          .ease(d3.easeLinear)
          .attr('r', (d, i) => (getFillColor(d, i) === 'red' ? 3 : 5))
          .attr('cx', (d: any) => x(new Date(d.date)))
          .attr('cy', (d: any) => y(d[dataToDisplay]))
          .attr('fill', (d, i) => getFillColor(d, i))
          .style('z-index', '2');

        enterCircles.on('click', (e, d) => {
          setCurrentStatToDisplay(d);
          setShowModal(true);
        });
      }
    }
  }, [selector, graph, dataToDisplay]);

  return (
    <div className={classes.StatsGraph}>
      {showModal && currentStatToDisplay && (
        <Modal yPosition={modalHeight} onClose={() => setShowModal(false)}>
          <div className={classes.ProgressModal}>
            <h3>
              Your progress from{' '}
              {dateToString(new Date(currentStatToDisplay.date))}
            </h3>
            <div className={classes.statsProgress}>
              <p>
                <strong>Weight: </strong>
                {currentStatToDisplay.weight}(Kg)
              </p>
              {currentStatToDisplay.fatPercentage && (
                <p>
                  <strong>Fat Percentage: </strong>
                  {currentStatToDisplay.weight}%
                </p>
              )}
              {currentStatToDisplay.musclesMass && (
                <p>
                  <strong>Muscles Mass: </strong>
                  {currentStatToDisplay.weight}(Kg)
                </p>
              )}
              <p>
                <strong>Grade: </strong>
                {currentStatToDisplay.deservedGrade}/45
              </p>
            </div>
            {currentStatToDisplay.bodyImageUrl && (
              <div className={classes.Image}>
                <img
                  src={`${process.env.baseURL}/${currentStatToDisplay.bodyImageUrl}`}
                />
              </div>
            )}
          </div>
        </Modal>
      )}
      <h3>Progress Graph</h3>
      <svg ref={graphRef} width={320} height={400}></svg>
      <p>Click the dots for more details.</p>
    </div>
  );
};

export default StatsGraph;
