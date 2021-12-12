<template>
	<div class="input">
		<label
			v-if="fixedLabel"
			:class="{required}"
			@click="onLabelClick"
		>
			{{ label }}
		</label>

		<v-text-field
			v-if="textField"
			ref="input"
			:autocomplete="autocomplete"
			:label="fixedLabel ? undefined : label"
			:name="name"
			:type="showIcon ? 'text' : type"
			:value="value"
			:disabled="disabled"
			:clearable="clearable"
			:prepend-inner-icon="prependInnerIcon"
			:append-icon="type === fieldTypes.PASSWORD ? (showIcon ? 'mdi-eye' : 'mdi-eye-off') : null"
			:data-vv-scope="scope"
			v-on="$listeners"
			@blur="$emit('blur', $event);"
			@focus="$emit('focus', $event);"
			@input="updateValue"
			@click:append="showIcon = !showIcon"
		>
			<template
				v-if="!fixedLabel"
				#label
			>
				<span :class="['label', required ? 'required' : '']">
					{{ label }}
				</span>
			</template>
		</v-text-field>

		<div
			v-else-if="type === fieldTypes.NUMBER"
			class="number-field field-wrap"
		>
			<v-text-field
				ref="input"
				:label="fixedLabel ? undefined : label"
				:name="name"
				:type="fieldTypes.NUMBER"
				:value="value"
				:disabled="disabled"
				:clearable="clearable"
				:data-vv-scope="scope"
				@blur="$emit('blur', $event);"
				@focus="$emit('focus', $event);"
				@input="updateValue"
				v-on="$listeners"
			>
				<template
					v-if="!fixedLabel"
					#label
				>
					<span :class="['label', required ? 'required' : '']">
						{{ label }}
					</span>
				</template>
			</v-text-field>
			<div
				v-if="loading"
				class="loader"
			>
				...
			</div>
			<div
				v-else
				class="buttons"
			>
				<button
					type="button"
					class="plus"
					@click="incrementValue"
				>
					&#43;
				</button>
				<button
					type="button"
					class="minus"
					@click="decrementValue"
				>
					&#8722;
				</button>
			</div>
		</div>

		<div
			v-else-if="type === fieldTypes.CHECKBOX"
			class="checkbox-field"
		>
			<input
				:id="label"
				ref="input"
				:checked="value"
				type="checkbox"
				:value="value"
				:data-vv-scope="scope"
				:cy-rules="rules"
				class="checkbox"
				@click="updateValue"
			>
			<label :for="label">
				<span :class="['label', required ? 'required' : '']">
					{{ label }}
				</span>
			</label>
		</div>
		<v-radio-group
			v-else-if="type === fieldTypes.RADIO"
			:value="value"
			@change="updateValue"
		>
			<template #label>
				<span :class="['label', required ? 'required' : '']">
					{{ label }}
				</span>
			</template>
			<slot name="items" />
			<v-radio
				v-for="(item, index) in items"
				:key="index"
				:label="item.label"
				:value="item.value"
				:data-vv-scope="scope"
			/>
		</v-radio-group>
		<v-textarea
			v-else-if="type === fieldTypes.TEXTAREA"
			ref="input"
			:label="fixedLabel ? undefined : label"
			:disabled="disabled"
			:clearable="clearable"
			:name="name"
			:value="value"
			:data-vv-scope="scope"
			:cy-rules="rules"
			v-on="$listeners"
			@blur="$emit('blur');"
			@input="updateValue"
			@click:append="showIcon = !showIcon"
		>
			<template
				v-if="!fixedLabel"
				#label
			>
				<span :class="['label', required ? 'required' : '']">
					{{ label }}
				</span>
			</template>
		</v-textarea>
		<v-menu
			v-else-if="type === fieldTypes.DATE"
			v-model="showPicker"
			:close-on-content-click="false"
			transition="scale-transition"
			offset-y
		>
			<template #activator="{on}">
				<v-text-field
					:id="label"
					ref="input"
					v-validate="parentValidationRule"
					:value="value"
					:data-vv-scope="scope"
					:name="name"
					:label="fixedLabel ? undefined : label"
					:hint="t9n('YYYY/MM/DD', {ctx: 'Date format hint'})"
					:cy-rules="rules"
					persistent-hint
					readonly
					v-on="on"
				>
					<template
						v-if="!fixedLabel"
						#label
					>
						<span :class="['label', required ? 'required' : '']">
							{{ label }}
						</span>
					</template>
				</v-text-field>
			</template>
			<v-date-picker
				v-model="internalValue"
				no-title
				@input="updateValue"
			/>
		</v-menu>

		<v-btn
			v-else-if="type === fieldTypes.SUBMIT"
			type="button"
			submit
			color="primary"
			@click="$emit('click')"
		>
			{{ label }}
		</v-btn>

		<v-select
			v-else-if="type === fieldTypes.SELECT"
			ref="input"
			:hint="hint"
			:items="items"
			:multiple="multiple"
			:value="value"
			:data-vv-scope="scope"
			:label="fixedLabel ? undefined : label"
			:cy-rules="rules"
			item-text="text"
			item-value="value"
			dense
			v-on="$listeners"
			@input="updateValue"
		>
			<template
				v-if="!fixedLabel"
				#label
			>
				<span :class="['label', required ? 'required' : '']">
					{{ label }}
				</span>
			</template>
		</v-select>

		<div
			v-else-if="type === fieldTypes.RECAPTCHA"
		>
			<input
				v-if="recaptchaEnabled"
				ref="input"
				class="recaptcha"
				:value="value"
				:data-vv-scope="scope"
				:disabled="true"
				:cy-rules="rules"
				type="text"
			>
		</div>

		<div
			v-else-if="type === fieldTypes.RATING"
		>
			<span :class="['label', required ? 'required' : '']">
				{{ label }}
			</span>
			<v-rating
				:value="value"
				color="primary"
				half-increments
				hover
				length="5"
				@input="updateValue"
			/>
		</div>

		<v-switch
			v-else-if="type === fieldTypes.SWITCH"
			:value="value"
			:data-vv-scope="scope"
			@change="updateValue"
		>
			<template #label>
				<span :class="['label', required ? 'required' : '']">
					{{ label }}
				</span>
			</template>
		</v-switch>

		<v-slider
			v-else-if="type === fieldTypes.SLIDER"
			:value="value"
		>
			<template #label>
				<span :class="['label', required ? 'required' : '']">
					{{ label }}
				</span>
			</template>
		</v-slider>

		<span v-else>
			{{ t9n('Unknown field type configuration', {ctx: 'Invalid configuration'}) }}
		</span>

		<transition name="slide">
			<p
				v-show="errorMessage"
				class="input-error"
			>
				{{ errorMessage }}
			</p>
		</transition>

		errorMessage: {{errorMessage}}
	</div>
</template>

<script src="./Input.ts" lang="ts" />
<style src="./Input.scss" lang="scss" scoped />
