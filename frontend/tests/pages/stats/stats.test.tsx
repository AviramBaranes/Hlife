import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Stats, { getServerSideProps } from '../../../pages/stats';
import store from '../../../redux/store/reduxStore';
import { GoalsType, PhysicalStatsType } from '../../../types/Stats';
import axiosInstance from '../../../utils/axios/axiosInstance';
import * as protectRouteHandler from '../../../utils/protectedRoutes/protectedRoutes';

jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    createPortal(Modal: any) {
      return Modal;
    },
  };
});

describe('get serverSideProps tests', () => {
  let spiedAxios: jest.SpyInstance;

  beforeAll(() => {
    jest
      .spyOn(protectRouteHandler, 'default')
      .mockImplementationOnce(async () => ({
        destination: 'wrong path',
        grade: null,
      }))
      .mockImplementationOnce(async () => ({ destination: '/', grade: null }));
    spiedAxios = jest
      .spyOn(axiosInstance, 'get')
      .mockImplementation(async () => ({ data: 'data' }));
  });

  afterAll(() => jest.restoreAllMocks());

  test('should handle redirect', async () => {
    const { redirect } = (await getServerSideProps({} as any)) as any;

    expect(redirect.destination).toBe('wrong path');
  });

  test('should return the correct props', async () => {
    const { props } = (await getServerSideProps({} as any)) as any;

    expect(props.userGoals).toBe('data');
    expect(props.userStats).toBe('data');
  });

  test('should call axios with the right args', async () => {
    const expectedHeader = {
      headers: {
        Cookie: `jon=jon;`,
      },
    };
    await waitFor(() => {
      const calls = spiedAxios.mock.calls;
      expect(calls[0][0]).toBe('/goals/');
      expect(calls[0][1]).toStrictEqual(expectedHeader);
      expect(calls[1][0]).toBe('/stats');
      expect(calls[1][1]).toStrictEqual(expectedHeader);
    });
  });
});

describe('stats page tests', () => {
  const userGoals: GoalsType = {
    basicGoal: 'lose fat',
    detailGoals: {
      fatPercentage: 20,
      musclesMass: 60,
      weight: 80,
    },
  };
  const userStats: PhysicalStatsType = {
    stats: [
      { weight: 50, date: new Date('11-11-2001'), deservedGrade: 20 },
      {
        weight: 60,
        date: new Date('12-11-2001'),
        deservedGrade: 30,
      },
      { weight: 50, date: new Date('13-11-2001'), deservedGrade: 25 },
    ],
    age: 20,
    name: 'Aviram',
    rank: 'Pro',
  };
  test('should display the right stats data', () => {
    render(
      <Provider store={store}>
        <Stats userGoals={userGoals} userStats={userStats} />
      </Provider>
    );

    const sectionTitle = screen.getByText('Your Stats & Goals');
    const container = sectionTitle.nextSibling;

    expect(sectionTitle).toBeInTheDocument();
    expect(container?.childNodes[0].textContent).toBe('Name: Aviram');
    expect(container?.childNodes[1].textContent).toBe('Age: 20');
    expect(container?.childNodes[2].textContent).toBe('Rank: Pro');
  });

  test('should display the right goals data', () => {
    const { container } = render(
      <Provider store={store}>
        <Stats userGoals={userGoals} userStats={userStats} />
      </Provider>
    );

    const goalsSec = container.children[0].children[0].children[1];

    expect(goalsSec.children[0].textContent).toBe('Main goal: lose fat');
    expect(goalsSec.children[1].textContent).toBe('Desired weight: 80 Kg');
    expect(goalsSec.children[2].textContent).toBe('Desired Fat: 20 %');
    expect(goalsSec.children[3].textContent).toBe('Muscles mass goal: 60 Kg');
  });

  test('should display only weight', () => {
    const modifiedUserGoals = { ...userGoals };
    delete modifiedUserGoals.detailGoals.fatPercentage;
    delete modifiedUserGoals.detailGoals.musclesMass;

    const { container } = render(
      <Provider store={store}>
        <Stats userGoals={modifiedUserGoals} userStats={userStats} />
      </Provider>
    );

    const goalsSec = container.children[0].children[0].children[1];

    expect(goalsSec.children.length).toBe(2);
    expect(goalsSec.children[0].textContent).toBe('Main goal: lose fat');
  });

  test('should display the stats graph (no graph buttons)', () => {
    render(
      <Provider store={store}>
        <Stats userGoals={userGoals} userStats={userStats} />
      </Provider>
    );

    const graphContainer = screen.getByTestId('graph-container');
    const svgGraph = graphContainer.children[1];

    expect(screen.queryByTestId('graph-buttons')).not.toBeInTheDocument();
    expect(svgGraph.tagName).toBe('svg');
    expect(svgGraph.children[0].children.length).toBe(7);
    expect(svgGraph.children[0].children[0].tagName).toBe('g');
    expect(svgGraph.children[0].children[1].tagName).toBe('path');
    expect(svgGraph.children[0].children[2].tagName).toBe('g');
    expect(svgGraph.children[0].children[3].tagName).toBe('g');
    expect(svgGraph.children[0].children[4].tagName).toBe('circle');
    expect(svgGraph.children[0].children[5].tagName).toBe('circle');
    expect(svgGraph.children[0].children[6].tagName).toBe('circle');
  });

  test('should handle fill colors of the graph dots', async () => {
    render(
      <Provider store={store}>
        <Stats userGoals={userGoals} userStats={userStats} />
      </Provider>
    );

    const graphContainer = screen.getByTestId('graph-container');
    const svgGraph = graphContainer.children[1].children[0];

    await waitFor(() => {
      expect(svgGraph.children[4].getAttribute('fill')).toBe(
        'var(--text-color)'
      );
      expect(svgGraph.children[4].getAttribute('r')).toBe('5');
      expect(svgGraph.children[5].getAttribute('fill')).toBe('rgb(255, 0, 0)'); //red
      expect(svgGraph.children[5].getAttribute('r')).toBe('3');
      expect(svgGraph.children[6].getAttribute('fill')).toBe(
        'var(--primary-color)'
      );
      expect(svgGraph.children[6].getAttribute('r')).toBe('5');
    });
  });

  test('should handle hover events on the graph', async () => {
    render(
      <Provider store={store}>
        <Stats userGoals={userGoals} userStats={userStats} />
      </Provider>
    );

    const graphContainer = screen.getByTestId('graph-container');
    const svgGraph = graphContainer.children[1].children[0];
    const linesGroup = svgGraph.children[0] as SVGElement;
    const xDottedLine = linesGroup.children[0];
    const yDottedLine = linesGroup.children[1];

    expect(linesGroup.style.opacity).toBe('0');
    expect(xDottedLine.tagName).toBe('line');
    expect(xDottedLine.getAttribute('x1')).toBe(null);
    expect(xDottedLine.getAttribute('x2')).toBe(null);
    expect(xDottedLine.getAttribute('y1')).toBe(null);
    expect(xDottedLine.getAttribute('y2')).toBe(null);
    expect(yDottedLine.tagName).toBe('line');
    expect(yDottedLine.getAttribute('x1')).toBe(null);
    expect(yDottedLine.getAttribute('x2')).toBe(null);
    expect(yDottedLine.getAttribute('y1')).toBe(null);
    expect(yDottedLine.getAttribute('y2')).toBe(null);

    userEvent.hover(svgGraph.children[5]); //second circle

    expect(linesGroup.style.opacity).toBe('1');

    await waitFor(() => {
      expect(xDottedLine.getAttribute('x1')).toBe('261');
      expect(xDottedLine.getAttribute('x2')).toBe('261');
      expect(xDottedLine.getAttribute('y1')).toBe('355');
      expect(xDottedLine.getAttribute('y2')).toBe('81.9230769230769');
      expect(yDottedLine.getAttribute('x1')).toBe('0');
      expect(yDottedLine.getAttribute('x2')).toBe('261');
      expect(yDottedLine.getAttribute('y1')).toBe('81.9230769230769');
      expect(yDottedLine.getAttribute('y2')).toBe('81.9230769230769');
    });
  });

  test('should handle click events on the graph', () => {
    render(
      <Provider store={store}>
        <Stats userGoals={userGoals} userStats={userStats} />
      </Provider>
    );

    const graphContainer = screen.getByTestId('graph-container');
    const svgGraph = graphContainer.children[1].children[0];

    expect(screen.queryByTestId('stats-modal')).not.toBeInTheDocument();

    userEvent.click(svgGraph.children[5]);

    const modal = screen.getByTestId('stats-modal');
    const detailedStatDiv = modal.children[1];

    expect(modal).toBeInTheDocument();
    expect(detailedStatDiv.children.length).toBe(2);
    expect(detailedStatDiv.children[0].textContent).toBe('Weight: 60(Kg)');
    expect(detailedStatDiv.children[1].textContent).toBe('Grade: 30/45');
  });

  test('should handle graph button clicks (integration  test)', async () => {
    const updatedUserStats = { ...userStats };
    updatedUserStats.stats[0].fatPercentage = 55;
    updatedUserStats.stats[0].musclesMass = 30;
    updatedUserStats.stats[1].fatPercentage = 56;
    updatedUserStats.stats[1].musclesMass = 32;
    updatedUserStats.stats[2].fatPercentage = 20;

    render(
      <Provider store={store}>
        <Stats userGoals={userGoals} userStats={updatedUserStats} />
      </Provider>
    );

    const graphContainer = screen.getByTestId('graph-container');
    const svgGraph = graphContainer.children[1].children[0];
    const graphButtons = screen.getByTestId('graph-buttons');

    //show weight by default
    expect(graphButtons).toBeInTheDocument();
    expect(svgGraph.children.length).toBe(7);
    expect(svgGraph.children[1].tagName).toBe('path');
    expect(svgGraph.children[2].tagName).toBe('g');
    expect(svgGraph.children[3].tagName).toBe('g');
    expect(svgGraph.children[4].tagName).toBe('circle');
    expect(svgGraph.children[5].tagName).toBe('circle');
    expect(svgGraph.children[6].tagName).toBe('circle');
    await waitFor(() => {
      expect(svgGraph.children[4].getAttribute('fill')).toBe(
        'var(--text-color)'
      );
      expect(svgGraph.children[4].getAttribute('r')).toBe('5');
      expect(svgGraph.children[5].getAttribute('fill')).toBe('rgb(255, 0, 0)'); //red
      expect(svgGraph.children[5].getAttribute('r')).toBe('3');
      expect(svgGraph.children[6].getAttribute('fill')).toBe(
        'var(--primary-color)'
      );
      expect(svgGraph.children[6].getAttribute('r')).toBe('5');
      expect(
        svgGraph.children[4].getAttribute('cy')! <
          svgGraph.children[5].getAttribute('cy')!
      ).toBe(true);
      expect(
        svgGraph.children[5].getAttribute('cy')! >
          svgGraph.children[6].getAttribute('cy')!
      ).toBe(true);
    });

    userEvent.click(graphButtons.children[1]);

    //show fatPercentage
    expect(graphButtons).toBeInTheDocument();
    expect(svgGraph.children.length).toBe(7);
    expect(svgGraph.children[0].tagName).toBe('circle');
    expect(svgGraph.children[1].tagName).toBe('circle');
    expect(svgGraph.children[2].tagName).toBe('circle');
    expect(svgGraph.children[3].tagName).toBe('g'); //-> dotted lines
    expect(svgGraph.children[4].tagName).toBe('path');
    expect(svgGraph.children[5].tagName).toBe('g');
    expect(svgGraph.children[6].tagName).toBe('g');
    await waitFor(() => {
      expect(svgGraph.children[0].getAttribute('fill')).toBe(
        'var(--text-color)'
      );
      expect(svgGraph.children[0].getAttribute('r')).toBe('5');
      expect(svgGraph.children[1].getAttribute('fill')).toBe('rgb(255, 0, 0)'); //red
      expect(svgGraph.children[1].getAttribute('r')).toBe('3');
      expect(svgGraph.children[2].getAttribute('fill')).toBe(
        'var(--primary-color)'
      );
      expect(svgGraph.children[2].getAttribute('r')).toBe('5');

      expect(
        svgGraph.children[0].getAttribute('cy')! >
          svgGraph.children[1].getAttribute('cy')!
      ).toBe(true);
      expect(
        svgGraph.children[1].getAttribute('cy')! <
          svgGraph.children[2].getAttribute('cy')!
      ).toBe(true);
    });

    userEvent.click(graphButtons.children[2]);

    //show musclesMass
    expect(graphButtons).toBeInTheDocument();
    expect(svgGraph.children.length).toBe(6);
    expect(svgGraph.children[0].tagName).toBe('circle');
    expect(svgGraph.children[1].tagName).toBe('circle');
    expect(svgGraph.children[2].tagName).toBe('g');
    expect(svgGraph.children[3].tagName).toBe('path');
    expect(svgGraph.children[4].tagName).toBe('g');
    expect(svgGraph.children[5].tagName).toBe('g');
    await waitFor(() => {
      expect(svgGraph.children[0].getAttribute('fill')).toBe(
        'var(--text-color)'
      );
      expect(svgGraph.children[0].getAttribute('r')).toBe('5');
      expect(svgGraph.children[1].getAttribute('fill')).toBe(
        'var(--primary-color)'
      ); //red
      expect(svgGraph.children[1].getAttribute('r')).toBe('5');
    });
  });

  test('should handle the condition for displaying the add stats btn', () => {
    const mockReturnValue = new Date('11-11-2001').setHours(0, 0, 0, 0);
    Date.prototype.setHours = jest.fn(() => mockReturnValue);

    render(
      <Provider store={store}>
        <Stats userGoals={userGoals} userStats={userStats} />
      </Provider>
    );

    expect(screen.queryByTestId('add-stats-btn')).not.toBeInTheDocument();

    jest.resetAllMocks();

    render(
      <Provider store={store}>
        <Stats userGoals={userGoals} userStats={userStats} />
      </Provider>
    );

    expect(screen.queryByTestId('add-stats-btn')).toBeInTheDocument();
  });
});
