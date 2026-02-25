// Central config for structured reports.
// Each report maps fixed table cells to DHIS2 data element / program indicator IDs.
// Replace DX_* placeholder strings with real DHIS2 UIDs once known.

export const REPORTS = [
    {
        id: 'school-program',
        name: 'School Program Report',
        programId: 'SCHOOL_PROGRAM_ID',
        sections: [
            {
                id: 'schools-reached',
                title: 'Type of schools/college',
                type: 'simple',
                valueLabel: 'Number of schools/college reached',
                showTotal: true,
                rows: [
                    { label: 'Pre-Primary',     dxId: 'DX_SCHOOL_PRE_PRIMARY' },
                    { label: 'Primary',          dxId: 'DX_SCHOOL_PRIMARY' },
                    { label: 'Secondary',        dxId: 'DX_SCHOOL_SECONDARY' },
                    { label: 'College',          dxId: 'DX_SCHOOL_COLLEGE' },
                    { label: 'Special Schools',  dxId: 'DX_SCHOOL_SPECIAL' },
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
                    { label: 'Primary',                      dxIds: { BOYS: 'DX_PUPILS_PRIMARY_BOYS',   GIRLS: 'DX_PUPILS_PRIMARY_GIRLS' } },
                    { label: 'Secondary',                    dxIds: { BOYS: 'DX_PUPILS_SECONDARY_BOYS', GIRLS: 'DX_PUPILS_SECONDARY_GIRLS' } },
                    { label: 'College',                      dxIds: { BOYS: 'DX_PUPILS_COLLEGE_BOYS',   GIRLS: 'DX_PUPILS_COLLEGE_GIRLS' } },
                    { label: 'Special need pupils/students', dxIds: { BOYS: 'DX_PUPILS_SPECIAL_BOYS',   GIRLS: 'DX_PUPILS_SPECIAL_GIRLS' } },
                ],
            },
            {
                id: 'iec-materials',
                title: 'Tools/IEC material distributed',
                type: 'simple',
                valueLabel: 'NUMBER',
                showTotal: true,
                rows: [
                    { label: '1. Guidelines',           dxId: 'DX_IEC_GUIDELINES' },
                    { label: '2. Leaflets/Brochure',    dxId: 'DX_IEC_LEAFLETS' },
                    { label: '3. Posters',              dxId: 'DX_IEC_POSTERS' },
                    { label: '4. Hand washing buckets', dxId: 'DX_IEC_HW_BUCKETS' },
                    { label: '5. Water Tanks',          dxId: 'DX_IEC_WATER_TANKS' },
                    { label: '6. Water Disinfectants',  dxId: 'DX_IEC_DISINFECTANTS' },
                    { label: '7. Soaps',                dxId: 'DX_IEC_SOAPS' },
                    { label: '8. Condoms',              dxId: 'DX_IEC_CONDOMS' },
                    { label: '9. Umbrellas',            dxId: 'DX_IEC_UMBRELLAS' },
                    { label: '10. T-Shirts',            dxId: 'DX_IEC_TSHIRTS' },
                    { label: '11. Others',              dxId: 'DX_IEC_OTHERS' },
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
                    { label: 'Radio',        key: 'RADIO' },
                    { label: 'Television',   key: 'TV' },
                    { label: 'Social Media', key: 'SOCIAL' },
                    { label: 'Others',       key: 'OTHERS' },
                ],
                rows: [
                    {
                        label: 'Number of sessions conducted by expert',
                        dxIds: { RADIO: 'DX_MM_SESSIONS_RADIO', TV: 'DX_MM_SESSIONS_TV', SOCIAL: 'DX_MM_SESSIONS_SOCIAL', OTHERS: 'DX_MM_SESSIONS_OTHERS' },
                    },
                    {
                        label: 'Number of national media engaged in provision of health messages',
                        dxIds: { RADIO: 'DX_MM_NATIONAL_RADIO', TV: 'DX_MM_NATIONAL_TV', SOCIAL: 'DX_MM_NATIONAL_SOCIAL', OTHERS: 'DX_MM_NATIONAL_OTHERS' },
                    },
                    {
                        label: 'Number of people reached by mass and social media contents aired',
                        dxIds: { RADIO: 'DX_MM_PEOPLE_RADIO', TV: 'DX_MM_PEOPLE_TV', SOCIAL: 'DX_MM_PEOPLE_SOCIAL', OTHERS: 'DX_MM_PEOPLE_OTHERS' },
                    },
                    {
                        label: 'Number of mass media contents produced and aired to address specific health area',
                        dxIds: { RADIO: 'DX_MM_CONTENTS_RADIO', TV: 'DX_MM_CONTENTS_TV', SOCIAL: 'DX_MM_CONTENTS_SOCIAL', OTHERS: 'DX_MM_CONTENTS_OTHERS' },
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
                    { label: '1. Bonanza',      dxId: 'DX_MID_BONANZA' },
                    { label: '2. Meeting',      dxId: 'DX_MID_MEETING' },
                    { label: '3. Festival',     dxId: 'DX_MID_FESTIVAL' },
                    { label: '4. Charity Walk', dxId: 'DX_MID_CHARITY_WALK' },
                    { label: '5. Discussions',  dxId: 'DX_MID_DISCUSSIONS' },
                    { label: '6. Others',       dxId: 'DX_MID_EVENT_OTHERS' },
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
                    { label: '1. Religious leaders',                 dxIds: { MALE: 'DX_MID_RELIGIOUS_M',    FEMALE: 'DX_MID_RELIGIOUS_F' } },
                    { label: '2. Pupils/Students',                   dxIds: { MALE: 'DX_MID_PUPILS_M',       FEMALE: 'DX_MID_PUPILS_F' } },
                    { label: '3. Media personnel',                   dxIds: { MALE: 'DX_MID_MEDIA_M',        FEMALE: 'DX_MID_MEDIA_F' } },
                    { label: '4. Traditional/Alternative medicines',  dxIds: { MALE: 'DX_MID_TRAD_M',         FEMALE: 'DX_MID_TRAD_F' } },
                    { label: '5. Society (Gathering of people)',      dxIds: { MALE: 'DX_MID_SOCIETY_M',      FEMALE: 'DX_MID_SOCIETY_F' } },
                    { label: '6. Community and Governments leaders',  dxIds: { MALE: 'DX_MID_COMMUNITY_M',    FEMALE: 'DX_MID_COMMUNITY_F' } },
                    { label: '7. Others',                            dxIds: { MALE: 'DX_MID_GROUP_OTHERS_M', FEMALE: 'DX_MID_GROUP_OTHERS_F' } },
                ],
            },
            {
                id: 'sbc-materials',
                subtitle: 'Number of SBC Material distributed',
                type: 'simple',
                valueLabel: 'Number',
                showTotal: true,
                rows: [
                    { label: '1. Leaflets/Brochure', dxId: 'DX_SBC_LEAFLETS' },
                    { label: '2. Posters',           dxId: 'DX_SBC_POSTERS' },
                    { label: '3. Newsletters',       dxId: 'DX_SBC_NEWSLETTERS' },
                    { label: '4. T-shirt',           dxId: 'DX_SBC_TSHIRT' },
                    { label: '5. Umbrella',          dxId: 'DX_SBC_UMBRELLA' },
                    { label: '6. Tyre cover',        dxId: 'DX_SBC_TYRE_COVER' },
                    { label: '7. Kanga',             dxId: 'DX_SBC_KANGA' },
                    { label: '8. Pen',               dxId: 'DX_SBC_PEN' },
                    { label: '9. Cap',               dxId: 'DX_SBC_CAP' },
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
                    { label: '1. Health Facility', dxId: 'DX_REF_HEALTH_FACILITY' },
                    { label: '2. Social Welfare',  dxId: 'DX_REF_SOCIAL_WELFARE' },
                    { label: '3. Gender Desk',     dxId: 'DX_REF_GENDER_DESK' },
                    { label: '4. Others',          dxId: 'DX_REF_OTHERS' },
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
