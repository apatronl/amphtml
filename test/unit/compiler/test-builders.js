import {getBuilders} from '#compiler/builders';

describes.sandboxed('getBuilders', {}, () => {
  it('should return an empty list for empty component list', () => {
    const components = [];
    expect(getBuilders(components)).to.eql({});
  });

  it('should return eligible builtins when provided them as components', () => {
    const components = [{component: 'amp-layout', version: 'v0'}];
    const builders = getBuilders(components);
    expect(builders).have.all.keys(['amp-layout']);
  });

  it('eligible component with ineligible version is not used', () => {
    const components = [{component: 'amp-fit-text', version: '1.0'}];
    const builders = getBuilders(components);
    expect(builders).to.eql({});
  });

  it('should return eligible components', () => {
    const components = [
      {component: 'amp-fit-text', version: '0.1'},
      {component: 'amp-layout', version: 'v0'},
    ];
    const builders = getBuilders(components);
    expect(builders).have.all.keys(['amp-layout', 'amp-fit-text']);
  });
});
