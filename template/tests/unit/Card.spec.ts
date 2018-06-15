import { shallowMount } from '@vue/test-utils';
import Card from '~/components/Card.vue';

describe('Card.vue', () => {
  it('renders props.msg when passed', () => {
    const person = {
      first_name: 'Evan',
      last_name: 'You',
    };
    const wrapper = shallowMount(Card, {
      propsData: { person },
    });
    const img = wrapper.find('img');

    expect(img.is('img')).toBe(true);
    expect(img.attributes().src).toMatch(
      `https://robohash.org/${person.first_name}_${person.last_name}`
    );
  });
});
