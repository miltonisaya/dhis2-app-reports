// Central config for structured reports.
// Each report maps fixed table cells to DHIS2 data element / program indicator IDs.
// Replace DX_* placeholder strings with real DHIS2 UIDs once known.

export const REPORTS = [
    {
        id: 'school-program',
        name: 'School Program Report',
        programId: 'SCHOOL_PROGRAM_ID',
        letterhead: [
            'MINISTRY OF HEALTH',
            'DIRECTORATE OF PREVENTIVE SERVICES- HEALTH PROMOTION SECTION',
            'HEALTH EDUCATION AND PROMOTION IN SCHOOLS',
        ],
        sections: [
            {
                id: 'schools-reached',
                title: 'Type of schools/college',
                type: 'simple',
                valueLabel: 'Number of schools/college reached',
                showTotal: true,
                rows: [
                    { label: 'Pre-Primary',     dxId: 'MU9uCQnQS80' },
                    { label: 'Primary',          dxId: 'mCS6DqMCo9a' },
                    { label: 'Secondary',        dxId: 'Ki5ZWovEH11' },
                    { label: 'College',          dxId: 'SlRg9GzfKUB' },
                    { label: 'Special Schools',  dxId: 'qnuxmoQgAnY' },
                ],
            },
            {
                id: 'pupils-reached',
                type: 'grouped-matrix',
                groupLabel: 'Type of school/college',
                groupHeader: 'Number of pupils/students reached',
                showTotal: true,
                columns: [
                    { label: 'Boys',  key: 'BOYS' },
                    { label: 'Girls', key: 'GIRLS' },
                ],
                rows: [
                    { label: 'Pre-Primary',                  dxIds: { BOYS: 'ab5g2kutQsx',   GIRLS: 'Gm47GJkYnYE' } },
                    { label: 'Primary',                      dxIds: { BOYS: 'xVSB1qjUPHB',   GIRLS: 'BwhZcoV5hLT' } },
                    { label: 'Secondary',                    dxIds: { BOYS: 'z5Lyvv3GYq8', GIRLS: 'CTlpkqibpfY' } },
                    { label: 'College',                      dxIds: { BOYS: 'HUQvcrav2Mv',   GIRLS: 'w2CK2ccwGTD' } },
                    { label: 'Special need pupils/students', dxIds: { BOYS: 'bJb8i8cYoOL',   GIRLS: 'MHykM50Nuv4' } },
                ],
            },
            {
                id: 'iec-materials',
                title: 'Tools/IEC material distributed',
                type: 'simple',
                valueLabel: 'NUMBER',
                showTotal: true,
                rows: [
                    { label: '1. Guidelines',           dxId: 'KrSQEsIcGf8' },
                    { label: '2. Leaflets/Brochure',    dxId: 'TmNxS82M2bk' },
                    { label: '3. Posters',              dxId: 'J25GEEgTHL9' },
                    { label: '4. Hand washing buckets', dxId: 'yGMInMv0EYq' },
                    { label: '5. Water Tanks',          dxId: 'JQb0C1Qh3pD' },
                    { label: '6. Water Disinfectants',  dxId: 'j8nmbLJQiZU' },
                    { label: '7. Soaps',                dxId: 'UnLYIqljdA3' },
                    { label: '8. Condoms',              dxId: 'vy7awoBMPUK' },
                    { label: '9. Umbrellas',            dxId: 'tp1oHrE4hqb' },
                    { label: '10. T-Shirts',            dxId: 'G4cao2HVSIy' },
                    { label: '11. Others',              dxId: 'fSPrEQdIcf8' },
                    { label: '12. None',                dxId: 'DX_IEC_NONE' },
                ],
            },
        ],
    },
    {
        id: 'mid-mass-media',
        name: 'Mid and Mass Media Report',
        programId: 'MID_MASS_MEDIA_PROGRAM_ID',
        letterhead: [
            'MINISTRY OF HEALTH',
            'DIRECTORATE OF PREVENTIVE SERVICES- HEALTH PROMOTION SECTION',
            'HEALTH EDUCATION AND PROMOTION IN MID AND MASS MEDIA',
        ],
        sections: [
            {
                id: 'mass-media-indicators',
                title: 'MASS MEDIA INDICATORS',
                type: 'matrix',
                showColumnTotal: true,
                showTotal: false,
                columns: [
                    { label: 'Radio',        key: 'ITdHv76yKln' },
                    { label: 'Television',   key: 'OUNyKcDfjXu' },
                    { label: 'Social Media', key: 'O773eL7HB6P' },
                    { label: 'Others',       key: 'Ca1KCq3gtib' },
                ],
                rows: [
                    {
                        label: 'Number of sessions conducted by expert',
                        dxIds: { RADIO: 'Fy7bZbLhNSs', TV: 'NlWWqVHGdjM', SOCIAL: 'qIoTXxakq7C', OTHERS: 'B8GeyQ9SWKN' },
                    },
                    {
                        label: 'Number of national media engaged in provision of health messages',
                        dxIds: { RADIO: 'NQgXOCoKWmY', TV: 'KBY47sIzjs4', SOCIAL: 'QxCZuiIOD7S', OTHERS: 'nzNjnmA1zD9' },
                    },
                    {
                        label: 'Number of people reached by mass and social media contents aired',
                        dxIds: { RADIO: 'DX_MM_PEOPLE_RADIO', TV: 'DX_MM_PEOPLE_TV', SOCIAL: 'DX_MM_PEOPLE_SOCIAL', OTHERS: 'DX_MM_PEOPLE_OTHERS' },
                    },
                    {
                      label: 'Number of mass media contents produced and aired to address specific health area',
                        dxIds: { RADIO: 'ITdHv76yKln', TV: 'OUNyKcDfjXu', SOCIAL: 'O773eL7HB6P', OTHERS: 'Ca1KCq3gtib' },
                    },
                ],
            },
            {
                id: 'mid-events',
                title: 'MID MEDIA',
                subtitle: 'Number of events used in provision of health messages',
                type: 'simple',
                valueLabel: 'Number',
                showTotal: true,
                rows: [
                    { label: '1. Bonanza',      dxId: 'jsXUkjP5m9n' },
                    { label: '2. Meeting',      dxId: 'lQgJu8vrNtp' },
                    { label: '3. Festival',     dxId: 'nIayO0MBTis' },
                    { label: '4. Charity Walk', dxId: 'tV3lIgnL5dZ' },
                    { label: '5. Discussions',  dxId: 'OLvDUOdNGZq' },
                    { label: '6. Others',       dxId: 'TOvZ4tdrUfF' },
                ],
            },
            {
                id: 'mid-people-reached',
                subtitle: 'Number of people reached with health messages in different groups',
                type: 'grouped-matrix',
                groupLabel: 'Type of group',
                groupHeader: 'Sex',
                showTotal: true,
                columns: [
                    { label: 'Male',   key: 'MALE' },
                    { label: 'Female', key: 'FEMALE' },
                ],
                rows: [
                    { label: '1. Religious leaders',                  dxIds: { MALE: 'L01lDds16Wq',     FEMALE: 'dD6MnzottPn' } },
                    { label: '2. Pupils/Students',                    dxIds: { MALE: 'F2vLXyOr2RI',     FEMALE: 'D4k1PI3VB3H' } },
                    { label: '3. Media personnel',                    dxIds: { MALE: 'ZIM80MHAt6w',     FEMALE: 'Yot7vLXHYK7' } },
                    { label: '4. Traditional/Alternative medicines',  dxIds: { MALE: 'RkbsmblVLGu',     FEMALE: 'hrIj2XUWEzJ' } },
                    { label: '5. Society (Gathering of people)',      dxIds: { MALE: 'DX_MID_SOCIETY_M',FEMALE: 'DX_MID_SOCIETY_F' } },
                    { label: '6. Community leaders',                  dxIds: { MALE: 'U35WwTxh3Zz',     FEMALE: 'SoiS6lyqPQZ' } },
                    { label: '7. Governments leaders',                dxIds: { MALE: 'ABMMioQkYwE',     FEMALE: 'xPYskZeOm5V' } },
                    { label: '8. Others',                             dxIds: { MALE: 'ZEuWzm4wMTc',     FEMALE: 'bq1fRn9npQL' } },
                ],
            },
            {
                id: 'sbc-materials',
                subtitle: 'Number of SBC Material distributed',
                type: 'simple',
                valueLabel: 'Number',
                showTotal: true,
                rows: [
                    { label: '1. Leaflets/Brochure', dxId: 'GVwPLO2WJJ7' },
                    { label: '2. Posters',           dxId: 'ucuyM8rLOqj' },
                    { label: '3. Newsletters',       dxId: 'p9r0hSentRt' },
                    { label: '4. T-shirt',           dxId: 'jC47K2zXJjv' },
                    { label: '5. Umbrella',          dxId: 'U0AGeKGZzF3' },
                    { label: '6. Tyre cover',        dxId: 'n01JMcnTJRF' },
                    { label: '7. Khanga',            dxId: 'eUwc2TmuVVe' },
                    { label: '8. Pen',               dxId: 'DX_SBC_PEN' },
                    { label: '9. Cap',               dxId: 'so89qjm7pnq' },
                    { label: '10. Others',           dxId: 'DX_SBC_OTHERS' },
                ],
            },
            {
                id: 'referrals',
                subtitle: 'Number of referrals provided',
                type: 'simple',
                valueLabel: 'Number',
                showTotal: true,
                rows: [
                    { label: '1. Health Facility',           dxId: 'dHeMTxTUmb2' },
                    { label: '2. Social Welfare',            dxId: 'BUQT47BE2lQ' },
                    { label: '3. Gender Desk',               dxId: 'm5PIyL692IZ' },
                    { label: '4. No Referrals Provided',     dxId: 'WgoiDlutbXL' },
                    { label: '5. Others',                    dxId: 'JhwsjoeSPrh' },
                ],
            },
        ],
    },
]

/**
 * Walk every row of a report and return a deduplicated array of all
 * referenced DHIS2 data element / program indicator IDs.
 */
export function collectDxIds(report) {
    const ids = new Set()
    for (const section of report.sections) {
        for (const row of section.rows) {
            if (row.dxId) ids.add(row.dxId)
            if (row.dxIds) Object.values(row.dxIds).forEach(id => ids.add(id))
        }
    }
    return [...ids]
}
