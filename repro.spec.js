import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import { defineComponent, nextTick, ref as vueRef } from 'vue';
import { ref as demiRef } from 'vue-demi';

test('maintains reactivity', async () => {
	const vRef = vueRef(0);
	const dRef = demiRef(0);

	const Comp = defineComponent({
		setup() {
			return () => {
				return `${dRef.value}:${vRef.value}`;
			};
		},
	});

	const wrapper = mount(Comp);

	expect(wrapper.text()).toEqual('0:0');

	dRef.value++;
	await nextTick();

	expect(wrapper.text()).toEqual('1:0');

	vRef.value++;
	await nextTick();

	expect(wrapper.text()).toEqual('1:1');
});
