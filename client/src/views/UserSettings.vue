<template>
	<v-container class="auth">
		<v-row>
			<v-col sm="2">
				<div style="width: 200px">
					<div v-for="(item, index) in Object.keys(avatar)" :key="index">

						<v-icon class="arrow" @click="decrement(item)">
							mdi-arrow-left-box
						</v-icon>
						<span>{{ $t('avatar.' + item) }}</span>
						<v-icon class="arrow" @click="increment(item)">
							mdi-arrow-right-box
						</v-icon>
					</div>
				</div>
			</v-col>

			<v-col sm="10">
				<avataaars v-bind="avatar" style="max-width: 300px;"/>
			</v-col>
		</v-row>

		<v-btn @click="saveProfile">{{ $t('Uložit') }}</v-btn>
	</v-container>
</template>

<script lang="ts">
import {useUser, useApi} from '../composables';
import Avataaars from 'vuejs-avataaars';

export const UserSettings = {
	name: "UserSettings",
	components: {
		Avataaars
	},
	methods: {
		saveProfile() {
			this.user.avatar = this.avatar;

			const patch = Object.assign({}, this.user);
			delete patch['_id'];
			delete patch['__v'];

			this.updateProfile(patch);
		},
		increment(property) {
			const currentValue = this.avatar[property];
			let	index = this.settings[property].indexOf(currentValue);

			if(index == this.settings[property].length - 1) {
				this.avatar[property] = this.settings[property][0];
			}
			else {
				this.avatar[property] = this.settings[property][index + 1];
			}
		},
		decrement(property) {
			const currentValue = this.avatar[property];
			let index = this.settings[property].indexOf(currentValue);

			if(index == 0) {
				this.avatar[property] = this.settings[property][this.settings[property].length - 1];
			}
			else {
				this.avatar[property] = this.settings[property][index - 1];
			}
		}
	},
	data() {
		return {
			avatar: {
				// isCircle: false,
				// circleColor: '#000000',
				accessoriesType: 'Kurt',
				clotheType: 'GraphicShirt',
				clotheColor: 'Black',
				facialHairType: 'BeardMedium',
				facialHairColor: 'Blonde',
				graphicType: 'Deer',
				eyeType: 'Cry',
				eyebrowType: 'Angry',
				hairColor: 'Black',
				mouthType: 'Eating',
				skinColor: 'Pale',
				topType: 'LongHairStraight',
				topColor: 'Heather',
			},
			settings: {
				isCircle: [
					true,
					false
				],
				circleColor: '#000000',
				accessoriesType: [
					'Blank',
					'Kurt',
					'Prescription01',
					'Prescription02',
					'Round',
					'Sunglasses',
					'Wayfarers'
				],
				clotheType: [
					'BlazerShirt',
					'BlazerSweater',
					'CollarSweater',
					'GraphicShirt',
					'Hoodie',
					'Overall',
					'ShirtCrewNeck',
					'ShirtScoopNeck',
					'ShirtVNeck',
				],
				clotheColor: [
					'Black',
					'Blue01',
					'Blue02',
					'Blue03',
					'Gray01',
					'Gray02',
					'Heather',
					'PastelBlue',
					'PastelGreen',
					'PastelOrange',
					'PastelRed',
					'PastelYellow',
					'Pink',
					'Red',
					'White',
				],
				eyebrowType: [
					'Angry',
					'AngryNatural',
					'Default',
					'DefaultNatural',
					'FlatNatural',
					'RaisedExcited',
					'RaisedExcitedNatural',
					'SadConcerned',
					'SadConcernedNatural',
					'UnibrowNatural',
					'UpDown',
					'UpDownNatural',
				],
				eyeType: [
					'Close',
					'Cry',
					'Default',
					'Dizzy',
					'EyeRoll',
					'Happy',
					'Hearts',
					'Side',
					'Squint',
					'Surprised',
					'Wink',
					'WinkWacky',
				],
				facialHairColor: [
					'Auburn',
					'Black',
					'Blonde',
					'BlondeGolden',
					'Brown',
					'BrownDark',
					'PastelPink',
					'Platinum',
					'Red',
					'SilverGray',
				],
				facialHairType: [
					'Blank',
					'BeardMedium',
					'BeardLight',
					'BeardMagestic',
					'MoustacheFancy',
					'MoustacheMagnum',
				],
				graphicType: [
					'Bat',
					'Cumbia',
					'Deer',
					'Diamond',
					'Hola',
					'Pizza',
					'Resist',
					'Selena',
					'Bear',
					'SkullOutline',
					'Skull',
				],
				hairColor: [
					'Auburn',
					'Black',
					'Blonde',
					'BlondeGolden',
					'Brown',
					'BrownDark',
					'PastelPink',
					'Platinum',
					'Red',
					'SilverGray',
				],
				mouthType: [
					'Concerned',
					'Default',
					'Disbelief',
					'Eating',
					'Grimace',
					'Sad',
					'ScreamOpen',
					'Serious',
					'Smile',
					'Tongue',
					'Twinkle',
					'Vomit',
				],
				skinColor: [
					'Tanned',
					'Yellow',
					'Pale',
					'Light',
					'Brown',
					'DarkBrown',
					'Black',
				],
				topType: [
					'NoHair',
					'Eyepatch',
					'Hat',
					'Hijab',
					'Turban',
					'WinterHat1',
					'WinterHat2',
					'WinterHat3',
					'WinterHat4',
					'LongHairBigHair',
					'LongHairBob',
					'LongHairBun',
					'LongHairCurly',
					'LongHairCurvy',
					'LongHairDreads',
					'LongHairFrida',
					'LongHairFro',
					'LongHairFroBand',
					'LongHairNotTooLong',
					'LongHairShavedSides',
					'LongHairMiaWallace',
					'LongHairStraight',
					'LongHairStraight2',
					'LongHairStraightStrand',
					'ShortHairDreads01',
					'ShortHairDreads02',
					'ShortHairFrizzle',
					'ShortHairShaggyMullet',
					'ShortHairShortCurly',
					'ShortHairShortFlat',
					'ShortHairShortRound',
					'ShortHairShortWaved',
					'ShortHairSides',
					'ShortHairTheCaesar',
					'ShortHairTheCaesarSidePart',
				],
				topColor: [
					'Black',
					'Blue01',
					'Blue02',
					'Blue03',
					'Gray01',
					'Gray02',
					'Heather',
					'PastelBlue',
					'PastelGreen',
					'PastelOrange',
					'PastelRed',
					'PastelYellow',
					'Pink',
					'Red',
					'White',
				]
			}
		}
	},
	setup() {
		const
			{setToken} = useApi(),
			{loadUserList, loading, user, updateProfile} = useUser();

		return {
			updateProfile,
			loadUserList,
			setToken,
			loading,
			user
		}
	},
	mounted() {
		this.avatar = this.user.avatar;
	}
};

export default UserSettings;
</script>

<style>
.arrow {
	cursor: pointer;
	margin: 5px;
}
</style>
