import { login } from "./login";

const GOOD_EMAIL = "testing@noroff.no";
const BAD_EMAIL = "poo@pee.com";
const PASSWORD = "12345678";
const TOKEN = "dsgf87775dejgf294549de";

const profile = {
  name: "Eric",
  email: GOOD_EMAIL,
};

function fetchSuccess(status = 201, statusText = "Success!") {
  return Promise.resolve({
    ok: true,
    status,
    statusText,
    json: () => Promise.resolve({ ...profile, TOKEN }),
  });
}

function fetchFailure(status = 404, statusText = "Unsuccessful") {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
}

describe("login", () => {
  it("returns a valid token when provided with valid credentials", async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const data = await login(GOOD_EMAIL, PASSWORD);
    expect(GOOD_EMAIL).toMatch("@noroff.no");
    expect(PASSWORD).toHaveLength(8);
    expect(data.TOKEN).toEqual(TOKEN);
  });

  it("throws an error when provided with invalid credentials", async () => {
    global.fetch = jest.fn(() => fetchFailure());
    await expect(login(BAD_EMAIL, PASSWORD)).rejects.toThrow("Unsuccessful");
  });
});
