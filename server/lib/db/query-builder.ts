import {
	and,
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
import type { z } from "zod";
import type { SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";
import type { Query } from "../../../types/query.types";

// Convert Query Zdo schemas to Drizzle queries
export const convertToQuery = <
	T extends { [keys: string]: z.infer<typeof Query> },
>(
	table: SQLiteTableWithColumns<any>,
	filter?: T,
) => {
	const queries: SQL[] = [sql`1 == 1`];
	if (filter) {
		for (const k in filter) {
			const key = k as keyof T;
			if (filter[key]) {
				const comparator = filter[key].comparator;
				const value = convertValueToType(filter[key].value);
				console.log(`Query ${k}: `, value);
				switch (comparator) {
					case "eq":
						queries.push(eq(table[key], value));
						break;
					case "gt":
						queries.push(gt(table[key], value));
						break;
					case "lt":
						queries.push(lt(table[key], value));
						break;
					case "gte":
						queries.push(gte(table[key], value));
						break;
					case "lte":
						queries.push(lte(table[key], value));
						break;
					case "inc":
						queries.push(like(table[key], `${value}`));
						break;
					case "null":
						queries.push(isNull(table[key]));
						break;
					case "notnull":
						queries.push(isNotNull(table[key]));
						break;
				}
			}
		}
	}
	return and(...queries);
};

// Transform input values to Drizzle types
const convertValueToType = (value?: string | number | boolean) => {
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
