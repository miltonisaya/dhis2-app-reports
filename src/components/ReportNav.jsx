import React from 'react'
import classes from './ReportNav.module.css'

/**
 * Sidebar navigation list for switching between reports.
 *
 * Props:
 *   reports       — array of report definitions (id, name)
 *   activeId      — id of the currently selected report
 *   onSelect(id)  — called when user clicks a nav item
 */
const ReportNav = ({ reports, activeId, onSelect }) => (
    <nav className={classes.nav}>
        <span className={classes.navLabel}>Reports</span>
        {reports.map(report => (
            <button
                key={report.id}
                className={`${classes.navItem}${activeId === report.id ? ` ${classes.active}` : ''}`}
                onClick={() => onSelect(report.id)}
            >
                {report.name}
            </button>
        ))}
    </nav>
)

export default ReportNav
