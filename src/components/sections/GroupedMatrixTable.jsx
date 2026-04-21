import React from 'react'
import classes from '../ReportTables.module.css'

/**
 * Renders a grouped-matrix table with a spanning header row.
 *
 * Structure:
 *   | groupLabel         | <groupHeader colspan=cols+1>  |
 *   |                    | col1 | col2 | … | TOTAL       |
 *   | row label          | v1   | v2   | … | row sum     |
 *   | TOTAL (if showTotal)| c1  | c2   | … | grand total |
 */
const GroupedMatrixTable = ({ section, valueMap }) => {
    const { title, subtitle, groupLabel, groupHeader, columns, rows, showTotal } = section

    const getValue = dxId => parseFloat(valueMap?.[dxId]) || 0

    const rowTotals = rows.map(row =>
        columns.reduce((sum, col) => sum + getValue(row.dxIds[col.key]), 0)
    )

    const colTotals = columns.map(col =>
        rows.reduce((sum, row) => sum + getValue(row.dxIds[col.key]), 0)
    )

    const grandTotal = colTotals.reduce((sum, v) => sum + v, 0)

    // colspan for the group header spans all data columns + TOTAL column
    const dataColSpan = columns.length + 1

    return (
        <div className={classes.sectionBlock}>
            {title && <p className={classes.sectionTitle}>{title}</p>}
            {subtitle && <p className={classes.sectionSubtitle}>{subtitle}</p>}

            <table className={classes.reportTable}>
                <thead>
                    {/* Spanning group header row */}
                    <tr>
                        <th>{groupLabel}</th>
                        <th colSpan={dataColSpan} className={classes.numCell}>
                            {groupHeader}
                        </th>
                    </tr>
                    {/* Sub-column header row */}
                    <tr>
                        <th></th>
                        {columns.map(col => (
                            <th key={col.key} className={classes.numCell}>{col.label}</th>
                        ))}
                        <th className={classes.numCell}>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={row.label}>
                            <td>{row.label}</td>
                            {columns.map(col => (
                                <td key={col.key} className={classes.numCell}>
                                    {getValue(row.dxIds[col.key])}
                                </td>
                            ))}
                            <td className={classes.numCell}>{rowTotals[rowIndex]}</td>
                        </tr>
                    ))}
                    {showTotal && (
                        <tr className={classes.totalRow}>
                            <td>TOTAL</td>
                            {colTotals.map((total, i) => (
                                <td key={columns[i].key} className={classes.numCell}>{total}</td>
                            ))}
                            <td className={classes.numCell}>{grandTotal}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default GroupedMatrixTable
