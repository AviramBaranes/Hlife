import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import classes from '../../styles/pages/program.module.scss';
import { WorkoutType } from '../../types/Program';
import Modal from '../UI/Modal/Modal';
import { Exercise } from '../Registration/workout/Forms/Exercise';

type SvgSelector = d3.Selection<SVGSVGElement | null, unknown, null, undefined>;
type GraphType = d3.Selection<SVGGElement, unknown, null, undefined>;
interface HierarchyData {
  title: string;
  parent: string;
  totalReps?: number;
  time?: number;
  order?: number;
  originalExercise?: Exercise;
  originalWorkout?: WorkoutType;
}

const ProgramGraph: React.FC<{ allWorkouts: WorkoutType[] }> = ({
  allWorkouts,
}) => {
  //select element for regular programs or fb+aerobic program
  //data in
  const regularCirclePack = useRef<SVGSVGElement>(null);
  const aerobicCirclePack = useRef<SVGSVGElement>(null);

  const [regularSelector, setRegularSelector] = useState<SvgSelector | null>(
    null
  );
  const [aerobicSelector, setAerobicSelector] = useState<SvgSelector | null>(
    null
  );
  const [regularGraph, setRegularGraph] = useState<GraphType | null>(null);
  const [aerobicGraph, setAerobicGraph] = useState<GraphType | null>(null);
  const [showAerobicModal, setShowAerobicModal] = useState(false);
  const [showRegularModal, setShowRegularModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentAerobicWorkout, setCurrentAerobicWorkout] =
    useState<WorkoutType | null>(null);
  const [programStyle, setProgramStyle] = useState('');
  const [currentCircle, setCurrentCircle] = useState<'full body' | 'aerobic'>(
    'full body'
  );

  useEffect(() => {
    let style = '';
    allWorkouts.forEach((workout) => {
      if (workout.trainingDayName === 'FB' && !style) style = 'FB';
      if (workout.trainingDayName === 'aerobic' && !style) style = 'aerobic';
      if (
        (workout.trainingDayName === 'FB' && style === 'aerobic') ||
        (workout.trainingDayName === 'aerobic' && style === 'FB')
      )
        style = 'FB & aerobic';
    });
    style = style || 'default';
    setProgramStyle(style);
  }, []);

  function createAerobicHierarchyData() {
    const data: HierarchyData[] = [{ title: 'Program', parent: '' }];
    allWorkouts.forEach((workout) => {
      if (workout.trainingDayName === 'aerobic') {
        data.push({
          title: workout.name,
          parent: 'Program',
          time: workout.time,
          originalWorkout: workout,
        });
      }
    });
    return data;
  }

  function createFBHierarchyData() {
    const data: HierarchyData[] = [];

    allWorkouts.forEach((workout) => {
      if (workout.trainingDayName === 'FB') {
        data.push({
          title: workout.name,
          parent: '',
        });
        workout.exercises.forEach((exercise, i) =>
          data.push({
            parent: workout.name,
            title: exercise.name,
            order: i + 1,
            totalReps: exercise.reps * exercise.sets,
            originalExercise: exercise,
          })
        );
      }
    });
    return data;
  }

  function createDefaultHierarchyData() {
    const data: HierarchyData[] = [{ title: 'Program', parent: '' }];
    allWorkouts.forEach((workout) => {
      data.push({
        title: workout.name,
        parent: 'Program',
      });

      workout.exercises.forEach((exercise, i) =>
        data.push({
          title: exercise.name,
          parent: workout.name,
          totalReps: exercise.sets * exercise.reps,
          order: i + 1,
          originalExercise: exercise,
        })
      );
    });
    return data;
  }

  useEffect(() => {
    if (
      (programStyle === 'FB & aerobic' && currentCircle === 'aerobic') ||
      programStyle === 'aerobic'
    )
      return;
    if (!regularSelector) {
      setRegularSelector(d3.select(regularCirclePack.current));
    } else {
      if (!regularGraph) {
        const graph = regularSelector.append('g');
        setRegularGraph(graph);
      } else {
        let rootNode: d3.HierarchyNode<unknown>;
        if (programStyle === 'default')
          rootNode = d3
            .stratify()
            .id((d: any) => d.title)
            .parentId((d: any) => d.parent)(createDefaultHierarchyData())
            .sum((d: any) => d.totalReps);
        else
          rootNode = d3
            .stratify()
            .id((d: any) => d.title)
            .parentId((d: any) => d.parent)(createFBHierarchyData())
            .sum((d: any) => d.totalReps);

        const pack = d3.pack().size([315, 315]).padding(5);

        const circlePackData = pack(rootNode).descendants();

        const nodes = regularGraph
          .selectAll('g')
          .data(circlePackData)
          .enter()
          .append('g')
          .attr('transform', (d) => `translate(${d.x},${d.y})`);

        nodes
          .append('circle')
          .attr('r', (d) => d.r)
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('fill', 'rgba(27, 214, 105, 0.302)');

        const exerciseNodes = nodes.filter((d) => !d.children);

        exerciseNodes.style('cursor', 'pointer');

        exerciseNodes.on('click', (e, d: any) => {
          setCurrentExercise(d.data.originalExercise);
          setShowRegularModal(true);
        });

        exerciseNodes
          .append('text')
          .attr('text-anchor', 'middle')
          .style('font-size', (d) => d.r * 0.3)
          .style('font-weight', 'bolder')
          .text((d: any) => d.data.title);

        nodes
          .filter((d: any) => d.data.parent === 'Program')
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('transform', (d: any) => `translate(0,-${d.r - 16})`)
          .style('font-size', 16)
          .style('font-weight', 'bolder')
          .text((d: any) => d.data.title);
      }
    }
  }, [regularSelector, regularGraph, currentCircle]);

  useEffect(() => {
    console.log(1);
    if (
      !(
        (programStyle === 'FB & aerobic' && currentCircle === 'aerobic') ||
        programStyle === 'aerobic'
      )
    )
      return;
    console.log(2);
    if (!aerobicSelector) {
      setAerobicSelector(d3.select(aerobicCirclePack.current));
    } else {
      if (!aerobicGraph) {
        const graph = aerobicSelector.append('g');
        setAerobicGraph(graph);
      } else {
        const rootNode = d3
          .stratify()
          .id((d: any) => d.title)
          .parentId((d: any) => d.parent)(createAerobicHierarchyData())
          .sum((d: any) => d.time);

        const pack = d3.pack().size([315, 315]).padding(5);

        const circlePackData = pack(rootNode).descendants();

        console.log(circlePackData);

        const nodes = aerobicGraph
          .selectAll('g')
          .data(circlePackData)
          .enter()
          .append('g')
          .attr('transform', (d) => `translate(${d.x},${d.y})`);

        nodes
          .append('circle')
          .attr('r', (d) => d.r)
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('fill', 'rgba(27, 214, 105, 0.302)');

        const exerciseNodes = nodes.filter((d) => !d.children);

        exerciseNodes.style('cursor', 'pointer');

        exerciseNodes.on('click', (e, d: any) => {
          setCurrentAerobicWorkout(d.data.originalWorkout);
          setShowAerobicModal(true);
        });

        nodes
          .filter((d: any) => d.data.parent === 'Program')
          .append('text')
          .attr('text-anchor', 'middle')
          .style('font-size', (d: any) => 5 + d.data.time * 0.051)
          .style('font-weight', 'bolder')
          .text((d: any) => d.data.title);
      }
    }
  }, [aerobicSelector, aerobicGraph, currentCircle]);

  return (
    <div className={classes.GraphSec}>
      {showRegularModal && currentExercise && (
        <Modal yPosition='40vh' onClose={() => setShowRegularModal(false)}>
          <div className={classes.ExerciseModal}>
            <p>
              <strong>Exercise: </strong>
              {currentExercise.name}
            </p>
            <p>
              <strong>Reps: </strong>
              {currentExercise.reps}
            </p>
            <p>
              <strong>Sets: </strong>
              {currentExercise.sets}
            </p>
            {currentExercise.description && (
              <p>
                <strong>Description: </strong>
                {currentExercise.description}
              </p>
            )}
            {currentExercise.muscles && (
              <p>
                <strong>Muscles: </strong>
                {currentExercise.muscles.join(', ')}
              </p>
            )}
          </div>
        </Modal>
      )}
      {showAerobicModal && currentAerobicWorkout && (
        <Modal yPosition='40vh' onClose={() => setShowAerobicModal(false)}>
          <div className={classes.ExerciseModal}>
            <p>
              <strong>Workout: </strong>
              {currentAerobicWorkout.name}
            </p>
            <p>
              <strong>Time: </strong>
              {currentAerobicWorkout.time} (Minutes)
            </p>
            {currentAerobicWorkout.description && (
              <p>
                <strong>Description: </strong>
                {currentAerobicWorkout.description}
              </p>
            )}
          </div>
        </Modal>
      )}
      <h3>Workout Graph</h3>
      <p>
        The following graph represent each exercise in your workout/s, the
        bigger the circle the longer and more dominant the exercise.
      </p>
      {programStyle === 'FB & aerobic' && (
        <div className={classes.Checkbox}>
          <input
            id='changeGraph'
            className='Checkbox'
            type='checkbox'
            onClick={() =>
              setCurrentCircle((prev) =>
                prev === 'full body' ? 'aerobic' : 'full body'
              )
            }
          />
          <label className='SwitchLabel' htmlFor='changeGraph'></label>
        </div>
      )}
      <div className={classes.Graphs}>
        <svg
          display={
            (programStyle === 'FB & aerobic' && currentCircle === 'aerobic') ||
            programStyle === 'aerobic'
              ? 'block'
              : 'none'
          }
          ref={aerobicCirclePack}
          height={320}
          width={320}
        ></svg>
        <svg
          display={
            (programStyle === 'FB & aerobic' && currentCircle === 'aerobic') ||
            programStyle === 'aerobic'
              ? 'none'
              : 'block'
          }
          ref={regularCirclePack}
          height={320}
          width={320}
        ></svg>
      </div>
      <p>Click the circle for more details.</p>
    </div>
  );
};

export default ProgramGraph;
