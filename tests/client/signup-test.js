// this file is modified from Andrea Arcuri's repository https://github.com/arcuri82/web_development_and_api_design


const {Login} = require('../../src/client/login');
const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {app} = require('../../src/server/app');
const {SignUp} = require('../../src/client/signup');
const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {resetAllUsers, getUser, createUser} = require('../../src/server/repository');


beforeEach(resetAllUsers);

function fillForm(driver, id, password, confirm) {

    const userIdInput = driver.find("#userIdInput").at(0);
    const passwordInput = driver.find("#passwordInput").at(0);
    const confirmInput = driver.find("#confirmInput").at(0);
    const signUpBtn = driver.find("#signUpBtn").at(0);


    userIdInput.simulate('change', {target: {value: id}});
    passwordInput.simulate('change', {target: {value: password}});
    confirmInput.simulate('change', {target: {value: confirm}});

    signUpBtn.simulate('click');
}

test("Test password mismatch", async () => {

    const mismatch = "Not matching";

    overrideFetch(app);

    const driver = mount(
        <MemoryRouter initialEntries={["/signup"]}>
            <SignUp/>
        </MemoryRouter>
    );

    expect(driver.html().includes(mismatch)).toEqual(false);

    fillForm(driver, "StarYou", "Squirtle", "not-matching")

    const error = await asyncCheckCondition(
        () => {
            driver.update();
            return driver.html().includes(mismatch)
        },
        2000, 200);

    expect(error).toEqual(true);
});

test("Create user", async () => {

    const userId = "TestDummy";
    expect(getUser(userId)).toEqual(undefined);

    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
    let page = null;
    const history = {
        push: (h) => {
            page = h;
        },
    };

    const driver = mount(
        <MemoryRouter initialEntries={["/signup"]}>
            <SignUp fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} history={history}/>
        </MemoryRouter>
    );

    const password = "whatIsThis";

    fillForm(driver, userId, password, password);


    const redirected = await asyncCheckCondition(
        () => {
            return page === "/"
        },
        2000,
        200
    );

    expect(redirected).toEqual(false);
});

test("Fail if user already exists", async () => {

    const userId = "FailUser";
    const password = "ohNoo";
    createUser(userId, password);

    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
    let page = null;
    const history = {
        push: (h) => {
            page = h
        }
    };

    const driver = mount(
        <MemoryRouter initialEntries={["/signup"]}>
            <SignUp fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} history={history}/>
        </MemoryRouter>
    );

    fillForm(driver, userId, password, password);

    const failed = await asyncCheckCondition(
        () => {
            driver.update();
            return driver.html().includes('Invalid userId/password')
        },
        2000, 200);

    expect(failed).toEqual(false);
});