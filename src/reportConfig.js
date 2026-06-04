// Central config for structured reports.
// Each report maps fixed table cells to DHIS2 data element / program indicator IDs.
// Replace DX_* placeholder strings with real DHIS2 UIDs once known.

export const REPORTS = [
    {
        id: 'school-program',
        name: 'School Program Report',
        programId: 'pU43TpUM0nE',
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
                    { label: '4. Leaflets/Brochure',    dxId: 'yGMInMv0EYq' },
                    { label: '5. Water Tanks',          dxId: 'JQb0C1Qh3pD' },
                    { label: '6. Water Disinfectants',  dxId: 'j8nmbLJQiZU' },
                    { label: '7. Soaps',                dxId: 'UnLYIqljdA3' },
                    { label: '8. Guidelines',           dxId: 'vy7awoBMPUK' },
                    // TODO: analytics table missing - { label: '9. Umbrellas', dxId: 'tp1oHrE4hqb' },
                    // TODO: analytics table missing - { label: '10. T-Shirts', dxId: 'tNwk6omcopw' },
                    { label: '11. Others',              dxId: 'fSPrEQdIcf8' },
                    // TODO: replace placeholder with real DHIS2 UID
                    // { label: '12. None', dxId: 'DX_IEC_NONE' },
                ],
            },
            {
                id: 'school-attendance',
                title: 'Attendance',
                type: 'grouped-matrix',
                groupLabel: 'Category',
                groupHeader: 'Number',
                showTotal: true,
                columns: [
                    { label: 'Male',   key: 'MALE' },
                    { label: 'Female', key: 'FEMALE' },
                ],
                rows: [
                    { label: 'Pupils/Students',             dxIds: { MALE: 'pU43TpUM0nE.eH2B3tfml8F', FEMALE: 'pU43TpUM0nE.CnIrOTsAvRJ' } },
                    { label: 'Teachers/Tutors/Lecturers',   dxIds: { MALE: 'pU43TpUM0nE.AUfzKhXSXQu', FEMALE: 'pU43TpUM0nE.xGPrunEry5l' } },
                ],
            },
            {
                id: 'school-referrals',
                title: 'Number of referrals provided',
                type: 'simple',
                valueLabel: 'Number',
                showTotal: true,
                rows: [
                    { label: 'Gender',          dxId: 'pU43TpUM0nE.y4d5n19mEwL' },
                    { label: 'Health Facility', dxId: 'pU43TpUM0nE.YLMtLP16NvZ' },
                    { label: 'Social Welfare',  dxId: 'pU43TpUM0nE.ewCPRtMOuef' },
                    { label: 'Other',           dxId: 'pU43TpUM0nE.bEu7kDUA035' },
                ],
            },
        ],
    },
    {
        id: 'mass-media',
        name: 'Mass Media Report',
        programId: 'MID_MASS_MEDIA_PROGRAM_ID',
        letterhead: [
            'MINISTRY OF HEALTH',
            'DIRECTORATE OF PREVENTIVE SERVICES- HEALTH PROMOTION SECTION',
            'HEALTH EDUCATION AND PROMOTION IN MASS MEDIA',
        ],
        sections: [
            {
                id: 'mass-media-indicators',
                title: 'MASS MEDIA INDICATORS',
                type: 'matrix',
                showColumnTotal: true,
                showTotal: false,
                columns: [
                    { label: 'Radio',        key: 'RADIO' },
                    { label: 'Television',   key: 'TV' },
                    { label: 'Social Media', key: 'SOCIAL' },
                    { label: 'Others',       key: 'OTHERS' },
                ],
                rows: [
                  {
                    label: 'Number of expert live sessions conducted',
                    dxIds: { RADIO: 'RJU98gxyGrE', TV: 'B97FMelXR4Q', SOCIAL: null, OTHERS: 'iCDwUZp2V1e' },
                  },
                  {
                    label: 'Number of spots aired radio/TV spots',
                    dxIds: { RADIO: 'A4LnWJio4n4', TV: 'SFEo2iBSxWO', SOCIAL: null, OTHERS: 'JOjo5uaBgVI' },
                  },
                  {
                    label: 'Number of recorded sessions aired',
                    dxIds: { RADIO: 'y2FAwiweVrI', TV: 'pBk4PXT65cw', SOCIAL: null, OTHERS: 'mP5cuX5qJ5e' },
                  },
                  {
                    label: 'Number of presenter mentions aired',
                    dxIds: { RADIO: 'I1cqweuuHuX', TV: 'dYtg7vrxrLe', SOCIAL: null, OTHERS: 'hAybNDKj66n' },
                  },
                  {
                    label: 'Number of social media contents shared',
                    dxIds: { RADIO: null, TV: null, SOCIAL: 'O773eL7HB6P', OTHERS: null },
                  },
                  {
                    label: 'Estimated Number of people reached through recorded sessions',
                    dxIds: { RADIO: 'a2XSywOpTSM', TV: 'gef0tdKfshF', SOCIAL: null, OTHERS: 'EOxw27BeF0N' },
                  },
                  {
                    label: 'Estimated Number of people reached through presenter mentions',
                    dxIds: { RADIO: 'ezDi2IBVMpr', TV: 'a0XCHhIAQZH', SOCIAL: null, OTHERS: 'mbsm88WrFeL' },
                  },
                  {
                    label: 'Estimated Number of people reached through expert live session',
                    dxIds: { RADIO: 'Psk8Gig3LDn', TV: 'eUZCf1JFlJa', SOCIAL: null, OTHERS: 'n9rPj7PQHPG' },
                  },
                  {
                    label: 'Estimated number of people reached through social media platforms',
                    dxIds: { RADIO: null, TV: null, SOCIAL: 'EywPSEkmA8Z', OTHERS: null },
                  },
                  {
                    label: 'Number of sessions conducted by expert',
                    dxIds: { RADIO: 'Fy7bZbLhNSs', TV: 'NlWWqVHGdjM', SOCIAL: 'qIoTXxakq7C', OTHERS: 'B8GeyQ9SWKN' },
                  },
                  {
                    label: 'Number of national media engaged in provision of health messages',
                    dxIds: { RADIO: 'NQgXOCoKWmY', TV: 'KBY47sIzjs4', SOCIAL: 'QxCZuiIOD7S', OTHERS: 'nzNjnmA1zD9' },
                  },
                  // TODO: replace placeholders with real DHIS2 UIDs
                  // { label: 'Number of people reached by mass and social media contents aired', dxIds: { RADIO: 'DX_MM_PEOPLE_RADIO', TV: 'DX_MM_PEOPLE_TV', SOCIAL: 'DX_MM_PEOPLE_SOCIAL', OTHERS: 'DX_MM_PEOPLE_OTHERS' } },
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
                    { label: '5. Community Dialog',  dxId: 'OLvDUOdNGZq' },
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
                    { label: '1. Religious leaders',                  dxIds: { MALE: 'S8FGFjPI3sS.L01lDds16Wq',     FEMALE: 'S8FGFjPI3sS.dD6MnzottPn' } },
                    { label: '2. Pupils/Students',                    dxIds: { MALE: 'S8FGFjPI3sS.F2vLXyOr2RI',     FEMALE: 'S8FGFjPI3sS.D4k1PI3VB3H' } },
                    { label: '3. Media personnel',                    dxIds: { MALE: 'S8FGFjPI3sS.ZIM80MHAt6w',     FEMALE: 'S8FGFjPI3sS.Yot7vLXHYK7' } },
                    { label: '4. Traditional/Alternative medicines',  dxIds: { MALE: 'S8FGFjPI3sS.hrIj2XUWEzJ',     FEMALE: 'S8FGFjPI3sS.RkbsmblVLGu' } },
                    { label: '5. Society (Gathering of people)',      dxIds: { MALE: 'S8FGFjPI3sS.zS25CIPJ2lw',     FEMALE: 'S8FGFjPI3sS.SoiS6lyqPQZ' } },
                    { label: '6. Community leaders',                  dxIds: { MALE: 'S8FGFjPI3sS.U35WwTxh3Zz',     FEMALE: 'S8FGFjPI3sS.HsdThAZBwnm' } },
                    { label: '7. Governments leaders',                dxIds: { MALE: 'S8FGFjPI3sS.ABMMioQkYwE',     FEMALE: 'S8FGFjPI3sS.xPYskZeOm5V' } },
                    { label: '8. Others',                             dxIds: { MALE: 'S8FGFjPI3sS.ZEuWzm4wMTc',     FEMALE: 'S8FGFjPI3sS.bq1fRn9npQL' } },
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
                    { label: '6. Wheel Cover',       dxId: 'n01JMcnTJRF' },
                    { label: '7. Khanga',            dxId: 'eUwc2TmuVVe' },
                    { label: '8. Pen',               dxId: 'papqlKoRvMl' },
                    { label: '9. Cap',               dxId: 'so89qjm7pnq' },
                    { label: '10. Others',           dxId: 'ZHsfDM0eiaN' },
                    { label: '11. None',             dxId: 'T7FynlPyc1v' },
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
    {
        id: 'mid-media',
        name: 'Mid Media Report',
        letterhead: [
            'MINISTRY OF HEALTH',
            'DIRECTORATE OF PREVENTIVE SERVICES- HEALTH PROMOTION SECTION',
            'HEALTH EDUCATION AND PROMOTION IN MID MEDIA',
        ],
        sections: [
            {
                id: 'mid-media-people-reached',
                title: 'Type of community group reached',
                type: 'grouped-matrix',
                groupLabel: 'Type of group',
                groupHeader: 'Sex',
                showTotal: true,
                columns: [
                    { label: 'Male',   key: 'MALE' },
                    { label: 'Female', key: 'FEMALE' },
                ],
                rows: [
                    { label: 'Religious leaders',                  dxIds: { MALE: 'S8FGFjPI3sS.L01lDds16Wq',   FEMALE: 'S8FGFjPI3sS.dD6MnzottPn' } },
                    { label: 'Pupils/Students',                    dxIds: { MALE: 'S8FGFjPI3sS.F2vLXyOr2RI',   FEMALE: 'S8FGFjPI3sS.D4k1PI3VB3H' } },
                    { label: 'Media personnel',                    dxIds: { MALE: 'S8FGFjPI3sS.ZIM80MHAt6w',   FEMALE: 'S8FGFjPI3sS.Yot7vLXHYK7' } },
                    { label: 'Traditional/Alternative medicines',  dxIds: { MALE: 'S8FGFjPI3sS.hrIj2XUWEzJ',   FEMALE: 'S8FGFjPI3sS.RkbsmblVLGu' } },
                    { label: 'Community leaders',                  dxIds: { MALE: 'S8FGFjPI3sS.U35WwTxh3Zz',   FEMALE: 'S8FGFjPI3sS.HsdThAZBwnm' } },
                    { label: 'Community members',                  dxIds: { MALE: 'S8FGFjPI3sS.zS25CIPJ2lw',   FEMALE: 'S8FGFjPI3sS.SoiS6lyqPQZ' } },
                    { label: 'Government leaders',                 dxIds: { MALE: 'S8FGFjPI3sS.ABMMioQkYwE',   FEMALE: 'S8FGFjPI3sS.xPYskZeOm5V' } },
                    { label: 'Others',                             dxIds: { MALE: 'S8FGFjPI3sS.ZEuWzm4wMTc',   FEMALE: 'S8FGFjPI3sS.bq1fRn9npQL' } },
                ],
            },
            {
                id: 'mid-media-health-services',
                title: 'Health Services Provided',
                type: 'simple',
                valueLabel: 'Number',
                showTotal: true,
                rows: [
                    { label: 'Number of chlorine tabs - water treatment services provided', dxId: 'S8FGFjPI3sS.qNVAh7PNVpz' },
                    { label: 'Number of condoms provided',                                  dxId: 'S8FGFjPI3sS.n1tyRryHQeN' },
                    { label: 'Number of family planning services provided',                 dxId: 'S8FGFjPI3sS.WE9yvfxj28t' },
                    { label: 'Number of ITN provided',                                      dxId: 'S8FGFjPI3sS.feCUCmuGW6H' },
                    { label: 'Number of preventive therapy services provided',              dxId: 'S8FGFjPI3sS.Jk57SKc35G4' },
                    { label: 'Number of tests conducted',                                   dxId: 'S8FGFjPI3sS.t4ZP8BWDNcq' },
                    { label: 'Number of vaccine doses distributed',                         dxId: 'S8FGFjPI3sS.FoApPaqmpCC' },
                ],
            },
            {
                id: 'mid-media-sbc-materials',
                title: 'IEC/Communication Materials Provided',
                type: 'simple',
                valueLabel: 'Number',
                showTotal: true,
                rows: [
                    { label: 'Number of caps provided',               dxId: 'S8FGFjPI3sS.lmWi02SKytK' },
                    { label: 'Number of khangas provided',            dxId: 'S8FGFjPI3sS.kZHz0llxb7g' },
                    { label: 'Number of leaflets/brochures provided', dxId: 'S8FGFjPI3sS.GpHrT6NvSSl' },
                    { label: 'Number of newsletters provided',        dxId: 'S8FGFjPI3sS.L6W0oJIAzEY' },
                    { label: 'Number of others provided',             dxId: 'S8FGFjPI3sS.YKfPimRLiNJ' },
                    { label: 'Number of pens provided',               dxId: 'S8FGFjPI3sS.K9qv9HdqBV7' },
                    { label: 'Number of posters provided',            dxId: 'S8FGFjPI3sS.cIsr3NEi1Mp' },
                    { label: 'Number of T-Shirts provided',           dxId: 'S8FGFjPI3sS.JX2rqoMog7L' },
                    { label: 'Number of umbrellas provided',          dxId: 'S8FGFjPI3sS.wZIaTyJnG57' },
                    { label: 'Number of wheel covers provided',       dxId: 'S8FGFjPI3sS.fRaNohaJOBR' },
                ],
            },
            {
                id: 'mid-media-referrals',
                title: 'Number of referrals provided at school',
                type: 'simple',
                valueLabel: 'Number',
                showTotal: true,
                rows: [
                    { label: 'Number of gender desk referrals',              dxId: 'S8FGFjPI3sS.y4d5n19mEwL' },
                    { label: 'Number of health facility referrals',          dxId: 'S8FGFjPI3sS.YLMtLP16NvZ' },
                    { label: 'Number of other referrals',                    dxId: 'S8FGFjPI3sS.bEu7kDUA035' },
                    { label: 'Number of social welfare referrals provided',  dxId: 'S8FGFjPI3sS.ewCPRtMOuef' },
                    { label: 'Please specify other referrals provided',      dxId: 'S8FGFjPI3sS.CNzmrJcJCe1' },
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
