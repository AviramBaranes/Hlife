import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import ExecutionsGraph from '../../../components/home/ExecutionsGraph';
import store from '../../../redux/store/reduxStore';
import axiosInstance from '../../../utils/axios/axiosInstance';
import { dateToString } from '../../../utils/dates/dateToString';

describe('ExecutionGraphs tests', () => {
  const noExecutionsText =
    'No execution have been declared during this week...';
  const weeklyExecutions = [
    { rate: 100, date: new Date('11-11-2001') },
    { rate: 70, date: new Date('12-11-2001') },
  ];

  let spiedAxios: jest.SpyInstance;

  beforeAll(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, 'get')
      .mockImplementationOnce(async () => ({
        data: [
          { executionRate: 100, date: new Date('11-13-2001') },
          { executionRate: 100, date: new Date('11-14-2001') },
          { executionRate: 25, date: new Date('11-15-2001') },
        ],
      }))
      .mockImplementationOnce(async () => ({
        data: [
          { executionRate: 100, date: new Date('11-13-2001') },
          { executionRate: 100, date: new Date('11-14-2001') },
          { executionRate: 25, date: new Date('11-15-2001') },
          { executionRate: 25, date: new Date('11-16-2001') },
        ],
      }))
      .mockImplementationOnce(async () => ({
        status: 204,
      }));
  });

  test('should render the initial DOM correctly', async () => {
    render(
      <Provider store={store}>
        <ExecutionsGraph weeklyExecutions={[]} />
      </Provider>
    );

    expect(
      screen.queryByText('Your weekly Executions:')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('bar-chart').style.height).toBe('0px');
    expect(screen.getByText(noExecutionsText)).toBeInTheDocument();
    expect(screen.getByLabelText('Select week').tagName).toBe('SELECT');
    expect(screen.getByLabelText('Select week').children.length).toBe(7);
  });
  test('should toggle between pie and bar graphs', () => {
    render(
      <Provider store={store}>
        <ExecutionsGraph weeklyExecutions={weeklyExecutions} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    const barChart = screen.getByTestId('bar-chart');
    const pieChart = screen.getByTestId('pie-chart');

    expect(barChart).toHaveAttribute('display', 'block');
    expect(pieChart).toHaveAttribute('display', 'none');
    expect(screen.getByText('pie')).toBeInTheDocument();
    expect(screen.queryByText('bar')).not.toBeInTheDocument();

    userEvent.click(checkbox);

    expect(barChart).toHaveAttribute('display', 'none');
    expect(pieChart).toHaveAttribute('display', 'block');
    expect(screen.queryByText('pie')).not.toBeInTheDocument();
    expect(screen.getByText('bar')).toBeInTheDocument();

    userEvent.click(checkbox);

    expect(barChart).toHaveAttribute('display', 'block');
    expect(pieChart).toHaveAttribute('display', 'none');
    expect(screen.getByText('pie')).toBeInTheDocument();
    expect(screen.queryByText('bar')).not.toBeInTheDocument();
  });

  test('should render the bar graph correctly', async () => {
    render(
      <Provider store={store}>
        <ExecutionsGraph weeklyExecutions={weeklyExecutions} />
      </Provider>
    );

    const barChart = screen.getByTestId('bar-chart');
    expect(barChart.children.length).toBe(3);
    expect(barChart.children[0].children.length).toBe(2);
    expect(barChart.children[0].children[0]).toHaveAttribute('height', '0');
    expect(barChart.children[0].children[0]).toHaveAttribute(
      'fill',
      'var(--primary-color)'
    );
    expect(barChart.children[0].children[1]).toHaveAttribute('height', '0');
    expect(barChart.children[0].children[1]).toHaveAttribute(
      'fill',
      'var(--text-color)'
    );
    await waitFor(() => {
      expect(barChart.children[0].children[0]).toHaveAttribute('height', '230');
      expect(barChart.children[0].children[1]).toHaveAttribute('height', '161');
    });
  });

  test('should render the pie graph correctly', () => {
    render(
      <Provider store={store}>
        <ExecutionsGraph weeklyExecutions={weeklyExecutions} />
      </Provider>
    );
    const pieChart = screen.getByTestId('pie-chart');
    expect(pieChart).toHaveAttribute('display', 'none');

    userEvent.click(screen.getByRole('checkbox'));

    expect(pieChart).toHaveAttribute('display', 'block');
    expect(pieChart.children.length).toBe(6);

    const getPath = (index: number) =>
      (pieChart.children[0].children[index] as any).__data__;

    expect(getPath(0).startAngle).toBeCloseTo(6.28);
    expect(getPath(0).endAngle).toBeCloseTo(6.28);
    expect(getPath(1).startAngle).toBeCloseTo(6.28);
    expect(getPath(1).endAngle).toBeCloseTo(6.28);
    expect(getPath(2).startAngle).toBeCloseTo(0);
    expect(getPath(2).endAngle).toBeCloseTo(3.14);
    expect(getPath(3).startAngle).toBeCloseTo(6.28);
    expect(getPath(3).endAngle).toBeCloseTo(6.28);
    expect(getPath(4).startAngle).toBeCloseTo(3.14);
    expect(getPath(4).endAngle).toBeCloseTo(6.28);

    expect(pieChart.children[0].children[0].tagName).toBe('path');
    expect(pieChart.children[0].children[0]).toHaveAttribute('fill', '#D9EFE0');
    expect(pieChart.children[0].children[1].tagName).toBe('path');
    expect(pieChart.children[0].children[1]).toHaveAttribute('fill', '#B4E0C1');
    expect(pieChart.children[0].children[2].tagName).toBe('path');
    expect(pieChart.children[0].children[2]).toHaveAttribute('fill', '#8ED0A2');
    expect(pieChart.children[0].children[3].tagName).toBe('path');
    expect(pieChart.children[0].children[3]).toHaveAttribute('fill', '#68C083');
    expect(pieChart.children[0].children[4].tagName).toBe('path');
    expect(pieChart.children[0].children[4]).toHaveAttribute('fill', '#30A954');

    expect(pieChart.children[1].children[1].textContent).toBe('under 25%');
    expect(pieChart.children[1].children[0]).toHaveAttribute('fill', '#D9EFE0');
    expect(pieChart.children[2].children[1].textContent).toBe('under 50%');
    expect(pieChart.children[2].children[0]).toHaveAttribute('fill', '#B4E0C1');
    expect(pieChart.children[3].children[1].textContent).toBe('under 75%');
    expect(pieChart.children[3].children[0]).toHaveAttribute('fill', '#8ED0A2');
    expect(pieChart.children[4].children[1].textContent).toBe('under 100%');
    expect(pieChart.children[4].children[0]).toHaveAttribute('fill', '#68C083');
    expect(pieChart.children[5].children[1].textContent).toBe('100%');
    expect(pieChart.children[5].children[0]).toHaveAttribute('fill', '#30A954');
  });

  test('should handle data changing via select element (week)', async () => {
    render(
      <Provider store={store}>
        <ExecutionsGraph weeklyExecutions={weeklyExecutions} />
      </Provider>
    );

    const barChart = screen.getByTestId('bar-chart');
    const selectEl = screen.getByLabelText('Select week');

    userEvent.selectOptions(selectEl, '2 weeks ago');

    //the date is 2 weeks earlier than now
    const currentDate = new Date();
    const date = dateToString(
      new Date(currentDate.setDate(currentDate.getDate() - 14))
    );

    expect(spiedAxios.mock.calls[0][0]).toBe(
      `/program-exec/by-range/week/${date}`
    );

    await waitFor(() => {
      expect(barChart.children[0].children.length).toBe(3);
      expect(barChart.children[0].children[0]).toHaveAttribute('height', '230');
      expect(barChart.children[0].children[1]).toHaveAttribute('height', '230');
      expect(
        +barChart.children[0].children[2].getAttribute('height')!
      ).toBeCloseTo(57.5);
    });

    userEvent.click(screen.getByRole('checkbox'));
    const pieChart = screen.getByTestId('pie-chart');

    const getPath = (index: number) =>
      (pieChart.children[0].children[index] as any).__data__;

    expect(getPath(0).startAngle).toBeCloseTo(6.28);
    expect(getPath(0).endAngle).toBeCloseTo(6.28);
    expect(getPath(1).startAngle).toBeCloseTo(4.19);
    expect(getPath(1).endAngle).toBeCloseTo(6.28);
    expect(getPath(2).startAngle).toBeCloseTo(6.28);
    expect(getPath(2).endAngle).toBeCloseTo(6.28);
    expect(getPath(3).startAngle).toBeCloseTo(6.28);
    expect(getPath(3).endAngle).toBeCloseTo(6.28);
    expect(getPath(4).startAngle).toBeCloseTo(0);
    expect(getPath(4).endAngle).toBeCloseTo(4.19);
  });

  test('should handle data changing via select element (month)', async () => {
    render(
      <Provider store={store}>
        <ExecutionsGraph weeklyExecutions={weeklyExecutions} />
      </Provider>
    );

    const barChart = screen.getByTestId('bar-chart');
    const selectEl = screen.getByLabelText('Select week');

    userEvent.selectOptions(selectEl, 'whole month');

    const date = dateToString(new Date());

    expect(spiedAxios.mock.calls[1][0]).toBe(
      `/program-exec/by-range/month/${date}`
    );

    await waitFor(() => {
      expect(barChart.children[0].children.length).toBe(4);
      expect(barChart.children[0].children[0]).toHaveAttribute('height', '230');
      expect(barChart.children[0].children[1]).toHaveAttribute('height', '230');
      expect(
        +barChart.children[0].children[2].getAttribute('height')!
      ).toBeCloseTo(57.5);
      expect(
        +barChart.children[0].children[3].getAttribute('height')!
      ).toBeCloseTo(57.5);
    });

    userEvent.click(screen.getByRole('checkbox'));
    const pieChart = screen.getByTestId('pie-chart');

    const getPath = (index: number) =>
      (pieChart.children[0].children[index] as any).__data__;

    expect(getPath(0).startAngle).toBeCloseTo(6.28);
    expect(getPath(0).endAngle).toBeCloseTo(6.28);
    expect(getPath(1).startAngle).toBeCloseTo(0);
    expect(getPath(1).endAngle).toBeCloseTo(3.14);
    expect(getPath(2).startAngle).toBeCloseTo(6.28);
    expect(getPath(2).endAngle).toBeCloseTo(6.28);
    expect(getPath(3).startAngle).toBeCloseTo(6.28);
    expect(getPath(3).endAngle).toBeCloseTo(6.28);
    expect(getPath(4).startAngle).toBeCloseTo(3.14);
    expect(getPath(4).endAngle).toBeCloseTo(6.28);
  });

  test('should handle data changing via select element (no data)', async () => {
    render(
      <Provider store={store}>
        <ExecutionsGraph weeklyExecutions={weeklyExecutions} />
      </Provider>
    );

    const selectEl = screen.getByLabelText('Select week');

    userEvent.selectOptions(selectEl, 'this week');

    const date = dateToString(new Date());

    expect(spiedAxios.mock.calls[2][0]).toBe(
      `/program-exec/by-range/week/${date}`
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Your weekly Executions:')
      ).not.toBeInTheDocument();
      expect(screen.getByTestId('bar-chart').style.height).toBe('0px');
      expect(screen.getByText(noExecutionsText)).toBeInTheDocument();
    });
  });
});
