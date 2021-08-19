"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllExecutions = exports.getExecutionsOfYear = exports.getExecutionsOfMonth = exports.getExecutionsOfWeek = void 0;
const ProgramExecution_1 = __importDefault(require("../../../models/ProgramExecution"));
const getExecutionsOfWeek = async (date, userId) => {
    let executionsOfWeek = [];
    const dates = getWeekDates(date);
    const programExecutions = await ProgramExecution_1.default.findOne({ user: userId });
    const noExecutions = programExecutions.executions.length === 0;
    if (noExecutions)
        return [];
    programExecutions.executions.forEach((execution) => {
        if (dates.includes(execution.date)) {
            executionsOfWeek.push(execution);
        }
    });
    return executionsOfWeek;
};
exports.getExecutionsOfWeek = getExecutionsOfWeek;
const getExecutionsOfMonth = async (date, userId) => {
    let executionsOfMonth = [];
    const dates = getMonthDates(date);
    const programExecutions = await ProgramExecution_1.default.findOne({ user: userId });
    const noExecutions = programExecutions.executions.length === 0;
    if (noExecutions)
        return [];
    programExecutions.executions.forEach((execution) => {
        if (dates.includes(execution.date.toISOString())) {
            executionsOfMonth.push(execution);
        }
    });
    return executionsOfMonth;
};
exports.getExecutionsOfMonth = getExecutionsOfMonth;
const getExecutionsOfYear = async (date, userId) => {
    let executionsOfYear = [];
    const dates = getYearDates(date);
    const programExecutions = await ProgramExecution_1.default.findOne({ user: userId });
    const noExecutions = programExecutions.executions.length === 0;
    if (noExecutions)
        return [];
    programExecutions.executions.forEach((execution) => {
        if (dates.includes(execution.date.toISOString())) {
            executionsOfYear.push(execution);
        }
    });
    return executionsOfYear;
};
exports.getExecutionsOfYear = getExecutionsOfYear;
const getAllExecutions = async (userId) => {
    const programExecutions = await ProgramExecution_1.default.findOne({ user: userId });
    const noExecutions = programExecutions.executions.length === 0;
    if (noExecutions)
        return [];
    return programExecutions.executions;
};
exports.getAllExecutions = getAllExecutions;
function getWeekDates(date) {
    const sunday = new Date(date.setDate(date.getDate() - date.getDay()));
    const result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
        result.push(new Date(sunday));
    }
    return result;
}
function getMonthDates(date) {
    date.setDate(1);
    const currentMonth = date.getMonth();
    const result = [date.toISOString()];
    while (date.setDate(date.getDate() + 1) &&
        new Date(date).getMonth() === currentMonth) {
        result.push(date.toISOString());
    }
    return result;
}
function getYearDates(date) {
    const year = date.getFullYear();
    date.setMonth(0);
    date.setDate(1);
    const result = [date.toISOString()];
    while (date.setDate(date.getDate() + 1) && date.getFullYear() === year) {
        result.push(date.toISOString());
    }
    return result;
}
