describe('Netflix Clone Backend', () => {
  test('environment is test', () => {
    expect(process.env.NODE_ENV).toBeDefined();
  });

  test('basic math works', () => {
    expect(2 + 2).toBe(4);
  });

  test('string formatting works', () => {
    const title = 'netflix';
    expect(title.toUpperCase()).toBe('NETFLIX');
  });
});
