import { mount } from '@vue/test-utils';
import { createPinia, defineStore, setActivePinia } from 'pinia';
import { expect, test } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';

test('maintains reactivity (composition store)', async () => {
	const foo = ref(0);
	const useCounterStore = defineStore('counter', () => ({
		count: ref(0),
	}));

	const pinia = createPinia();
	setActivePinia(pinia);
	const store = useCounterStore();

	const Comp = defineComponent({
		setup() {
			return () => {
				return `${store.count}:${foo.value}`;
			};
		},
	});

	const wrapper = mount(Comp, { global: { plugins: [pinia] } });

	expect(wrapper.text()).toEqual('0:0');

	store.count++;
	await nextTick();

	expect(wrapper.text()).toEqual('1:0');

	foo.value++;
	await nextTick();

	expect(wrapper.text()).toEqual('1:1');
});

test('maintains reactivity (options store)', async () => {
	const foo = ref(0);
	const useCounterStore = defineStore('counter', {
		state: () => ({
			count: 0,
		}),
	});

	const pinia = createPinia();
	setActivePinia(pinia);
	const store = useCounterStore();

	const Comp = defineComponent({
		setup() {
			return () => {
				return `${store.count}:${foo.value}`;
			};
		},
	});

	const wrapper = mount(Comp, { global: { plugins: [pinia] } });

	expect(wrapper.text()).toEqual('0:0');

	store.count++;
	await nextTick();

	expect(wrapper.text()).toEqual('1:0');

	foo.value++;
	await nextTick();

	expect(wrapper.text()).toEqual('1:1');
});
