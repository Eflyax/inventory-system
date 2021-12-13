import Vue from 'vue';
import {reactive, computed} from '@vue/composition-api';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

const state = reactive({
	userList: null,
	user: localStorage.getItem('user'),
	loading: null,
	error: null
});

export const useUser = () => {
	const
		loadUserList = async(): Promise<void> => {
			state.loading = true;

			fetch(process.env.API_URL + 'user', {method: 'get'})
				.then(response => response.json())
				.then(data => {
					state.userList = data.result
				});

			state.loading = false;
		},
		signIn = (id: number): void => {
			const user = state.userList.find((userInList) => userInList.id === id);

			localStorage.setItem('user', JSON.stringify(user));
		},
		signOut = (): void => {
			localStorage.removeItem('user');
		};

	return {
		signIn,
		signOut,
		loadUserList,
		userList: computed(() => state.userList),
		user: computed(() => state.user),
		loading: computed(() => state.loading),
		error: computed(() => state.error)
	};
};
