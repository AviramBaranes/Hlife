import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
    marginBottom: 45,
    marginRight: 15,
  };

  global.window &&
    useEffect(() => {
      if (!window) return;
      window.innerWidth > 768 ? setModalHeight('10vh') : setModalHeight('30vh');
    }, [window.innerWidth]);

  function getFillColor(d: StatsObjType, i: number) {
    if (i === 0) return 'var(--text-color)';
    let fillColor = 'var(--primary-color)';
    const theFormerBigger = stats[i - 1][dataToDisplay]! > d[dataToDisplay]!;
    const theFormerSmaller = stats[i - 1][dataToDisplay]! < d[dataToDisplay]!;

    if (dataToDisplay === 'fatPercentage' && theFormerSmaller)
      fillColor = 'red';
    if (dataToDisplay === 'musclesMass' && theFormerBigger) fillColor = 'red';
    if (dataToDisplay === 'weight') {
      basicGoal === 'lose fat' && theFormerSmaller && (fillColor = 'red');
      basicGoal === 'increase muscles mass' &&
        theFormerBigger &&
        (fillColor = 'red');
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
            .attr('transform', `translate(${dimensions.marginLeft},10)`)
        );
      } else {
        const sortedStats = stats.filter((stat) => stat[dataToDisplay]);

        d3.select('.dottedLine').remove();
        const dottedLines = graph
          .append('g')
          .attr('class', 'dottedLine')
          .style('opacity', '0');

        const xDottedLine = dottedLines
          .append('line')
          .attr('stroke', 'var(--text-color)')
          .attr('stroke-width', 0.5)
          .attr('stroke-dasharray', 4);
        const yDottedLine = dottedLines
          .append('line')
          .attr('stroke', 'var(--text-color)')
          .attr('stroke-width', 0.5)
          .attr('stroke-dasharray', 4);

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
          d3.max(sortedStats.map((stat) => stat[dataToDisplay] as number))! + 3,
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
          .attr('transform', 'translate(0,355)')
          .call(xAxis)
          .selectAll('text')
          .attr('transform', 'rotate(-40)')
          .attr('text-anchor', 'end')
          .attr('font-size', '10px');

        graph.append('g').attr('class', 'yAxis').call(yAxis);

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

        updatedCircles.on('mouseover', (e, d) => {
          dottedLines.style('opacity', 1);

          xDottedLine
            .attr('x1', x(new Date(d.date)))
            .attr('x2', x(new Date(d.date)))
            .attr('y2', y(d[dataToDisplay]!))
            .attr('y1', y(d[dataToDisplay]!))
            .transition()
            .duration(350)
            .attr('y1', 355);

          yDottedLine
            .attr('y1', y(d[dataToDisplay]!))
            .attr('y2', y(d[dataToDisplay]!))
            .attr('x2', x(new Date(d.date)))
            .attr('x1', x(new Date(d.date)))
            .transition()
            .duration(350)
            .attr('x1', 0);
        });

        updatedCircles.on('mouseleave', () => {
          dottedLines.style('opacity', 0);
        });

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

        enterCircles.on('mouseover', (e, d) => {
          dottedLines.style('opacity', 1);

          xDottedLine
            .attr('x1', x(new Date(d.date)))
            .attr('x2', x(new Date(d.date)))
            .attr('y2', y(d[dataToDisplay]!))
            .attr('y1', y(d[dataToDisplay]!))
            .transition()
            .duration(350)
            .attr('y1', 355);

          yDottedLine
            .attr('y1', y(d[dataToDisplay]!))
            .attr('y2', y(d[dataToDisplay]!))
            .attr('x2', x(new Date(d.date)))
            .attr('x1', x(new Date(d.date)))
            .transition()
            .duration(350)
            .attr('x1', 0);
        });

        enterCircles.on('mouseleave', () => {
          dottedLines.style('opacity', 0);
        });

        enterCircles.on('click', (e, d) => {
          setCurrentStatToDisplay(d);
          setShowModal(true);
        });
      }
    }
  }, [selector, graph, dataToDisplay]);

  return (
    <div data-testid='graph-container' className={classes.StatsGraph}>
      {showModal && currentStatToDisplay && (
        <Modal yPosition={modalHeight} onClose={() => setShowModal(false)}>
          <div data-testid='stats-modal' className={classes.ProgressModal}>
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
                  {currentStatToDisplay.fatPercentage}%
                </p>
              )}
              {currentStatToDisplay.musclesMass && (
                <p>
                  <strong>Muscles Mass: </strong>
                  {currentStatToDisplay.musclesMass}(Kg)
                </p>
              )}
              <p>
                <strong>Grade: </strong>
                {currentStatToDisplay.deservedGrade}/45
              </p>
            </div>
            {currentStatToDisplay.bodyImageUrl && (
              <div className={classes.Image}>
                <Image
                  alt='user picture'
                  width={400}
                  height={400}
                  src={
                    `${process.env.baseURL}/${currentStatToDisplay.bodyImageUrl}` as any
                  }
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
