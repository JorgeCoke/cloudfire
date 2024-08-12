import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { PostSearchUsersResponse } from "../../../../types/controllers/users-controller.types";
import { queryStore, type QueryStore } from "../../../lib/zustand-query";
import { fetcher } from "../../../lib/fetcher";
import { destructiveToast } from "../../../components/ui/use-toast";
import type { TableState } from "@tanstack/react-table";
import { convertTanStackTableState } from "../../../lib/generic-search-query";

type State = {
	tableData: Omit<PostSearchUsersResponse, "password">;
	tableState: TableState | undefined;
};

type Actions = {
	doSearchUsers: () => Promise<void>;
};

const initialState: State = {
	tableData: {
		total: 0,
		items: [],
	},
	tableState: undefined,
};

export const useUsersStore = create<
	State & Actions & QueryStore<typeof initialState>
>()(
	immer((set, get) => ({
		...queryStore(set, get, initialState),
		doSearchUsers: () =>
			get().query({
				queryKey: "doPostLogIn",
				queryFn: () =>
					fetcher<PostSearchUsersResponse>("/api/v1/users/search", {
						method: "POST",
						body: convertTanStackTableState(get().tableState),
					}),
				onSuccess: (res) => {
					set((state) => {
						state.tableData = res;
					});
				},
				onError: (error) => {
					destructiveToast({
						title: error.message,
					});
				},
			}),
	})),
);
