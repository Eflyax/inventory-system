import {reactive, computed} from 'vue';

const state = reactive({
	userList: null,
	user: null,
	loading: null,
	error: null
});

export const useUser = () => {
	const
		loadUser = async(): Promise<void> => {
			state.loading = true;

			console.log(process.env.BASE_URL + 'user');

			fetch(process.env.BASE_URL + 'user', {method: 'get'})
				.then(response => response.json())
				.then(data => {
					state.user = data
				});

			state.loading = false;
		},
		loadUserList = async(): Promise<void> => {
			state.loading = true;

			fetch('user', {method: 'get'})
				.then(response => response.json())
				.then(data => {
					state.userList = data
				});

			state.loading = false;
		};

	return {
		loadUser,
		loadUserList,
		user: computed(() => state.user),
		loading: computed(() => state.loading),
		error: computed(() => state.error)
	};
};
