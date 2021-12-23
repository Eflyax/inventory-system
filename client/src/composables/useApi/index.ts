import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

enum Method {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}

export const useApi = () => {
	const
		sendGet = async(url: string): Promise<void> => {
			return await _doRequest(Method.GET, url);
		},
		sendPatch = async(url: string, patchData: any): Promise<void> => {
			return await _doRequest(Method.PATCH, url, patchData);
		},
		sendDelete = async(url: string): Promise<void> => {
			return await _doRequest(Method.DELETE, url);
		},
		sendPost = async(url: string, patchData: any): Promise<void> => {
			return await _doRequest(Method.POST, url, patchData);
		},
		_doRequest = async(method, url: string, body?: any) => {
			const parameters = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ` + (localStorage.getItem('token') || ''),
				},
				method: method
			};

			if (method === 'POST' || method === 'PATCH') {
				parameters['body'] = JSON.stringify(body);
			}
			try {
			return fetch(process.env.VUE_APP_API_URL + url, parameters)
				.then(response => {
					switch(response. status) {
						case 401: // unathorized
							window.location.replace('/auth');
							break;
						default:
							return response.json()
					}
				})
				.then(data => {
					return data.result;
				})
				.catch((err) => {
					console.log(err);
				})
			}
			catch(err) {
				console.log(err);
			}
		},
		setToken = (token?: string) => {
			localStorage.setItem('token', token);
		};

	return {
		setToken,
		sendGet,
		sendPatch,
		sendDelete,
		sendPost
	};
};
