//Model Type For DAO manager
declare type ModelNames =
	'admins';

declare interface PaginateResult {
	data: Array<Object>;
	total: number;
	page: number;
	limit: number;
}