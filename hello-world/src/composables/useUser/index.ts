import {computed} from '@vue/composition-api';
import {sharedRef} from '@vue-storefront/core';

export const useUser = () => {
	const
		userList = sharedRef(null, 'useUser-userList'),
		user = localStorage.getItem('user'),
		loading = sharedRef(null, 'useUser-loading'),
		error = sharedRef(null, 'useUser-error'),
		// state = reactive({
		// 	userList: null,
		// 	user: localStorage.getItem('user'),
		// 	loading: null,
		// 	error: null
		// }),
		loadUserList = async(): Promise<void> => {
			loading.value = true;

			fetch(process.env.API_URL + 'user', {method: 'get'})
				.then(response => response.json())
				.then(data => {
					userList.value = data.result
				});

			loading.value = false;
		},
		signIn = (id: number): void => {
			const list = userList.value as Array<Record<string, unknown>>;

			const user = list.find(userInList => userInList.id === id);

			localStorage.setItem('user', JSON.stringify(user));
		},
		signOut = (): void => {
			localStorage.removeItem('user');
		};

	return {
		signIn,
		signOut,
		loadUserList,
		userList,
		user,
		loading: computed(() => loading.value),
		error: computed(() => error.value)
	};
};
