import { useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import React, { useState } from 'react';
import classes from './App.module.css';
import { OrganisationUnitTree, SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import { PeriodDimension } from '@dhis2/d2-ui';

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
            filter: ['level:eq:1'], // Fetch only root-level org units for performance
            paging: false,
        },
    },
};

const MyApp = () => {
    const { loading: programLoading, error: programError, data: programData } = useDataQuery(programsQuery);
    const { loading: orgUnitLoading, error: orgUnitError, data: orgUnitData } = useDataQuery(orgUnitQuery);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedOrgUnit, setSelectedOrgUnit] = useState('');
    const [selectedPeriods, setSelectedPeriods] = useState([]); // Array of period objects

    // Debug API responses and selections (remove in production)
    console.log('Program data:', programData);
    console.log('Org unit data:', orgUnitData);
    console.log('Selected periods:', selectedPeriods);

    // Handle loading and error states
    if (programLoading || orgUnitLoading) {
        return <span>{i18n.t('Loading...')}</span>;
    }

    if (programError) {
        return <span>{i18n.t('Program Error: {{message}}', { message: programError.message })}</span>;
    }

    if (orgUnitError) {
        return <span>{i18n.t('Org Unit Error: {{message}}', { message: orgUnitError.message })}</span>;
    }

    // Safely get programs and org units arrays or default to empty array
    const programs = programData?.results?.programs ?? [];
    const orgUnits = orgUnitData?.results?.organisationUnits ?? [];

    return (
        <div className={classes.container}>
            <h1>{i18n.t('UCS Coordinator Reports')}</h1>

            {/* Program Selection */}
            <div className={classes.selector}>
                <SingleSelectField
                    label={i18n.t('Program')}
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
            <div className={classes.orgUnitTree}>
                <h2>{i18n.t('Organisation Units')}</h2>
                {orgUnits.length > 0 ? (
                    <OrganisationUnitTree
                        roots={orgUnits.map(ou => ou.id)}
                        onChange={({ selected }) => setSelectedOrgUnit(selected[0] || '')}
                        selected={selectedOrgUnit ? [selectedOrgUnit] : []}
                        singleSelection
                    />
                ) : (
                    <span>{i18n.t('No organisation units found')}</span>
                )}
            </div>

            {/* Period Selector */}
            <div className={classes.periodSelector}>
                <h2>{i18n.t('Period')}</h2>
                <PeriodDimension
                    onSelect={({ items }) => setSelectedPeriods(items)}
                    selectedPeriods={selectedPeriods}
                    enablePeriodSelector // Show the period selector dialog
                />
            </div>

            {/* Display Selected Values */}
            <div className={classes.selections}>
                <p>{i18n.t('Selected Program: {{program}}', { program: selectedProgram || 'None' })}</p>
                <p>{i18n.t('Selected Org Unit: {{orgUnit}}', { orgUnit: selectedOrgUnit || 'None' })}</p>
                <p>
                    {i18n.t('Selected Period: {{period}}', {
                        period: selectedPeriods.length > 0 ? selectedPeriods.map(p => p.name).join(', ') : 'None',
                    })}
                </p>
            </div>
        </div>
    );
};

export default MyApp;