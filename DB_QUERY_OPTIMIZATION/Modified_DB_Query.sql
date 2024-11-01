/*

Modification #1: DB Table Values are only extracted from 3 Tables - Jobs, JobCategories, JobTypes. So, INNER JOIN have been 
moved to the top to Row# 31 and 32
Modification #2: WHERE %Club Attendent% has been modified with IN at Row #47
Modification #3: Remove GROUP BY Clause as this is mostly used with aggregate fuctions like COUNT, SUM which is not being used here.

I believe the above modifications could improve the query performance.

*/

SELECT Jobs.id AS `Jobs__id`, Jobs.name AS `Jobs__name`, Jobs.media_id AS `Jobs__media_id`, Jobs.job_category_id AS `Jobs__job_category_id`,
Jobs.job_type_id AS `Jobs__job_type_id`, Jobs.description AS `Jobs__description`, Jobs.detail AS `Jobs__detail`,
Jobs.business_skill AS `Jobs__business_skill`, Jobs.knowledge AS `Jobs__knowledge`, Jobs.location AS `Jobs__location`,
Jobs.activity AS `Jobs__activity`, Jobs.academic_degree_doctor AS `Jobs__academic_degree_doctor`,
Jobs.academic_degree_master AS `Jobs__academic_degree_master`, Jobs.academic_degree_professional AS `Jobs__academic_degree_professional`,
Jobs.academic_degree_bachelor AS `Jobs__academic_degree_bachelor`, Jobs.salary_statistic_group AS `Jobs__salary_statistic_group`,
Jobs.salary_range_first_year AS `Jobs__salary_range_first_year`, Jobs.salary_range_average AS `Jobs__salary_range_average`,
Jobs.salary_range_remarks AS `Jobs__salary_range_remarks`,Jobs.restriction AS `Jobs__restriction`,
Jobs.estimated_total_workers AS `Jobs__estimated_total_workers`, Jobs.remarks AS `Jobs__remarks`,
Jobs.url AS `Jobs__url`, Jobs.seo_description AS `Jobs__seo_description`, Jobs.seo_keywords AS `Jobs__seo_keywords`,
Jobs.sort_order AS `Jobs__sort_order`, Jobs.publish_status AS `Jobs__publish_status`, Jobs.version AS `Jobs__version`,
Jobs.created_by AS `Jobs__created_by`, Jobs.created AS `Jobs__created`, Jobs.modified AS `Jobs__modified`, Jobs.deleted AS `Jobs__deleted`,
JobCategories.id AS `JobCategories__id`, JobCategories.name AS `JobCategories__name`, JobCategories.sort_order AS `JobCategories__sort_order`,
JobCategories.created_by AS `JobCategories__created_by`, JobCategories.created AS `JobCategories__created`,
JobCategories.modified AS `JobCategories__modified`, JobCategories.deleted AS `JobCategories__deleted`,
JobTypes.id AS `JobTypes__id`, JobTypes.name AS `JobTypes__name`, JobTypes.job_category_id AS `JobTypes__job_category_id`,
JobTypes.sort_order AS `JobTypes__sort_order`, JobTypes.created_by AS `JobTypes__created_by`, JobTypes.created AS `JobTypes__created`,
JobTypes.modified AS `JobTypes__modified`, JobTypes.deleted AS `JobTypes__deleted`
FROM jobs Jobs
INNER JOIN job_categories JobCategories ON (JobCategories.id = (Jobs.job_category_id) AND (JobCategories.deleted) IS NULL)
INNER JOIN job_types JobTypes ON (JobTypes.id = (Jobs.job_type_id) AND (JobTypes.deleted) IS NULL)
LEFT JOIN jobs_personalities JobsPersonalities ON Jobs.id = (JobsPersonalities.job_id)
LEFT JOIN personalities Personalities ON (Personalities.id = (JobsPersonalities.personality_id) AND (Personalities.deleted) IS NULL)
LEFT JOIN jobs_practical_skills JobsPracticalSkills ON Jobs.id = (JobsPracticalSkills.job_id)
LEFT JOIN practical_skills PracticalSkills ON (PracticalSkills.id = (JobsPracticalSkills.practical_skill_id) AND (PracticalSkills.deleted) IS NULL)
LEFT JOIN jobs_basic_abilities JobsBasicAbilities ON Jobs.id = (JobsBasicAbilities.job_id)
LEFT JOIN basic_abilities BasicAbilities ON (BasicAbilities.id = (JobsBasicAbilities.basic_ability_id) AND (BasicAbilities.deleted) IS NULL)
LEFT JOIN jobs_tools JobsTools ON Jobs.id = (JobsTools.job_id)
LEFT JOIN affiliates Tools ON (Tools.type = 1 AND Tools.id = (JobsTools.affiliate_id) AND (Tools.deleted) IS NULL)
LEFT JOIN jobs_career_paths JobsCareerPaths ON Jobs.id = (JobsCareerPaths.job_id)
LEFT JOIN affiliates CareerPaths ON (CareerPaths.type = 3 AND CareerPaths.id = (JobsCareerPaths.affiliate_id) AND (CareerPaths.deleted) IS NULL)
LEFT JOIN jobs_rec_qualifications JobsRecQualifications ON Jobs.id = (JobsRecQualifications.job_id)
LEFT JOIN affiliates RecQualifications ON (RecQualifications.type = 2 AND RecQualifications.id = (JobsRecQualifications.affiliate_id) AND (RecQualifications.deleted) IS NULL)
LEFT JOIN jobs_req_qualifications JobsReqQualifications ON Jobs.id = (JobsReqQualifications.job_id)
LEFT JOIN affiliates ReqQualifications ON (ReqQualifications.type = 2 AND ReqQualifications.id = (JobsReqQualifications.affiliate_id) AND (ReqQualifications.deleted) IS NULL)
WHERE ' %キャビンアテンダント% ' IN ((
    JobCategories.name, JobTypes.name, Jobs.name, Jobs.description, Jobs.detail, Jobs.business_skill, Jobs.knowledge,
    Jobs.location, Jobs.activity, Jobs.salary_statistic_group, Jobs.salary_range_remarks, Jobs.restriction, Jobs.remarks,
    Personalities.name, PracticalSkills.name, BasicAbilities.name, Tools.name, CareerPaths.name, RecQualifications.name,
    ReqQualifications.name)
    AND publish_status = 1 AND (Jobs.deleted) IS NULL)
ORDER BY Jobs.sort_order desc, Jobs.id DESC LIMIT 50 OFFSET 0;
