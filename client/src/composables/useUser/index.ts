import {reactive, computed} from '@vue/composition-api';
import {useApi} from '../useApi';
import Vue from 'vue';
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
		{sendGet, sendPatch} = useApi(),
		loadUserList = async(): Promise<void> => {
			state.loading = true;
			state.userList = await sendGet('user');
			state.loading = false;
		},
		signIn = (id: number): void => {
			const user = state.userList.find((userInList) => userInList.id === id);

			localStorage.setItem('user', JSON.stringify(user));
			loadUserFromSession();
		},
		signOut = (): void => {
			localStorage.removeItem('user');
			state.user = null;
		},
		loadUserFromSession = () : void => {
			state.user = localStorage.getItem('user')
				? JSON.parse(localStorage.getItem('user'))
				: null;
		},
		updateProfile = async(values) => {
			state.loading = true;
			state.userList = await sendPatch('user/' + values.id, values);
			state.loading = false;
		};

	return {
		signIn,
		signOut,
		loadUserList,
		loadUserFromSession,
		updateProfile,
		userList: computed(() => state.userList),
		user: computed(() => state.user),
		loading: computed(() => state.loading),
		error: computed(() => state.error)
	};
};
