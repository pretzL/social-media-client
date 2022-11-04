import { createPost } from "./create.js";

const TITLE = "title";
const BODY = "body";
const MEDIA = "https://url.to/image.jpg";
const TAGS = "tags";
const BAD_MEDIA = "";

const post = {
  title: TITLE,
  body: BODY,
  media: MEDIA,
  tags: TAGS,
};

function createSuccess(status = 201, statusText = "Success!") {
  return Promise.resolve({
    ok: true,
    status,
    statusText,
    json: () => Promise.resolve({ ...post }),
  });
}

function createFailure(status = 404, statusText = "Unsuccessful") {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
}

describe("create", () => {
  it("creates a new item on the API", async () => {
    global.fetch = jest.fn(() => createSuccess());
    const data = await createPost(TITLE, BODY, MEDIA, TAGS);
    expect(data).toEqual(post);
    expect(TITLE).toBeDefined();
    expect(data.title).toEqual(TITLE);
    expect(data.body).toEqual(BODY);
    expect(data.media).toEqual(MEDIA);
    expect(data.tags).toEqual(TAGS);
    expect(MEDIA).toMatch(/\.(jpg|jpeg|png|webp|avif|gif)(?=\?.+|$)/);
  });

  it("throws an error if item cannot be created", async () => {
    global.fetch = jest.fn(() => createFailure());
    await expect(createPost(TITLE, BODY, BAD_MEDIA, TAGS)).rejects.toThrow(
      "Unsuccessful"
    );
  });
});
