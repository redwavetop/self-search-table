import element from './list.vue';

element.install = Vue => Vue.component(element.name, element);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(element);
}

export default element;
