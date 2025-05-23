import { useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import React, { useState } from 'react';
import {
    CalendarInput,
    OrganisationUnitTree,
    SingleSelectField,
    SingleSelectOption,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@dhis2/ui';
import classes from './App.module.css';

const programsQuery = {
    results: {
        resource: 'programs',
        params: {
            pageSize: 5,
            fields: ['id', 'displayName'],
        },
    },
};

const orgUnitQuery = {
    results: {
        resource: 'organisationUnits',
        params: {
            fields: ['id', 'displayName', 'path', 'code'],
            filter: ['level:eq:1'],
            paging: false,
        },
    },
};

const MyApp = () => {
    const { loading: programLoading, error: programError, data: programData } = useDataQuery(programsQuery);
    const { loading: orgUnitLoading, error: orgUnitError, data: orgUnitData } = useDataQuery(orgUnitQuery);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedOrgUnit, setSelectedOrgUnit] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [reportError, setReportError] = useState(null);
    const [isLoadingReport, setIsLoadingReport] = useState(false);

    // Format dates to DHIS2 period format (e.g., 202301 for January 2023)
    const formatPeriod = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}${month}`;
    };

    // Handle date changes
    const handleStartDateChange = ({ date }) => {
        setStartDate(date);
    };

    const handleEndDateChange = ({ date }) => {
        setEndDate(date);
    };

    // Declared function to fetch report data (to be implemented)
    const fetchReportData = async ({ program, orgUnit, startDate, endDate }) => {
        // Implementation to be added
        // Should return the Analytics API response or throw an error
    };

    // Handle report generation
    const handleGenerateReport = async () => {
        if (!selectedProgram || !selectedOrgUnit || !startDate || !endDate) {
            alert(i18n.t('Please select a program, organisation unit, start date, and end date.'));
            return;
        }

        setIsLoadingReport(true);
        setReportError(null);
        setReportData(null);

        try {
            // Generate periods for the Analytics API
            const periods = [];
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                periods.push(formatPeriod(currentDate));
                currentDate.setMonth(currentDate.getMonth() + 1);
            }

            // Call the fetchReportData function
            const data = await fetchReportData({
                program: selectedProgram,
                orgUnit: selectedOrgUnit,
                startDate,
                endDate,
            });

            setReportData(data);
        } catch (error) {
            setReportError(error.message);
        } finally {
            setIsLoadingReport(false);
        }
    };

    // Handle loading and error states for initial queries
    if (programLoading || orgUnitLoading) {
        return <span>{i18n.t('Loading...')}</span>;
    }

    if (programError) {
        return <span>{i18n.t('Program Error: {{message}}', { message: programError.message })}</span>;
    }

    if (orgUnitError) {
        return <span>{i18n.t('Org Unit Error: {{message}}', { message: orgUnitError.message })}</span>;
    }

    // Safely get programs and org units arrays
    const programs = programData?.results?.programs ?? [];
    const orgUnits = orgUnitData?.results?.organisationUnits ?? [];

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>{i18n.t('UCS Coordinator Reports')}</h1>
            <div className={classes.form}>
                {/* Program Selection */}
                <div className={classes.formItem}>
                    <h3>{i18n.t('Program')}</h3>
                    <SingleSelectField
                        selected={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.selected)}
                    >
                        {programs.length > 0 ? (
                            programs.map((program) => (
                                <SingleSelectOption
                                    key={program.id}
                                    label={program.displayName}
                                    value={program.id}
                                />
                            ))
                        ) : (
                            <SingleSelectOption
                                label={i18n.t('No programs found')}
                                value=""
                                disabled
                            />
                        )}
                    </SingleSelectField>
                </div>

                {/* Organisation Unit Tree */}
                <div className={classes.formItem}>
                    <h3>{i18n.t('Organisation Units')}</h3>
                    {orgUnits.length > 0 ? (
                        <OrganisationUnitTree
                            roots={orgUnits.map((ou) => ou.id)}
                            onChange={({ selected }) => setSelectedOrgUnit(selected[0] || '')}
                            selected={selectedOrgUnit ? [selectedOrgUnit] : []}
                            singleSelection
                        />
                    ) : (
                        <span>{i18n.t('No organisation units found')}</span>
                    )}
                </div>

                {/* Start Date */}
                <div className={classes.formItem}>
                    <h3>{i18n.t('Start Date')}</h3>
                    <CalendarInput
                        label={i18n.t('Start Date')}
                        calendar="gregory"
                        locale="en-GB"
                        dateFormat="DD/MM/YYYY"
                        date={startDate} // Bind selected startDate
                        onDateSelect={handleStartDateChange}
                    />
                </div>

                {/* End Date */}
                <div className={classes.formItem}>
                    <h3>{i18n.t('End Date')}</h3>
                    <CalendarInput
                        calendar="gregory"
                        locale="en-GB"
                        dateFormat="DD/MM/YYYY"
                        date={endDate} // Bind selected endDate
                        onDateSelect={handleEndDateChange}
                    />
                </div>
            </div>

            {/* Generate Report Button */}
            <div className={classes.buttonContainer}>
                <Button primary onClick={handleGenerateReport} disabled={isLoadingReport}>
                    {isLoadingReport ? i18n.t('Generating...') : i18n.t('Produce Report')}
                </Button>
            </div>

            {/* Report Output */}
            {reportError && (
                <div className={classes.error}>
                    {i18n.t('Error fetching report: {{message}}', { message: reportError })}
                </div>
            )}
            {reportData && (
                <div className={classes.report}>
                    <h2>{i18n.t('Report Results')}</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{i18n.t('Data Element')}</TableCell>
                                <TableCell>{i18n.t('Organisation Unit')}</TableCell>
                                <TableCell>{i18n.t('Period')}</TableCell>
                                <TableCell>{i18n.t('Value')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportData.rows && reportData.rows.length > 0 ? (
                                reportData.rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row[0]}</TableCell>
                                        <TableCell>{row[1]}</TableCell>
                                        <TableCell>{row[2]}</TableCell>
                                        <TableCell>{row[3]}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>{i18n.t('No data available')}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default MyApp;