// this file is modified from Andrea Arcuri's repository https://github.com/arcuri82/web_development_and_api_design

const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');
const { Home } = require('../../src/client/home');
const {stubFetch, flushPromises} = require('../mytest-utils');



function fillForm(driver, id, password){

  const userIdInput = driver.find("#userIdInput").at(0);
  const passwordInput = driver.find("#passwordInput").at(0);
  const loginBtn = driver.find("#loginBtn").at(0);

  userIdInput.simulate('change', {target: {value: id}});
  passwordInput.simulate('change', {target: {value: password}});

  loginBtn.simulate('click');
}

test('Test failed fetch', async () => {

  stubFetch(500, {}, null);

  const driver = mount(
    <MemoryRouter initialEntries={['/home']}>
      <Home />
    </MemoryRouter>
  );

  await flushPromises();

  const html = driver.html();

  //here we just check it appears somewhere in the updated HTML
  expect(html).toMatch('Issue');
});
