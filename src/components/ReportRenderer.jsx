import React from 'react'
import SimpleTable from './sections/SimpleTable'
import MatrixTable from './sections/MatrixTable'
import GroupedMatrixTable from './sections/GroupedMatrixTable'
import classes from './ReportTables.module.css'

const SectionDispatcher = ({ section, valueMap }) => {
    switch (section.type) {
        case 'simple':
            return <SimpleTable section={section} valueMap={valueMap} />
        case 'matrix':
            return <MatrixTable section={section} valueMap={valueMap} />
        case 'grouped-matrix':
            return <GroupedMatrixTable section={section} valueMap={valueMap} />
        default:
            return null
    }
}

/**
 * Renders a structured report: optional letterhead, report title, then each
 * section dispatched to the appropriate table component.
 */
const ReportRenderer = ({ report, valueMap }) => {
    if (!report) return null

    return (
        <div>
            {/* Letterhead (optional) */}
            {report.letterhead && (
                <div className={classes.letterhead}>
                    {report.letterhead.map((line, i) => (
                        <p key={i} className={classes.letterheadLine}>{line}</p>
                    ))}
                </div>
            )}

            {/* Sections */}
            {report.sections.map(section => (
                <SectionDispatcher
                    key={section.id}
                    section={section}
                    valueMap={valueMap}
                />
            ))}
        </div>
    )
}

export default ReportRenderer
