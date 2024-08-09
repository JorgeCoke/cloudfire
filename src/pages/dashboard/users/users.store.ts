import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type {
	PostSearchUsersBody,
	PostSearchUsersResponse,
} from "../../../../types/api/users-controller.types";
import { queryStore, type QueryStore } from "../../../lib/zustand-query";
import { fetcher, rpc } from "../../../lib/rpc";
import { destructiveToast } from "../../../components/ui/use-toast";

type State = {
	table: { users: PostSearchUsersResponse; search: PostSearchUsersBody };
};

type Actions = {
	doSearchUsers: () => Promise<void>;
};

const initialState: State = {
	table: {
		users: {
			total: 0,
			items: [],
		},
		search: {
			limit: 10,
			offset: 0,
		},
	},
};

export const useUsersStore = create<
	State & Actions & QueryStore<typeof initialState>
>()(
	immer((set, get) => ({
		...queryStore(set, get, initialState),
		doSearchUsers: () =>
			get().query({
				queryKey: "doPostLogIn",
				queryFn: () => {
					return fetcher<PostSearchUsersResponse>(
						rpc.api.v1.users.search.$post({ json: get().table.search }),
					);
				},
				onSuccess: (res) => {
					set((state) => {
						state.table.users = res;
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
