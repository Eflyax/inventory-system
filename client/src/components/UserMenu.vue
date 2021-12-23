<template>
	<v-menu
		bottom
		right
	>
		<template v-slot:activator="{on, attrs}">
			<v-avatar
				color="secondary"
				size="40"
				v-bind="attrs"
				v-on="on"
			>
				{{ user.name[0] }}{{user.name[1] }}
			</v-avatar>
		</template>

		<v-list>
			<v-list-item class="user-name">
				<v-list-item-title>{{ user.name }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-for="(item, i) in items"
				:key="i"
				class="navigation-item"
				@click="item.link()"
			>
				<v-icon class="icon">{{ item.icon }}</v-icon>
				<v-list-item-title>{{ item.title }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import {useUser, useApi} from '../composables/';

export const UserMenu = {
	name: 'UserMenu',
	setup() {
		const
			{user, signOut} = useUser(),
			{setToken} = useApi();

		return {
			user,
			setToken,
			signOut
		};
	},
	data() {
		return {
			items: [{
				title: this.$t('Nastavení'),
				icon: 'mdi-cog',
				link: () => {
					this.$router.push({name: 'UserSettings'});
				}
			},{
				title: this.$t('Přepnout účet'),
				icon: 'mdi-swap-horizontal',
				link: () => {
					this.$router.push({name: 'Login'});
				}
			}, {
				title: this.$t('Odhlásit se'),
				icon: 'mdi-logout',
				link: () => {
					this.setToken('');
					this.signOut();
					this.$router.push({name: 'Auth'});
				}
			}]
		};
	}
};

export default UserMenu;
</script>

<style>
.navigation-item {
	cursor: pointer;
}

.navigation-item .icon {
	margin: 0 5px 0 0;
}

.user-name {
	font-weight: 700;
	font-size: 20px;
	border-bottom: 1px solid purple;
}
</style>
