import {
	and,
	asc,
	desc,
	eq,
	gt,
	gte,
	isNotNull,
	isNull,
	like,
	lt,
	lte,
	sql,
	type SQL,
} from "drizzle-orm";
import type { SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";
import type { OrderBy, Query } from "../../../types/controllers/_shared";

// Convert OrderBy Zod schemas to Drizzle orderBy
export const convertToOrderBy = (
	table: SQLiteTableWithColumns<any>,
	orderBy?: OrderBy,
) => {
	if (!orderBy) {
		return asc(table.id);
	}
	return orderBy.sort === "asc"
		? asc(table[orderBy.param])
		: desc(table[orderBy.param]);
};

// Convert Query Zod schemas to Drizzle queries
export const convertToQuery = (
	table: SQLiteTableWithColumns<any>,
	query?: Query,
) => {
	const queries: SQL[] = [sql`1 == 1`];
	if (query) {
		query.forEach((q) => {
			const param = q.param;
			const comparator = q.comparator;
			const value = convertValueToType(q.value);
			console.log(`Query: ${param} - ${comparator} : `, value);
			switch (comparator) {
				case "eq":
					queries.push(eq(table[param], value));
					break;
				case "gt":
					queries.push(gt(table[param], value));
					break;
				case "lt":
					queries.push(lt(table[param], value));
					break;
				case "gte":
					queries.push(gte(table[param], value));
					break;
				case "lte":
					queries.push(lte(table[param], value));
					break;
				case "inc":
					queries.push(like(table[param], `${value}`));
					break;
				case "null":
					queries.push(isNull(table[param]));
					break;
				case "notnull":
					queries.push(isNotNull(table[param]));
					break;
			}
		});
	}
	return and(...queries);
};

// TODO: Get Keys from User & Add test for every type: string, number & "number", boolean & "bolean", enum, timestamp & "timestamp" & "IsoDate", null, notnull
// Transform input values to Drizzle types
const convertValueToType = (value?: string | number | boolean | null) => {
	if (!value) {
		return null;
	}
	const validTimestampLimit = 99999999999;
	const isBoolean =
		typeof value === "boolean" || value === "true" || value === "false";
	if (isBoolean) {
		return typeof value === "boolean" ? value : value === "true";
	}
	const isNumber =
		(typeof value === "number" && value < validTimestampLimit) ||
		(typeof value === "string" && Number(value) < validTimestampLimit);
	if (isNumber) {
		return typeof value === "number" ? value : Number(value);
	}
	const isIntengerTimestampDate =
		typeof value === "number" &&
		value > validTimestampLimit &&
		new Date(value as number).getTime() > 0;
	if (isIntengerTimestampDate) {
		return new Date(value as number);
	}
	const isIsoStringDate =
		typeof value === "string" && new Date(value as string).getTime() > 0;
	if (isIsoStringDate) {
		return new Date(value as string);
	}
	const isStringTimestampDate =
		typeof value === "string" &&
		Number(value) > validTimestampLimit &&
		new Date(Number(value as string)).getTime() > 0;
	if (isStringTimestampDate) {
		return new Date(Number(value as string));
	}
	return `${value}`;
};
